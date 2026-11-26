# 03 — Privacy-by-Design, Chiffrement, Sauvegardes & Portabilité RGPD (Version 2.0)

Statut : Référentiel Données & Contrats API V2.0 · Skill 3 : api-data-architecture.

## 1. Minimisation & Isolation des Données Personnelles (RGPD Art. 5 & 25) [N1]

Le principe de Privacy-by-Design (protection des données dès la conception) et de Privacy-by-Default impose d'intégrer les exigences du Règlement Général sur la Protection des Données (UE 2016/679) au niveau du schéma de base de données, des endpoints d'API et de la politique de rétention.

### 1.1 Règle de Collecte Minimale (Art. 5.1.c)

Toute création de champ contenant des Données à Caractère Personnel (DCP / PII) doit être strictement justifiée par une fonctionnalité validée du cahier des charges.

- Champs autorisés sous réserve de justification : Nom, prénom, adresse e-mail, numéro de téléphone, adresse IP.

- Champs soumis à un régime renforcé (Art. 9) : Données de santé, biométriques, opinions politiques, données bancaires. Ces champs nécessitent un chiffrement spécifique, une isolation stricte et une analyse d'impact (AIPD / DPIA).

- Interdiction stricte : Créer des colonnes génériques « au cas où » (ex. custom_metadata_json sans validation de schéma) susceptibles de recevoir des PII non modérées.

### 1.2 Séparation Identité / Données Métier (Pseudonymisation Art. 4.5)

Pour limiter la portée d'une fuite de données (data breach), l'architecture doit isoler les tables d'identification directe des tables d'activité métier.

- Table PII d'identification (users_pii) : Contient l'identité réelle. Son accès est restreint aux services d'authentification et de gestion de compte.

- Table d'activité (activity_records) : Contient l'historique d'actions, télémétrie ou données métier. Elle ne fait référence qu'à un identifiant pseudonyme non séquentiel (user_id de type UUID v4 ou ULID).

```
+-------------------------------------------------------+
|                      users_pii                        |
|---|
| id (UUIDv4) [PK]                                      |
| email (VARCHAR) -- Encrypted / Hashed index           |
| full_name (VARCHAR) -- Encrypted at rest              |
| phone_number (VARCHAR) -- Encrypted at rest            |
+-------------------------------------------------------+
                           |
                           | 1:N (Internal ID reference)
                           v
+-------------------------------------------------------+
|                   activity_records                    |
+-------------------------------------------------------+
| id (UUIDv4) [PK]                                      |
| user_id (UUIDv4) [FK -> users_pii.id]                 |
| action_type (VARCHAR)                                 |
| payload (JSONB) -- Strictement nettoyé de toute PII   |
| created_at (TIMESTAMPTZ)                              |
+-------------------------------------------------------+
```

### 1.3 Durée de Conservation & Purge Automatique (Art. 5.1.e)

Chaque entité de la base de données doit être associée à une politique de conservation (Data Retention Policy). Des tâches planifiées (cron jobs / worker background) doivent exécuter la purge ou l'anonymisation de manière automatisée.

Catégorie de données

Durée maximale de conservation

Action à l'échéance

Mécanisme d'exécution

Journaux d'accès & Logs d'API

30 à 90 jours

Purge automatique quotidienne via tâche système

Sessions d'authentification

Expiration + 14 jours

Nettoyage automatique en base (TTL / Scheduled job)

Comptes inactifs (sans connexion)

24 mois (avertissement à 23m)

Cron mensuel contrôlant last_login_at

Historique de facturation

10 ans (obligation légale C. Com.)

Isolation dans un coffre d'archivage comptable

## 2. Chiffrement & Protection des Secrets (RGPD Art. 32 & OWASP) [N1 / N4]

Conformément aux recommandations de la CNIL et de l'OWASP, les données doivent être protégées en transit et au repos au moyen d'algorithmes cryptographiques robustes et d'une gestion stricte des clés.

### 2.1 Chiffrement en Transit

- Obligation : Tous les flux réseau (externe client-API, inter-services TLS, base de données) doivent utiliser TLS 1.2 ou TLS 1.3.

- Configuration HTTP : Redirection obligatoire des requêtes HTTP vers HTTPS avec en-tête Strict-Transport-Security (HSTS) configuré (max-age=31536000; includeSubDomains; preload).

- Ciphers autorisés : Utilisation exclusive de suites de chiffrement offrant la confidentialité de transmission parfaite (Forward Secrecy / ECDHE).

### 2.2 Chiffrement au Repos (Data at Rest)

#### Mots de Passe

