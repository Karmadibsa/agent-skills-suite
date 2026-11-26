# Agent Skills Suite — Référentiel Scientifique & Opérationnel pour IA

Une suite open source d'Agent Skills conformes au standard ouvert agentskills.io, conçue pour guider les assistants IA de développement (Claude Code, Cursor, OpenAI Codex, ChatGPT, Gemini CLI) à chaque étape d'un projet logiciel — de l'idée initiale jusqu'à la mise en production.

0 € de coût de fonctionnement · 100 % open source (MIT + CC BY 4.0) · Basé sur des normes officielles et études empiriques vérifiées

## 1. Pourquoi ce projet existe ?

Les assistants IA actuels sont capables de générer du code très rapidement, mais souffrent de 4 défauts récurrents lorsqu'ils ne sont pas encadrés :

- L'effet « Oui-Oui » (complaisance) : ils valident toutes les idées de fonctionnalités sans vérifier leur utilité réelle ni leur impact sur la charge cognitive.

- Le codage dans le désordre : ils génèrent des écrans avant d'avoir verrouillé les règles métier, le modèle de données ou la roadmap.

- Le « Slop IA » visuel et ergonomique : interfaces génériques surchargées de fausses cartes KPI, contrastes insuffisants, navigation confuse sur mobile ou pavés de texte.

- La dette technique et les failles silencieuses : fichiers obsolètes laissés dans le dépôt, absence de scripts de lancement simple, validation des entrées manquante ou manque de tests.

Agent Skills Suite résout ces problèmes en fournissant aux IA un cadre méthodologique structuré par étapes, appuyé sur des normes internationales (W3C WCAG 2.2, ISO 9241, RGPD, OWASP Top 10) et des recherches scientifiques reconnues, sans jamais imposer un style graphique uniforme.

## 2. Comment ça fonctionne concrètement ? (Divulgation Progressive)

Ce dépôt suit le standard ouvert Agent Skills (agentskills.io), conçu pour ne pas saturer la fenêtre de contexte de votre assistant IA :

- Découverte légère (~100 tokens) : Au démarrage d'une session, l'IA lit uniquement les quelques lignes d'en-tête YAML (name et description) de chaque Skill installé.

- Activation à la demande : Dès que votre demande correspond à une étape du projet (ex. cadrer une idée, concevoir un écran, sécuriser une API), l'IA charge le fichier SKILL.md correspondant.

- Chargement chirurgical des références (references/) : Depuis la table de routage du SKILL.md, l'IA ouvre uniquement les fiches détaillées utiles pour la tâche en cours (et laisse le reste de côté).

- Exécution, vérification et transparence : L'IA applique le workflow étape par étape, exécute les contrôles disponibles et précise honnêtement ce qui a été vérifié ou non.

[0. Discovery & Roadmap] ──▶ [1. Cahier des charges] ──▶ [2. UX/UI Design (+ Feedback)]

                                                                 │

[5. Recette, Perf & Logs] ◀── [4. Clean Code & Sécu] ◀── [3. Données & API]



## 3. Les 7 Skills de la suite (Détail complet)

Le dépôt est organisé en monorepo : chaque dossier sous skills/ est un Skill autonome que vous pouvez utiliser seul ou combiné avec les autres.

Ordre

Skill (Dossier)

Rôle & Ce qu'il fait faire à l'IA

Fondements & Normes

0

project-discovery-validation

Réflexion produit, validation scientifique & Roadmap.
• Analyse l'existant (GitHub, Reddit, forums, concurrents).
• Évalue chaque feature (Jobs-to-be-Done, modèle de Kano, charge cognitive, faisabilité).
• Applique un contre-argument obligatoire et propose une alternative 3× plus simple.
• Découpe le projet en jalons (Jalon 0 → Noyau → Prototype HTML avec module « Bug ou idée ? » → MVP → V1).

Evidence-Based Management, JTBD, Modèle de Kano, Deci & Ryan, Popper, The Mom Test, Local-First.

1

product-spec-docs

Cahier des charges, Governance & Documentation de développement.
• Transforme le périmètre validé en spécification exécutable et hiérarchisée (00 — LIRE EN PREMIER).
• Sépare strictement les règles verrouillées des hypothèses à tester.
• Définit les Personas, User Stories, Architecture Decision Records (ADR), le modèle de données conceptuel et les critères d'acceptation testables.

