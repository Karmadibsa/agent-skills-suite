# 00B — Registre Central des Règles & Niveaux de Preuve (Source Unique de Vérité)

Statut : Référentiel UX/UI V2.0 (Consolidation Scientifique) · Révision : Novembre 2026.

## 1. Taxonomie Officielle des Niveaux de Preuve et d'Obligation

Toute règle issue de ce référentiel est désormais classée selon six niveaux de preuve et d'obligation rigoureusement définis. Cette classification garantit une étanchéité absolue entre les exigences normatives légales, les résultats de la recherche scientifique et les choix d'orientation artistique ou de conventions d'ingénierie.

- [N1 — Norme officielle / Obligation légale] : Exigence normative ou réglementaire vérifiable (ex. W3C WCAG 2.2 AA, RGPD Art. 5). Obligation stricte dès lors que le niveau de conformité légale est visé.

- [N2 — Résultat scientifique expérimental] : Relation établie par la recherche empirique publiée (ex. Loi de Fitts, Loi de Hick-Hyman, Empan de Cowan, Cleveland & McGill). Valide exclusivement dans le cadre expérimental décrit ; interdiction d'extrapoler ces lois en seuils numériques absolus ou universels.

- [N3 — Recommandation empirique UX] : Principe appuyé sur des tests d'utilisabilité à grande échelle et des corps de doctrines reconnus (ex. Nielsen Norman Group, Baymard Institute, WAI-ARIA APG, ISO 9241). Présente une forte valeur pratique tout en restant adaptable au contexte d'usage.

- [N4 — Convention technique / Architecture] : Standard d'ingénierie logicielle, de structure de code ou de performance système (ex. Core Web Vitals au 75e percentile, grille de mise en page 4/8 px, architecture de tokens CSS, échelle d'empilement Z-index).

- [N5 — Préférence esthétique / Profil configurable] : Choix de direction artistique, d'identité visuelle ou convention de style (ex. règle de répartition chromatique 60-30-10, rayons de courbure 6/8/12/16 px, thème sombre anthracite, usage des emojis selon le ton de la marque). Totalement configurable selon le projet.

- [N6 — Hypothèse produit à tester] : Recommandation ergonomique ou d'interaction spécifique dont l'impact effectif doit être mesuré via des tests d'utilisabilité ou des expérimentations (A/B testing) auprès des utilisateurs réels du projet.

## 2. Registre Central des Règles Normalisées (Résolution des Contradictions)

Ce tableau constitue la Source Unique de Vérité (Single Source of Truth). Il tranche définitivement les divergences constatées dans les documents de travail antérieurs.

