# 03 — Carnet de Décisions (ADR), Changelog & Mémoire Long Terme du Projet

Statut : Référentiel Cahier des Charges & Documentation Dev V1.0 · Skill : product-spec-docs

## 1. Pourquoi les IA Oublient les Décisions (et Comment l'Empêcher)

Lors d'un développement assisté par Intelligence Artificielle, la gestion de la mémoire contextuelle à long terme constitue le défi technique principal. D'une session de travail à l'autre, un modèle d'IA qui analyse une base de code accède à l'état de l'existant (comment le système est construit), mais ne possède aucun contexte historique sur les arbitrages passés (pourquoi le système est construit ainsi).

Sans traçabilité explicite, l'IA est sujette à deux biais critiques :

- La régression architecturale : Proposer de nouveau une solution technique ou fonctionnelle apparemment séduisante mais qui a déjà été évaluée, testée puis rejetée plusieurs semaines plus tôt en raison de contraintes spécifiques.

- L'incohérence terminologique : Modifier progressivement le vocabulaire métier du projet dans le code ou les composants UI, créant une dette cognitive importante pour l'équipe humaine et les sessions d'IA ultérieures.

Pour prévenir ces dérives, le système documentaire s'appuie sur deux piliers d'ingénierie logicielle : le Carnet de Décisions d'Architecture (ADR) pour stabiliser les choix stratégiques, et le Changelog structuré couplé à un Protocol de Passation pour maintenir le fil conducteur inter-sessions.

## 2. Le Carnet de Décisions d'Architecture & Produit (ADR)

Le modèle d'Architecture Decision Records (ADR), formalisé par Michael Nygard, sert de registre d'autorité pour l'historique des arbitrages techniques et fonctionnels.

### Principes Directeurs

- Règle d'or [N4] : Toute décision structurante (choix d'une bibliothèque, arbitrage d'architecture de données, modèle d'authentification, décision d'ergonomie majeure ou abandon explicite d'une piste) doit obligatoirement générer une fiche immuable numérotée séquentiellement (ADR-001, ADR-002, etc.) et enregistrée sous le dossier docs/adr/.

- Immuabilité stricte : Un ADR existant ne doit jamais être modifié ni supprimé pour altérer une décision passée. Si l'évolution du projet invalide un choix antérieur, une nouvelle fiche est créée (ex: ADR-012). Celle-ci met à jour le statut du document précédent en stipulant explicitement : Statut : Remplacé par ADR-012.

### Structure Normalisée d'un ADR

Chaque fiche ADR rédigée doit se conformer au gabarit canonique ci-dessous :

```
# ADR-001 — [Titre synthétique de la décision]
- **Fichier :** docs/adr/ADR-001-titre-court.md
- **Date :** AAAA-MM-JJ
- **Statut :** [Proposé | Accepté | Rejeté | Remplacé par ADR-XXX]
### Contexte & Problème
[Description du contexte opérationnel et du problème précis à résoudre. Quelles contraintes techniques, budgétaires ou métier nous imposent de trancher ?]
### Options envisagées
1. **Option A :** [Description succincte de la première piste]
2. **Option B :** [Description succincte de la deuxième piste]
3. **Option C :** [Description succincte de la troisième piste]
### Décision retenue
[Option sélectionnée et justification claire des critères ayant motivé ce choix plutôt que les autres.]
### Conséquences & Compromis
- **Impacts positifs :** [Ce que ce choix simplifie, améliore ou accélère]
- **Impacts négatifs / Compromis :** [Ce à quoi nous renonçons explicitement, les complexités induites ou les risques assumés]
```

## 3. Le Glossaire Métier Unique (Ubiquitous Language)

Inspiré du Domain-Driven Design (DDD) d'Eric Evans, le concept de Langage Ubiquitaire garantit une rigueur terminologique absolue entre l'ensemble des parties prenantes, le Cahier des Charges, les interfaces utilisateurs et l'implémentation logicielle.

### Principe d'Alignement [N3]

Il est strictement interdit de faire coexister plusieurs termes pour désigner une même entité métier. Par exemple, le document de cadrage ne peut pas employer le terme « Dossier », l'interface UI afficher « Projet », la base de données stocker des « Workspaces » et le code utiliser la variable folderId.

Un registre centralisé doit être tenu à jour et faire foi dans toute la documentation :

Terme officiel

Définition exacte

Termes interdits / Synonymes bannis

Nom exact dans le code

Espace de Travail

Entité racine regroupant les membres et les ressources d'une même organisation.

Organisation, Compte, Groupe, Tenant

Workspace

Livrable

Fichier final validé et soumis au client pour clôture d'étape.

Document, Rendement, Fichier, Asset

Deliverable

Jalon

Échéance temporelle marquant la fin d'une phase clé d'un projet.

Étape, Date butoir, Milestone, Checkpoint

Milestone

Contributeur

Utilisateur disposant de droits d'écriture sur un Espace de Travail.

Éditeur, Membre actif, User, Redacteur

Contributor

## 4. Tenue du CHANGELOG.md (Standard Keep a Changelog + SemVer)

La traçabilité des évolutions de la base de code suit le standard Keep a Changelog enrichi par la spécification du Semantic Versioning (SemVer).

### Règles de Versionnage (SemVer)

Le numéro de version adopte la structure MAJEUR.MINEUR.CORRECTIF :

- MAJEUR : Modifications entraînant des ruptures de compatibilité ascendante (breaking changes).

- MINEUR : Ajout de fonctionnalités rétrocompatibles.

- CORRECTIF : Corrections de bugs rétrocompatibles.

### Structure Obligatoire du Fichier CHANGELOG.md

