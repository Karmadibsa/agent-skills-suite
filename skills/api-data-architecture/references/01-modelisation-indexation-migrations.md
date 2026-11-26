# 01 — Modélisation Relationnelle, Indexation & Migrations Sûres

Statut : Référentiel Données & Contrats API V1.0 · Skill : api-data-architecture.

## Sources & Standards Référents

- Edgar F. Codd : A Relational Model of Data for Large Shared Data Banks (3e Forme Normale et Théorie Relationnelle).

- RFC 9562 : Universally Unique Lexicographically Sortable Identifier (UUIDv7) Specification.

- ISO 8601-1:2019 : Date and time — Representation for information interchange (UTC Standard).

- Martin Fowler : Refactoring Databases: Evolutionary Database Design (Pattern Expand-Contract).

## 1. Normalisation Relationnelle Pragmatique (3NF)

### Principe [N2]

Structurer l'ensemble des entités relationnelles en 3e Forme Normale (3NF) pour garantir l'absence totale de redondance et éliminer les anomalies de mise à jour. En cas de présence de clés candidates multiples et chevauchantes, viser impérativement la Forme Normale de Boyce-Codd (BCNF). Chaque fait métier doit exister à un endroit unique faisant foi.

La dénormalisation est autorisée exclusivement sous forme contrôlée et documentée (ex. capture immuable d'un prix unitaire et d'un total sur une ligne de facture au moment de sa validation pour préserver l'historique comptable face aux évolutions ultérieures du catalogue produits).

### Découplage Identifiant / Libellé [N4]

- Clé primaire technique immuable : Utiliser impérativement des UUIDv7 (recommandé pour l'ordonnancement chronologique natif et les performances des index B-Tree) ou des UUIDv4. Les identifiants métiers modifiables (email, code projet, nom commercial) ne doivent jamais servir de clé primaire.

- Horodatage système universel : Chaque table doit comporter les colonnes created_at et updated_at, stockées impérativement en UTC ISO 8601 / RFC 3339 (YYYY-MM-DDTHH:mm:ssZ avec suffixe Z pour l'échange dans les API et JSON).

## 2. Typage Strict & Intégrité au Niveau Base de Données

### Montants Financiers & Mesures Exactes [N4]

- Interdiction absolue des types à virgule flottante (FLOAT, DOUBLE, REAL) pour la manipulation des valeurs financières ou de comptage exact, en raison des erreurs d'arrondi binaire inhérentes (ex. 0.1 + 0.2 = 0.30000000000000004).

- Stockage obligatoire :

- Soit sous forme d'entiers stricts représentant la plus petite fraction monétaire (INTEGER / BIGINT en centimes : 2750 pour 27,50 €).

- Soit via des types décimaux exacts à échelle fixe (DECIMAL(12, 2) ou NUMERIC).

### Verrous d'Intégrité Déclarative [N2]

- Appliquer la contrainte NOT NULL sur tous les champs obligatoires. Les valeurs optionnelles ou temporairement inconnues (ex. date de naissance non renseignée) peuvent autoriser NULL sous réserve d'une justification métier explicite.

- Déclarer systématiquement les contraintes d'intégrité référentielle (FOREIGN KEY).

- Appliquer ON DELETE RESTRICT par défaut pour sécuriser et protéger l'historique financier et comptable. Le mode ON DELETE CASCADE est autorisé et pertinent pour les compositions strictes (ex. suppression automatique des lignes d'un panier brouillon lors de sa purge).

- Enforcer les invariants métier au niveau du schéma via des contraintes UNIQUE (ex. emails normalisés) et CHECK (ex. CHECK (amount >= 0)).

## 3. Stratégie d'Indexation Ciblée [N4]

### Règles Opérationnelles (DO)

- Indexer systématiquement toutes les clés étrangères (user_id, order_id). Note : PostgreSQL ne crée pas automatiquement d'index sur les clés étrangères (contrairement aux clés primaires).

- Indexer les colonnes à fort taux de filtrage (status, created_at) et les colonnes fréquemment utilisées pour les triages applicatifs.

- Mettre en place des index composites ordonnés selon la sélectivité des requêtes : (tenant_id, status, created_at DESC).

- Vérifier systématiquement les plans d'exécution des requêtes critiques à l'aide des commandes EXPLAIN / EXPLAIN ANALYZE afin de valider la couverture des index.

### Interdits (DON'T)

- Ne pas indexer aveuglément l'ensemble des colonnes d'une table (dégradation directe des performances d'écriture INSERT/UPDATE et surcoût de stockage).

- Bannir l'usage de SELECT * dans le code applicatif : toujours expliciter les colonnes requises afin de maximiser l'utilisation des index de couverture (Index-Only Scan).

## 4. Protocole de Migrations Sûres Sans Perte de Données (Expand-Contract) [N4]

### Règles Impératives

- Exécution séquentielle et versionnée : Les scripts DDL doivent suivre un nommage strict (001_init.sql, 002_add_budget_notes.sql). Interdiction de modifier manuellement le schéma en production.

- Sauvegarde préalable obligatoire : En environnement local ou sur base embarquée (SQLite), exécuter une copie de sauvegarde horodatée (backup-before-migration-v2.sqlite) immédiatement avant le jeu de migration.

- Pattern Expand-Contract (Parallel Change) pour toute modification de structure sans interruption de service :

- Phase 1 (Expand) : Ajouter la nouvelle colonne ou table à côté de l'existante.

- Phase 2 (Migrate) : Copier et synchroniser les données existantes.

- Phase 3 (Write/Read) : Basculer les écritures puis les lectures applicatives sur le nouveau champ.

- Phase 4 (Contract) : Supprimer l'ancienne structure dans une version de déploiement ultérieure.

- Contexte d'application (Mono-Utilisateur Local vs Serveur Multi-Utilisateurs) :

- Application locale mono-utilisateur (Tauri / Electron / PWA avec SQLite) : Activer systématiquement PRAGMA foreign_keys = ON sur chaque connexion, passer en PRAGMA journal_mode = WAL avec un busy_timeout approprié et des transactions d'écriture en BEGIN IMMEDIATE. Réaliser la sauvegarde pré-migration via VACUUM INTO 'backup.sqlite' (ou l'API Online Backup) pour garantir une copie à chaud cohérente incluant le journal WAL.

- Serveur multi-utilisateurs en production (PostgreSQL) : Appliquer le pattern complet Expand-Contract sur plusieurs versions pour garantir zéro interruption de service. Prendre en compte la gestion MVCC (maintenance de l'autovacuum), implémenter la ré-exécution (retries) des transactions sur erreur de sérialisation (SQLSTATE 40001) et vérifier la prise de verrous de table exclusive lors des DDL (ALTER TABLE) sur gros volumes avant exécution.

### Interdits (DON'T)

- Exécuter des commandes destructives directes (DROP TABLE, DROP COLUMN, ALTER TABLE ... RENAME) sans phase de transition ni sauvegarde confirmée.

### 4.2 Pipeline Sécurisé d'Import de Fichiers Externes (CSV, OFX, JSON)

- Pré-validation & Détection automatique : Valider et détecter automatiquement l'encodage (UTF-8 / ISO-8859-1) et les délimiteurs avant toute écriture en base de données.

- Étape de prévisualisation (Dry-Run) : Afficher à l'utilisateur un résumé précis avant validation finale (ex. 42 nouvelles lignes prêtes, 3 doublons ignorés, 2 lignes en erreur avec numéro de ligne et raison claire).

- Idempotence des imports : Calculer une empreinte unique (hash déterministe sur date + montant + libellé normalisé + compte) pour empêcher l'import en doublon d'un même fichier ou relevé bancaire.

- Isolation transactionnelle & Gestion des rejets : Valider et intégrer les lignes saines sans bloquer l'ensemble du fichier (sauf erreur structurelle globale), et permettre l'export des lignes rejetées pour correction.

## 5. Grille de Validation QA

#

Point de Contrôle

Invariant Technique

Statut Validé

01

Typage Financier

Absence absolue de FLOAT/DOUBLE. Usage de INTEGER (centimes) ou DECIMAL.

02

Horodatage Universalité

Présence de created_at et updated_at formatés en UTC ISO 8601 (Z).

03

Clés Primaires

Usage d'UUIDv7 ou UUIDv4 immuables (aucune donnée métier comme PK).

04

Intégrité Référentielle

Clés étrangères déclarées avec RESTRICT par défaut (CASCADE proscrit sur le métier).

05

Performance Indexation

Foreign Keys et filtres récurrents indexés ; absence d'index redondants.

06

Pattern Migration

Application du schéma Expand-Contract pour tout changement destructif.

07

Sauvegarde & Rollback

Backup complet exécuté et validé avant le passage de chaque script DDL.

08

Imports Fichiers & Idempotence

Prévisualisation dry-run affichée et empreinte unique (hash) calculée pour éviter tout import en doublon.
