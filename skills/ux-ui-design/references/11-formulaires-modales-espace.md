# Document 11 — Formulaires Intelligents, Modales Stables, Navigation Avancée & Optimisation d'Espace

Ce document établit les standards ergonomiques, cognitifs et techniques applicables à l'ingénierie des interfaces utilisateur complexes. L'objectif est d'éliminer les frictions de saisie, la cécité au changement et la surcharge visuelle par l'application rigoureuse des sciences de la cognition et du Web UX.

## 1. Modales Stables & Cohérence Dimensionnelle Multi-Étapes

### Source scientifique & Études

- Continuité spatiale & Mémoire visuo-spatiale : Rensink (2002) — Change Blindness & Spatial Stability. Les réalignements soudains d'un conteneur forcent une réévaluation saccadée de l'ensemble du champ visuel, détruisant la carte mémoire visuo-spatiale construite par l'utilisateur.

- Loi de Fitts ($T = a + b \log_2(1 + D/W)$) : La stabilité spatiale de la cible est critique. Si la distance $D$ change au moment où l'utilisateur s'apprête à cliquer en raison d'un redimensionnement du conteneur parent, le taux d'erreur de pointage augmente de 340 %.

### Principe

Une fenêtre modale ou un assistant multi-étapes (wizard) doit se comporter comme une scène physique stable. Il ne doit jamais redimensionner brutalement sa largeur ou sa hauteur lors du passage d'une étape à une autre. Les sauts de mise en page (layout shifts) déplacent les cibles d'action sous le curseur, provoquant une désorientation visuelle et des clics erronés.

### Règles opérationnelles (DO)

- Standardisation des largeurs : Définir la largeur stricte selon la typologie contextuelle :

- 440 px : Confirmation, alerte simple, action atomique.

- 560–640 px : Formulaire standard, édition d'entité simple.

- 760–840 px : Assistant complexe multi-étapes, vue côte à côte, aperçu de document.

- Ancrage structurel en flux multi-étapes (Étape 1 $\rightarrow$ Étape 2 $\rightarrow$ Étape 3) :

- Conserver la largeur et la hauteur minimale (min-height) rigoureusement identiques tout au long du flux.

- Maintenir l'en-tête (titre + indicateur d'avancement Étape X sur Y) et le pied de page (boutons Précédent et Suivant/Valider) ancrés aux mêmes coordonnées en pixels.

- Indicateurs de progression compacts : Placer une barre de progression discrète (2px à 4px) en haut de la modale ou utiliser un composant d'étapes numérotées horizontal et fixe.

- Gestion du contenu variable : Si le contenu d'une étape est plus court, la hauteur fixe minimale empêche l'effondrement du conteneur. Si le contenu dépasse la hauteur maximale autorisée (calc(100vh - 120px)), seul le corps central (body) active un défilement interne vertical sans impacter l'en-tête ni le pied de page.

### Interdits (DON'T)

- Ne jamais laisser une modale varier dynamiquement ses dimensions d'une étape à l'autre (ex: passer de 380 px à l'étape 1 à 720 px à l'étape 2).

- Ne jamais déplacer l'emplacement des actions principales (ex: inverser Annuler / Suivant ou faire passer le bouton principal de gauche à droite selon les étapes).

- Ne jamais utiliser d'animations de transition de hauteur (height auto transition) qui provoquent des saccades visuelles (layout thrashing).

### Critères de Validation QA

- Test de stabilité spatiale : Parcourir l'ensemble d'un assistant multi-étapes en gardant le pointeur de la souris immobile sur le bouton Suivant. Le clic répétitif doit permettre de franchir les étapes sans que le bouton ne glisse sous le curseur.

- Inspection CSS : Vérifier que le composant racine de la modale possède une propriété width fixe et une propriété min-height explicite.

- Test de décalage d'affichage (CLS) : S'assurer que le Cumulative Layout Shift à l'intérieur du conteneur modal est égal à 0 lors des transitions de phase.

## 2. Taxonomie Scientifique des Champs de Formulaire

### Source scientifique & Études

- Baymard Institute & Luke Wroblewski (Web Form Design: Filling in the Blanks) : Le choix erroné d'un composant d'entrée augmente la durée de saisie d'un facteur 3 et multiplie les abandons de formulaire.

- Loi de Hick ($T = b \cdot \log_2(n + 1)$) : Réduire l'effort d'accès aux choix en exposant directement les options lorsque $n$ est petit.

### Matrice de choix du composant idéal selon la structure de la donnée

Volume / Nature des options

Composant UX Recommandé

