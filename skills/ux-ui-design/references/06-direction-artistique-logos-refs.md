# Document 06 — Direction Artistique Premium, Branding, Logos & Références Produits

Guide de référence opérationnel pour la conception d'interfaces utilisateur haut de gamme, la création d'identités de marque pérennes et la formulation de briefs d'ingénierie prompt destinés aux IA génératives.

### 1.1 Maîtrise de la Lumière, des Contrastes et de la Matière

Une direction artistique d'exception traite la lumière et la matière comme des composantes physiques régies par des principes d'optique rigoureux :

- Surfaces translucides maîtrisées (Frosted Glass) : L'effet de flou d'arrière-plan (backdrop-filter: blur(12px)) avec une opacité de surface comprise strictement entre 75 % et 85 % est exclusivement réservé aux éléments d'interface flottants (barres de navigation supérieures collantes, menus de commande temporaires). Il est strictement interdit d'appliquer ce traitement sous des blocs de texte courant pour ne pas altérer la lisibilité.

- Bordures intérieures lumineuses (Specular Highlights) : En mode sombre, la simulation d'une lumière zénithale s'effectue via une ombre interne subtile sur l'arête supérieure (box-shadow: inset 0 1px 0 rgba(255,255,255,0.08)), donnant un aspect biseauté de haute précision sans recourir à des dégradés lourds.