Les mots de passe ne doivent jamais être stockés en clair ou chiffrés avec un algorithme réversible.

- Standard obligatoire : Argon2id (recommandation forte : m=65536 (64 MiB), t=3, p=4 lorsque le matériel le permet, avec un seuil minimal OWASP de m=19456 (&ge; 19 MiB) ajusté et documenté pour les appareils mobiles plus modestes).

- Alternative acceptée : bcrypt avec un facteur de coût (work factor) $\ge 12$.

- Interdiction : SHA-256, SHA-512, MD5 (même salés), PBKDF2 avec un nombre d'itérations insuffisant.

#### Données Sensibles en Base (PII critiques, Tokens tiers, Données bancaires)

- Algorithme : AES-256-GCM (Authenticated Encryption) garantissant à la fois la confidentialité et l'intégrité. En application stricte de la règle NIST SP 800-38D, il est impératif de ne jamais réutiliser un vecteur d'initialisation (IV / nonce) avec la même clé (génération aléatoire via CSPRNG de 96 bits à chaque opération de chiffrement).

- Bases de données embarquées / locales : Utilisation de SQLCipher (chiffrement de la base SQLite par bloc de page via AES-256).

### 2.3 Gestion des Clés de Chiffrement & Secrets

Les clés de chiffrement ne doivent en aucun cas résider au même endroit que les données chiffrées ou dans le code source.

- Environnements Client / Desktop / Mobile : Utilisation des coffres-forts natifs du système d'exploitation :

- Windows : Windows Credential Manager (DPAPI)

- macOS : macOS Keychain

- Linux : Secret Service API / libsecret

- iOS / Android : Keychain / Android Keystore

- Environnements Serveur / Cloud : Utilisation d'un gestionnaire de secrets dédié (HashiCorp Vault, AWS KMS, GCP KMS, Azure Key Vault).

- Interdictions en Front-End : Ne jamais stocker de clés de chiffrement de niveau master, de secrets d'API d'administration ou de jetons d'accès longue durée dans localStorage, sessionStorage ou dans les variables globales du navigateur.

- Sauvegarde & Rotation des Clés : Les clés de chiffrement doivent faire l'objet d'une politique de rotation périodique et d'une sauvegarde sécurisée hors-site (la perte de la clé entraînant l'impossibilité irréversible de restaurer les sauvegardes chiffrées).

## 3. Droit à l'Effacement & Anonymisation Comptable (RGPD Art. 17) [N1]

Le droit à l'effacement (« droit à l'oubli ») doit être concilié avec les obligations légales de conservation (ex. conservation des factures pendant 10 ans selon le Code de Commerce) et l'obligation de tenue du registre des activités de traitement (RGPD Art. 30 / journaux d'audit et de sécurité exempts de PII).

### 3.1 Stratégie d'Anonymisation Irréversible

Lorsqu'un utilisateur demande la suppression de son compte, l'application distingue rigoureusement l'effacement physique (Hard Delete - Art. 17) sur les données d'identification directe (users_pii, sessions, jetons) et la pseudonymisation irréversible sur les pièces comptables obligatoires (conservation 10 ans). Au sens strict du RGPD et des lignes directrices du CEPD (EDPB), le maintien d'un user_id interne relève d'une pseudonymisation renforcée et non d'un anonymat statistique absolu.

```
+-----------------------------------------------------------------------------------+
|                        Demande de suppression (Art. 17)                           |
+-----------------------------------------------------------------------------------+
                                          |
                   +----------------------+----------------------+
                   |                                             |
                   v                                             v
+-------------------------------------+       +-------------------------------------+
|        Tables Données Directes      |       |      Tables Obligations Légales    |
|   (users_pii, sessions, tokens)     |       |       (invoices, transactions)      |
+-------------------------------------+       +-------------------------------------+
| Action : Hard Delete (DELETE FROM)  |       | Action : Anonymisation irréversible |
| - Nettoyage complet des fichiers    |       | - email = 'deleted-<uuid>@anon.local|
| - Destruct. clés de chiffrement PII |       | - name = 'Utilisateur Supprimé'     |
|                                     |       | - billing_address = 'Purged'        |
|                                     |       | - deleted_at = CURRENT_TIMESTAMP    |
+-------------------------------------+       +-------------------------------------+
```

### 3.2 Exemple de Requête d'Anonymisation (SQL Transactionnel)

