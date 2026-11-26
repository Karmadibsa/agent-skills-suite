# 01 — Grille d'Inspection Multi-Domaine (Audit 360°)

Statut : Référentiel Audit Global V2.1 · Skill : full-project-audit

### 0. Profilage Conditionnel de l'Audit (Noyau Minimal vs Modules Étendus)

Pour éviter de noyer un petit outil local sous des contrôles d'entreprise inutiles, sélectionner le profil adapté avant de dérouler la grille :

- Profil 1 — Noyau Minimal Universel (toujours actif) : CHK-GOV-01, CHK-GOV-03, CHK-SEC-01, CHK-SEC-02, CHK-ARC-01, CHK-ARC-02 (KISS), CHK-QA-01.

- Profil 2 — Web / SaaS Multi-Utilisateurs : Noyau Minimal + tous les contrôles OWASP ASVS, RBAC/IDOR, CORS/CSRF, Rate Limiting, OpenAPI, observabilité et Core Web Vitals.

- Profil 3 — Desktop / Mobile Local-First : Noyau Minimal + SQLite WAL/verrous, sauvegarde locale/portabilité RGPD, ergonomie tactile/clavier et WCAG 2.2 AA.

## Bloc A — Gouvernance, Cahier des Charges & Hygiène Git (Skill 1 & Skill 4)

ID Contrôle

Intitulé & Description

Ce qu'il faut inspecter dans le dépôt

Critères d'alerte / Refus

CHK-GOV-01

Documentation de démarrage & Véracité du README : Vérifier ligne par ligne que chaque promesse, fonctionnalité, commande et prérequis décrits dans le README.md fonctionne réellement (zéro fonctionnalité fantôme ou commande cassée).

README.md, start.bat, start.sh, Makefile, package.json, docker-compose.yml.

Absence de README.md, commandes cassées, prérequis omis ou fonctionnalités annoncées inexistantes.

CHK-GOV-02

Documentation d'architecture & Mémoire projet : Documentation structurée synchronisée avec l'état réel du code.

00 — LIRE EN PREMIER, CHANGELOG.md, docs/adr/, docs/HANDOFF.md, AGENTS.md / CLAUDE.md.

Documentation obsolète par rapport au code, absence de carnet ADR ou de fichier de passation.

CHK-GOV-03

Hygiène du dépôt & Chaîne logistique (NIST SSDF / OpenSSF) : Recherche de résidus de code, fichiers morts et contrôle des verrous de dépendances.

Arborescence globale (*_old.*, *_backup.*, *_v2.*, .DS_Store, temp/), package-lock.json / Cargo.lock / uv.lock, licences.

Fichiers temporaires/sauvegardes suivis par Git, code mort commenté, absence de lockfile ou licences incompatibles.

CHK-GOV-04

Cohérence Terminologique (Ubiquitous Language) : Les objets métier portent exactement le même nom dans la doc, l'UI et le code.

Glossaire métier, noms de tables/variables, libellés d'interface.

Synonymes contradictoires désignant la même entité métier.

## Bloc B — Architecture Propre (KISS/SOLID) & Sécurité OWASP (Skill 4)

ID Contrôle

Intitulé & Description

Ce qu'il faut inspecter dans le dépôt

Critères d'alerte / Refus

CHK-SEC-01

Zéro Secret en Dur (Secret Management) : Aucun jeton, clé API ou mot de passe dans le code ou l'historique Git (recommandation : scan type gitleaks / trufflehog).

Fichiers de configuration, .env, .gitignore, historique Git, code frontend.

Secrets ou clés API en dur, fichier .env suivi par Git, absence de .env.example.

CHK-SEC-02

Validation Stricte des Entrées (OWASP ASVS) : Toute donnée externe est validée, typée et bornée aux frontières avant traitement.

Endpoints API, commandes IPC, formulaires UI, parseurs CSV/JSON/OFX, webhooks.

Absence de schéma de validation (Zod, Pydantic, Serde), confiance aveugle dans les payloads clients.

CHK-SEC-03

Protection Injections, AuthZ & Dépendances (OWASP Top 10 / ASVS 5.0) : Immunité contre SQLi, XSS, CSRF, BOLA/IDOR, contrôle RBAC/ABAC, hachage Argon2id et audit des dépendances (npm audit / cargo audit / trivy).

Requêtes SQL, rendu HTML (innerHTML / dangerouslySetInnerHTML), gestion JWT/cookies (HttpOnly, SameSite), middleware d'autorisation, dépendances.