- Harmonie et cohérence de la température des gris : Il convient de séparer scrupuleusement les palettes froides (Slate/Zinc avec nuance bleutée ou acier pour les outils techniques et d'ingénierie) des palettes chaudes (Stone/Sand pour le contenu éditorial ou littéraire). Le mélange de gris chauds et froids dans une même interface constitue une faute majeure.

### 1.2 Échelle de Profondeur et Système d'Élévation (Z-Index System)

Afin d'éviter tout conflit d'empilement visuel et de garantir la prédictibilité des superpositions, l'architecture d'interface doit s'appuyer sur 6 niveaux stricts d'élévation :

```
z-base:             0    (Plan de travail principal, arrière-plan et canvas)
z-sticky:           10   (Headers collants, barres de navigation et éléments ancrés)
z-drawer:           40   (Panneaux latéraux coulissants, tiroirs contextuels)
z-modal:            50   (Fenêtres modales, dialogues de confirmation et overlays)
z-toast:            60   (Notifications éphémères, alerte système et toasteurs)
z-feedback-overlay: 100  (Masques de chargement globaux et modales d'urgence)
```

### 1.3 Typographie Éditoriale & UI : Crénage et Contrasts

La typographie premium orchestre l'espace au moyen d'ajustements micro-typographiques précis :

- Micro-crénage optique (Letter-spacing) : Pour les grands titres (>= 24px), appliquer un espacement resserré de -0.02em à -0.03em pour éliminer les vides d'air visuels. À l'inverse, pour les petites étiquettes en majuscules (11–12px), imposer un crénage élargi de +0.04em à +0.06em afin de maximiser la lisibilité des lettres individuelles.

- Règles strictes de contraste du corps textuel : Le texte principal (text-primary) doit afficher 90 à 95 % d'opacité/contraste. Le texte secondaire (text-secondary) se situe entre 60 et 70 %. Les textes discrets ou métadonnées (text-muted) ne doivent jamais descendre en dessous de 45 à 50 % d'opacité (pour satisfaire aux exigences WCAG AA).

### 1.4 Directives Anti-Slop Visuel (Règles d'Exclusion)

Pour préserver une esthétique professionnelle et éviter l'effet « modèle générique d'IA » ou « template bon marché », les choix graphiques suivants sont formellement proscrits :

- Bannissement des illustrations 3D en plastique brillant : Rejet des personnages ou objets 3D génériques en résine translucide sans lien direct avec le produit.

- Interdiction des avatars factices issus de banques d'images : Préférer des initiales typographiques épurées sur fond neutre ou des illustrations vectorielles minimalistes.

- Refus des dégradés saturés rose-violet-bleu : Suppression des fonds et boutons à dégradés fluo typiques des démos IA banales.

- Proscription des rayons excessifs non hiérarchisés : Interdiction de fixer des coins arrondis de 24px indifféremment sur tous les composants sans calcul de proportion parent-enfant.

## 1. Qu'est-ce qu'une Direction Artistique « Premium & Professionnelle » ?

La qualité visuelle d'une interface logicielle moderne ne repose pas sur l'accumulation d'effets décoratifs, mais sur la rigueur mathématique de sa construction, la sobriété de ses composants et la prédictibilité de son comportement. Une direction artistique premium crée une impression immédiate de précision, de clarté et de haute valeur technique.

### Retenue et précision structurelle

La qualité perçue découle d'un alignement strict et d'un contrôle méthodique de l'espace visuel :

- Grille rythmique 4/8px : Toutes les dimensions (marges, rembourrages, hauteurs de ligne, dimensions de blocs) doivent être des multiples exacts de 4px ou 8px pour garantir une harmonie spatiale constante.

- Hiérarchie typographique disciplinée : Utilisation de ratios d'échelle typographique stricts (ex. 1.200 - Minor Third ou 1.250 - Major Third) avec des contrastes d'épaisseur marqués (Regular 400 pour le corps de texte, Medium 500 pour les composants, Semibold 600/Bold 700 pour les titres).

- Système rigoureux de rayons de bordure (border-radius) : L'imbrication des éléments doit respecter une logique géométrique stricte. Le rayon d'un conteneur enfant doit être égal au rayon du conteneur parent moins le rembourrage interne ($R_{enfant} = R_{parent} - Padding$).

```
Inputs & Champs de saisie :  6px
Boutons & Éléments d'action : 8px
Cartes & Panneaux internes :  12px
Modales & Overlays majeurs :  16px
```

### Système de surfaces et profondeur subtile

Les interfaces contemporaines abandonnent les ombres portées opaques et étendues au profit d'un empilement de surfaces hiérarchisées par la luminosité et des frontières physiques de haute précision.

- Différenciation des plans par la luminance : La profondeur est introduite en superposant des niveaux de gris ou de teintes neutres (surface-0 pour le fond principal, surface-1 pour les cartes, surface-2 pour les éléments survolés ou modaux).

- Bordures microscopiques (1px solid) : Séparation des conteneurs via des lignes de 1px à faible opacité (10% à 15% de contraste par rapport au fond) plutôt que par de grands dégradés d'ombre.

- Ombres portées architecturales : Utilisation d'ombraitures diffuses multi-couches à faible opacité (ex. 0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)).

### Cohérence des tokens de design

Dès le premier composant développé, l'intégralité des attributs visuels doit être abstraite sous forme de variables CSS ou de design tokens sémantiques. Aucune valeur en px ou hexadécimale brute ne doit être saisie directement dans les feuilles de style des composables.

### Règles d'exécution visuelle (DO & DON'T)

| Domaine | Pratiques Recommandées (DO) | Pratiques Interdites (DON'T) |
| --- | --- | --- |
| Typographie | Aligner le texte sur une grille de baseline rigoureuse. Utiliser font-feature-settings: "tnum" pour les chiffres dans les tableaux. | Utiliser plus de deux familles typographiques distinctes dans la même interface. |
| Couleurs | Définir des teintes neutres légèrement infusées de la couleur primaire (ex. gris bleutés pour un thème froid). | Employer du noir pur (#000000) sur fond blanc pur (#FFFFFF) ou du vert/rouge hyper-saturé. |
| Ombres | Empiler deux ombres très légères (une pour le contact, une pour l'élévation). | Appliquer des ombres portées floues, sombres et unies (box-shadow: 0 10px 20px #000). |
| Bordures | Employer des bordures de 1px avec une opacité alpha réduite (ex. rgba(255,255,255,0.08) en dark mode). | Utiliser des bordures de 2px ou plus pour de simples séparations de conteneurs. |

## 2. Règles Scientifiques et Graphiques d'un Bon Logo & Identité de Marque

La conception d'un symbole identitaire repose sur les sciences de la perception (principes de la Gestalt), la théorie de la mémoire visuelle et les contraintes physiques d'affichage raster/vectoriel.

### Simplicité et reconnaissance instantanée

Un identifiant visuel efficace ne raconte pas une histoire complexe ; il crée une empreinte mnésique immédiate.

- Test du seuil d'exposition (<1 seconde) : L'empreinte visuelle doit être identifiable par le cerveau humain lors d'un balayage rapide.

- Test du contexte monochrome : Le symbole doit fonctionner à 100% en silhouette plate (noir pur sur blanc ou blanc pur sur noir). Si la marque perd sa lisibilité sans son dégradé ou sa couleur, sa structure géométrique est déficiente.

- Principes de la Gestalt appliqués : Exploitation de la clôture (le cerveau complète les formes ouvertes), du groupe (proximité et continuité) et de la relation figure-fond.

### Scalabilité extrême

Le logo doit conserver son intégrité structurelle sur toute l'échelle des dispositifs d'affichage.

- Contraintes de résolution : Le symbole doit rester parfaitement net et identifiable sur une grille de 16×16 px (favicon) ou 32×32 px (barre d'état), jusqu'à l'affichage sur écran 8K ou enseigne physique.

- Proscription de la complexité : Interdiction absolue d'intégrer des détails fins, des lignes de moins de 1.5px d'épaisseur à l'échelle de base, des effets de relief (biseautage, ombres) ou du texte au sein du symbole graphique (logomark).

### Équilibre entre Symbole (Logomark) et Typographie (Wordmark)

Dans les produits numériques et applications modernes, le système identitaire doit séparer clairement le symbole de la marque nominative.

- Structure pour les logiciels & SaaS : Associer un Wordmark typographique ultra-lisible (basé sur une typographie géométrique ou humaniste personnalisée) avec un Logomark abstrait ou monogramme géométrique.

- Règle des 2-3 primitives : Le symbole doit être construit exclusivement à partir de 2 ou 3 formes géométriques de base (cercle, carré, segment rectiligne).

- Zone de protection (Clear Space) : Imposer une zone d'exclusion minimale autour du logo égale à la hauteur du symbole ($X$), dans laquelle aucun texte, bordure ou élément d'interface ne peut pénétrer.

```
+-----------------------------------+    +-----------------------------------+
|             [ Clear Space ]       |    |        LOGOTYPE COMPOSITE         |
|   [X]  +---+                      |    |   [Logomark]  +  [Wordmark]       |
|   +----+   |  WORDMARK            |    |                                   |
|   |        |                      |    |    Alignement optique d'axe X     |
|   +--------+                      |    |    Zone d'exclusion = 100% Hauteur |
|             [ Clear Space ]       |    +-----------------------------------+
+-----------------------------------+    
```

### Palette de marque restreinte

La surcharge chromatique dilue la reconnaissance de marque. L'identité doit s'articuler autour d'une architecture stricte :

- 1 Couleur Identitaire Forte (Primary Brand) : Utilisée pour les points d'ancrage majeurs et l'élément d'icône.

- 1 Couleur d'Accent Secondaire (Secondary Accent) : Utilisée exclusivement pour attirer l'attention sur un élément d'action critique ou un état spécifique (ratio d'apparition 1:10 par rapport à la primaire).

- Gamme de Neutres Teintés (System Neutrals) : 6 à 9 nuances de gris étalonnées, infusées de 2% à 5% de la couleur primaire pour harmoniser les fonds, surfaces, bordures et textes.

### Directives de création de Branding (DO & DON'T)

### 2.5 Grilles Géométriques & Ratios Harmoniques dans le Design de Logo

Un symbole visuel pérenne est construit sur une armature vectorielle stricte pour prévenir les distortions optiques :

- Grille modulaire fermée : La création s'effectue sur une grille carrée uniforme de 24×24 ou 32×32 unités, avec des épaisseurs de trait étalonnées sur des multiples parfaits de la subdivision de grille.

- Proportions harmoniques : Emploi prioritaire de ratios éprouvés (1:1 pour le carré, 1:1.414 pour la diagonale ISO, ou 1:1.618 pour la section d'or) pour régler l'espacement et les échelles relatives des formes composantes.

- Compensation optique vs Alignement géométrique brut : Un triangle ou un cercle parfaitement aligné géométriquement avec un carré apparaît visuellement plus petit. Les formes courbes et angulaires doivent dépasser la ligne d'assise (overshoot) d'environ 1.5 % à 2 % de la hauteur totale pour paraître de taille équivalente à l'œil humain.

### 2.6 Protocoles de Validation QA d'un Logo (Les 5 Tests Obligatoires)

Test

Procédure d'Évaluation

Critère de Succès Impératif

1. Favicon 16×16

Réduction du symbole sur une grille pixel de 16×16 px.

Distinction des traits nets sans bavure ni fusion des contours.

2. Monochrome Pur

Conversion à 100 % en noir pur (#000) sur fond blanc (#FFF).

Conservation intégrale du sens et de la lisibilité sans dégradés.

3. Flou Gaussien

Application d'un flou de 5px sur le logo à taille standard.

La silhouette globale reste immédiatement identifiable.

4. Inversion Clair/Sombre

Basculement d'un fond blanc à un fond sombre (#0B0C0E).

Équilibre visuel préservé sans impression d'épaississement fictif.

5. Test de Mémorisation

Exposition au logo pendant 5 secondes, puis dessin de mémoire.

Restituer les traits majeurs de la forme sans effort.

### 2.7 Déclinaisons et Format de Livrables de l'Identité Visuelle

Toute identité visuelle professionnelle doit inclure les 5 déclinaisons livrables normalisées suivantes :

- Logomark (Symbole Isolé) : Utilisé pour les favicons, applications mobiles et avatars officiels.

- Wordmark (Typographie Seule) : Signature textuelle employée lorsque la marque est déjà clairement identifiée.

- Lockup Horizontal : Combinaison symbole + texte côte à côte, optimisée pour les barres de navigation web.

- Lockup Vertical : Symboles superposés au-dessus du texte, pour les écrans de démarrage (splash screens) et documents imprimés.

- Favicon SVG Adaptatif : Fichier vectoriel gérant nativement la détection automatique du thème utilisateur via CSS (@media (prefers-color-scheme: dark)).

| Domaine | Pratiques Recommandées (DO) | Pratiques Interdites (DON'T) |
| --- | --- | --- |
| Logomark | Concevoir sur une grille vectorielle stricte avec des angles et alignements snapping. | Dessiner des formes complexes, des masques de découpe multiples ou des illustrations. |
| Scalabilité | Tester l'icône à des tailles réelles de 16px, 24px, 32px et 64px sur écran basse résolution. | Intégrer un tagline ou un texte secondaire sous le wordmark dans les petites tailles. |
| Couleurs | Valider les ratios de contraste WCAG AAA (7:1 minimum) pour le texte de marque. | Utiliser des dégradés arc-en-ciel ou des couleurs RVB non imprimables sans alternative solide. |
| Utilisation | Créer des déclinaisons strictes : Version horizontale, icône isolée, version monochrome. | Autoriser la déformation, la rotation non autorisée ou la modification des proportions du logo. |

## 3. Bibliothèque de Références Produits (Archétypes pour briefs IA)

Lors de la rédaction de prompts pour la génération d'interfaces ou de composants graphiques par des modèles d'intelligence artificielle, il est indispensable de citer des archétypes logiciels établis. Ces références servent de raccourcis conceptuels pour imposer des comportements ergonomiques et des choix esthétiques précis.

```
                                  RÉFÉRENCES PRODUITS (8 ARCHÉTYPES UI)
                                           │
 ┌─────────────┼──────────────┬────────────┴─────────────┬─────────────┼──────────────┐
 │             │              │                          │             │              │
ChatGPT/Claude Linear Stripe Dashboard Apple/Things 3 Notion/Raycast Figma/Excalidraw Superhuman/Cron Grafana/Datadog
 │             │              │                          │             │              │
Conversations  Productivité   Analytique  Tactile/Mobile Modulaire     Canevas/Outils Vitesse/Temps   Monitoring/Data
```

### ChatGPT / Claude

Domaine d'excellence : Interfaces conversationnelles, traitements de langage naturel et systèmes d'intelligence artificielle.

- Principes d'ergonomie :

- Focus de saisie unifié : Alignement de l'attention utilisateur sur une zone de texte unique, centrée et positionnée en bas d'écran (optimale pour le focus clavier et le balayage visuel).

- Barre latérale rétractable : Historique des sessions relégué dans un panneau latéral discret, masquable pour éliminer toute charge cognitive pendant le traitement.

- Feedback de streaming progressif : Affichage fluide du texte généré au kilomètre, éliminant la sensation d'attente d'une requête HTTP classique.

- Absence de parasitage : Zéro élément décoratif ou bannière promotionnelle autour du flux principal de conversation.

- Quand le citer à une IA : « Génère une interface de chat/assistant IA épurée avec une zone de saisie ancrée en bas, un historique latéral escamotable et une typographie à haute lisibilité inspirée de Claude et ChatGPT. »

### Linear

Domaine d'excellence : Outils de productivité avancés, logiciels de gestion de projets, applications professionnelles B2B et clients desktop (Tauri / Electron).

- Principes d'ergonomie :

- Densité d'information maîtrisée : Capacité à afficher un grand nombre de données par écran sans générer de fatigue visuelle, grâce à des paddings réduits (4px/8px) et une échelle typographique compacte (12px/13px pour les données).

- Mode sombre calibré de précision : Fonds anthracite/noir profond (#0B0C0E), surfaces légèrement plus claires et contrastes de textes gérés avec précision.

- Navigation 100% Clavier : Palette de commandes centralisée (Cmd+K / Ctrl+K) et raccourcis à touche unique (G puis I, C pour créer).

- Micro-animations réactives : Transitions quasi-instantanées (<150ms) donnant une sensation d'application native ultra-rapide.

- Quand le citer à une IA : « Conçois ce tableau de bord professionnel avec l'esthétique et l'ergonomie de Linear : mode sombre haute précision, bordures subtiles 1px, densité de données élevée, typographie monospace pour les identifiants et interface pilotable au clavier. »

### Stripe Dashboard

Domaine d'excellence : Interfaces financières, panneaux d'administration complexes, tableaux de données et visualisation d'indicateurs clés (KPIs).

- Principes d'ergonomie :

- Divulgation progressive (Progressive Disclosure) : Présentation synthétique des métriques au premier niveau, avec accès aux détails granulaire via des volets glissants ou des vues dédiées.

- Chiffres tabulaires & alignements : Alignement rigoureux à droite pour les valeurs numériques et financières, utilisation de polices à chasses fixes pour les montants.

- États vides (Empty States) pédagogiques : Les tableaux sans données affichent des illustrations explicatives et des actions claires pour guider l'utilisateur.

- Feedback d'action sans ambiguïté : États de validation, de chargement et d'erreur intégrés directement au sein des composants (ex. boutons avec spinner intégré et coche de succès).

- Quand le citer à une IA : « Structure ce panneau de facturation et de reporting selon les standards de Stripe Dashboard : tableaux de données clairs avec chiffres tabulaires alignés à droite, graphiques synthétiques et filtres multicritères discrets. »

### Apple / Things 3

Domaine d'excellence : Applications grand public (B2C), logiciels orientés gestion personnelle, interfaces mobile-first et applications tactiles.

- Principes d'ergonomie :

- Ergonomie de la zone du pouce (Thumb Zone) : Positionnement des actions principales (boutons d'action flottants, menus de navigation) dans le tiers inférieur de l'écran.

- Physique des animations : Mouvements des éléments basés auf des ressorts (spring physics) imitant le monde réel, procurant un retour tactile visuel naturel.

- Microcopy claire et épurée : Textes d'instructions concis, ton bienveillant et structuration simple de l'information.

- Sensation de calme visuel : Utilisation généreuse de l'espace blanc (ou vide), éléments arrondis (border-radius: 16px à 24px) et ombres très douces.

- Quand le citer à une IA : « Élabore cette application mobile avec la fluidité et le calme visuel de Things 3 et iOS : grands espaces de respiration, angles arrondis, boutons d'action facilement accessibles au pouce et animations naturelles. »

### Notion / Raycast

Domaine d'excellence : Systèmes d'information modulaires, bases de connaissances, lanceurs d'applications et outils basés sur des blocs de construction.

- Principes d me l'ergonomie :

- Architecture basée sur les blocs : Les éléments de contenu (texte, tableaux, images, callouts) sont des entités manipulables, réordonnables et transformables à la volée.

- Recherche universelle et omnibus : Barre de recherche instantanée qui sert de point d'entrée unique pour naviguer, exécuter des actions, interroger l'IA ou trouver un document.

- Menus contextuels discrets : L'interface permanente est dépouillée de tout contrôle superflus ; les options apparaissent au survol (hover) ou via un déclencheur contextualisé (/ ou :).

- Quand le citer à une IA : « Développe une interface modulaire inspirée de Notion et Raycast : espace de travail basé sur des blocs éditables, menu contextuel accessible via le caractère '/', et barre de recherche omnibox centrale. »

### Figma / Excalidraw

Domaine d'excellence : Outils créatifs, interfaces de création visuelle, canevas infinis et inspecteurs contextuels.

- Principes d'ergonomie :

- Espace de travail principal maximal : Le canevas central occupe la totalité de l'espace visuel disponible, libéré des éléments d'habillage superflus.

- Barre d'outils flottante compacte : Outils primaires regroupés dans une barre flottante au bas ou en haut de l'écran avec retour visuel immédiat de l'outil actif.

- Inspecteur latéral dynamique : Panneau de propriétés latéral qui adapte ses contrôles de façon contextuelle selon le composant ou l'objet sélectionné.

- Quand le citer à une IA : « Élabore un outil de création basé sur un canevas central maximaliste, une barre d'outils flottante compacte et un panneau de propriétés adaptatif à divulgation progressive. »

### Superhuman / Cron (Notion Calendar)

Domaine d'excellence : Applications à haute vitesse d'exécution, gestion temporelle et outils à latence zéro.

- Principes d'ergonomie :

- Navigation fluide et réactivité instantanée : Transitions sans décalage visualisé (<50ms), données pré-chargées localement.

- Exécution au clavier prioritaire : Traitement des données et raccourcis d'action permettant une utilisation sans recours à la souris.

- Rétroaction visuelle immédiate : Notifications de confirmation discrètes et réordonnancement en direct sans rechargement de page.

- Quand le citer à une IA : « Conçois une interface ultra-rapide axée sur la productivité avec navigation temporelle fluide, commandes au clavier réactives et zéro latence visuelle perçue. »

### Grafana / Datadog / Tremor

Domaine d'excellence : Visualisation de données massives, tableaux de bord de surveillance technique et analytique avancée.

- Principes d'ergonomie :

- Lisibilité et clarté des axes : Graphiques dépouillés, grilles de fond à faible opacité et axes numériques paramétrés avec précision.

- Code couleur sémantique strict : Utilisation de couleurs neutres pour les séries standards, le vert réservé au succès, le jaune à l'alerte et le rouge aux erreurs critiques.

- Infobulles de survol riches (Rich Tooltips) : Survol affichant des données comparatives multi-séries précises au pixel près.

- Quand le citer à une IA : « Génère un tableau de bord analytique selon la rigueur de Datadog et Tremor : graphiques de données clairs, infobulles détaillées au survol et palette couleur sémantique d'alerte. »

## 4. Matrice Synthétique pour Briefs IA

Utilisez le tableau suivant pour sélectionner rapidement les paramètres artistiques et les références à intégrer dans vos prompts de génération UI/UX.

| Objectif du Projet | Référence Principale | Palette Typique | Rayons & Grille | Mots-clés pour Prompts IA |
| --- | --- | --- | --- | --- |
| Agent / Chatbot IA | Claude / ChatGPT | Fond neutre froid, accents violets/bleus discrets | 8px inputs, 12px bulles, grille 8px | Conversational UI, bottom input anchor, collapsible sidebar, streaming state, distraction-free. |
| SaaS B2B / Tooling | Linear | Mode sombre (#0B0C0E), accent violet/indigo | 6px inputs, 8px cards, border 1px | High data density, dark mode, 1px subtle borders, keyboard-first, Cmd+K palette, sharp hierarchy. |
| Finance / Data | Stripe Dashboard | Fonds blancs/gris clair, accents bleu banque/slate | 4px inputs, 6px tables, layout rigide | Tabular figures, right-aligned metrics, progressive disclosure, crisp data tables, financial grade. |
| App Mobile / B2C | Things 3 / Apple | Fonds clairs ou sombres pure, accents pastel | 12px inputs, 20px cards, layout très aéré | Mobile-first, thumb-zone layout, spring animations, spacious layout, rounded corners, calm design. |
| Productivité / KMS | Notion / Raycast | Monochrome, accents contextuels uniques | 6px blocks, 10px popovers, layout modulaire | Block-based architecture, slash commands, universal search modal, minimal chrome, contextual tools. |

## 5. Liste de Contrôle et Critères de Validation QA pour la Direction Artistique

Tout livrable d'interface utilisateur ou d'identité visuelle doit être soumis aux vérifications QA suivantes avant validation finale :

| Catégorie QA | Critère d'Inspection | Statut de Conduite |
| --- | --- | --- |
| Tokens & Grille | Toutes les valeurs de dimensions, marges et paddings sont des multiples de 4px ou 8px sans exception. | Obligatoire (100 %) |
| Imbrication Rayons | La règle R_enfant = R_parent - Padding est appliquée à tous les conteneurs imbriqués. | Obligatoire (100 %) |
| Contraste WCAG | Le texte principal respecte le ratio minimal de 7:1 (AAA) et le texte secondaire 4.5:1 (AA). | Obligatoire (100 %) |
| Échelle Z-Index | Les superpositions visuelles s'appuient exclusivement sur les 6 niveaux d'élévation définis. | Obligatoire (100 %) |
| Anti-Slop Visuel | Absence d'illustrations 3D plastiques, de dégradés fluo génériques ou d'avatars de stock. | Obligatoire (100 %) |
| Tests du Logo | Le symbole valide les 5 tests obligatoires (16px, monochrome, flou 5px, inversion, mémorisation). | Obligatoire (100 %) |
| Typographie UI | Crénage resserré sur grands titres (-0.02em) et élargi sur petites étiquettes majuscules (+0.04em). | Obligatoire (100 %) |