```
BEGIN TRANSACTION;
-- 1. Anonymisation du profil utilisateur dans la table des factures/commandes
UPDATE orders 
SET 
    customer_email = CONCAT('deleted-', gen_random_uuid(), '@anonymized.local'),
    customer_name = 'Utilisateur supprimé',
    shipping_address = 'PURGED_SDPR',
    billing_address = 'PURGED_SDPR',
    metadata = '{}'::jsonb
WHERE user_id = 'target-user-uuid';
-- 2. Suppression des données personnelles directes
DELETE FROM user_sessions WHERE user_id = 'target-user-uuid';
DELETE FROM user_oauth_tokens WHERE user_id = 'target-user-uuid';
DELETE FROM users_pii WHERE id = 'target-user-uuid';
-- 3. Inscription dans le registre de preuve de suppression (sans PII)
INSERT INTO gdpr_deletion_logs (erasure_receipt_id, erased_at)
VALUES (gen_random_uuid(), CURRENT_TIMESTAMP);
COMMIT;
```

## 4. Sauvegardes Automatiques, Restauration & Portabilité (RGPD Art. 20) [N1 / N4]

### 4.1 Règle des Sauvegardes et Démonstration de Restauration

Conformément à l'Article 32.1.c du RGPD (« moyen de rétablir la disponibilité des données »), les sauvegardes doivent répondre à la règle 3-2-1 adaptée.

- Règle 3-2-1 : 3 copies des données, sur 2 supports différents, dont 1 copie hors site (offsite) chiffrée.

- Chiffrement des backups : Les fichiers d'export de base de données (dump) doivent être chiffrés avant envoi vers le stockage froid (ex. via AES-256 / GPG).

- Applications Desktop / Local-First :

- Implémenter une sauvegarde automatique rotative (conservation des $N$ derniers snapshots locaux, ex: 5 versions).

- Proposer un export manuel chiffré en 1 clic pour l'utilisateur.

- Validation de Restauration (Disaster Recovery Plan) :

- Une sauvegarde non testée est considérée comme inexistante.

- Procédure de restauration automatisée exécutée mensuellement dans un environnement sandbox avec vérification d'intégrité des tables.

#### Synchronisation Offline & Multi-Appareils (Architecture Local-First)

- Gestion de la synchronisation : Si l'application Local-First prend en charge la synchronisation multi-appareils, elle doit intégrer une file d'attente d'événements sortants (Outbox Pattern) et une stratégie explicite de résolution de conflits (basée sur l'horodatage logique / versionnement, ou l'utilisation de structures CRDT uniquement si l'édition collaborative temps réel est requise).

### 4.2 Droit à la Portabilité des Données (Art. 20)

L'application doit permettre à tout utilisateur de récupérer l'ensemble des données qu'il a fournies, dans un format structuré, couramment utilisé et lisible par machine.

```
Archive de Portabilité (.zip)
├── export_metadata.json         <- Informations sur la date d'export et le schéma
├── profile.json                 <- Données du profil et préférences
├── activity_history.json        <- Historique complet des actions
└── tabular_data/                <- Déclinaison au format CSV pour tableurs
    ├── transactions.csv
    └── user_records.csv
```

- Spécification de l'API d'export :

- Endpoint : GET /api/v1/user/me/export ou POST /api/v1/user/me/export-job (si traitement asynchrone pour les volumétries importantes).

- Format de sortie : Archive .zip contenant des fichiers JSON strictement typés et des répertoires CSV pour les ensembles de données tabulaires.

## 5. Grille de Validation QA (7 Points de Contrôle)

Ce tableau de conformité doit être validé avant tout déploiement en production ou recette majeure.

#

Point de Contrôle

Critère d'Acceptation (Definition of Done)

Statut

1

Minimisation des données

Aucune colonne PII n'est présente en base sans justification formelle dans le registre des traitements.

2

Isolation Identité / Métier

Les tables d'activité et logs utilisent exclusivement l'identifiant technique pseudonyme (user_id).

3

Hachage des Mots de Passe

Mots de passe traités exclusivement via Argon2id (ou bcrypt $\ge 12$). Aucun algorithme faible détecté.

4

Chiffrement au Repos & Secrets

Données sensibles chiffrées en AES-256-GCM / SQLCipher. Aucun secret ni clé stocké en clair ou dans localStorage.

5

Procédure d'Anonymisation RGPD

La suppression de compte efface les PII directes et anonymise irréversiblement les entrées comptables conservées.

6

Absence de PII dans les Logs

Les fichiers de logs d'application et de serveurs web sont exempts d'adresses IP non masquées, jetons et emails.

7

Export Portabilité & Restauration

L'export Art. 20 génère un ZIP (JSON/CSV) valide. La procédure de restauration des backups a été testée avec succès.
