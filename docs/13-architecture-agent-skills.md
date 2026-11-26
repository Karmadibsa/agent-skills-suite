# 13 — Architecture Agent Skills Open Source (SKILL.md, Évaluation & Écosystème)

Statut : Blueprint d'architecture ouverte · Budget cible : 0 €/mois.

## 1. Fonctionnement Concret du Standard Agent Skills (agentskills.io)

Le standard ouvert Agent Skills (agentskills.io/specification) définit une interface universelle, légère et indépendante des fournisseurs pour étendre les capacités des agents IA (Claude Code, Cursor, OpenAI Codex, ChatGPT, Gemini CLI, etc.). Ce modèle élimine le besoin de charger l'intégralité d'un corpus documentaire lourd dans la fenêtre de contexte de l'agent.

```
+-----------------------------------------------------------------------------------+
| 1. DÉCOUVERTE LÉGÈRE (Frontmatter YAML) ~100 tokens                               |
|---|
+-----------------------------------------------------------------------------------+
                                          |
                                          v (Déclenchement sur intention utilisateur)
+-----------------------------------------------------------------------------------+
| 2. ACTIVATION À LA DEMANDE (SKILL.md) < 500 lignes                                |
| Chargement du workflow synthétique en 10 étapes et de la table de routage         |
+-----------------------------------------------------------------------------------+
                                          |
                                          v (Routage ciblé selon besoin)
+-----------------------------------------------------------------------------------+
| 3. CHARGEMENT CONTEXTUEL (references/*.md)                                        |
| Lecture sélective des fiches spécialisées (ex: forms-tables.md, accessibility.md) |
+-----------------------------------------------------------------------------------+
                                          |
                                          v (Exécution & Outillage local)
+-----------------------------------------------------------------------------------+
| 4. EXÉCUTION AUTONOME & VÉRIFICATION                                              |
| Application du workflow, exécution des scripts (scripts/) et rapport honnête     |
+-----------------------------------------------------------------------------------+
```

### 1. Découverte légère (Progressive Disclosure)

Au démarrage d'une session, l'agent IA parcourt les répertoires de skills disponibles (.claude/skills/, .cursor/skills/, .agents/skills/, etc.). Il lit exclusivement le frontmatter YAML situé en tête du fichier SKILL.md :

```
---
name: ux-ui-design
description: Standard rigoureux de conception et d'audit d'interfaces logicielles (Web, Mobile, SaaS). À utiliser dès qu'une tâche implique la création, la modification ou l'audit de composants UI, formulaires, layouts, systèmes de design ou parcours utilisateur.
---
```

L'empreinte mémoire initiale est minime (~100 tokens par skill), ce qui permet d'enregistrer des dizaines de compétences sans dégrader la fenêtre de contexte utile de l'agent.

### 2. Activation à la demande

Lorsque la requête de l'utilisateur ou la tâche en cours correspond aux critères énoncés dans le champ description, l'agent charge l'intégralité du fichier SKILL.md. Ce fichier central reste concis (< 500 lignes) et sert de chef d'orchestre : il contient un workflow méthodologique universel et une table de routage orientée vers des documents spécialisés.

### 3. Chargement contextuel des références

Pour traiter un besoin précis (par exemple, concevoir un tableau de données complexe ou vérifier un contraste de couleur), l'agent consulte la table de routage du SKILL.md et charge uniquement le module documentaire pertinent situé dans references/ (ex: references/forms-tables.md). Le reste de la documentation (accessibilité avancée, règles mobiles, tokens de couleur) demeure non chargé tant qu'il n'est pas nécessaire.

### 4. Exécution autonome & vérification

L'agent déroule le workflow en 10 étapes. Si leSkill inclut des outils locaux (dossier scripts/), l'agent exécute ces scripts de validation statistique ou structurelle via son environnement d'exécution (CLI/terminal). Enfin, l'agent fournit un compte-rendu explicite distinguant formellement :

- Ce qui a été vérifié par analyse statique ou exécution de scripts.