ISO/IEC/IEEE 29148, Behavior-Driven Development (BDD / Gherkin), Architecture Decision Records (ADR), Agile Personas & User Stories.

2

ux-ui-design

Ergonomie cognitive, Accessibilité, Anti-Slop IA & Feedback.
• Conçoit des interfaces claires adaptées au support (gestion à une main sur mobile, densité clavier sur PC) et aux utilisateurs non-techniciens.
• Applique WCAG 2.2 AA, l'optimisation d'espace, la data visualisation scientifique et élimine le slop IA.
• Embarque par défaut le module contextuel « Bug ou idée ? » (sélection DOM, export .zip local, blocage automatique des captures sur données sensibles).

W3C WCAG 2.2, WAI-ARIA APG, W3C COGA, ISO 9241-11/210, Fitts, Hick, Cowan, NN/g, Baymard, Cleveland & McGill.

3

api-data-architecture

Modélisation des données, Migrations & Contrats d'API.
• Conçoit des schémas propres et évolutifs (migrations sans perte de données).
• Standardise les endpoints, la pagination et les réponses d'erreur.
• Applique la minimisation des données et la portabilité (exports ouverts) dès le schéma.

Normalisation relationnelle, OpenAPI 3.1, RFC 9457 (Problem Details), RGPD (Privacy by Design).

4

clean-code-security

Architecture propre, Sécurité applicative, Governance & Git.
• Sépare la logique métier de l'interface (SOLID, KISS, DRY).
• Protège contre les failles courantes (validation stricte des entrées, XSS, CSRF, zéro secret en dur).
• Maintient un dépôt propre (zéro fichier mort *_old / *_backup), impose des scripts de démarrage local à la racine (start.bat / start.sh), génère les templates d'Issues/PR (avec labels/tags), le CHANGELOG.md, le README.md projet et normalise les commits.

OWASP Top 10 / ASVS, CWE, ISO/IEC 25010, Conventional Commits, Semantic Versioning, GitHub Community Standards.

5

qa-perf-observability

Tests automatisés, Performance Web & Sobriété numérique.
• Écrit des tests E2E résilients ciblant les rôles accessibles ARIA plutôt que des sélecteurs CSS fragiles.
• Contrôle les Core Web Vitals (LCP, INP, CLS), les budgets JS/CSS et la résilience hors ligne.
• Met en place une journalisation structurée et des plans de recette complets.

Google Core Web Vitals (p75), Playwright / Testing Library, RGESN (Éco-conception), OpenTelemetry.

Transverse

full-project-audit

Audit complet à 360° du dépôt existant.
• Croise l'ensemble des Skills de la suite pour réaliser un diagnostic global.
• Vérifie la cohérence du cahier des charges, de l'UX/UI, de l'architecture API/données, du clean code, de la sécurité OWASP, des performances et de la propreté Git.
• Fournit un rapport d'audit détaillé avec plan d'action priorisé.

ISO/IEC 25010, OWASP ASVS, WCAG 2.2, Core Web Vitals, Evidence-Based Management.

## 4. Arborescence du dépôt

agent-skills-suite/

├── .github/

│   └── workflows/

│       ├── validate.yml                  # Vérification automatique (YAML, liens, structure)

│       └── release.yml                   # Génération automatique des archives .zip à chaque push

├── skills/

│   ├── project-discovery-validation/     # Skill 0 : Discovery, validation scientifique & Roadmap

│   │   ├── SKILL.md

│   │   └── references/

│   ├── product-spec-docs/                # Skill 1 : Cahier des charges, Personas, User Stories & ADR

│   │   ├── SKILL.md

│   │   └── references/

│   ├── ux-ui-design/                     # Skill 2 : UX/UI, WCAG 2.2, Anti-Slop & « Bug ou idée ? »

│   │   ├── SKILL.md

│   │   ├── references/

│   │   ├── scripts/

│   │   └── examples/

│   ├── api-data-architecture/            # Skill 3 : Données, migrations & API

│   │   ├── SKILL.md

│   │   └── references/

│   ├── clean-code-security/              # Skill 4 : Clean code, OWASP, Templates GitHub, CHANGELOG & Git

