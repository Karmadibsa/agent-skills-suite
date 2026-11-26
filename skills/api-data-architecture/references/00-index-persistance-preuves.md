# 00 — Index, Architecture de Persistance & Niveaux de Preuve (Skill 3 : api-data-architecture)

Statut : Référentiel Données & Contrats API V2.0 · Standards : ISO/IEC 25010, RFC 9457, OpenAPI 3.1, RGPD.

## 1. Mission du Skill 3

Le modèle de données constitue la fondation la plus coûteuse à modifier une fois qu'une application est déployée et alimentée par des données réelles. L'objectif fondamental de ce skill est d'établir des structures de persistance robustes et des interfaces d'échange rigoureusement typées.

Ce référentiel garantit :

- L'intégrité des données : Absence totale de données orphelines grâce aux contraintes de clés étrangères explicites, élimination stricte des erreurs d'arrondi financier via l'interdiction absolue des types à virgule flottante (FLOAT/DOUBLE) au profit de types décimaux exacts (NUMERIC/DECIMAL ou montants entiers en cents, se référer au Document 01), et prévention des pertes d'information lors des phases de migration de schéma.

- Des contrats d'échange clairs et prévisibles : Établissement d'interfaces strictes entre le système de présentation (Skill 2) et la logique métier backend (Skill 4), basées sur OpenAPI 3.1 et la spécification RFC 9457 pour la gestion normalisée des erreurs.

- La souveraineté et la protection des données : Intégration native des principes de Privacy by Design et de Privacy by Default (RGPD Art. 25), assurant le cloisonnement des données à caractère personnel (DCP), le respect du droit à l'oubli et la mise en œuvre de pistes d'audit immuables.

## 2. Taxonomie des Niveaux de Preuve (Alignée sur le monorepo)

Chaque choix d'architecture de données ou d'exposition d'API dans ce projet doit être justifié par un niveau de preuve explicite.