Le fichier doit résider à la racine du dépôt. La section [Unreleased] figure obligatoirement en haut du document pour consigner les apports non encore publiés dans une version officielle.

```
# Changelog
Toutes les modifications notables apportées à ce projet seront consignées dans ce fichier.
Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [Unreleased]
### Added
- Intégration du système de notification par Webhook pour les événements majeurs.
## [1.1.0] - 2024-10-24
### Added
- Module d'export des Livrables au format PDF sécurisé.
- Gestion des rôles Granulaires pour les Contributeurs.
### Changed
- Optimisation du temps de réponse de l'API de recherche des Espaces de Travail.
### Fixed
- Correction d'une fuite mémoire lors du chargement des images volumineuses.
## [1.0.0] - 2024-09-15
### Added
- Initialisation du projet et architecture de base.
```

### Rubriques Standardisées Autorisées

Chaque version doit regrouper ses changements exclusivement sous les 6 catégories suivantes :

- Added : Nouvelles fonctionnalités déployées.

- Changed : Modifications apportées aux fonctionnalités existantes.

- Deprecated : Fonctionnalités anciennes destinées à être supprimées prochainement.

- Removed : Fonctionnalités effectivement retirées.

- Fixed : Corrections de dysfonctionnements ou bugs.

- Security : Correctifs visant la colmatation de vulnérabilités.

Pratique interdite (DON'T) : Ne jamais effectuer de copie brute des messages d'engagements Git (git log). Le Changelog est rédigé pour des humains et des agents IA analysant l'évolution fonctionnelle du système.

### 4.2 Gestion des Baselines Documentaires & Gouvernance des Modifications [P1]

Afin de maintenir une parfaite synchronisation entre la documentation fonctionnelle, les spécifications techniques et les versions livrées du logiciel, la gestion des exigences suit des règles de baselining rigoureuses :

- Alignement des Baselines avec SemVer : À chaque publication d'une version officielle du système (ex. version 1.0.0), un tag de version documentaire correspondant (ex. spec-v1.0.0) doit être apposé dans le dépôt de sources afin d'immortaliser l'état exact du cahier des charges et des spécifications associées.

- Gouvernance des Règles Verrouillées : Il est strictement interdit de modifier silencieusement ou unilatéralement une règle de gestion ou une contrainte estampillée [VERROUILLÉ]. Toute évolution d'une telle exigence nécessite impérativement l'ouverture d'une demande de changement (issue/ticket) et l'approbation préalable d'un ADR formalisant la révision architecturale ou fonctionnelle.

## 5. Protocole de Passation Entre Sessions IA (docs/HANDOFF.md)

Afin de garantir une continuité de contexte sans perte d'information lors du changement de session ou de modèle IA, l'agent produit ou met à jour le fichier docs/HANDOFF.md à la fin de chaque étape de travail significative.

### Contraintes Temporelles et de Format

- Le fichier doit rester très concis : moins de 80 lignes au total.

- Il s'agit d'une vue synthétique « à chaud » de l'état du projet au moment où la session s'interrompt.

### Template de Passation

```
# Session Handoff — [Date et Heure UTC]
- **Modèle IA / Outil utilisé :** [ex: Claude 3.5 Sonnet / GPT-4o / Codex]
- **Branche & Commit Git courant :** [ex: main @ a1b2c3d]
> **Règle de Reprise de Contexte :** Toute nouvelle session d'IA doit impérativement relire attentivement le document `00 — LIRE EN PREMIER` ainsi que le fichier `docs/HANDOFF.md` avant toute intervention ou modification dans la base de code.
## 1. Travaux Réalisés & Validés
- Implémentation du composant de création d'Espace de Travail (`src/components/workspace/CreateWorkspace.tsx`).
- Rédaction de l'ADR-004 sur l'utilisation de PostgreSQL pour le stockage local.
- Validation des tests unitaires sur le module d'authentification (100% pass).
## 2. Décisions Arborescentes Prises
- Choix de maintenir la gestion des rôles au niveau de l'Espace de Travail (voir ADR-005).
## 3. Priorités pour le Prochain Démarrage
- Interconnecter l'interface utilisateur du module Livrables avec l'API backend.
- Corriger le bug d'affichage sur les listes déroulantes de Jalons.
## 4. Périmètre Protégé (Fichiers critiques à ne pas altérer)
- `src/config/auth.ts` (Configuration de sécurité validée par audit).
- `docs/adr/ADR-001-architecture-base.md` (Décision socle immuable).
```

## 6. Grille de Validation QA (6 Points de Contrôle)

Chaque revue documentaire ou fin de phase de développement doit valider l'exactitude du système de mémoire long terme au travers de la grille de contrôle suivante :

N°

Point de contrôle

Critère d'acceptation

Validation

01

Présence du dossier ADR

Le répertoire docs/adr/ existe et contient l'ensemble des décisions d'architecture numérotées séquentiellement (ADR-001, ADR-002...).

02

Immuabilité des ADR

Aucun historique de décision n'a été effacé. Les décisions obsolètes sont marquées Statut : Remplacé et liées au nouvel ADR correspondant.

03

Langage Ubiquitaire

La totalité des termes métier employés dans la doc et le code respectent sans déviation le glossaire central (Ubiquitous Language).

04

Conformité Changelog

Le fichier CHANGELOG.md respecte la norme SemVer, inclut la section [Unreleased] et utilise uniquement les 6 rubriques autorisées.

05

Passation Synthetique

Le fichier docs/HANDOFF.md est à jour, concis (moins de 80 lignes) et définit clairement les priorités de la session suivante.

06

Absence de Logs Bruts

Le Changelog ne contient aucun copier-coller direct de commits Git (git log), garantissant une lecture lisible par un humain ou une IA.