- Ce qui a été appliqué selon les règles d'architecture.

- Les limites techniques ou contextuelles nécessitant un contrôle humain (ex: validation visuelle fine, tests d'usabilité avec de vrais utilisateurs).

## 2. Arborescence du Dépôt GitHub Open Source (ux-ui-design-skill)

Voici l'arborescence monorepo unifiée du dépôt GitHub agent-skills-suite, regroupant l'ensemble de la suite sous une structure modulaire unique. Le standard agentskills.io et les CLI modernes (ex: npx skills add ...) supportent nativement les dépôts multi-skills, permettant d'installer la suite complète ou de cibler un sous-dossier spécifique. Le composant de retour utilisateur (« Bug ou idée ? ») est directement intégré sous forme de module/référence optionnel dans skills/ux-ui-design/references/11-contextual-feedback.md (activable sur demande, et déconseillé pour les environnements médicaux ou financiers sensibles).

```
agent-skills-suite/
├── .github/
│   └── workflows/
│       ├── validate.yml                    # CI : Validation syntaxique, liens Markdown et schémas YAML
│       └── release.yml                     # CD : Empaquetage automatique ZIP pour ChatGPT/Claude Web
├── skills/
│   ├── product-discovery-validation/       # Skill 0 : Réflexion produit & validation scientifique
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── 01-jtbd-framework.md
│   │       ├── 02-opportunity-trees.md
│   │       ├── 03-kano-model.md
│   │       └── 04-scientific-falsification.md
│   ├── product-spec-docs/                  # Skill 1 : Cahier des charges & spécifications BDD
│   │   ├── SKILL.md
│   │   └── references/
│   ├── ux-ui-design/                       # Skill 2 : Ergonomie, design system & accessibilité WCAG
│   │   ├── SKILL.md
│   │   ├── references/
│   │   │   ├── 01-foundations-tokens.md
│   │   │   ├── 02-layout-structure.md
│   │   │   ├── 03-components-ui.md
│   │   │   ├── 04-forms-tables.md
│   │   │   ├── 05-accessibility-wcag.md
│   │   │   ├── 06-micro-copy-i18n.md
│   │   │   ├── 07-mobile-touch.md
│   │   │   ├── 08-data-vis-dashboards.md
│   │   │   ├── 09-human-ai-interaction.md
│   │   │   ├── 10-anti-patterns-slop.md
│   │   │   └── 11-contextual-feedback.md   # Module optionnel « Bug ou idée ? »
│   │   ├── scripts/
│   │   │   ├── check-contrast.js
│   │   │   └── audit-aria.py
│   │   └── examples/
│   ├── clean-code-security/                # Skill 3 : Architecture propre & sécurité OWASP
│   │   ├── SKILL.md
│   │   └── references/
│   ├── api-data-architecture/              # Skill 4 : Modélisation données & contrats d'API
│   │   ├── SKILL.md
│   │   └── references/
│   ├── qa-testing-observability/           # Skill 5 : Tests E2E, recette & observabilité
│   │   ├── SKILL.md
│   │   └── references/
│   ├── perf-green-it/                      # Skill 6 : Core Web Vitals & Éco-conception
│   │   ├── SKILL.md
│   │   └── references/
│   └── full-project-audit/                 # Skill 7 : Audit global, inspection multi-référentiels & remédiation
│       ├── SKILL.md
│       └── references/
├── evals/                                  # Benchmark et protocole de test reproductible
│   ├── README.md
│   ├── baseline-prompts/
│   └── assertions/
├── website/                                # Site vitrine statique (déploiement gratuit Netlify / GitHub Pages)
│   ├── index.html                          # Présentation claire, bouton de copie en 1 clic (npx skills add)
│   ├── demo.html                           # Démonstration interactive Avant/Après & testeur « Bug ou idée ? »
│   └── styles.css                          # Design system ultra-léger et accessible
├── .gitignore
├── LICENSE                                # Licence MIT pour les scripts, exemples et configurations
├── LICENSE-DOCS                           # Licence CC BY 4.0 pour le contenu textuel et méthodologique
├── README.md                              # Documentation d'installation et d'utilisation (Anglais)
└── README.fr.md                           # Documentation d'installation et d'utilisation (Français)
```

### Modes d'Installation Supportés

#### 1. Claude Code CLI

```
mkdir -p ~/.claude/skills/ux-ui-design
git clone https://github.com/organization/ux-ui-design-skill.git temp_skill
cp -r temp_skill/skills/ux-ui-design/* ~/.claude/skills/ux-ui-design/
rm -rf temp_skill
```

#### 2. Cursor IDE

Copier le dossier skills/ux-ui-design directement à la racine de votre projet sous .cursor/skills/ux-ui-design/ ou enregistrer l'emplacement dans les paramètres globaux de Cursor.

#### 3. ChatGPT Web / Claude Web / Custom GPTs

Télécharger l'archive ZIP générée automatiquement par la dernière Release GitHub et l'importer en tant que fichier joint dans la base de connaissances du projet ou du GPT personnalisé.

## 3. Brouillon Prêt à l'Emploi du Futur SKILL.md (ux-ui-design)

```
---
name: ux-ui-design
description: Standard universel de conception, d'implémentation et d'audit d'interfaces utilisateur (Web, SaaS, Mobile). À déclencher systématiquement pour concevoir des layouts, composants UI, formulaires, tableaux, systèmes de design ou pour corriger des interfaces existantes (anti-slop, accessibilité WCAG 2.1 AA).
---
# Agent Skill : UX/UI Design Standard & Architecture
Ce Skill fournit une méthodologie rigoureuse pour concevoir et auditer des interfaces utilisateur robustes, accessibles et performantes. L'agent doit suivre impérativement le workflow en 10 étapes ci-dessous et consulter les fichiers de référence selon les besoins spécifiques de la tâche.
## Table de Routage des Références (`references/`)
Pour toute précision technique, charger uniquement le fichier correspondant à la problématique :
* **Foundations & Design Tokens** -> `references/01-foundations-tokens.md` (Système 8pt, typographie scale Minor Third, typographies système, palettes contrastées).
* **Layout & Structure** -> `references/02-layout-structure.md` (Grilles responsive, conteneurs, zones de navigation, espacement).
* **Composants UI Essentiels** -> `references/03-components-ui.md` (Boutons, cartes, modales, overlays, états interactifs Hover/Focus/Active/Disabled).
* **Formulaires & Tableaux** -> `references/04-forms-tables.md` (Saisie guidée, validation en temps réel, tableaux denses, filtres, pagination).
* **Accessibilité & Inclusivité** -> `references/05-accessibility-wcag.md` (Conformité WCAG 2.1 AA, navigation clavier, attributs ARIA, gestion du focus).
* **Micro-copie & Internationalisation** -> `references/06-micro-copy-i18n.md` (Textes d'interface clairs, gestion i18n, support RTL, messages d'erreur).
* **Mobile & Tactile** -> `references/07-mobile-touch.md` (Zones d'interaction >= 44x44px, gestes, vues adaptatives, performances bas réseau).
* **Visualisation de Données & Dashboards** -> `references/08-data-vis-dashboards.md` (Hiérarchie d'indicateurs KPIs, choix des graphiques, palettes accessibles).
* **Interaction Homme-IA** -> `references/09-human-ai-interaction.md` (Transparence des traitements, états d'attente, réducteur d'incertitude, contrôle utilisateur).
* **Anti-Patterns & Chasse au Slop IA** -> `references/10-anti-patterns-slop.md` (Suppression des fioritures inutiles, dégradés superflus, animations perturbatrices).
---
## Workflow Universel en 10 Étapes
L'agent doit exécuter la séquence suivante pour toute demande d'interface :
### Étape 1 : Comprendre le produit et l'intention utilisateur
Identifier le profil de l'utilisateur final, son objectif métier immédiat et le contexte d'utilisation (usage quotidien intensif, consultation mobile rapide, saisie de données critique).
### Étape 2 : Identifier les parcours et cas limites
Définir le chemin nominal et recenser systématiquement les cas limites (Edge Cases) : données absentes (Empty State), chargement en cours (Loading State), erreur réseau/serveur (Error State), et données extrêmement longues ou volumineuses.
### Étape 3 : Examiner l'existant et les contraintes techniques
Analyser le code ou l'architecture existante. Identifier le framework UI (React, Vue, HTML/CSS pur, Tailwind), les contraintes de performance et les tokens déjà établis.
### Étape 4 : Charger les références pertinentes
Consulter la **Table de Routage** ci-dessus et lire les fiches Markdown dans `references/` correspondant strictement au travail à effectuer.
### Étape 5 : Choisir les composants et structures adaptés
Privilégier la simplicité et les standards natifs Web/Mobile. Réutiliser des motifs d'interface connus (Design Patterns) pour réduire la charge cognitive de l'utilisateur.
### Étape 6 : Implémenter avec rigueur
Rédiger un code propre, structuré et modulaire. Appliquer scrupuleusement la hiérarchie visuelle, l'alignement sur la grille de 8pt, et le respect strict du contraste des couleurs (ratio >= 4.5:1 pour le texte normal).
### Étape 7 : Vérifier réellement le rendu et le code
Examiner le code produit : vérifier l'absence d'éléments visuels décoratifs non fonctionnels (*AI Slop*), s'assurer que les espaces explicites sont respectés et qu'aucun masquage d'information textuelle critique n'a lieu.
### Étape 8 : Tester l'accessibilité (WCAG 2.1 AA)
* S'assurer que tous les éléments interactifs sont utilisables uniquement au clavier (`Tab`, `Enter`, `Space`, touches fléchées).
* Vérifier la présence des rôles ARIA natifs ou explicités, et des étiquettes (`aria-label`, `aria-labelledby`, `htmlFor`).
* Vérifier la gestion explicite de l'indicateur de focus (`focus-visible`).
### Étape 9 : Corriger les retours et raffiner
Si des anomalies sont détectées lors de la vérification, ajuster immédiatement le code avant de finaliser la réponse.
### Étape 10 : Justifier les choix majeurs et expliciter les limites
Rendre compte à l'utilisateur de manière synthétique :
1. Résumer les choix d'architecture UX/UI retenus.
2. Lister les contrôles d'accessibilité effectués.
3. Déclarer en toute transparence les points n'ayant pas pu être vérifiés automatiquement (ex: validation visuelle sur écran physique spécifique).
```

## 4. Protocole d'Évaluation Scientifique du Skill (9 Scénarios de Benchmark)

Afin de mesurer scientifiquement l'apport du Skill ux-ui-design, chaque mise à jour est soumise à un benchmark comparatif strict : Même modèle IA + Prompt Identique Sans Skill vs Avec Skill.

### Grille d'Évaluation des 9 Scénarios

ID

Scénario de Benchmark

Prompt Type d'Évaluation

Métriques & Criteres d'Évaluation

BENCH-01

Dashboard analytique SaaS B2B

"Conçois l'interface d'un tableau de bord SaaS pour la surveillance de serveurs cloud avec 6 métriques clés et 2 graphiques."

• Score Axe-core (0 violation)• Ratio texte/surface utile (> 70%)• Hiérarchie visuelle des KPIs

BENCH-02

Application mobile grand public

"Crée l'écran principal d'une application de livraison de repas axée sur une utilisation à une main."

• Zones tactiles >= 44x44px• Respect de la 'Thumb Zone'• Lisibilité plein soleil (contraste >= 7:1)

BENCH-03

Formulaire complexe multi-étapes

"Conçois un formulaire de souscription d'assurance professionnelle en 4 étapes avec validation."

• Taux de complétion estimé• Préservation des données saisies• Clarté des messages d'erreur inline

BENCH-04

Outil de gestion métier dense

"Crée un tableau de gestion d'inventaire de 10 000 références avec filtres avancés et actions groupées."

• Densité d'information contrôlée• Alignement des données (chiffres à droite)• Navigation 100% clavier dans la grille

BENCH-05

Tableau Kanban accessible

"Rédige le code d'un tableau Kanban (A faire, En cours, Terminé) supportant le glisser-déposer."

• Alternative clavier intégrée (flèches + espace)• Annonces aria-live lors des déplacements• Support complet des lecteurs d'écran

BENCH-06

Visualisation de données complexes

"Conçois un graphique d'évolution des ventes sur 3 ans comparant 5 régions."

• Palette de couleurs lisible pour daltoniens• Présence d'une alternative sous forme de table• Infobulles intelligentes non masquantes

BENCH-07

Interface grand public non-technicien

"Crée un écran d'activation de carte bancaire pour des utilisateurs seniors."

• Taille de police de base >= 16pt/18pt• Vocabulaire dénué de jargon technique• Boutons d'action univoques et explicites

BENCH-08

Interface conversationnelle IA

"Conçois l'UI d'un assistant de génération de code avec historique et possibilité d'interruption."

• Distinction claire États Génération / Pause• Bouton 'Copier' avec retour visuel d'état• Explication transparente des capacités/limites

BENCH-09

Refonte d'interface saturée de "Slop"

"Nettoie et repense une page de pricing surchargée d'animations CSS, de dégradés et de cartes flottantes."

• Réduction du poids DOM/CSS (> 50%)• Suppression des distractions inutiles• Clarification immédiate des offres

### Protocole de Mesure et Métriques de Réussite

- Accessibilité Automatisée : Passage de l'outil axe-core via Playwright. L'objectif requis avec le Skill est 0 violation critique ou majeure (contre une moyenne de 8 à 15 violations constatées sans skill).

- Réussite des Tâches (Task Success Rate) : Mesurée par l'absence d'ambiguïté dans le code produit (éléments réactifs pourvus de leurs gestionnaires d'événements et libellés).

- Clarté Visuelle & Densité : Évaluation du respect des espacements fondés sur le système de grille 8pt et d'un ratio de contraste des couleurs respectant strictement la norme WCAG 2.1 AA (4.5:1 minimum).

- Revue Humaine Double-Aveugle : Notation par deux experts UX/UI indépendants sur 5 critères (Lisibilité, Ergonomie, Sobriété, Accessibilité, Maintenabilité) attribuant une note globale sur 20.

## 5. Écosystème Complet des Skills Complémentaires

Pour couvrir l'ensemble de la chaîne de valeur du développement logiciel sans dépenser le moindre centime, le Skill ux-ui-design s'intègre dans un monorepo unifié de 7 Skills complémentaires partageant la même rigueur scientifique et le même format open source (agentskills.io).

```
                               +----------------------------------+
                               | 0. product-discovery-validation  |
                               | Sens & Validation scientifique  |
                               +----------------------------------+
                                                |
                                                v
                               +----------------------------------+
                               |      1. product-spec-docs        |
                               |   Spécifications & BDD/Gherkin   |
                               +----------------------------------+
                                                |
                                                v
+-----------------------------------+  +-----------------------------------+  +-----------------------------------+
|         2. ux-ui-design           |  |     3. api-data-architecture      |  |      4. clean-code-security       |
| Interface & Ergonomie (+Feedback) |  |   Bases & APIs REST/gRPC          |  | Architecture Propre & OWASP       |
+-----------------------------------+  +-----------------------------------+  +-----------------------------------+
                                                |
                                                v
+-----------------------------------+                                         +-----------------------------------+
|    5. qa-testing-observability    | <-------------------------------------- |         6. perf-green-it          |
|    Tests E2E & Observabilité      |                                         |  Performance & Éco-conception     |
+-----------------------------------+                                         +-----------------------------------+
                                                |
                                                v
                               +----------------------------------+
                               |       7. full-project-audit      |
                               |   Audit global & Remédiation    |
                               +----------------------------------+
```

### Cartographie des 5 Skills Complémentaires

#### 1. product-discovery-validation (Réflexion produit, sens des features & validation scientifique)

- Périmètre : Maillon 0 placé tout en amont du cycle, avant la rédaction des spécifications. Prévenir le syndrome de la « feature factory » en exigeant une démarche fondée sur des preuves et sur la science avant d'investir des ressources de développement.

- Standards intégrés : Jobs-to-be-Done (JTBD - Christensen/Ulwick), Continuous Discovery Habits (Teresa Torres), Modèle de Kano (1984), Épistémologie Popperienne (falsifiabilité) & Evidence-Based Product Management.

- Règles clés : Formulation de chaque intention sous forme d'hypothèse falsifiable (« Nous pensons que X pour Y produira Z ; c'est faux si W »), arbitrage strict entre fonctions de base indispensables (*Must-be*) et gadgets inutiles, confrontation aux biais connus (biais de confirmation, effet IKEA, sur-ingénierie) et évaluation du coût de maintenance long terme (loi de Tesler).

#### 2. product-spec-docs (Cahier des charges & Documentation de développement)

- Périmètre : Rédaction des spécifications fonctionnelles et techniques, documentation projet et hygiène de contribution.

- Standards intégrés : BDD (Behavior-Driven Development / Gherkin), OpenAPI, templates GitHub (PR & Issues), Keep a Changelog, Architecture Decision Records (ADR).

- Règles clés : Rédaction obligatoire d'un README.md synthétique (installation en 1 commande, architecture, scripts), tenue à jour du carnet d'ADR et du CHANGELOG.md, et mise en place de templates d'Issues/PR normés avec étiquettes structurées (bug, feat, security, ux, tech-debt, docs).

#### 4. clean-code-security (Architecture Propre, Sécurité & Git)

- Périmètre : Qualité du code source, sécurité offensive/défensive et hygiène des dépôts.

- Standards intégrés : OWASP Top 10, OWASP ASVS (Application Security Verification Standard), principes SOLID, KISS, DRY, règles strictes d'hygiène de dépôt Git, documentation structurée (ADR, Changelog) et scripts de lancement local.

- Règles clés : Zéro secret ou clé API en dur, validation systématique de toutes les entrées utilisateur, couverture de tests unitaires, commits normés (Conventional Commits) et gestion sémantique des versions (SemVer). Documentation claire via README.md (installation 1-command), journalisation des changements (CHANGELOG.md), suivi des décisions d'architecture (ADR) et modèles de PR/Issues avec tags (bug, feat, security, ux, tech-debt, docs). Interdiction absolue des fichiers morts ou temporaires (aucun fichier *_old, *_backup, *_v2, composant abandonné ou code commenté) avec nettoyage systématique. Fourniture obligatoire de scripts de démarrage local propres à la racine (start.bat / start.sh, Makefile ou commandes npm run dev/test/clean) pour exécuter le projet en une seule commande.

#### 3. ux-ui-design (Conception d'interfaces, ergonomie & accessibilité)

- Périmètre : Système de design, accessibilité WCAG 2.1 AA, composants UI, ergonomie responsive et élimination du slop IA. Intègre également en module optionnel la référence 11-contextual-feedback.md (« Bug ou idée ? »).

- Standards intégrés : Design System 8pt, norme WCAG 2.1 AA/AAA, WAI-ARIA 1.2, WAI-ARIA Authoring Practices (APG).

- Règles clés : Ratios de contraste strictement supérieurs à 4.5:1, zones d'interaction tactiles >= 44x44px, suppression des fioritures visuelles non fonctionnelles, navigation 100% clavier avec focus explicite.

- Périmètre : Conception des couches de données, contrats d'API et persistance.

- Standards intégrés : Normalisation relationnelle (3NF), spécifications OpenAPI 3.1 / GraphQL, règles RGPD (Privacy by Design).

- Règles clés : Migrations de base de données descendantes/ascendantes sans rupture de service (Zero-downtime migrations), stratégie d'indexation explicite, pagination obligatoire sur toutes les listes, format d'erreur standardisé (RFC 7807).

#### 5. qa-testing-observability (Stratégie de Tests, QA & Monitoring)

- Périmètre : Assurance qualité, suite de tests automatisés et observabilité en production.

- Standards intégrés : Pyramide des tests (Unitaires, Intégration, E2E), Playwright / Vitest, OpenTelemetry.

- Règles clés : Tests E2E basés sur les rôles ARIA et le texte visible (jamais sur des sélecteurs CSS ou XPath fragiles), journalisation structurée au format JSON, définition claire des indicateurs SLO/SLI.

#### 6. perf-green-it (Performance Web, Éco-conception & Mobile-First)

- Périmètre : Optimisation des temps de réponse, sobriété numérique et efficacité énergétique.

- Standards intégrés : Core Web Vitals (LCP, INP, CLS), référentiel RGESN (Référentiel Général d'Éco-conception de Services Numériques), principes Green IT.

- Règles clés : Budgets de taille JavaScript/CSS stricts (< 50 Go gzippé au chargement initial), stratégie d'optimisation poussée des images (AVIF/WebP) et polices de caractères, fonctionnement dégradé réseau faible ou hors-ligne (Offline-first).

#### 7. full-project-audit (Skill d'audit global, inspection multi-référentiels & remédiation)

- Périmètre : Skill d'audit complet et indépendant croisant l'ensemble des référentiels de la suite pour inspecter un projet existant (code, architecture, cahier des charges, sécurité, accessibilité, performance, hygiène du dépôt Git).

- Standards intégrés : Synthèse transversale de l'ensemble des normes de la suite (OWASP, WCAG 2.1 AA, Core Web Vitals, 3NF/OpenAPI, BDD, Keep a Changelog/ADR, 8pt Grid).

- Règles clés : Production d'un rapport structuré classant les constats par niveau de gravité (Critique / Majeur / Mineur), accompagné d'un plan de remédiation étape par étape et de preuves vérifiables, en distinguant formellement ce qui a été effectivement exécuté (analyses statiques, scripts) de ce qui relève d'hypothèses à valider manuellement.

## 6. Règles d'Optimisation des Tokens & Découpage en Sous-Tâches (Multi-Agents / Petites Sessions)

Pour garantir une précision maximale et éviter les dégradations de raisonnement dues à la saturation de la fenêtre de contexte (phénomène Lost in the Middle — Liu et al., 2023), l'exécution de tâches complexes au sein du dépôt doit impérativement respecter les règles transversales suivantes :

- Évitement des sessions monolithiques : Ne jamais traiter un projet ou une refonte majeure au sein d'une seule session IA prolongée. Le contexte accumulé dilue les instructions et augmente le risque d'hallucinations ou d'oubli des contraintes de sécurité et d'architecture.

- Découpage en micro-sessions atomiques & sous-agents spécialisés : Décomposer chaque lot de travail en tâches élémentaires indépendantes (1 tâche = 1 fichier ou 1 parcours vertical précis). Déléguer ces micro-tâches à des sous-agents spécialisés (ex. un sous-agent pour le schéma de données et tests, un sous-agent pour le composant UI, un sous-agent pour la revue de sécurité et la QA). Assurer la transmission du contexte entre agents via un fichier de passation synthétique court (handoff.md ou état d'avancement dans le cahier des charges).

- Chargement sélectif et frugal des ressources : Ne charger dans chaque micro-session que le Skill et les fiches de référence dans references/ strictement pertinents pour la tâche ciblée afin de préserver une fenêtre de contexte minimale et réactive.

- Fichier d'accueil contextuel obligatoire (AGENTS.md / CLAUDE.md) : Génération systématique d'un fichier racine concis (< 100 lignes) lors de l'initialisation de tout nouveau projet. Ce document synthétise les commandes usuelles, l'arborescence du projet et les pointeurs vers les Skills applicables afin d'orienter immédiatement les agents IA dès le début de la session.