| ID | Niveau | Règle Exacte | Source Vérifiée | Exceptions Validées | Méthode de Vérification |
| --- | --- | --- | --- | --- | --- |
| ACC-01 | [N1] | Contrastes chromatiques minimaux de 4.5:1 pour le texte courant, 3:1 pour le texte large (>= 24px ou >= 18.66px en gras) et les composants UI non textuels (icônes, bordures d'entrées). | WCAG 2.2 AA (Critères 1.4.3 & 1.4.11) | Logos, éléments purement décoratifs, composants au statut inactif (disabled). | Mesure par pipette/analyseur d'accessibilité sur les couleurs réellement rendues à l'écran (pas via l'opacité théorique CSS). |
| ACC-02 | [N1] & [N3] | Focus clavier visible (2.4.7 AA) et non masqué (2.4.11 AA) obligatoire. L'apparence renforcée du focus (épaisseur >= 2px et ratio contraste >= 3:1) est recommandée en AA et obligatoire en AAA (2.4.13). | WCAG 2.2 (AA: 2.4.7, 2.4.11 / AAA: 2.4.13) | Aucune exception sur la visibilité. Le contour personnalisé peut remplacer l'outline navigateur. | Inspection visuelle au parcours Tabulation. Vérification du contraste de l'indicateur par rapport au fond adjacent. |
| ACC-03 | [N1], [N3] | Le minimum normatif est de 24 × 24 CSS px (WCAG AA). Les dimensions 44 × 44 pt (Apple HIG) et 48 × 48 dp (Material 3) sont des recommandations tactiles distinctes des CSS px. | WCAG 2.2 AA (2.5.8), Apple HIG, Material Design 3 | Cibles d'action inline dans un paragraphe ou disposant d'un espacement compensatoire suffisant de 24px. | Audit DOM (getBoundingClientRect) et tests de manipulation sur écrans tactiles mobiles. |
| ACC-04 | [N1] | Redimensionnement du texte à 200 % sans perte de contenu (1.4.4), Reflow à 320 CSS px sans défilement horizontal (1.4.10), et respect de l'espacement du texte (1.4.12 : line-height >= 1.5×). | WCAG 2.2 AA (1.4.4, 1.4.10, 1.4.12) | Images de texte (déconseillées), tableaux de données complexes (défilement bidirectionnel toléré). | Test de zoom navigateur à 200%, simulation viewport 320px, injection de styles d'espacement (bookmarklet WCAG). |
| ACC-05 | [N1] & [N3] | Prise en compte de @media (prefers-reduced-motion: reduce) pour désactiver ou simplifier les animations déclenchées par une interaction. Critère AAA indispensable pour la prévention vestibulaire. | WCAG 2.2 AAA (2.3.3) & WAI-ARIA Best Practices | Animations essentielles au fonctionnement ou à la transmission d'une information indissociable. | Emulation de la préférence système "Réduction des mouvements" dans les outils de développement (DevTools). |
| ACC-06 | [N1] | Annonce dynamique des changements d'état (role="status" / aria-live), alternatives accessibles aux actions par glisser-déposer (2.5.7 AA) et absence de test cognitif d'authentification (3.3.8 AA). | WCAG 2.2 AA (4.1.3, 2.5.7, 3.3.8) | Mécanismes d'authentification s'appuyant sur des clés d'accès physiques (WebAuthn) ou assistants de saisie. | Test avec lecteurs d'écran (NVDA, VoiceOver) et vérification du flux alternatif sans glisser-déposer. |
| TYP-01 | [N3] & [N4] | 16 px (1rem) est la taille recommandée pour le corps de texte principal. 12 px (0.75rem) constitue le seuil bas acceptable pour les métadonnées secondaires et légendes. | Nielsen Norman Group & Conventions UI Engineering | Pas d'exception pour le corps de texte. WCAG n'impose pas de taille minimale fixe mais exige le zoom 200%. | Contrôle des feuilles de styles CSS (font-size) et vérification de la lisibilité sur différents types d'écrans. |
| COG-01 | [N2] & [N3] | Les lois psychophysiques (Fitts, Hick-Hyman, Cowan 4 ± 1 objets) guident la structuration visuelle et la réduction de charge, mais n'imposent aucune limite numérique rigide sur les interfaces. | Fitts (1954), Hick (1952), Cowan (2001), NN/g | Aucune. La complexité permise dépend de la fréquence d'usage et de l'expertise de l'utilisateur métier. | Évaluation ergonomique, temps d'accomplissement des tâches, mesures de taux d'erreur et tests d'utilisabilité. |
| PERF-01 | [N4] | Seuils officiels Google Core Web Vitals au 75e percentile : LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1. Les cibles INP < 100 ms et CLS = 0.0 sont des objectifs internes d'excellence. | Google Core Web Vitals (Spécifications 2024) | Applications web lourdes sur réseaux fortement dégradés (des objectifs ajustés peuvent s'appliquer). | Mesure en conditions réelles d'utilisation (RUM) et rapports Chrome User Experience (CrUX) au 75e percentile. |
| LOAD-01 | [N3] | Pas d'indicateur pour < 100 ms. Spinner sobre pour 100 ms – 1 s. Skeleton Screen (option Shimmer) si la structure est connue (> 0.5–1 s). Barre de progression si l'avancement est mesurable. | Jakob Nielsen (1993), Luke Wroblewski | Remplacement par des états optimistes si l'action présente un taux de succès quasi certain (> 99%). | Profilage du temps de réponse serveur/réseau et audit du composant de chargement affiché. |
| DASH-01 | [N3] | Différenciation stricte : Dashboard Opérationnel (priorité aux actions), Dashboard Analytique (indicateurs et graphiques), Écran Transactionnel (listes et données brutes). | Stephen Few & Nielsen Norman Group | Écrans hybrides sur mesure documentés selon le parcours utilisateur spécifique. | Revue de la hiérarchie de l'information et adéquation avec les cas d'usage principaux de l'utilisateur targeté. |
| SLOP-01 | [N3] / [N5] | Bannissement des usages génériques, décoratifs et non justifiés (ex. Bento Grid systématique, modales abusives, animations superflues). Emojis proscrits dans les UI métier formelles. | Principes Anti-Slop & Directives d'Art Direction | Emojis tolérés dans les contextes ludiques, éducatifs, sociaux ou de messagerie informelle. | Revue de design (Design Review) et analyse d'impact sur la lisibilité et l'efficacité opérationnelle. |

## 3. Règle d'Auto-Justification Mesurée pour les IA

Lors de la génération de code, de maquettes, de spécifications techniques ou de recommandations d'architecture UI/UX, toute IA exécutant ce référentiel doit se conformer strictement aux règles d'auto-justification suivantes :

### 3.1. Périmètre de justification

L'IA doit justifier exclusivement les décisions structurantes. Sont considérées comme décisions structurantes :

- Les choix d'architecture d'interface et d'agencement spatial complexe.

- Les arbitrages relatifs à l'accessibilité et la conformité aux normes.

- La sélection de composants complexes (ex. modales vs tiroirs, filtres combinatoires vs recherche simple).

- Les arbitrages impactant directement la performance perçue ou technique.

### 3.2. Format des citations

Chaque justification doit obligatoirement inclure l'identifiant exact de la règle ainsi que son niveau de preuve formel.

- Exemple obligatoire : [ACC-01][N1], [COG-01][N2], [PERF-01][N4].

### 3.3. Intégrité scientifique et traçabilité

- Interdiction d'invention : Il est formellement interdit d'inventer une étude scientifique, un nom d'auteur, un identifiant DOI ou un pourcentage statistique non documenté.

- Honnêteté intellectuelle : Si un choix relève d'une convention technique [N4] ou d'une simple préférence esthétique / de marque [N5], l'IA doit l'indiquer explicitement sans chercher à le masquer derrière une justification scientifique factice.