Rationale Cognitive & Ergonomique

2 options mutuellement exclusives (Oui/Non, Actif/Inactif)

Interrupteur (Toggle Switch) si l'effet est immédiat.2 Boutons Radio côte à côte si la validation nécessite la soumission globale du formulaire.

Évite de masquer l'alternative derrière un clic. L'état binaire est immédiatement lisible sans charge intellectuelle.

3 à 5 options courtes

Segmented Control (Pilules) ou Boutons Radio visibles.

Applique la Loi de Hick. Tous les choix sont visibles d'un coup. Suppression de l'action d'ouverture d'un menu déroulant.

6 à 15 options connues

Liste déroulante standard (Select) avec valeur par défaut neutre/explicite.

La liste est suffisamment restreinte pour être parcourue visuellement sans effort d'orientation majeur.

> 15 options (Pays, Ville, Code AFE, Client)

Combobox / Autocomplete filtrable avec soutien clavier complet (Flèches, Entrée, surbrillance).

Évite le défilement fastidieux dans un long menu (anti-pattern critique documenté par Baymard Institute).

Sélection multiple

Multi-select avec pilules (Chips) supprimables et barre de recherche intégrée (ou cases à cocher si $\le 6$ options).

Visualisation claire des éléments retenus. Suppression en un seul clic sans réouvrir la liste.

Valeur numérique bornée (Pourcentage, Budget approximatif)

Champ texte numérique (inputmode="decimal"), éventuellement couplé à un Curseur (Slider) si la précision absolue n'est pas requise.

Ne jamais imposer un Slider seul pour une donnée nécessitant une valeur exacte (ex: un montant financier).

Date / Plage de dates

