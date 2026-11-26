# 00 — LIRE EN PREMIER — Index, Routage & Méthode de Contrôle

Statut : Référentiel UX/UI maître (Version 2.0) · Destiné aux agents IA de développement (Claude Code, Cursor, Gemini) et aux revues humaines. En cas de divergence, le document 00B — Registre Central des Règles & Niveaux de Preuve fait foi.

## 1. Objectif du référentiel

Ce dossier centralise l'ensemble des règles d'ergonomie, de psychologie cognitive, d'accessibilité et de direction artistique appuyées sur des travaux empiriques majeurs (Nielsen Norman Group, Baymard Institute, W3C WCAG 2.2, Apple HIG, Material Design 3, et lois psychophysiques).

Il sert de contrat d'interface universel pour éviter systématiquement les défauts récurrents des interfaces générées par IA (surcrocharge cognitive, composant d'UI inadaptés, contrastes insuffisants, manque de retours d'état, animations superflues).

## 2. Carte des documents et routage par contexte

Les agents IA et développeurs doivent charger les modules pertinents du référentiel en fonction du contexte de la tâche à accomplir.

| Document | Contenu principal | Quand le charger obligatoirement |
| --- | --- | --- |
| 00B — Registre Central des Règles & Niveaux de Preuve | Taxonomie des 6 niveaux de preuve (Norme N1 à Hypothèse N6), source unique de vérité résolvant les contradictions (cibles tactiles, WCAG AA/AAA, seuils de chargement, Core Web Vitals). | Toujours (référence normative centrale). |
| 01 — Fondamentaux Cognitifs & Lois Empiriques UX | Lois de Fitts, Hick-Hyman, Miller/Cowan, Jakob, Tesler, Gestalt, seuil de Doherty (<400ms), effet esthétique-utilisabilité. | Toujours (socle universel pour chaque décision d'interface). |
| 02 — Architecture de l'Information, Divulgation Progressive & Clarté | Progressive Disclosure (3 niveaux), patterns de scan en F/Z, hiérarchie visuelle, écriture UX orientée action. | Toujours (structuration des écrans, navigation et rédaction des contenus). |
| 03 — Onboarding, Empty States, Iconographie & Feedback Utilisateur | Time-to-First-Value (<30s), aide contextuelle, états vides (empty states), grammaire d'icônes, toasts et retours de validation. | Dès qu'il y a un parcours utilisateur, des formulaires ou des actions CRUD. |
| 04 — Accessibilité (WCAG 2.2), Typographie, Couleurs & Motion Design | Contrastes (AA/AAA), échelles typographiques, psychologie des couleurs/polices, animations signifiantes (<300ms, reduced-motion). | Dès qu'on définit ou audite le Design System, le CSS ou les tokens. |
| 05 — Règles Spécifiques PC Desktop & Mobile (Gestion à une main) | Ergonomie souris/clavier vs Zone du pouce (Thumb Zone), cibles tactiles ≥44px, navigation basse ≤5 entrées, densité desktop. | Toujours selon la cible (Desktop, Mobile ou Responsive). |
| 06 — Direction Artistique Premium, Branding, Logos & Références Produits | Règles d'identité visuelle, création de logo, références produits (ChatGPT, Linear, Stripe, Apple). | Lors de la création d'une identité visuelle, de la DA ou d'une refonte graphique. |
| 07 — Anti-Patterns IA & Prompts Prêts à Injecter | Liste noire des défauts récurrents d'IA + blocs de règles prêts à copier pour CLAUDE.md ou .cursorrules. | Avant toute génération de code frontend ou audit UX global. |
| 10 — Navigation, Pages & Sous-Pages, Listes, Kanban, Statuts & Personnalisation | Architecture de navigation (Sidebar vs Topbar, réduction, pages/sous-pages), règles d'un bon Dashboard, gestion des Listes et tableaux Kanban, cycle de vie des Statuts d'objets, prévention des « écrans dans les écrans », vulgarisation grand public et personnalisation maîtrisée. | Dès qu'on structure l'architecture globale d'une app, sa navigation, ses vues listes/kanban ou qu'on conçoit pour un public non-informaticien. |
| 08 — Système de Retour Utilisateur Contextuel (« Bug ou idée ? ») | Capture visuelle d'élément DOM, diagnostic technique anonymisé, capture d'écran sélective et export local/API. | Dès qu'on développe ou maintient une application interactive testée par des utilisateurs. |
| 09 — Interfaces Admin, Data Visualisation, Performance & Limitation du Scroll | Grammaire scientifique des graphiques (courbes, barres, Sankey, donut <=4 parts), Core Web Vitals, états de chargement (spinners/skeletons) et maîtrise du scroll. | Dès qu'on conçoit un back-office, un tableau de bord analytique ou qu'on optimise la fluidité/responsivité. |
| 11 — Formulaires Intelligents, Modales Stables, Navigation Avancée & Optimisation d'Espace | 12 — Accessibilité Cognitive (W3C COGA), Interactions Humain-IA, Éthique & i18n | W3C COGA, ISO 9241-11/210, Microsoft/Google Human-AI Interaction, prévention des dark patterns, internationalisation et résilience hors ligne. |
| Dès qu'on conçoit une interface incluant de l'IA, un public large/novice ou une portée internationale. | 13 — Architecture Agent Skills Open Source (SKILL.md, Évaluation & Écosystème) | Fonctionnement du standard ouvert agentskills.io, arborescence GitHub gratuite (0 €/mois), brouillon de SKILL.md, protocole de benchmark sur 9 scénarios et feuille de route des Skills complémentaires. |
| Lors de la préparation du dépôt GitHub open source et de la création des Skills. | Modales multi-étapes à taille fixe, matrice de choix des champs (Baymard/Wroblewski, combobox filtrable, pré-remplissage), 7 architectures de navigation hybrides, optimisation d'espace (Tufte/Few), protocole de vérification QA en 4 niveaux et auto-justification scientifique. | Dès qu'on crée des formulaires, des modales/assistants, une navigation complexe ou qu'on optimise l'espace écran. |

## 3. Hiérarchie des règles en cas de conflit

En cas de divergence entre plusieurs contraintes au cours de la conception ou du codage, la priorité absolue suit cet ordre strict :

- Accessibilité & Sécurité d'action (WCAG 2.2 AA) : Préservation des contrastes, lisibilité minimale, navigabilité au clavier et prévention rigoureuse des suppressions ou actions destructives accidentelles.

- Clarté de la tâche principale : Un écran = une intention dominante. Élimination du bruit visuel au profit d'une hiérarchie claire et d'une prise de décision rapide.

- Ergonomie du support : Respect de la zone du pouce (Thumb Zone) et des cibles tactiles sur mobile ; optimisation de la densité d'information et des raccourcis clavier sur desktop.

- Direction artistique & Esthétique : L'élégance visuelle doit toujours rester au service de l'utilisabilité et de la vitesse, sans jamais dégrader le contraste ou la lisibilité.

## 4. Protocole d'audit rapide

Checklist opérationnelle en 6 points pour vérifier instantanément si une interface respecte la bible UX/UI :

- 1. Test des 5 secondes (Clarté & Intention)
Un utilisateur nouveau comprend-il l'objectif principal de la page et la prochaine action à exécuter en moins de 5 secondes ?

- 2. Test de la zone du pouce / Cibles tactiles (Ergonomie mobile)
Les actions principales sur mobile sont-elles accessibles dans la zone naturelle du pouce avec des cibles interactives d'au moins 44×44 px ?

- 3. Test de densité & divulgation progressive (Cognition)
L'écran masque-t-il les informations secondaires via un système à 3 niveaux pour éviter de surcharger l'utilisateur ?

- 4. Test de contraste & navigation clavier (Accessibilité WCAG 2.2)
Tous les textes respectent-ils un ratio de contraste d'au moins 4.5:1 et l'intégralité du parcours est-elle navigable au clavier avec un indicateur de focus visible ?

- 5. Test de feedback d'action (Seuil de Doherty)
Chaque interaction fournit-elle un retour immédiat (<100ms) ou un état de chargement adapté si l'action dépasse 400ms ?

- 6. Test des Anti-Patterns IA, Performance & Fluidité (Vérification de propreté)
L'interface est-elle exempte de boutons destructifs non sécurisés, de textes génériques (Lorem Ipsum, "Cliquez ici"), de Modals superflues, de slop IA, de scroll inutile, et intègre-t-elle des états de chargement adaptés (spinners/skeletons) ?

## 5. Règle d'Auto-Justification Mesurée

Justifier brièvement les décisions structurantes en citant l'ID du registre ([ACC-01], [COG-01]) et son niveau de preuve ([N1] à [N6]), sans jamais inventer de chiffre, d'étude ou de DOI. Distinguer systématiquement les vérifications réellement exécutées des risques supposés.