Concaténation SQL, injection HTML brute, absence de vérification de propriété de ressource (IDOR), vulnérabilités critiques non patchées.

CHK-ARC-01

Séparation des Responsabilités (Clean Architecture) : Logique métier et calculs critiques découplés de l'interface graphique et testables isolément.

Composants UI, services domaine, contrôleurs, moteurs de calcul.

Règles métier ou calculs financiers codés directement dans les composants UI.

CHK-ARC-02

Principe KISS & Détection de Sur-Ingénierie (ISO/IEC 25010) : Absence d'abstractions prématurées, de couches inutiles ou de dépendances lourdes remplaçables par du natif.

Graphe de dépendances, architecture des dossiers, duplication de code.

Complexité accidentelle injustifiée, sur-abstraction ou bibliothèques massives pour un besoin trivial.

## Bloc C — Données, Persistance & Contrats API (Skill 3)

ID Contrôle

Intitulé & Description

Ce qu'il faut inspecter dans le dépôt

Critères d'alerte / Refus

CHK-DAT-01

Typage Sûr & Concurrence Locale (SQLite WAL / Types exacts) : Aucun type flottant sur l'argent ; dates UTC ISO 8601 / RFC 3339 ; sur SQLite, PRAGMA foreign_keys = ON et mode WAL avec gestion des verrous.

Schémas SQL/ORM, DTOs, initialisation de connexion SQLite/IndexedDB.

Types FLOAT/DOUBLE sur des montants, dates locales sans fuseau, clés étrangères désactivées sur SQLite.

CHK-DAT-02

Intégrité Référentielle, Migrations & Sauvegardes : Clés étrangères, migrations versionnées réversibles (up/down) et sauvegarde préalable (VACUUM INTO / dump).

Contraintes DDL (FOREIGN KEY, UNIQUE, CHECK), dossier migrations/, scripts de backup.

Migrations destructives sans sauvegarde préalable ni procédure de rollback.

CHK-DAT-03

Contrats API (OpenAPI / RFC 9457), Sync Offline & Portabilité RGPD : Pagination bornée, erreurs normalisées application/problem+json, gestion des conflits offline/sync et export ouvert (JSON/CSV).

Endpoints de listing, handlers d'erreur, file offline, module d'export/suppression RGPD Art. 17 & 20.

Listes non paginées, fuite de stack trace dans les erreurs, impossibilité d'exporter ou d'effacer les données personnelles.

## Bloc E — Tests, Performance & Observabilité (Skill 5)

ID Contrôle

Intitulé & Description

Ce qu'il faut inspecter dans le dépôt

Critères d'alerte / Refus

CHK-QA-01

Exécution & Pertinence des Tests (Unitaires, Intégration & E2E) : Tests réels exécutés couvrant les règles métier critiques et parcours principaux (Playwright / Cypress / Pytest / Vitest), sans tests instables (flaky).

Dossiers tests/ / e2e/, configuration CI, résultats d'exécution réels.

Suite de tests absente ou en échec, règles métier critiques non testées, tests E2E dépendants de sélecteurs CSS fragiles.

CHK-QA-02

Performance Réseau, BDD & Stabilité Visuelle : Absence de requêtes N+1, pagination/virtualisation des longues listes, réservation d'espace anti-CLS et animations GPU (transform/opacity).

Requêtes ORM/SQL en boucle, listes volumineuses, CSS transitions.

Boucles de requêtes N+1, rendu de milliers de nœuds DOM sans pagination, décalages visuels (CLS).

CHK-QA-03

Observabilité, Logs Structurés & Traçabilité Exigences ↔ Tests : Journaux d'erreurs structurés sans PII et correspondance claire entre les règles métier / scénarios BDD et les tests.

Configuration du logger, gestionnaires d'erreurs globaux, matrice de traçabilité.

Logs contenant des mots de passe/tokens, absence de journalisation des erreurs critiques.

## Bloc F — Alignement Produit & Sobriété Fonctionnelle (Skill 0)

ID Contrôle

Intitulé & Description

Ce qu'il faut inspecter dans le dépôt

Critères d'alerte / Refus

CHK-PRD-01

Sobriété Fonctionnelle & Justification Backlog : Absence de fonctionnalités gadgets non reliées à un besoin utilisateur validé ou au cahier des charges (Skill 0 / Skill 1).

Arborescence fonctionnelle vs cahier des charges / roadmap.

Fonctionnalités fantômes sur-ingéniérées complexifiant l'interface et la maintenance sans valeur prouvée.
