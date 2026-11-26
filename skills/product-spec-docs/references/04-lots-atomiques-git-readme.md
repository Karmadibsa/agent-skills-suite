# 04 — Découpage en Lots Atomiques, Issues, Pull Requests & Documentation Projet (README)

Statut : Référentiel Cahier des Charges & Documentation Dev V1.0 · Skill : product-spec-docs.

## 1. Découpage en Lots Atomiques (Pour Exécution par Petites Sessions IA)

### Principe [N4]

Ne jamais demander à une IA de développer l'intégralité d'un cahier des charges en une seule instruction. L'accumulation de contexte entraîne une saturation cognitive de l'agent, le phénomène de Lost in the Middle (oubli des contraintes intermédiaires) et l'apparition de régressions silencieuses sur la base de code existante.

### Règle de découpage d'un Lot Atomique (LOT-01, LOT-02…)

Chaque lot correspond strictement à 1 tranche verticale complète et testable (UI, logique d'application, persistance et tests) exécutable au cours d'une seule micro-session IA (1 à 4 fichiers modifiés maximum).

#### Fiche Standard d'un Lot Atomique

Chaque lot doit impérativement respecter la structure suivante :

- ID & Titre : Ex. LOT-03 — Import CSV bancaire et détection des doublons

- Dépendances : Ex. Requiert LOT-01 (Schéma DB transactions) et LOT-02 (Service de parsing)

- Périmètre exact :

- Fichiers à créer/modifier : src/services/csv_importer.py, src/models/transaction.py, tests/test_csv_importer.py.

- Hors périmètre : Rapprochement bancaire automatique, catégorisation par IA, interface graphique de revue.

- Critères d'acceptation BDD (Gherkin) :

```
Scénario: Import réussi d'un fichier CSV valide avec détection de doublon
  Étant donné un compte bancaire existant avec l'ID "ACC-123"
  Et une transaction existante enregistrée le "2023-10-01" d'un montant de 45.00 EUR
  Lorsqu'un utilisateur téléverse un fichier CSV contenant une ligne identique
  Alors le système doit importer les nouvelles transactions
  Et marquer la ligne en doublon avec le statut "DUPLICATE_SKIPPED"
  Et générer un rapport d'exécution indiquant "1 importée, 1 ignorée"
```

- Tests obligatoires à exécuter avant clôture du lot :

- pytest tests/test_csv_importer.py::test_parse_valid_csv

- pytest tests/test_csv_importer.py::test_duplicate_detection_logic

### 1.2 Definition of Ready (DoR), Definition of Done (DoD) & Matrice de Traçabilité [P1]

#### Definition of Ready (DoR)

Un lot ou un ticket ne peut être pris en charge par l'IA ou un développeur que si l'ensemble des conditions suivantes est rempli :

- User Story validée : L'exigence métier est formalisée selon le modèle JTBD (En tant que... Je souhaite... Afin de...).

- Règles métier spéciﬁées [VERROUILLÉ] : Les règles d'entreprise associées sont explicites et validées par le Product Owner.

- Cas limites identiﬁés : Les scénarios d'erreur, limites de charge et comportements aux bornes sont spécifiés.

- Absence de points bloquants [OUVERT] : Aucune dépendance technique ou décision produit non tranchée ne fait obstacle.

#### Definition of Done (DoD)

Un lot est considéré comme totalement achevé et prêt pour le merge uniquement si :

- Critères Gherkin passants : Tous les scénarios BDD associés au lot s'exécutent avec succès.

- Tests automatisés verts : La suite de tests unitaires et d'intégration passe à 100% sans régression.

- Code propre & sans scories : Zéro fichier temporaire (*_old, *_backup), zéro code commenté ou secret en dur.

- Documentation à jour : Mise à jour synchronisée des fichiers README.md, CHANGELOG.md et HANDOFF.md.

#### Matrice de Traçabilité Bidirectionnelle

Le tableau ci-dessous assure la couverture de bout en bout entre l'exigence métier, sa formalisation BDD, son lot d'exécution et les tests automatisés :

| Exigence / User Story | Règle Métier | Scénario BDD (Gherkin) | Lot Atomique | Fichier de Test |
| --- | --- | --- | --- | --- |
| US-01 — Import CSV | RM-03 (Détection Doublons) | Import réussi avec détection de doublon | LOT-03 | tests/test_csv_importer.py |

## 2. Standard d'un README.md Projet Propre et Pérenne

Tout dépôt logiciel doit intégrer à sa racine un fichier README.md exhaustif, à jour et structuré en 7 blocs standards :

- Nom & Promesse en 2 lignes : Définition claire et concise de la valeur ajoutée du logiciel et de sa cible principale.

- Aperçu rapide / Fonctionnalités clés : Liste synthétique des capacités opérationnelles actuelles (exclure toute fonctionnalité future ou hypothétique).

- Démarrage rapide en 1 commande (Quick Start) : Prérequis minimaux et instruction unique pour lancer l'environnement local (./start.sh, make dev, npm run dev ou docker compose up).

- Architecture du projet : Arborescence commentée expliquant l'organisation des modules et dossiers principaux (src/, tests/, docs/).

- Configuration & Variables d'environnement : Nomenclature des variables requises avec référence directe au fichier .env.example (aucun secret ni clé d'API en dur) et détails des règles de protection de branche (ex. branche main protégée, PR obligatoire avec validation des status checks CI).