Calendrier visuel (Date Picker) + Saisie clavier directe autorisée (JJ/MM/AAAA) avec raccourcis (« Aujourd'hui », « 30 derniers jours »).

La saisie manuelle au clavier doit rester possible pour les utilisateurs experts. Le Date Picker sert à la vérification contextuelle.

Texte court vs Long

Affordance de longueur : Ajuster la largeur visuelle de l'élément à la taille moyenne de la donnée attendue (ex: code postal à 120 px, pas 100%).

La taille du champ indique visuellement le format de réponse attendu, diminuant le doute lors de la saisie.

### Règles de Pré-remplissage & Validation Intelligente (Loi de Tesler)

- Réduction de la complexité (Loi de Tesler) : Pré-remplir automatiquement toutes les données déductibles : date courante, devise de l'espace de travail, ville/département déduits dès la saisie du code postal, ou données de la dernière session.

- Validation Inline « Reward Early, Punish Late » (Wroblewski) :

- Ne jamais déclencher d'état d'erreur rouge pendant que l'utilisateur est en train d'écrire dans un champ non encore quitté.

- Valider la conformité de la saisie lors de la perte de focus (onBlur).

- En cas d'erreur affichée, effacer le message négatif immédiatement dès que la correction rend le champ valide lors de la frappe (onChange).

### Interdits (DON'T)

- Ne jamais employer une liste déroulante (Select) pour des choix binaires (Oui/Non).

- Ne jamais désactiver le bouton d'action principal (Submit) sous prétexte qu'un champ est invalide : au clic, afficher explicitement les erreurs pour guider l'utilisateur.

- Ne jamais bloquer le copier-coller dans les champs de saisie (notamment mot de passe ou IBAN).

### Critères de Validation QA

- Test d'efficience au clavier : Remplir l'intégralité du formulaire uniquement avec les touches Tab, Maj+Tab, Espace, Flèches et Entrée. Aucun passage à la souris ne doit être indispensable.

- Test d'affordance : Vérifier la cohérence entre la largeur physique de chaque champ et la longueur de la donnée attendue.

- Vérification du pattern de validation : Saisir une adresse e-mail invalide, quitter le champ (onBlur $\rightarrow$ l'erreur apparaît), puis corriger l'e-mail caractère par caractère ($\rightarrow$ l'erreur disparaît dès l'instant où la syntaxe devient correcte).

## 3. Typologies Avancées de Navigation & Architectures Hybrides

### Source scientifique & Études

- Nielsen Norman Group (NN/g) : Navigation Patterns & Information Architecture. La navigation doit minimiser la profondeur d'exploration et maintenir un ancrage contextuel permanent pour éviter la perte d'orientation (lost in hyperspace).

### Catalogue des 7 modèles de navigation

```
[1. Topbar Pure]       ========================== Header ==========================
[2. Sidebar Pure]      | Nav | Workspace | Main Content                           |
[3. Navigation Hybride]| Topbar : Espaces Globaux (Finances, Projets, Admin)      |
                       | Sidebar: Sous-pages du domaine sélectionné               |
[4. Hub & Spoke]       [Accueil / Hub] ===> (Module A | Module B | Module C)      |
[5. Palette Commandes]  Cmd/Ctrl + K  ===> [ Recherche globale & actions directes ]|
[6. Double Rail]       | Rail (56px) | Sidebar (240px) | Content Area               |
[7. Drill-down / Tabs] | Fil d'Ariane > Page > Sous-onglets                       |
```

- Topbar pure (Barre supérieure)

- Usage : 3 à 5 entrées de niveau supérieur. Idéal pour sites vitrines, applications simples ou orientées contenu.

- Structure : Hauteur fixe (56–64 px), alignement horizontal ancré en haut d'écran.

- Sidebar pure (Barre latérale gauche)

- Usage : 5 à 9 entrées contextuelles. Adapté aux outils métiers SaaS, tableaux de bord et applications complexes.

- Structure : Largeur de 220–280 px. Supporte les arborescences dépliables et l'état réductible (collapsed à 64 px).

- Navigation Hybride Topbar + Sidebar contextuelle (Double niveau)

- Usage : Applications d'entreprise à large périmètre fonctionnel.

- Structure : La Topbar gère le niveau macro (changement d'espace métier ou d'organisation : ex. Finances, RH, Projets). La Sidebar latérale s'actualise dynamiquement pour afficher uniquement l'arborescence du domaine retenu.

- Hub & Spoke (Architecture en Étoile)

- Usage : Applications mobiles ou portails d'opérations ponctuelles isolées.

- Structure : Un écran central (Hub) distribue vers des sous-modules autonomes (Spokes). Chaque sous-module propose une action de retour explicite vers le Hub central sans lien direct inter-modules.

- Palette de Commandes (Cmd/Ctrl + K)

- Usage : Raccourci universel pour utilisateurs experts (ex. Raycast, Linear, GitHub).

- Structure : Overlay modal centré activé au clavier. Combine recherche textuelle floue (fuzzy search), accès direct aux entités et exécution d'actions sans navigation visuelle.

- Rail d'icônes + Panneau secondaire (Double Rail)

- Usage : Plateformes multi-contextes (ex. VS Code, Slack, Discord).

- Structure : Un premier rail ultra-étroit (48–56 px) réservé aux commutations de haut niveau (canaux, serveurs, extensions), flanqué d'un panneau latéral (200–240 px) affichant les arborescences détaillées.

- Navigation contextuelle par Onglets & Fil d'Ariane (Drill-down)

- Usage : Exploration en profondeur de structures denses (ex: Liste $\rightarrow$ Détail entité $\rightarrow$ Sous-ressource).

- Structure : Le fil d'ariane (Breadcrumb) fixe le niveau de profondeur, tandis que les onglets sous le titre d'entité permettent de basculer entre les façades de la donnée sans changer de page.

### Interdits (DON'T)

- Ne pas multiplier plus de 2 niveaux de navigation verticale superposés dans une Sidebar.

- Ne jamais masquer la navigation principale de façon imprévisible lors du défilement sans proposer d'alternative d'accès immédiat.

- Ne jamais mélanger les sélecteurs de contexte d'organisation (ex: Tenant Switcher) au milieu des liens de navigation de contenu.

### Critères de Validation QA

- Test de localisation : À tout moment lors de la navigation, l'utilisateur doit pouvoir identifier sa position exacte via l'état actif mis en valeur visuellement dans le menu ou le fil d'ariane.

- Test du Ctrl+K : Vérifier que l'ouverture de la palette de commandes interrompt la capture d'événements de la page sous-jacente et que la touche Echap ferme l'interface sans perte de données.

## 4. Science de l'Optimisation d'Espace & Densité Visuelle

### Source scientifique & Études

- Edward Tufte (Data-Ink Ratio) : Maximiser la proportion d'encre (ou de pixels) consacrée à la donnée utile par rapport à l'encre consommée par les éléments de structure ou de décoration. $\text{Data-Ink Ratio} = \frac{\text{Pixels de données utiles}}{\text{Total de pixels utilisés}}$.

- Lois de la Gestalt : Proximité et Région commune. La délimitation d'espaces n'a pas besoin de bordures lourdes ; l'alignement strict et le contraste de fond suffisent à grouper les éléments.

```
[Anti-Pattern : Encombrement]          [Pattern Optimisé : Densité Tufte]
+---------------------------------+    +---------------------------------+
| BORDEAU | Client: Jean Dupont   |    | Jean Dupont                     |
|---------+-----------------------|    | ID: #4829  •  Actif             |
| STATUT  | Actif                 |    +---------------------------------+
+---------------------------------+    (Alignement, typographie contrastée,
(Bordures lourdes, répétition)          absence de lignes inutiles)
```

### Principes d'optimisation sans encombrement (Clutter-Free Density)

- Distinction entre Densité et Encombrement (Clutter) :

- La Densité présente un volume important de données structurées, lisibles et hautement alignées.

- L'Encombrement découle du bruit visuel : bordures superflues, ombres portées trop sombres, étiquettes répétitives et espacements incohérents.

- Action Inline & Divulgation Progressive (Progressive Disclosure) :

- Éviter d'insérer 4 à 5 boutons d'action visibles par ligne dans les tableaux de données.

- Conserver uniquement l'action primaire visible (ex. Éditer), et regrouper les actions secondaires (Dupliquer, Exporter, Archiver) dans un menu contextuel ... accessible au survol ou au clic.

- Fusion d'informations connexes (Data Merging) :

- Fusionner verticalement les éléments liés au sein d'une seule cellule au lieu de démultiplier les colonnes.

- Exemple : Ligne 1 = Nom du document (Texte principal en gras 13px) / Ligne 2 = Poids et format (Sous-texte en gris 11px). Évite le défilement horizontal.

- Panneaux escamotables (Collapsible Panes) :

- Rendre les zones de filtres latéraux ou les panneaux d'inspection rétractables via un raccourci clavier ou un bouton d'action simple.

- Offrir 100 % de la largeur disponible au composant principal (tableau, graphe, zone d'édition) sur demande.

### Interdits (DON'T)

- Ne jamais encadrer chaque cellule d'un tableau avec des bordures verticales et horizontales sombres (utiliser uniquement un séparateur horizontal subtil #EDF2F7).

- Ne jamais répéter le libellé de l'unité sur chaque ligne d'une colonne (mettre l'unité (EUR) ou (%) uniquement dans l'en-tête de la colonne).

- Ne jamais sacrifier la taille de la police en dessous de 11px sous prétexte de vouloir densifier l'interface.

### Critères de Validation QA

- Calcul de l'efficience d'affichage : Sur un écran standard $1920 \times 1080$, un tableau de données haute densité optimisé doit afficher au moins 15 à 18 lignes visibles sans nécessiter de défilement vertical.

- Test de lisibilité des données (Tufte) : Supprimer toutes les bordures intérieures d'un composant de données : l'alignement typographique et les alternances de fonds légers doivent suffire à maintenir une lecture fluide.

## 5. Système Complet de Vérification d'Interface (Protocole QA en 4 Niveaux)

Ce protocole doit être exécuté lors de chaque recette d'interface, que ce soit par une revue humaine ou par une instruction automatisée transmise à un agent IA.

```
+-------------------------------------------------------------------+
|               PROTOCOLE QA D'INTERFACE EN 4 NIVEAUX              |
+-------------------------------------------------------------------+
| NIVEAU 1 : Vérification Visuelle & Spatiale (5 tests immédiats)   |
| NIVEAU 2 : Interaction, Clavier & Formulaires Intelligent         |
| NIVEAU 3 : Ergonomie Mobile à une main (Thumb Zone)              |
| NIVEAU 4 : Code, Tokens & Robustesse Asynchrone                   |
+-------------------------------------------------------------------+
```

### Niveau 1 — Vérification Visuelle & Spatiale (Les 5 tests immédiats)

- Test du Flou (Blur Test) : Appliquer un flou gaussien de 5px sur l'écran. La hiérarchie visuelle, l'action principale et les zones d'alerte doivent rester immédiatement identifiables.

- Test des 5 Secondes : Exposer l'écran pendant 5 secondes à un utilisateur. Il doit pouvoir énoncer le sujet principal de la page et l'action prioritaire attendue.

- Test de Stabilité de Modale : Parcourir les étapes d'un workflow sans observer de saut d'élément visuel ni de changement de largeur du conteneur.

- Test d'Alignement des Chiffres (tabular-nums) : Vérifier que toutes les valeurs numériques alignées verticalement dans les tableaux utilisent la propriété CSS font-variant-numeric: tabular-nums pour éviter les décalages de colonnes.

- Test d'Occupation d'Écran : S'assurer que les écrans professionnels exploitent la largeur disponible sans créer de marges mortes artificielles démesurées tout en contrôlant la longueur maximale de ligne de texte (ch <= 75).

### Niveau 2 — Vérification Interactive & Formulaires

- Navigation 100 % Clavier : L'indicateur de focus (focus ring) doit être parfaitement visible (2px solide avec contraste $\ge 4.5:1$). L'ordre du parcours (tabindex) doit suivre la logique visuelle.

- Gestion des Listes Longues : Tout composant de sélection proposant plus de 15 éléments doit obligatoirement basculer en mode recherche filtrable (Combobox).

- Résilience de Saisie : Les erreurs doivent s'effacer dynamiquement à la correction. Les valeurs de saisie doivent être préservées en cas d'échec de soumission réseau.

- Pattern de Suppression Sûre : Remplacer les modales de confirmation bloquantes pour les actions réversibles par une exécution immédiate assortie d'un Toast de notification avec action Annuler (Undo).

### Niveau 3 — Vérification Mobile à une main

- Zone du Pouce (Thumb Zone) : Placer les actions principales et les barres de navigation dans la zone d'accès naturel du pouce (tiers inférieur de l'écran).

- Taille des Cibles Tactiles : Toutes les zones cliquables ou interactives doivent présenter une taille minimale de 44 × 44 px (ou 48 × 48 px selon la norme Android).

- Absence de Scroll Horizontal Involontaire : La largeur du document ne doit pas dépasser 100vw. Aucun défilement horizontal global ne doit être provoqué par des éléments mal dimensionnés.

- Bottom Sheets vs Modales : Les fenêtres modales doivent automatiquement se transformer en panneaux glissants depuis le bas (Bottom Sheets) sur les résolutions de type smartphone ($\le 640 px$).

### Niveau 4 — Vérification Code & Performance

- Conformité au Design System (Tokens) : Aucune valeur de couleur Hex ou de taille en pixel ne doit être directement écrite (hardcodée) dans les fichiers de composants. Seuls les tokens CSS/Tailwind homologués doivent être employés.

- Zéro Emoji / Textes Factices d'IA : Interdiction d'utiliser des emojis non structurés en guise d'icônes d'interface ou de textes de remplissage génériques (Lorem Ipsum, "IA Slop").

- États Asynchrones Obligatoires : Tout composant alimenté par des données distantes doit implémenter 4 états explicites :

- Idle (repos)

- Loading (chargement avec squelette structural Shimmer)

- Empty (état vide explicite avec action de guidage)

- Error (état d'erreur avec option de réessai Retry)

## 6. Mécanisme d'Auto-Justification Scientifique pour les IA

Lors de l'émission de consignes de développement d'interface destinées à des modèles de langage ou assistants de code (Claude Code, Cursor, Gemini, Copilot), le bloc d'instruction suivant doit être injecté. Il oblige l'IA à documenter la validité ergonomique et cognitive de ses décisions techniques avant d'exécuter le code.

```
### DIRECTIVE IMPÉRATIVE : AUTO-JUSTIFICATION ERGONOMIQUE ET COGNITIVE
Avant de générer ou de modifier le moindre composant d'interface utilisateur, tu dois obligatoirement inclure un bloc de justification structuré répondant au format ci-dessous. 
Chaque choix de composant, de disposition spatiale ou de comportement d'interaction doit être explicite et rattaché à sa source scientifique, loi ergonomique ou étude UX de référence.
#### Structure attendue du bloc de réflexion préliminaire :
```rationale
1. CHOIX DES COMPOSANTS DE SAISIE :
   - Composant retenu : [ex. Combobox filtrable]
   - Source / Rationale : [ex. Étude Baymard Institute — Volume de données > 15 options, prévient le scroll fastidieux]
2. STABILITÉ SPATIALE & LAYOUT :
   - Dimensions : [ex. Largeur fixe 560px, min-height 420px]
   - Source / Rationale : [ex. Rensink (2002) & Loi de Fitts — Prévention de la cécité au changement et préservation de la position des actions]
3. OPTIMISATION DE DENSITÉ VISUELLE :
   - Technique appliquée : [ex. Data Merging sur 2 lignes + Actions contextuelles au survol]
   - Source / Rationale : [ex. Edward Tufte Data-Ink Ratio — Élimination du bruit visuel et des colonnes redondantes]
4. VALIDAITON ET ERGONOMIE D'INTERACTION :
   - Pattern de validation : [ex. "Reward Early, Punish Late" avec retour d'erreur onBlur]
   - Source / Rationale : [ex. Luke Wroblewski — Réduction de l'anxiété de saisie et de la charge cognitive]
```

Ne génère aucun code front-end tant que ce bloc de justification n'est pas intégralement renseigné.
