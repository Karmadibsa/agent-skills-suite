# Document 09 — Interfaces Admin, Data Visualisation, Performance & Limitation du Scroll

Ce document de référence définit les standards d'ingénierie d'interface, d'ergonomie décisionnelle et de performance technique pour les tableaux de bord et espaces d'administration métier.

## 1. Grammaire Scientifique de la Data Visualisation & Interfaces Admin

### Source scientifique / Norme

- Cleveland & McGill (1984) — Graphical Perception: Theory, Tasks, and Environmental Findings: Établissement de la hiérarchie de perception visuelle. L'œil humain décode avec une précision maximale la position sur un axe commun et la longueur, tandis qu'il compare moins précisément les angles, les aires et les volumes.

- Edward Tufte (1983) — The Visual Display of Quantitative Information: Principe de maximisation du Data-Ink Ratio (quantité d'encre consacrée à la donnée vs. encre totale) et élimination du « chartjunk ».

- Stephen Few (2006) — Information Dashboard Design: Principes de densité d'information, organisation visuelle par priorité décisionnelle et conception axée sur le rôle cognitif de l'utilisateur métier.

### 1.1 Règle sur les Camemberts (Pie / Donut Charts)

#### Règle opérationnelle (DO)

- Réserver l'usage des Pie/Donut Charts exclusivement aux relations de part d'un tout (100 %) comportant idéalement 3 à 4 catégories maximum [N3] (repère de lisibilité adaptable au contexte), présentant des écarts de proportions significatifs.

- Placer la catégorie la plus importante à 12 heures, puis ordonner les segments restants dans le sens des aiguilles d'une montre ou par valeur décroissante.

- Insérer directement les étiquettes de données et les pourcentages à proximité ou à l'intérieur des segments pour éviter les allers-retours visuels avec une légende déportée.

- Pour l'affichage de sous-ensembles hiérarchiques ou de détails multi-niveaux, utiliser un Treemap ou un Diagramme Sunburst / Barres empilées avec drill-down.

#### Interdit (DON'T)

- Recommandation de limiter les Pie/Donut Charts à 4 catégories max [N3] afin de préserver la lisibilité visuelle.

- Éviter de juxtaposer deux Pie Charts pour comparer des séries temporelles ou périmètres, la comparaison d'angles entre deux cercles distincts étant moins précise.

- Ne jamais utiliser d'effets 3D, d'extrusion, d'effets d'ombre portées complexes ou de segments détachés (« exploded pie »).

- Ne jamais utiliser de Pie Chart lorsque la somme des catégories n'est pas égale à exactement 100 %.

#### Critères de Validation QA

- La somme des valeurs affichées dans le graphique fait exactement 100 %.

- Le nombre de segments respecte les repères de lisibilité [N3] (idéalement $\le 4$).

- Aucun composant 3D n'est présent dans le DOM du graphique.

- Le tri des catégories suit un ordre logique strict (valeur décroissante).

### 1.2 Choix du Graphique selon l'Intention Analytique

| Intention Analytique | Type de Graphique Recommandé | Règles d'Implantation Impératives |
| --- | --- | --- |
| Évolution temporelle / Tendance | Graphique en courbes (Line Chart) | Repères discrets sur les points de donnée, axe X continu, infobulle contextuelle (tooltip) au survol affichant la date et la valeur exacte. |
| Comparaison / Classement | Graphique en barres horizontales ou verticales (Bar Chart) | L'axe Y (ou X) doit impérativement démarrer à zéro (0). Tri systématique par valeur (sauf pour les séries ordinales). |
| Flux / Transfert / Tunnel | Diagramme de Sankey / Entonnoir (Funnel) | Libellés explicites de volume direct sur les flux. Conservation de la proportion des largeurs de liens. |
| Distribution / Corrélation | Nuage de points (Scatter Plot) / Heatmap | Utilisation d'échelles de couleurs perceptuellement uniformes (ex. Viridis, Plasma) et gestion du chevauchement (alpha opacity). |
| Distribution continue | Histogramme (Histogram) | Distribution statistique d'une variable continue par tranches (ex. temps de réponse, montants). Barres contiguës sans espace inter-barres. |
| Composition multi-catégories | Barres empilées (Stacked Bar Chart — absolu ou 100 %) | Comparaison de la composition interne de plusieurs catégories/périodes. Maximum 4 à 5 segments par barre. |
| Hiérarchie complexe / Volumes | Treemap (Carte proportionnelle) | Hiérarchie à 2 niveaux ou plus avec de nombreuses catégories. Remplace avantageusement les camemberts imbriqués. |
| Profil multi-critères | Graphique Radar / Araignée (Radar Chart) | 5 à 7 axes maximum (ex. compétences, scores d'audit). Interdit pour plus de 2 entités superposées. |
| Tendance contextuelle inline | Sparklines (Edward Tufte) | Micro-courbes sans axes intégrées directement dans un tableau ou une carte KPI pour visualisater la tendance en 1 seconde. |
| Decomposition financière / Flux | Graphique en Cascade (Waterfall Chart) | Explication du passage d'une valeur initiale à une valeur finale via des ajouts et retraits successifs. |
| Objectif & Performance | Bullet Graph (Stephen Few) | Remplace les jauges compteur géantes par une barre horizontale compacte montrant la valeur actuelle, la cible et les seuils qualitatifs. |

#### Règle opérationnelle (DO)

- Adapter le composant visuel au besoin cognitif : courbe pour déceler un signal temporel, barres horizontales pour lire des libellés longs sans rotation de la tête.

- Garantir l'accessibilité chromatique des séries de données (contraste minimal de 3:1 entre les séries adjacentes et compatibilité daltonisme).

#### Interdit (DON'T)

- Ne jamais tronquer l'axe de base d'un graphique en barres (ex. faire démarrer l'axe Y à 90 au lieu de 0), ce qui exagère artificiellement les variations visuelles.

- Éviter de dépasser 4 à 5 lignes distinctes sur un même graphique en courbes (utiliser de petits graphiques multiples / small multiples en cas de saturation) [N3].

#### Critères de Validation QA

- La valeur 0 est présente et vérifiée sur l'axe d'origine de tout graphique en barres.

- Les infobulles (tooltips) apparaissent au survol sans délai perçu (< 50 ms) et affichent des valeurs formatées (ex. 1 250 € et non 1250.0000).

- En mode sombre ou accessible, les couleurs des séries conservent un contraste conforme aux WCAG AA.

### 1.3 Ratio Données / Encre (Data-Ink Ratio)

#### Règle opérationnelle (DO)

- Réduire au strict minimum les éléments visuels non porteurs d'information analytique.

- Utiliser des grilles de fond ultra-subtiles (#F1F5F9 ou #262626) avec des lignes pointillées légères (1px), ou supprimer les lignes verticales si l'axe X est explicite.

- Étiqueter directement les courbes en bout de ligne lorsque la place le permet pour éliminer la légende contextuelle distant.

#### Interdit (DON'T)

- Supprimer les fondés de graphiques ombrés, les dégradés d'arrière-plan opaques non fonctionnels et les bordures de conteneurs superflues.

- Ne jamais afficher de grilles 3D, d'axes dupliqués ou d'icônes décoratives à l'intérieur de la zone de traçage.

#### Critères de Validation QA

- Aucun élément décoratif CSS sans classe sémantique de donnée n'est injecté dans le SVG/Canvas.

- Le rapport entre la surface d'encre utile (données) et la surface totale du canvas du graphique est maximisé.

### 1.4 Architecture d'un Écran Admin / Back-Office

#### Règle opérationnelle (DO)

Organiser la page selon une structure hiérarchique verticale standardisée en 3 étages :

- Étage supérieur (Filtres & KPI Synthétiques) : Bandeau de filtres globaux compacts (période, périmètre organisationnel, statut) suivi de 3 à 4 cartes de KPI majeures. Chaque KPI doit intégrer le chiffre en typographie tabulaire, l'intitulé court, la variation relative (+12 % vs mois dernier) avec indicateur sémantique (couleur + icône).

- Étage intermédiaire (Analytique / Graphiques) : 1 à 2 graphiques principaux complémentaires (ex. Évolution temporelle à gauche + Répartition par catégorie à droite).

- Étage inférieur (Table de données détaillée) : Tableau exhaustif, actionnable, supportant la recherche contextuelle, le tri multi-colonnes, la sélection de masse et l'export.

#### Interdit (DON'T)

- Ne pas disperser les filtres globaux à différents endroits de la page.

- Ne pas placer la table de données avant les graphiques de synthèse sauf sur les vues purement transactionnelles d'exécution.

#### Critères de Validation QA

- Les filtres appliqués en haut de page mettent à jour simultanément l'ensemble des KPI, graphiques et tableaux sous-jacents.

- Les chiffres des KPI utilisent la propriété CSS font-variant-numeric: tabular-nums pour éviter le saut visuel lors des mises à jour en direct.

```
+-----------------------------------------------------------------------------------+
| ÉSTAGE 1 : FILTRES GLOBAUX & KPI SYNTHÉTIQUES                                     |
| [Période: 30j  v] [Périmètre: Global v]  [ KPI 1 ]  [ KPI 2 ]  [ KPI 3 ]  [ KPI 4 ] |
+-----------------------------------------------------------------------------------+
| ÉSTAGE 2 : GRAPHIQUES PRINCIPAUX COMPLÉMENTAIRES                                  |
| +-------------------------------------------+ +---------------------------------+ |
| | Graphique 1 : Évolution Temporelle (Line) | | Graphique 2 : Répartition (Bar) | |
| +-------------------------------------------+ +---------------------------------+ |
+-----------------------------------------------------------------------------------+
| ÉSTAGE 3 : TABLE DE DONNÉES DÉTAILLÉE ACTIONNABLE                                 |
| [Recherche...] [Filtres col v] [Export CSV]                                       |
| | ID | Date | Client | Statut | Montant | Actions |                              |
+-----------------------------------------------------------------------------------+
```

## 2. Maîtrise du Scroll & Densité d'Information

### Source scientifique / Norme

- Nielsen Norman Group (NN/g) — Scrolling and Attention: Études d'oculométrie (eye-tracking) démontrant que 57 % du temps de consultation visuelle est concentré au-dessus de la ligne de flottaison (above-the-fold), et que 74 % du temps est passé sur les deux premières hauteurs d'écran.

- Principe de Densité d'Information en UI Métier : Minimiser la charge de travail de la mémoire de travail (Cowan, 2001) en évitant la fragmentation de l'information sur de longues pages déroulantes.

### 2.1 Règles de Limitation du Scroll

#### Règle opérationnelle (DO)

- Sur les applications métriques et outils de gestion applicatifs, il est recommandé [N4] d'ajuster l'interface à la hauteur de la fenêtre d'affichage (100vh ou 100dvh). Un scroll vertical naturel reste toutefois autorisé sur les vues de rapportation ou documents longs.

- Découper l'espace en zones de défilement internes indépendantes (panes/drawers) : par exemple, un panneau latéral de navigation fixe, une liste défilante au centre, et une fiche de détail fixe ou défilante à droite.

- Regrouper les paramètres et informations secondaires à l'aide d'onglets, de panneaux latéraux coulissants (slide-over / drawers) ou de sections repliables (accordions).

#### Interdit (DON'T)

- Éviter les pièges de défilement (scroll traps) [N4] : veiller à ce que l'imbrication de conteneurs défilants n'interfère pas avec la navigation globale.

- Éviter le scroll horizontal involontaire (overflow-x: hidden sur la racine du document, contrôle strict des largeurs de tableaux).

#### Critères de Validation QA

- Sur les applications web pleine page [N4], la racine de la page ne génère pas de défilement inutile sur une résolution cible (1920x1080 ou 1440x900).

- La molette de la souris défile uniquement dans le conteneur actuellement survolé sans impacter l'arbre parent.

### 2.2 Pagination vs Virtualisation de Liste

#### Règle opérationnelle (DO)

- Pour la gestion des ensembles de données dans un composant unique [N4] :

- Utiliser la Virtualisation de Liste / DOM Windowing (ex. react-window, tanstack-virtual) dès que le nombre d'éléments dégrade la fluidité mesurée à l'écran.

- Utiliser la Pagination explicite (10, 25, 50, 100 lignes) pour les tableaux de données complexes nécessitant des actions de sélection multiple et de tri.

#### Interdit (DON'T)

- Éviter de rendre un trop grand nombre de nœuds complexes dans le DOM sans virtualisation si une perte de fluidité est constatée [N4].

- Ne jamais utiliser d'« Infinite Scroll » sur des interfaces d'administration métier où l'utilisateur doit pouvoir accéder à un pied de page ou conserver un repère fixe.

#### Critères de Validation QA

- Une liste de 10 000 éléments ne génère pas plus de ~20 à 30 éléments <div> ou <tr> dans l'inspecteur DOM lors du défilement.

- L'empreinte mémoire du navigateur reste stable lors d'un défilement prolongé [N4].

## 3. Critères de Performance & Fluidité Perçue

### Source scientifique / Norme

- Google Core Web Vitals (2024) : Standards de performance UX web centrés sur le chargement, l'interactivité et la stabilité visuelle. Les seuils officiels Google sont mesurés au 75e percentile des visites, évalués séparément sur mobile et desktop.

- Modèle RAIL (Response, Animation, Idle, Load) : Modèle de performance de Google définissant des budgets temps maximaux pour chaque phase d'interaction.

- Seuil de Doherty (1982 - IBM) : La productivité de l'utilisateur augmente de manière disproportionnée lorsque le temps de réponse de l'ordinateur est inférieur à 400 ms (idéalement < 100 ms).

### 3.1 Seuils Core Web Vitals Cibles

| Métrique | Signification | Seuil Bon (Cible) | Seuil À Améliorer | Seuil Critique |
| --- | --- | --- | --- | --- |
| LCP (Largest Contentful Paint) | Temps d'affichage du contenu principal | < 2,5 s | 2,5 s - 4,0 s | > 4,0 s |
| INP (Interaction to Next Paint) | Réactivité globale aux clics / frappes (mesurée au p75) | < 200 ms (Objectif interne ambitieux [N4]: < 100 ms) | 200 ms - 500 ms | > 500 ms |
| CLS (Cumulative Layout Shift) | Stabilité visuelle (mesurée au p75) | < 0,1 (Objectif interne ambitieux [N4]: 0,0) | 0,1 - 0,25 | > 0,25 |

#### Règle opérationnelle (DO)

- Réservation systématique des espaces (Anti-CLS) : Définir des dimensions explicitement dimensionnées (aspect-ratio, min-height) ou insérer des structures d'attente visuelles (Skeletons) de taille identique pour tous les graphiques, cartes et tableaux en cours de chargement.

- Optimiser les chemins de rendu pour atteindre un INP < 100 ms sur les composants de saisie et de filtrage.

#### Interdit (DON'T)

- Ne pas afficher de zones blanches vierges se redimensionnant brusquement après la réception du payload API.

- Ne jamais bloquer le thread principal JS avec des calculs de transformation de tableaux massifs pendant la frappe dans un champ de recherche (utiliser useDeferredValue ou du débogage/throttling).

#### Critères de Validation QA

- Le score CLS mesuré via Lighthouse ou Chrome DevTools lors de l'arrivée et du chargement des données est égal à 0.

- Le rapport d'audit Chrome Performance montre une valeur INP inférieure à 100 ms lors du clic sur un onglet de filtre.

### 3.2 Fluidité d'Animation (Modèle RAIL — 60 fps)

#### Règle opérationnelle (DO)

- Viser une fluidité d'animation de 60 images par seconde (budget de 16,6 ms par image) pour les transitions clés [N4].

- Limiter les propriétés CSS animées exclusivement aux propriétés gérées directement par le compositeur GPU : transform et opacity.

- Utiliser la directive will-change de manière ciblée et temporaire sur les éléments complexes en cours d'animation.

#### Interdit (DON'T)

- Recommandation [N4] : Éviter d'animer les propriétés déclenchant un recalcul de mise en page (Reflow/Layout) : width, height, margin, padding, top, left, right, bottom.

#### Critères de Validation QA

- Dans le panneau Performance de Chrome DevTools, aucune barre rouge "Long Task" (> 50 ms) n'apparaît pendant une animation de transition.

- L'inspecteur d'affichage montre 0 frame drop (chute de frame) lors de l'ouverture/fermeture du volet latéral.

### 3.3 Optimisation Perçue (Optimistic UI)

#### Règle opérationnelle (DO)

- Pour les actions locales à faible risque (ex. cocher une tâche, modifier un commutateur ou une étiquette) : mettre à jour l'interface utilisateur immédiatement avant confirmation du serveur.

- Gérer les promesses réseau en arrière-plan avec prise en compte des risques : anticiper les conflits de synchronisation, prévoir l'annulation des requêtes obsolètes et gérer la perte de connexion. En cas d'erreur API, appliquer un rollback visuel et afficher un notification d'erreur (Toast).

#### Interdit (DON'T)

- Ne pas afficher de spinner de chargement bloquant au centre de l'écran pour des actions simples d'édition directe (in-place editing).

#### Critères de Validation QA

- En simulant un réseau lent (Slow 3G via DevTools), le basculement d'un commutateur d'état s'anime instantanément sans attente.

- En simulant une erreur réseau 500 sur la requête de modification, l'interface revient à son état d'origine sous 2 secondes avec l'affichage d'un Toast d'erreur.

## 4. Grille Complète de Critères de Validation QA

Le tableau suivant regroupe l'ensemble des points de contrôle obligatoires à valider lors de la phase de recette (QA) avant toute mise en production d'un composant DataViz ou d'une interface d'administration.

#

| # | Domaine | Libellé du Test / Point de Contrôle | Condition d'Acceptation (PASS) | Méthode de Vérification |
| --- | --- | --- | --- | --- |
| 01 | DataViz | Démarrage à zéro de l'axe | L'axe des valeurs Y (ou X) de tous les Bar Charts commence exactement à 0. | Inspection visuelle / DevTools SVG |
| 02 | DataViz | Limitation des Donut/Pie Charts | Les Pie/Donut Charts comportent $\le 4$ segments et totalisent exactement 100 %. | Inspection code & données |
| 03 | DataViz | Ratio Data-Ink & Lignes de grille | Absence de 3D, dégradés d'arrière-plan opaques ou bordures lourdes sur les canvas visualisations. | Inspection visuelle |
| 04 | DataViz | Formatage des nombres et infobulles | Nombres affichés en font tabulaire (tabular-nums) avec séparateurs de milliers. Survol < 50ms. | Test utilisateur & CSS |
| 05 | Admin UI | Structure en 3 étages | Alignement vertical strict : (1) Filtres/KPI $\rightarrow$ (2) Graphiques $\rightarrow$ (3) Table détaillée. | Audit visuel d'interface |
| 06 | Scroll | Hauteur de fenêtre 100vh / No Global Scroll | Absence de scroll global injustifié sur la racine de l'application métier (recommandation [N4]). | Check CSS Layout / Resizing |
| 07 | Scroll | Interdiction du Double Scroll | Les zones de défilement imbriquées sont évitées pour prévenir les pièges de défilement [N4]. | Test de défilement molette |
| 08 | Performance | Virtualisation des listes longues | Une liste ou table $> 50$ éléments génère uniquement les nœuds du viewport dans le DOM. | Inspection de l'arbre DOM |
| 09 | Performance | Largest Contentful Paint (LCP) | Chargement du composant visuel principal effectué en moins de 2,5 secondes. | Audit Google Lighthouse |
| 10 | Performance | Interaction to Next Paint (INP) | Latence à l'interaction (clic, recherche, filtre) inférieure à 100 ms. | Chrome Performance Profiler |
| 11 | Performance | Cumulative Layout Shift (CLS) | Score de saut d'interface égal à 0.0 lors du chargement ou du switch de filtres. | Audit Web Vitals |
| 12 | Performance | Propriétés animées GPU uniquement | Transitions CSS exécutées exclusivement via transform et opacity (60 fps sans reflow). | Inspection règles CSS<br>3.4 Animation de Chargement « Effet Scan / Shimmer » & Transitions d'Apparition<br>Règle opérationnelle (DO)<br>Skeleton Screen avec animation Shimmer : Utiliser un balayage lumineux horizontal en dégradé CSS sur les squelettes de chargement, une technique validée par Luke Wroblewski et Google Material Design pour réduire la perception du temps d'attente et l'anxiété de l'utilisateur.<br>Implémenter le Shimmer via un dégradé linéaire (linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)) animé exclusivement via transform: translateX(-100%) à translateX(100%) sur 1.4s ease-in-out infinite (accélération GPU pure sans reflow/layout).<br>Transitions d'apparition échelonnées (Staggered Entrance) : Animer l'apparition du contenu après chargement avec une transition douce (opacity: 0 → 1 et translateY(6px → 0)) sur une durée de 180 à 220 ms en ease-out. Appliquer un décalage (stagger) de 25 à 40 ms entre les éléments d'une liste.<br>Interdit (DON'T)<br>Ne jamais faire dépasser la durée totale du stagger au-delà de 250 ms au total pour ne pas retarder l'accès aux données.<br>Ne jamais exécuter d'animations de transition ou de Shimmer lorsque la media query prefers-reduced-motion: reduce est activée par l'utilisateur.<br>Critères de Validation QA<br>L'animation Shimmer ne provoque aucun saut d'image (60 fps constants) et n'affecte pas les propriétés de layout/reflow.<br>En activant la réduction de mouvement dans le système d'exploitation, toutes les apparitions échelonnées et le Shimmer sont désactivés instantanément. |

### 3.4 Animation de Chargement « Effet Scan / Shimmer » & Transitions d'Apparition

#### Règle opérationnelle (DO)

- Skeleton Screen avec animation Shimmer : Utiliser un balayage lumineux horizontal en dégradé CSS sur les squelettes de chargement, une technique validée par Luke Wroblewski et Google Material Design pour réduire la perception du temps d'attente et l'anxiété de l'utilisateur.

- Implémenter le Shimmer via un dégradé linéaire (linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)) animé exclusivement via transform: translateX(-100%) à translateX(100%) sur 1.4s ease-in-out infinite (accélération GPU pure sans reflow/layout).

- Transitions d'apparition échelonnées (Staggered Entrance) : Animer l'apparition du contenu après chargement avec une transition douce (opacity: 0 → 1 et translateY(6px → 0)) sur une durée de 180 à 220 ms en ease-out. Appliquer un décalage (stagger) de 25 à 40 ms entre les éléments d'une liste.

#### Interdit (DON'T)

- Ne jamais faire dépasser la durée totale du stagger au-delà de 250 ms au total pour ne pas retarder l'accès aux données.

- Ne jamais exécuter d'animations de transition ou de Shimmer lorsque la media query prefers-reduced-motion: reduce est activée par l'utilisateur.

#### Critères de Validation QA

- L'animation Shimmer ne provoque aucun saut d'image (60 fps constants) et n'affecte pas les propriétés de layout/reflow.

- En activant la réduction de mouvement dans le système d'exploitation, toutes les apparitions échelonnées et le Shimmer sont désactivés instantanément.