- Tests & Qualité : Commandes exactes pour exécuter les tests unitaires, d'intégration, de couverture et les outils d'analyse statique (linters/formatters).

- Contribution, Roadmap & Licence : Pointage vers le CHANGELOG.md, le répertoire docs/adr/, la licence du projet et la procédure de contribution via Issues et PRs.

### 2.2 — Architecture Documentaire Duale (Documentation Utilisateur Simple vs Documentation Technique IA)

Principe [N3] : Ne jamais mélanger dans un seul fichier la documentation destinée à l'utilisateur final (qui veut savoir comment installer et utiliser l'outil en 2 minutes sans jargon) et la documentation technique destinée aux agents IA et développeurs (qui ont besoin des règles verrouillées, schémas, ADR et contrats).

Séparation obligatoire en deux niveaux lisibles :

- Documentation Utilisateur (README.md à la racine + docs/guide-utilisateur.md si besoin) :

- Ton clair, direct, sans jargon d'architecture interne.

- Contient uniquement : (1) ce que fait l'outil en 2 phrases, (2) comment le lancer en 1 commande (start.bat / start.sh), (3) les fonctionnalités principales en langage humain, (4) la FAQ / résolution des erreurs courantes par l'utilisateur lui-même.

- Documentation Technique & IA (AGENTS.md / CLAUDE.md à la racine + docs/spec/ + docs/adr/ + docs/HANDOFF.md) :

- Concise et structurée pour les agents IA (pas de bavardage inutile, listes et tableaux denses).

- Contient : 00 — LIRE EN PREMIER, les règles métier verrouillées (RM-XX), le modèle de données, les ADR, la matrice de traçabilité et le fichier de passation HANDOFF.md.

## 3. Gouvernance GitHub : Issues Propres, Tags (Labels) & Pull Requests (PR)

### A. Taxonomie Standardisée des Tags / Labels GitHub

| Catégorie | Tag / Label | Code Couleur |
| --- | --- | --- |
| Description | Type | feat |

#A2EEEF

Nouvelle fonctionnalité applicative ou technique.

bug

#D73A4A

Dysfonctionnement avéré ou comportement non conforme.

ux

#7057FF

Amélioration ergonomique, visuelle ou d'accessibilité.

security

#B60205

Correction de vulnérabilité ou renforcement sécuritaire.

perf

#D4C5F9

Optimisation des temps de réponse ou de la mémoire.

tech-debt

#008672

Refactoring, nettoyage de code ou mise à jour de dépendances.

docs

#0075CA

Modification ou ajout de documentation explicite.

Priorité

prio:critique

#B60205

Bloquant total en production ou sur le flux principal.

prio:haute

#D93F0B

Requis pour le MVP ou jalon imminent.

prio:normale

#FBCA04

Traitement standard dans le backlog opérationnel.

prio:basse

#0E8A16

Amélioration secondaire à traiter à opportunité.

Statut

mvp

#0052CC

Inclus dans le périmètre du Produit Minimum Viable.

v1

#1D76DB

Programmé pour la version 1.0 post-MVP.

needs-repro

#E99695

Manque d'éléments pour reproduire l'anomalie.

wontfix

#FFFFFF

Ticket classé sans suite après arbitrage produit.

Note : La taxonomie des labels GitHub ci-dessus peut être automatiquement provisionnée et synchronisée sur le dépôt à l'aide du fichier de configuration .github/labels.yml.

### B. Templates d'Issues GitHub (.github/ISSUE_TEMPLATE/)

#### 1. Bug Report (.github/ISSUE_TEMPLATE/bug_report.md)

