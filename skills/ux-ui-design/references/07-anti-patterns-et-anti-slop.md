# 07 — Anti-Patterns IA & Prompts Prêts à Injecter (CLAUDE.md / Cursor)

Référentiel d'ingénierie UI/UX conçu pour éradiquer les défauts récurrents des interfaces générées par intelligence artificielle et fournir des directives strictes d'intégration continue.

## 1. Catalogue des 10 Anti-Patterns IA à Bannir Systématiquement

| N° | Anti-Pattern fréquent des IA | Pourquoi c'est nocif (base scientifique) | Correction obligatoire |
| --- | --- | --- | --- |
| 1 | Dashboard rempli de fausses cartes KPI décoratives en haut de page | Viol de la loi de Hick et du test des 5 secondes ; surcharge cognitive et retarde l'accès à l'action principale. | Afficher d'abord l'action principale et l'état utile (reprendre, créer, rechercher). Placer les métriques secondaires sous le flux métier principal. |
| 2 | Grilles de grandes cartes (Bento Grids) pour afficher des listes de données | Faible densité d'information, scroll excessif sur PC et mobile, rupture du balayage visuel vertical. | Utiliser des listes compactes ou des tableaux structurés avec actions rapides au survol/focus. |
| 3 | Carrousel d'onboarding bloquant de 4 à 6 écrans au premier lancement | Effondrement du Time-to-First-Value (NN/g) ; taux d'abandon immédiat élevé par friction inutile. | Accès direct à l'interface opérationnelle + aide contextuelle progressive Just-In-Time (in-situ). |
| 4 | Modales de confirmation « Êtes-vous sûr ? » sur chaque action | Fatigue décisionnelle et phénomène d'habituation (validation réflexe sans lecture du message). | Exécution immédiate avec fenêtre d'annulation + Toast de confirmation contenant un bouton « Annuler » (durée 5s). Modales réservées aux actions destructives irréversibles. |
| 5 | Débauche de dégradés néon, ombres portées lourdes et bordures arc-en-ciel | Bruit visuel massif, baisse du contraste WCAG, esthétique « template IA générique » datée. | Surfaces neutres sobres, bordures fines 1px (#E2E8F0), ombres douces et une seule couleur d'accent fonctionnelle maîtrisée. |
| 6 | Textes longs et blocs de paragraphes non hiérarchisés dans l'UI | Violation des lois d'eye-tracking en F et du modèle de mémoire de Miller (4±1 blocs d'information). | Microcopy courte (1 ligne maximum par consigne), titres scannables, détails techniques intégrés dans des éléments repliables (<details>). |
| 7 | Boutons d'action principaux placés tout en haut de l'écran sur mobile | Hors de portée de la Zone du Pouce (Steven Hoober) ; force des étirements ou l'usage de deux mains. | Placer l'ensemble des actions primaires et la navigation principale dans le tiers inférieur de l'écran mobile. |
| 8 | Icônes décoratives sans libellé ou métaphores ambiguës | Ralentissement cognitif majeur (étude NN/g Icon Usability) lié à l'absence d'affordance claire. | Icônes universelles seules tolérées uniquement si accompagnées d'un aria-label clair (poubelle, crayon, loupe) ; libellé textuel obligatoire pour tout le reste. |
| 9 | Animations lentes (>400ms), rebonds exagérés ou absence totale de transition | Sensation d'inertie de l'UI (Seuil de Doherty < 400ms) ou rupture spatiale soudaine perturbant l'attention. | Transitions fluides 150–250ms en ease-out sur les états modifiés + support strict du media query prefers-reduced-motion. |
| 10 | Chiffres non alignés et polices proportionnelles dans les colonnes numériques | Difficulté de comparaison visuelle rapide due au décalage de largeur des caractères. | Appliquer impérativement font-variant-numeric: tabular-nums et aligner le texte à droite sur les colonnes de chiffres. |

## 1B. Règles Avancées Anti-Slop IA (Éradiquer le rendu « généré par LLM »)

Le « slop » désigne la tendance statistique des modèles de langage à reproduire les motifs visuels, structurels et rédactionnels les plus fréquents de leur corpus d'entraînement (souvent issus de templates Dribbble bas de gamme, de landing pages SaaS génériques ou de composants mal conçus). Pour éliminer cette impression d'interface « générée par IA », 12 règles strictes doivent être appliquées.

### 1. Anti-Slop Visuel

- Palette par défaut bannie : Interdiction d'utiliser les combinaisons violet/indigo/cyan fluo par défaut. Privilégier des neutres sobres et une seule couleur d'accent fonctionnelle.

- Dégradés sur les titres bannis : Supprimer les effets de texte dégradé (ex: bg-clip-text text-transparent). Le texte doit rester parfaitement lisible avec un contraste fort.

- Ombres colorées diffuses et glassmorphisme : Bannir les ombres portées hyper-saturées (ex: shadow-purple-500/30) et le glassmorphisme abusif sur chaque carte. Utiliser des bordures 1px et un fond neutre.

### 2. Anti-Slop Structurel

- Encapsulation systématique dans des cartes : Ne pas isoler chaque donnée dans une <Card> distincte. Préférer une séparation épurée via les espaces (gap) ou de simples lignes de séparation 1px.

- Sections « Hero » marketing déplacées : Bannir les bannières de bienvenue géantes dans les applications métier authentifiées. L'utilisateur doit accéder immédiatement à ses données et outils de travail.

- Maitrise du scroll vertical : Limiter le défilement excessif. L'information essentielle et les actions principales doivent tenir au-dessus de la ligne de flottaison (above-the-fold).

- En-têtes de page géants bannis (Header Bloat) : Proscrire les gros blocs de header avec grand H1, sous-titre explicatif et marges exagérées consommant le quart supérieur de l'écran. Utiliser une barre de titre compacte (44–52px) incluant titre (18–20px), fil d'Ariane et actions primaires alignées à droite.

- Syndrome « Colonne étroite centrée » banni sur Desktop : Ne pas appliquer de contraintes de largeur arbitraires (ex: max-w-3xl ou max-w-4xl) sur des tableaux, dashboards ou outils métier PC. Réserver la contrainte max-width: 65ch aux seuls articles de lecture longue ; utiliser 100 % de la largeur disponible (w-full) pour l'espace de travail.

### 3. Anti-Slop Textuel (UX Writing)

- Zéro emoji dans l'interface métier : Proscrire l'usage d'emojis décoratifs dans les titres, boutons ou messages. Préférer des icônes SVG précises si nécessaire.

- Formules marketing creuses bannies : Éliminer les tournures telles que « Bienvenue sur votre espace intelligent », « Découvrez nos fonctionnalités puissantes », « Gérez facilement vos... ». Aller droit au but.

- Explicitation concise sans redondance : Ne pas ajouter de sous-titre expliquant de manière évidente le bouton qu'il surmonte. Limiter la microcopy à 1 ligne utile.

### 4. Anti-Slop de Code & Architecture

- Valeurs magiques CSS interdites : Toutes les couleurs, espacements et ombres doivent référencer des tokens du Design System (pas de valeurs arbitraires codées en dur).

- Éléments cliquables accessibles : Utiliser impérativement des éléments semantic HTML (ex: <button> ou <a>) au lieu de <div onClick> non accessibles au clavier.

- Gestion exhaustive des états asynchrones : Chaque vue effectuant un chargement doit intégrer un état de chargement (skeleton screen/spinner avec role="status"), un état vide explicite (empty state) et un traitement d'erreur clair.

### 5. Critères de Validation Anti-Slop (QA)

- Test 1 - Densité : L'écran principal affiche-t-il les données clés sans exiger un scroll immédiat ?

- Test 2 - Neutralité : L'interface évite-t-elle les dégradés décoratifs et le violet/indigo générique ?

- Test 3 - Sobriété textuelle : Est-elle exempte d'emojis UI et d'accroches marketing superflues ?

- Test 4 - Robustesse async : Les 3 états (chargement, vide, erreur) sont-ils prévus et testés ?

- Test 5 - Accessibilité : Tous les boutons sont-ils cliquables au clavier avec des éléments natifs ?

- Test 6 - Support utilisateur : Le module de retour « Bug ou idée ? » (Doc 08) est-il accessible et opérationnel ?

## 2. Bloc Prêt à Injecter — Règles Globales (à coller dans CLAUDE.md ou .cursorrules)

```
# Directives de Développement Front-End & System Design UI/UX
## Core Philosophy
- Prioritize high information density, low cognitive load, and instant interaction speed.
- Apply strict Progressive Disclosure: show essential controls first, secondary options on demand.
- Target WCAG 2.2 AA compliance natively.
- Eliminate LLM "Slop": Zero UI emojis, zero fluffy marketing text, zero decorative gradients (e.g. `bg-clip-text`), and no default purple/indigo/cyan palettes.
## UX Architecture & Layout
- Anti-Bento Grid Policy: Do NOT use card grids for tabular, sequential, or dense data. Use structured data tables or compact vertical lists.
- Dashboard Rules: Never generate top-level decorative KPI cards unless explicitly requested. Render the primary action workspace and recent active objects immediately.
- Mobile Layout (Thumb Zone): Place primary actions, floating triggers, and main navigation inside the bottom 33% of the viewport on mobile viewports.
- Onboarding: Zero blocking carousels. Deliver direct UI access with inline Just-In-Time contextual hints.
- Scroll & Density Management: Keep primary workflows strictly above-the-fold. Limit vertical scrolling height and avoid wrapping every single piece of data in card containers.
- Header Density: Eliminate header bloat (large H1 + multi-line subtitle consuming top 25% of viewport). Use compact action headers (44-52px height max) combining title (18-20px), breadcrumbs, and right-aligned actions.
- Desktop Width Utilization: Anti-narrow centered layout policy. Do NOT restrict data tools, tables, dashboards, or workspaces to centered narrow containers (`max-w-3xl` / `max-w-4xl`). Restrict `max-width: 65ch` exclusively to long-form reading text; utilize 100% available width (`w-full`) for desktop work surfaces.
## Interaction & State Management
- Destructive Actions: Use confirmation modals ONLY for irreversible data loss.
- Non-Destructive Actions: Execute immediately and trigger an optimistic UI update. Show a Toast notification with a clear "Undo" action (visible for 5000ms).
- Microcopy: Maximum 1 sentence per UI instruction or contextual label. Keep text scannable and free of generic filler ("Welcome to your smart workspace").
- Async & Loading States: Every async view must natively implement Skeleton Screens or Spinner components (`role="status"`), clean Empty States, and explicit Error Boundaries.
- User Feedback Integration: Always embed or link the standard feedback module ("Bug ou idée ?", see Doc 08) in the app chrome/footer.
## Design System & Styling Rules
- Color Palette: Neutral Slate/Zinc surfaces (`#FFFFFF`, `#F8FAFC`, `#E2E8F0`, `#0F172A`). Limit chromatic accent colors to exactly ONE functional brand tone. No multi-color neon gradients.
- Typography: Use system font stacks or clean sans-serif (Inter).
  - Apply `font-variant-numeric: tabular-nums` on all numeric data columns, financial values, and counters.
  - Right-align numeric columns in data tables.
- Borders & Elevation: Use subtle 1px solid borders (`#E2E8F0` or `rgba(0,0,0,0.08)`). Avoid heavy, blurred box-shadows.
- Icons: Never render standalone ambiguous icons. Icons must either feature an explicit text label or contain a strict, descriptive `aria-label` if using universally recognized symbols (Search, Edit, Delete, Close).
## Admin & Data Visualization
- Chart Selection: Use bar charts or line charts for time-series data. Never use complex or overcrowded pie charts (max 3-4 segments if pie chart is unavoidable).
- Precision: Ensure clean axes, unambiguous tooltips, tabular numeric formatting, and accessible contrast ratios across data visualizations.
## Performance & Motion
- Response Threshold: UI state feedback must occur within 100ms (Doherty Threshold).
- Motion Specifications: CSS transitions must be between 150ms and 250ms using `cubic-bezier(0, 0, 0.2, 1)`.
- Accessibility Motion: Always respect user preferences:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
```

## Code Quality Requirements

- Semantic HTML5 elements (<main>, <nav>, <article>, <section>, <header>, <footer>).

- Fully accessible keyboard navigation (tabindex, visible custom :focus-visible rings).

## 3. Prompt d'Audit UX/UI (à utiliser pour vérifier une app existante)

```markdown

Agis en tant qu'Expert Principal en Design System, Accessibility (WCAG 2.2 AA) et Ergonomie Cognitive Web/Mobile. 

Réalise un audit UX/UI méthodique du projet ci-joint (code source, composants ou captures d'écran) en appliquant strictly le réferentiel d'anti-patterns et de règles anti-slop ci-dessous.

---

### Référentiel de Contrôle (Anti-Patterns & Anti-Slop IA) :

1. Cartes KPI décoratives superflues en haut de page / Dashboard masquant l'action principale.

2. Grilles de cartes (Bento Grids) utilisées pour afficher des listes ou données tabulaires.

3. Carrousels d'onboarding bloquants ou modales d'introduction multi-étapes.

4. Modales de confirmation systématiques (« Êtes-vous sûr ? ») au lieu d'une exécution immédiate avec option « Annuler » (Toast Undo).

5. Surcharge visuelle & Slop : dégradés néon/titres, ombres lourdes, palettes violettes/indigo fluo par défaut, non-respect du contraste WCAG AA.

6. Friction de lecture & UX Writing : pavés de texte non hiérarchisés, emojis UI, phrases marketing creuses, microcopy trop longue (> 1 ligne par consigne).

7. Non-respect de la Thumb Zone sur mobile (boutons d'action principaux situés en haut d'écran).

8. Icônes ambiguës ou dépourvues de texte/libellé `aria-label` accessible.

9. Animations trop lentes (> 400ms), saccadées ou absence d'adaptation `prefers-reduced-motion`.

10. Chiffres alignés à gauche ou polices numériques non tabulaires (`tabular-nums` absent).

11. Absences dans le code : divs cliquables non accessibles (`onClick`), états asynchrones manquants (loading `role="status"`, empty, error).

12. Intégration du module de feedback utilisateur « Bug ou idée ? » (Doc 08) et lisibilité/data-vis (graphiques pertinents, zéro camembert surchargé).

13. Présence d'un en-tête de page géant inutile (Header Bloat) masquant les données utiles au lieu d'un header compact (44-52px).

14. Syndrome de la colonne étroite centrée sur Desktop (`max-w-3xl`/`max-w-4xl` au lieu de `w-full` pour les outils et tableaux métier).

---

### Format de Restitution Requis :

1. Résumé Exécutif :

   - Indice de conformité global (Score sur 100).

   - Niveau de friction cognitive global (Faible / Modéré / Élevé).

2. Tableau Synthétique des Écarts :

   Fournir un tableau récapitulatif structuré comme suit :

   | ID | Élement / Composant concerné | Gravité (Critique / Majeur / Mineur) | Anti-Pattern Violé (N°) | Impact Utilisateur |

3. Plan d'Action & Correctifs Détaillés :

   Pour chaque écart identifié dans le tableau :

   - Écart N° : [Nom de l'élément]

   - Description du problème : [Explication précise]

   - Correctif Code / Design exact : [Fournir le code HTML/CSS/React ou les instructions de redesign exactes]

Commence immédiatement l'analyse dès réception des fichiers du projet.