│   │   ├── SKILL.md

│   │   └── references/

│   ├── qa-perf-observability/            # Skill 5 : Tests E2E, Core Web Vitals & Green IT

│   │   ├── SKILL.md

│   │   └── references/

│   └── full-project-audit/               # Skill transverse : Audit complet 360° du projet

│       ├── SKILL.md

│       └── references/

├── evals/                                # Scénarios de benchmark comparatifs (Avec vs Sans Skill)

├── LICENSE                               # Licence MIT (code, scripts, templates)

├── LICENSE-DOCS                          # Licence CC BY 4.0 (documentation et référentiels)

└── README.md                             # Ce fichier

## 5. Installation et mise à jour en une commande

### Option A — Via le gestionnaire CLI skills (Claude Code, Cursor, Codex, Gemini CLI…)

- Installer toute la suite :

npx skills add <votre-pseudo>/agent-skills-suite

- Installer un seul Skill spécifique (ex. UX/UI ou Discovery) :

npx skills add <votre-pseudo>/agent-skills-suite --skill ux-ui-design

npx skills add <votre-pseudo>/agent-skills-suite --skill project-discovery-validation

- Mettre à jour après une amélioration sur GitHub (sans rien reconfigurer) :

npx skills update

### Option B — Via Git (clonage direct dans un projet)

Copiez ou clonez le dossier skills/ dans le répertoire de configuration de votre outil :

- Claude Code : .claude/skills/ (ou ~/.claude/skills/ pour tous vos projets)

- Cursor : .cursor/skills/

- Standard universel : .agents/skills/

Pour récupérer les dernières mises à jour publiées sur GitHub :

git pull origin main

### Option C — Claude Web, ChatGPT Web & Custom GPTs (Import ZIP)

- Ouvrez l'onglet Releases de ce dépôt GitHub.

- Téléchargez le fichier .zip du Skill souhaité (généré automatiquement à chaque git push).

- Importez-le dans les connaissances de votre projet Claude, dans les Skills ChatGPT ou dans un GPT personnalisé.

## 6. Rigueur scientifique : la taxonomie à 6 niveaux de preuve

Pour éviter qu'une préférence graphique ou une habitude technique ne soit présentée comme une vérité scientifique absolue, chaque règle de la suite est étiquetée selon son niveau réel de justification :

- [N1] Norme officielle / Obligation légale : exigence vérifiable (WCAG 2.2 AA, RGPD Art. 5).

- [N2] Résultat scientifique publié : relation établie par la recherche empirique (Fitts, Hick-Hyman, Cowan, Deci & Ryan, Cleveland & McGill).

- [N3] Recommandation empirique terrain : principe appuyé sur des études d'utilisabilité à grande échelle (Nielsen Norman Group, Baymard Institute, WAI-ARIA APG, ISO 9241).

- [N4] Convention technique / Ingénierie : standard d'architecture ou de performance (Core Web Vitals au 75e percentile, grille 4/8 px, OWASP).

- [N5] Préférence esthétique / Profil configurable : choix de direction artistique adaptable selon l'identité du projet.

- [N6] Hypothèse à tester : piste ergonomique ou produit à valider auprès de vrais utilisateurs avant généralisation.

## 7. Exemples de prompts pour démarrer un projet

- Démarrer un nouveau projet (Skill 0) :
« Utilise le skill project-discovery-validation. Voici mon idée de projet : [description]. Analyse l'existant, challenge mes fonctionnalités sans complaisance et propose une roadmap par jalons jusqu'au MVP. »

- Rédiger le cahier des charges (Skill 1) :
« Utilise le skill product-spec-docs pour rédiger les spécifications verrouillées, le modèle de données et les critères d'acceptation du MVP validé. »

- Concevoir ou auditer une interface (Skill 2) :
« Utilise le skill ux-ui-design pour concevoir l'écran principal en mode mobile à une main et desktop, sans slop IA, et intègre le module "Bug ou idée ?". »

## 8. Contribution et licences

Les contributions, signalements d'erreurs scientifiques et améliorations via Pull Requests sont les bienvenus.

- Code, scripts, exemples et configurations : distribués sous licence MIT.

- Documentation, référentiels et contenus des Skills : distribués sous licence Creative Commons Attribution 4.0 International (CC BY 4.0).