```
---
name: Bug Report
about: Signaler un dysfonctionnement ou un comportement inattendu.
title: 'bug: [Description synthétique du problème]'
labels: 'bug, prio:normale'
assignees: ''
---
## Contexte & Environnement
- **Version du logiciel / Commit** : [ex. v1.2.0 ou hash commit]
- **Environnement** : [ex. Production, Staging, Local (OS, Navigateur)]
- **Rôle utilisateur** : [ex. Administrateur, Client standard]
## Étapes de reproduction
1. Aller sur '...'
2. Cliquer sur '...'
3. Saisir la valeur '...'
4. Observer l'erreur.
## Comportement observé vs Attendu
- **Comportement observé** : [Description précise de l'anomalie ou message d'erreur]
- **Comportement attendu** : [Ce qui aurait dû se produire conformément aux spécifications]
## Diagnostic & Captures d'écran
- **Traces de logs / Console** :
```text
[Insérer les logs ou l'exception stack trace ici]
```
```

- Captures / Vidéo : [Ajouter un fichier ou lien visualisable]

## Gravité estimée

- Bloquant (Empêche l'utilisation d'une fonctionnalité clé sans contournement)

- Majeur (Fonctionnalité altérée mais un contournement existe)

- Mineur (Problème d'affichage, de libellé ou cosmétique)

```
---
name: Feature Request
about: Proposer une nouvelle fonctionnalité ou une amélioration.
title: 'feat: [Nom explicite de la fonctionnalité]'
labels: 'feat, prio:normale'
assignees: ''
---
## Problème utilisateur (Job-To-Be-Done)
En tant que **[type d'utilisateur]**,
Je souhaite **[action / objectif à accomplir]**,
Afin de **[bénéfice métier ou gain de temps]**.
## Solution proposée
[Description détaillée de la fonctionnalité demandée et du comportement souhaité]
## Alternatives envisagées
[Description des solutions de contournement ou alternatives plus simples étudiées]
## Critères d'acceptation (Gherkin)
```gherkin
Scénario: [Titre du scénario principal]
  Étant donné [contexte initial]
  Quand [action effectuée]
  Alors [résultat attendu]
```
```

## Impact technique pressenti

- Nouveaux champs en base de données

- Modifications d'API / Contrats de service

- Impact sur l'interface utilisateur (UI/UX)

```
## Résumé des changements
- [Pourquoi cette PR existe et quel lot / issue elle résout : Closes #XX]
- [Description concrète des modifications apportées dans le code]
## Décisions & Impacts
- [Règles métier impactées ou décisions d'architecture (ADR)]
- [Mentionner si `CHANGELOG.md`, `README.md` ou la documentation API a été mise à jour]
## Checklist de vérification avant fusion (Merge)
- [ ] Les critères d'acceptation (Gherkin) du ticket sont tous validés (Validation DoD)
- [ ] Aucun fichier mort (`*_old`, `*_backup`, code commenté) ni secret en dur n'a été ajouté
- [ ] Les tests automatisés passent localement (`npm test` / `pytest` / `cargo test`)
- [ ] Exigences non fonctionnelles validées (accessibilité UI, sécurité des données, performances)
- [ ] Documentation (`README.md`, `CHANGELOG.md`, `HANDOFF.md`) à jour
```

## 4. Grille de Validation QA (8 points de contrôle)

| N° | Point de contrôle | Critère d'évaluation |
| --- | --- | --- |
| 1 | Granularité des Lots | Chaque lot décrit une tranche verticale exécutable en 1 micro-session (1 à 4 fichiers max). |
| 2 | Format BDD / Gherkin | Les lots et feature requests incluent des critères d'acceptation formalisés en Gherkin. |
| 3 | Compréhension README | Le README.md contient les 7 blocs obligatoires et permet un démarrage rapide en 1 commande. |
| 4 | Sécurité & Variables | Absence totale de clés d'API ou secrets en dur ; présence d'un template .env.example. |
| 5 | Taxonomie des Labels | Le jeu de labels GitHub (Types, Priorités, Statuts) est documenté avec des couleurs sémantiques. |
| 6 | Qualité Bug Report | Le modèle d'issue Bug Report force la saisie des étapes de reproduction et des logs. |
| 7 | Cadrage Feature Request | Le modèle Feature Request inclut le rôle utilisateur (JTBD) et les alternatives analysées. |
| 8 | Rigueur des Fusion PR | La checklist de PR impose la validation des tests, la propreté du code et l'actualisation de la doc. |
| 9 | Architecture Documentaire Duale | Le README.md reste accessible à un utilisateur non-technicien tandis que les détails techniques d'exécution IA sont isolés dans AGENTS.md/CLAUDE.md et docs/. |