- [N1] Exigence réglementaire / légale vérifiée : Conformité stricte aux cadres juridiques applicables, notamment le RGPD (Art. 5.1.c — Minimisation des données, Art. 6 — Licéité du traitement et bases légales côté serveur, Art. 17 — Droit à l'effacement / oubli, Art. 20 — Portabilité des données, Art. 25 — Protection dès la conception et par défaut, Art. 28 — Encadrement des sous-traitants cloud, Art. 32 — Sécurité des traitements).

- [N2] Principe fondamental d'informatique théorique / bases de données : Garanties mathématiques et architecturales établies, incluant les propriétés ACID (Atomicité, Consistance, Isolement, Durabilité) et les formes normales de Codd (au moins 3NF, voire BCNF en cas de clés candidates multiples — voir Document 01 pour le détail des règles de normalisation).

- [N3] Standard d'interopérabilité reconnu : Respect rigoureux des spécifications ouvertes internationales (OpenAPI 3.1, RFC 9457 Problem Details, RFC 9562 UUID, ISO 8601 pour les dates et heures avec fuseau horaire).

- [N4] Convention d'ingénierie logicielle éprouvée : Bonnes pratiques d'architecture logicielle, telles que le pattern de migration Expand-Contract (déploiement sans interruption de service), l'indexation sytématique des clés étrangères, et la pagination bornée obligatoire sur tous les collections.

- [N5] Choix d'implémentation selon la stack : Arbitrages techniques liés à l'écosystème retenu (ex. SQLite local embarqué vs PostgreSQL distribué, ORM pour les opérations CRUD simples vs requêtes SQL natives pour le reporting analytique).

- [N6] Hypothèse de volumétrie ou de performance à valider par benchmark réel : Estimations théoriques de charge, d'empreinte mémoire ou de temps de réponse nécessitant une confirmation par des tests de stress en conditions réelles.

## 3. Arbitrage de Persistance : Local-First vs Client-Serveur

Le choix d'architecture de persistance doit s'aligner sur le contexte opérationnel validé au sein du Skill 0 (Cahier des charges) et du Skill 1 (Architecture globale).

| Critère d'évaluation | Architecture Local-First [N5](SQLite / IndexedDB / Fichiers locaux) | Architecture Client-Serveur [N5](PostgreSQL / API REST / Cloud) |
| --- | --- | --- |
| Cas d'usage cibles | Applications desktop/mobiles (Tauri, Electron), PWA hors-ligne, outils de productivité individuelle. | Applications multi-utilisateurs temps réel, SaaS B2B/B2C, plateformes transactionnelles centralisées. |
| Latence & Performance | Latence quasi nulle (accès mémoire/disque local). Pas d'appels réseau sur le chemin critique [N2]. | Dépendant de la qualité du réseau. Nécessite une stratégie de mise en cache et de découplage [N4]. |
| Confidentialité & Souveraineté | Maximale. Les données restent strictement sur l'appareil de l'utilisateur par défaut [N1]. | Nécessite le chiffrement en transit (TLS 1.3) et au repos (AES-256), ainsi qu'un contrôle d'accès strict [N1]. |
| Gestion des sauvegardes | Sauvegardes locales automatiques avant migration. Fonctionnalité d'export/import complet obligatoire [N4]. | Sauvegardes centralisées automatisées (WAL, PITR), réplication multi-zones et plans de reprise d'activité. |
| Contrôle d'accès & Sécurité | Sécurité reposant sur le bac à sable de l'OS. Modèle d'autorisation simplifié (mono-utilisateur local). | Contrôle d'accès fin centralisé (RBAC / ABAC) validé côté serveur à chaque requête [N4]. |
| Évolution du schéma | Migrations exécutées sur l'appareil client lors des mises à jour applicatives. Risque de dérives de versions [N4]. | Migrations centralisées contrôlées (zero-downtime) avec dépréciation progressive des contrats API [N4].<br>3.2. Limites & Contraintes Pratiques du Mode Local-First (Navigateur vs Desktop)<br>Le choix d'une architecture Local-First impose la prise en compte des contraintes matérielles, logicielles et de sécurité inhérentes à l'environnement d'exécution du client :<br>PWA / Navigateur Web : L'utilisation de localStorage est strictement limitée à ~5 Mo et s'avère totalement inadaptée aux données métier. La persistance doit reposer sur IndexedDB couplé obligatoirement à l'appel navigator.storage.persist() (API StorageManager MDN) afin de prémunir le stockage d'une éviction automatique par le navigateur en cas de pression mémoire. IndexedDB n'étant pas chiffré nativement sur le disque client, un chiffrement applicatif préalable des données sensibles est exigé [N1].<br>SQLite embarqué (Desktop / Mobile) : L'exécution locale de SQLite nécessite l'activation systématique du mode WAL (Write-Ahead Logging) couplée à une stratégie d'écrivain unique pour éviter les verrous de concurrence (BEGIN IMMEDIATE + busy_timeout). La directive PRAGMA foreign_keys = ON doit être exécutée à chaque ouverture de connexion. Il est strictement interdit d'héberger un fichier de base SQLite en mode WAL sur un système de fichiers réseau partagé (ex. NFS/SMB) pour éviter la corruption d'en-têtes et de verrous [N2]. |

### 3.2. Limites & Contraintes Pratiques du Mode Local-First (Navigateur vs Desktop)

Le choix d'une architecture Local-First impose la prise en compte des contraintes matérielles, logicielles et de sécurité inhérentes à l'environnement d'exécution du client :

- PWA / Navigateur Web : L'utilisation de localStorage est strictement limitée à ~5 Mo et s'avère totalement inadaptée aux données métier. La persistance doit reposer sur IndexedDB couplé obligatoirement à l'appel navigator.storage.persist() (API StorageManager MDN) afin de prémunir le stockage d'une éviction automatique par le navigateur en cas de pression mémoire. IndexedDB n'étant pas chiffré nativement sur le disque client, un chiffrement applicatif préalable des données sensibles est exigé [N1].

- SQLite embarqué (Desktop / Mobile) : L'exécution locale de SQLite nécessite l'activation systématique du mode WAL (Write-Ahead Logging) couplée à une stratégie d'écrivain unique pour éviter les verrous de concurrence (BEGIN IMMEDIATE + busy_timeout). La directive PRAGMA foreign_keys = ON doit être exécutée à chaque ouverture de connexion. Il est strictement interdit d'héberger un fichier de base SQLite en mode WAL sur un système de fichiers réseau partagé (ex. NFS/SMB) pour éviter la corruption d'en-têtes et de verrous [N2].

## 4. Carte des Documents du Référentiel (references/)

Le présent skill s'articule autour de quatre documents de référence spécialisés :

| Document | Titre & Description | Condition de chargement / Usage |
| --- | --- | --- |
| 00 | Index, Architecture de Persistance & Niveaux de PreuveDocument cadre définissant les objectifs, la taxonomie des preuves, le choix d'architecture de persistance et la grille de validation QA. | Toujours chargé comme point d'entrée pour le Skill 3. |
| 01 | Modélisation de la Persistance & MigrationsSpécification des schémas SQL/NoSQL, règles de normalisation, contraintes d'intégrité, indexation et stratégies de migration sans perte de données. | À charger dès lors qu'il s'agit d'avoir à créer, modifier ou auditer la structure de la base de données. |
| 02 | Design des API REST & Contrats d'ÉchangeRègles de conception des points d'accès API, formalisation des schémas OpenAPI 3.1, typage des données et gestion unifiée des erreurs (RFC 9457). | À charger pour la définition, la modification ou la documentation des contrats d'interface API. |
| 03 | Souveraineté des Données, RGPD & AuditabilityPatrons de conception pour l'isolation des DCP, la gestion des consentements, l'anonymisation/pseudonymisation et la traçabilité des opérations. | À charger lors de l'implémentation de fonctionnalités touchant aux données personnelles ou au journal d'audit. |

## 5. Grille de Validation QA Globale

Avant tout passage en production ou validation d'étape, l'architecture de données doit valider l'ensemble des six points de contrôle suivants :

- Alignement avec le Modèle de Domaine (Skill 1) [N4]
Toutes les entités, relations et invariants définis dans la carte des domaines du Skill 1 sont traduits de manière transparente dans le schéma de persistance et les contrats d'API, sans rupture conceptuelle.

- Absence de perte de données lors des migrations [N2]
Toute évolution de schéma dispose d'un script de migration aller (up) et retour (down) testé, appliquant le pattern Expand-Contract pour garantir un fonctionnement ininterrompu sans altération ni suppression accidentelle de données.

- Typage strict des données financières et temporelles [N3]
Aucune valeur monétaire n'est stockée sous forme de nombre à virgule flottante (FLOAT/DOUBLE). Les montants utilisent des types décimaux exacts (NUMERIC) ou des entiers représentant la plus petite subdivision. Les dates et heures sont stockées en UTC et formatées selon ISO 8601.

- Standardisation intégrale des erreurs API [N3]
Toutes les réponses d'erreur retournées par les interfaces API respectent strictement la structure JSON application/problem+json définie par la RFC 9457, incluant les champs type, title, status, detail, et instance.

- Portabilité et droit à l'oubli RGPD [N1]
Les données à caractère personnel (DCP) sont isolées ou identifiées de manière à permettre leur exportation intégrale dans un format structuré (JSON/CSV) et leur suppression définitive (ou anonymisation irréversible) sur demande motivée.

- Indexation et contrôle de volumétrie [N4]
Toutes les clés étrangères et les colonnes utilisées fréquemment dans les clauses de filtrage (WHERE), de jointure (JOIN) ou de tri (ORDER BY) possèdent des index explicites. Toutes les requêtes d'API retournant des listes imposent une pagination bornée par défaut.

## 6. Protocole d'Évaluation Comparative (Avec Skill 3 vs Sans Skill 3) & Portes Go/No-Go

Afin de valider objectivement l'apport des normes d'architecture de données et de formalisation d'API, l'évaluation comparative suivante est appliquée sur l'ensemble des composants de persistance :

| Axe d'évaluation | Sans Skill 3 (Pratiques ad hoc) | Avec Skill 3 (Référentiel Données V2.0) |
| --- | --- | --- |
| Intégrité financière & typage | Présence de types FLOAT/DOUBLE provoquant des erreurs cumulatives d'arrondis monétaires. | Types décimaux exacts (NUMERIC/DECIMAL ou entiers en cents) garantissant zéro écart de calcul. |
| Gestion des erreurs API | Formats de retours d'erreur hétérogènes (textes bruts, structures JSON variables selon les endpoints). | Spécification RFC 9457 (Problem Details) appliquée uniformément sur 100 % des points d'accès. |
| Robustesse des migrations | Modifications de schéma directes ou non réversibles causant des interruptions ou pertes de données. | Pattern Expand-Contract validé avec scripts up/down testés sans perte ni temps d'arrêt. |
| Conformité RGPD | Données personnelles dispersées, absence de mécanismes d'effacement sélectif ou de portabilité. | Isolation des DCP, traçabilité des consentements et fonctions d'export/anonymisation opérationnelles. |

### Portes de Validation Go/No-Go avant Mise en Production

Tout déploiement vers un environnement de production doit obligatoirement valider les trois portes bloquantes suivantes :

- Porte 1 — Vérification stricte des types financiers [N3] :
Contrôle automatisé des schémas de base de données et des contrats API interdisant la présence de types FLOAT ou DOUBLE sur tout champ représentant une valeur monétaire.

- Porte 2 — Conformité intégrale des retours d'erreur RFC 9457 [N3] :
Tests d'intégration validaient que toute réponse HTTP d'erreur (codes 4xx et 5xx) retourne l'en-tête Content-Type: application/problem+json et contienne les champs obligatoires (type, title, status, detail et instance).

- Porte 3 — Validation à chaud des migrations et plans de restauration [N2] :
Exécution réussie des tests de migration aller/retour (up et down) sur un jeu de données de recette ainsi que la validation du plan de restauration à partir de sauvegardes (WAL / PITR).
