# Document 10 — Navigation, Pages & Sous-Pages, Listes, Kanban, Statuts & Personnalisation

Guide standard d'architecture de l'information et d'ergonomie des composants d'interface. Ce document définit les normes d'organisation spatiale, d'accessibilité et de configuration applicative.

## 1. Architecture de Navigation

### Source scientifique / Étudess

- Nielsen Norman Group (NN/g) : Recommandations sur les structures Top Navigation vs. Left Navigation et la supériorité de la Flat Hierarchy face aux arborescences profondes.

- Loi de Hick-Hyman : Le temps nécessaire pour prendre une décision augmente de manière logarithmique avec le nombre et la complexité des choix.

- Loi de Miller / Cowan : Limite de la capacité de traitement de la mémoire de travail (7 ± 2 éléments chez Miller, réévaluée à 4 ± 1 blocs d'information complexes par Cowan).

### Principe

L'architecture de navigation doit offrir une visibilité immédiate sur les espaces clés tout en minimisant la profondeur d'accès. La topographie de l'application privilégie la largeur sur la profondeur pour éviter la désorientation visuelle.

```
       [ TOPBAR (48-56px) : Actions globales / Profil ]
┌──────────────┬──────────────────────────────────────────────┐
│ SIDEBAR      │  Breadcrumb: Projets › Banko! › Règles       │
│ (220-260px)  ├──────────────────────────────────────────────┤
│              │  [ Vue Onglet 1 ]  [ Vue Onglet 2 ]           │
│ Rail réduit  │──────────────────────────────────────────────┤
│ (56-64px)    │                                              │
│              │  Zone de travail (100% hauteur utile)         │
└──────────────┴──────────────────────────────────────────────┘
```

### Règles opérationnelles (DO)

- Choix du modèle de navigation :

- Barre supérieure (Topbar, 48–56 px) : Utiliser pour 3 à 5 sections principales maximum, dans le cadre d'applications grand public ou orientées contenu, afin d'allouer 100 % de la largeur à l'espace de travail.

- Barre latérale gauche (Sidebar, 220–260 px) : Appliquer dès lors que l'application comporte 5 à 9 rubriques principales, des sous-sections fréquentes ou des changements récurrents d'espaces de travail.

- Réduction dynamique (Sidebar collapsible) :

- Offrir la possibilité de replier la barre latérale en un rail d'icônes (56–64 px).

- Conserver l'état de réduction en mémoire locale (localStorage).

- Afficher un tooltip explicatif au survol de chaque icône en mode réduit.

- Fournir le raccourci clavier standard Ctrl/Cmd + B.

- Maintenir un repère actif univoque (barre verticale colorée de 3 px ou fond contrasté) sur l'élément sélectionné en mode rail.

- Hiérarchie et profondeur (Niveau max : 2 à 3) :

- Structurer l'application de manière platte (Flat Hierarchy).

- Organiser les sous-pages via des onglets horizontaux (Tabs) positionnés en haut de la zone de contenu (ex. Aperçu | Dépenses | Réglages).
|---|* Insérer un Fil d'Ariane (Breadcrumb) dès le niveau 3 (ex. Projets › Banko! › Règles d'import).

- Attribuer un objectif unique par page : 1 verbe d'intention dominant et 1 action primaire clairement identifiable.

### Interdits (DON'T)

- Ne pas dépasser 3 niveaux de profondeur dans l'arborescence de navigation.

- Éviter les sous-menus déroulants au survol (flyout menus) dans la sidebar réductible qui masquent le contenu applicatif.

- Ne pas utiliser la Topbar et la Sidebar simultanément pour lister des liens de même niveau hiérarchique.

- Ne pas masquer le raccourci de réduction de la sidebar dans un menu de configuration secondaire.

### Critères de Validation QA

- La navigation principale contient au maximum 9 rubriques en Sidebar et 5 en Topbar.

- Le raccourci Ctrl/Cmd + B bascule l'état de la Sidebar sans erreur de rendu.

- L'état replié/déplié de la Sidebar persiste après un rafraîchissement de la page.

- Le Fil d'Ariane est présent et fonctionnel sur tous les contenus de niveau 3.

## 2. Prévention des « Écrans dans les Écrans »

### Source scientifique / Études

- Théorie de la charge cognitive (John Sweller) : Réduction de la charge cognitive extrinsèque provoquée par la perte de repères spatiaux et la superposition d'éléments d'interface.

- Heuristiques d'orientation spatiale (NN/g) : Impact négatif du chevauchement de contextualisation et des conteneurs à défilements multiples (nested scrollbars).

### Principe

Chaque action doit conserver un cadre de référence visuel clair. L'empilement de fenêtres ou de conteneurs autonomes à l'intérieur d'un même écran dégrade la lisibilité et complique la navigation contextuelle.

### Règles opérationnelles (DO)

- Maintenir une hiérarchie d'affichage stricte à deux niveaux maximum : Page principale → Tiroir latéral (Drawer) OU Modale simple (1 seul niveau).

- Si la modification d'un élément requiert un formulaire complexe ou multi-étapes, effectuer une transition vers une page dédiée munie d'un bouton de retour explicite (ex. ← Retour aux projets).

- Utiliser un tiroir latéral droit (Drawer) pour l'affichage de détails ou l'édition rapide d'un élément de liste sans perte de vue du tableau sous-jacent.

- Verrouiller le défilement du document d'arrière-plan (body scroll lock) lorsqu'une modale ou un tiroir latéral est ouvert.

```
[ Correct ]    Page Principale ───────► Drawer / Modale (1er niveau)
[ Interdit ]  Page ───► Modale 1 ───► Modale 2 ───► Sous-iframe
```

### Interdits (DON'T)

- Ne jamais ouvrir une modale par-dessus une autre modale (empilement de modales).

- Ne pas intégrer d'iframe applicative générant une zone d'interaction isolée avec ses propres barres de défilement.

- Ne pas utiliser de panneaux latéraux déclenchant une modale superposée.

- Éviter la présence de barres de défilement imbriquées (scrollbars verticales multiples au sein d'un même panneau).

### Critères de Validation QA

- Aucune action de l'interface ne produit l'ouverture d'une modale au-dessus d'une modale existante.

- La page ne présente jamais plus d'une barre de défilement verticale active simultanément dans l'axe de lecture principal.

- Tout tiroir latéral ou modale peut être fermé via la touche Échap.

## 3. Règles d'un Bon Dashboard

### Source scientifique / Études

- Stephen Few (Information Dashboard Design) : Principes d'organisation visuelle et de dédensification des indicateurs de performance.

- NN/g : Directives d'agencement des tableaux de bord en fonction des buts opérationnels et analytiques des utilisateurs.

### Principe

Un tableau de bord doit répondre immédiatement à une intention claire : décider d'une action imminente (Opérationnel) ou analyser une situation globale (Analytique). Ces deux usages répondent à des structures d'affichage distinctes.

```
┌─────────────────────────────────────────────────────────────┐
│ DASHBOARD OPÉRATIONNEL                                      │
├──────────────────────────────┬──────────────────────────────┤
│ PROCHAINE ACTION PRIORITAIRE │ ÉLÉMENTS EN ATTENTE (3)      │
│ [ Exécuter la tâche ]        │ • Validation devis #104      │
├──────────────────────────────┴──────────────────────────────┤
│ ACCÈS RAPIDE / ACTIVITÉ RÉCENTE                             │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ DASHBOARD ANALYTIQUE         [ Sélecteur Période: 30j  ▼ ]  │
├─────────────┬─────────────┬─────────────┬───────────────────┤
│ KPI 1       │ KPI 2       │ KPI 3       │ KPI 4             │
├─────────────┴─────────────┴─────────────┴───────────────────┤
│ GRAPHIQUE PRINCIPAL (Tendance)                              │
└─────────────────────────────────────────────────────────────┘
```

### Règles opérationnelles (DO)

- Dashboard Opérationnel (« Que dois-je faire maintenant ? ») :

- Placer en haut de page la prochaine action prioritaire et la liste des tâches en attente ou urgentes.

- Fournir des raccourcis d'accès direct aux objets de travail récents.

- Bannir les graphiques complexes de la zone de premier regard ( above the fold ).

- Dashboard Analytique (« Comment se porte l'activité ? ») :

- Limiter l'écran à 5 à 7 modules maximum : 3 à 4 indicateurs clés (KPI) avec leurs tendances, 1 à 2 graphiques de synthèse et 1 journal d'alertes.

- Uniformiser l'ensemble des modules du tableau de bord via un sélecteur de période temporel unique situé en haut à droite.

- Principe d'actionnabilité :

- Rendre chaque chiffre, KPI ou élément d'alerte cliquable. Le clic doit rediriger vers la vue détaillée filtrée selon l'attribut sélectionné.

### Interdits (DON'T)

- Ne pas mélanger au sein d'un même écran les flux d'actions opérationnelles quotidiennes et les analyses statistiques long terme.

- Ne pas intégrer d'éléments visuels purement décoratifs ou de jauges complexes sans valeur décisionnelle.

- Ne pas utiliser de périodes temporelles incohérentes entre deux cartes d'un même tableau de bord sans justification explicite.

### Critères de Validation QA

- Chaque carte KPI d'un tableau analytique propose un lien vers la donnée source détaillée.

- Le sélecteur de période temporelle met à jour simultanément l'ensemble des modules analytiques de la page.

- Le dashboard opérationnel affiche au moins un point d'entrée d'action immédiate sans défilement.

## 4. Gestion des Listes & Tableaux Kanban

### Source scientifique / Études

- Loi de Fitts : La vitesse d'accès à une cible dépend de la distance et de la taille de la zone d'interaction.

- Principes de la Gestalt (Proximité et Région Commune) : Organisation visuelle des cartes et éléments sous forme de groupes cohérents.

- Système Kanban / Management Visuel (Toyota) : Optimisation des flux de travail par la limitation du travail en cours (WIP) et la réduction du bruit visuel.

### Règles des Listes efficaces

- Structure des colonnes : Afficher 3 à 5 colonnes essentielles par ligne par défaut (ex. Identifiant/Titre, Statut, Métrique clé, Date/Échéance, Actions). Remiser les attributs secondaires dans un panneau de détail.

- Contrôles permanents : Proposer au-dessus de la liste une barre de recherche textuelle à exécution instantanée, 2 à 3 filtres rapides sous forme de puces (chips), et des en-têtes de colonnes triables.

- Actions de ligne : Rendre les actions contextuelles accessibles au survol (desktop) ainsi qu'au focus clavier/tactile via un menu contextuel .... Prévoir la sélection multiple par case à cocher pour les traitements par lot.

### Rules d'un bon Kanban

```
┌───────────────────┬───────────────────┬───────────────────┐
│ À FAIRE (3)       │ EN COURS (2)      │ TERMINÉ (8)       │
├───────────────────┼───────────────────┼───────────────────┤
│ ┌───────────────┐ │ ┌───────────────┐ │ ┌───────────────┐ │
│ │ Titre (2 l.)  │ │ │ Titre (2 l.)  │ │ │ Titre (2 l.)  │ │
│ │ [Tag]  (📅/👤)│ │ │ [Tag]  (📅/👤)│ │ │ [Tag]  (📅/👤)│ │
│ └───────────────┘ │ └───────────────┘ │ └───────────────┘ │
└───────────────────┴───────────────────┴───────────────────┘
```

- Nombre de colonnes : Restreindre l'affichage simultané à 3 à 5 colonnes maximum (ex. À faire, En cours, En attente, Terminé) pour proscrire le défilement horizontal de la page.

- Anatomie d'une carte (3 informations maximum) :

- Titre de la tâche (limité à 2 lignes avec tronquage ...).

- Étiquette de catégorie ou badge de priorité.

- Date d'échéance ou avatar du responsable.

- Accessibilité des changements d'état : Proposer impérativement une alternative au glisser-déposer (Drag & Drop). Chaque carte doit intégrer un menu de changement de statut explicite (Déplacer vers → [Colonne]), utilisable au clavier, à la synthèse vocale et sur écran tactile.

### Interdits (DON'T)

- Ne pas afficher la totalité des champs de la base de données au sein du tableau récapitulatif ou de la carte Kanban.

- Ne pas imposer le glisser-déposer comme unique moyen de changer l'état d'une carte Kanban.

- Ne pas insérer de paragraphes complets ou de descriptions longues à l'intérieur des cartes Kanban.

### Critères de Validation QA

### 4.3 Système de Filtrage Intelligent pour Listes Volumineuses (Faceted Search & Progressive Filtering — Baymard Institute & Hearst)

- Sources scientifiques : Baymard Institute (E-Commerce & App Filtering UX), Marti Hearst (Search User Interfaces, Cambridge University Press).

- Règles opérationnelles :

- Combinaison Recherche Instantanée + Filtres à Facettes : placer une barre de recherche textuelle instantanée (recherche multi-champs avec surbrillance des termes) couplée à 3 à 5 filtres rapides visibles en pilules (chips) ou menus déroulants compacts pour les critères les plus fréquents (statut, catégorie, période).

- Divulgation progressive des filtres avancés : masquer les critères secondaires derrière un bouton « + Filtres » ouvrant un tiroir latéral ou panneau repliable, plutôt que d'empiler 12 listes déroulantes en haut de page.

- Compteurs prédictifs & Zéro résultat impossible : afficher si possible le nombre d'éléments correspondants à côté de chaque option de filtre (En cours (14)), et griser ou masquer les combinaisons qui renverraient 0 résultat.

- Pilules de filtres actifs & Réinitialisation en 1 clic : afficher clairement les filtres appliqués sous la barre (Statut : En cours ×, Catégorie : Énergie ×) avec un bouton « Tout effacer » immédiatement accessible.

- Persistance & Partage d'état : mémoriser les filtres actifs dans l'URL (query params) ou en session locale pour que l'utilisateur ne perde pas son tri/filtrage en ouvrant une fiche puis en revenant à la liste.

- État « Aucun résultat » actionnable : si la recherche + filtres ne renvoie rien, afficher un message clair avec un bouton « Réinitialiser les filtres » en 1 clic.

- La liste permet la recherche instantanée et le tri sur au moins 2 colonnes clés.

- Les cartes Kanban contiennent un maximum de 3 blocs d'information distincts.

- Il est possible de déplacer une carte Kanban d'une colonne à une autre sans utiliser la souris (clavier uniquement).

- Les filtres secondaires sont masqués sous un bouton « + Filtres » ouvrant un tiroir ou panneau dédié.

- Les filtres actifs sont visibles sous forme de pilules supprimables individuellement avec un bouton « Tout effacer ».

- L'état des filtres et du tri persiste dans l'URL (query params) ou la session utilisateur lors de la navigation.

## 5. Cycle de Vie et Présentation des Statuts d'un Objet

### Source scientifique / Études

- WCAG 2.2 (Critère 1.4.1 — Use of Color) : La couleur ne doit pas être utilisée comme le seul moyen visuel de communiquer une information, d'indiquer une action ou de distinguer un élément.

- Théorie des automates finis appliquée à l'UX : Modélisation formelle des états d'un système et des transitions autorisées pour prévenir les actions invalides.

### Principe

L'état d'un objet doit être intelligible sans ambiguïté contextuelle ou chromatique. Les transitions entre les états doivent guider l'utilisateur en ne lui exposant que les commandes valides à l'instant T.

### Règles opérationnelles (DO)

- États définis : Restreindre le cycle de vie d'un objet à 3 à 5 états mutuellement exclusifs (ex. Brouillon, Actif, En pause, Terminé, Archivé).

- Triple codage visuel obligatoire : Chaque composant de statut (badge) doit combiner systématiquement :

- Une couleur à fond subtil et texte fortement contrasté.

- Une icône explicite ou un point d'état repérable.

- Un libellé textuel clair en toutes lettres.

- Transitions guidées : Restreindre l'affichage des boutons d'action aux seules transitions valides depuis l'état actuel de l'objet (ex. un objet au statut Brouillon affiche le bouton « Publier », mais masque les boutons « Archiver » ou « Clôturer »).

```
   [ Badge Statut Triple-Codé ]
   ┌──────────────────────────┐
   │  (●)  En cours           │   <-- Couleur + Icône/Point + Texte
   └──────────────────────────┘
```

### Palette visuelle recommandée pour les statuts

```
┌─────────────┬──────────────────┬──────────────────┬──────────────────┐
│ Statut      │ Couleur Fond     │ Couleur Texte    │ Couleur Bordure  │
├─────────────┼──────────────────┼──────────────────┼──────────────────┤
│ Brouillon   │ #F1F5F9          │ #475569          │ #E2E8F0          │
│ En cours    │ #EFF6FF          │ #1D4ED8          │ #BFDBFE          │
│ Validé      │ #F0FDF4          │ #15803D          │ #BBF7D0          │
│ Alerte      │ #FEF2F2          │ #B91C1C          │ #FCA5A5          │
└─────────────┴──────────────────┴──────────────────┴──────────────────┘
```

### Interdits (DON'T)

- Ne jamais représenter un statut par un simple point de couleur (dot) sans texte d'accompagnement.

- Ne pas utiliser de couleurs vives ou saturées pour les fonds de badges de statut (privilégier les teintes pastel/subtiles).

- Ne pas laisser visibles des actions impossibles sous forme d'icônes désactivées sans explication contextuelle.

### Critères de Validation QA

- Tous les badges de statut répondent au principe du triple codage (couleur, forme/icône, texte).

- Le rapport de contraste du texte du badge par rapport à son fond respecte le ratio WCAG AA (4.5:1 minimum).

- Seules les actions permises par l'état actuel de l'objet sont affichées dans la barre d'action.

## 6. Concevoir pour des Utilisateurs Non-Informaticiens

### Source scientifique / Études

- Donald Norman (The Design of Everyday Things) : Alignement des modèles mentaux du système avec les modèles mentaux de l'utilisateur.

- NN/g (Infrequent & Novice Users) : Comportements et besoins d'apprentissage des utilisateurs occasionnels ou non-techniciens.

### Diagnostic de la confusion visuelle (Les 4 causes)

- Absence de hiérarchie visuelle : Densité d'information uniforme où la typographie, les tailles et les couleurs ne permettent pas d'identifier les éléments prioritaires.

- Vocabulaire centré système : Exposition de la logique de la base de données (Instance, Entité, Synchronisation du cache) à la place des termes métiers de l'utilisateur.

- Absence de retour d'état (Feedback) : Manque de confirmation visuelle instantanée suite à une action utilisateur.

- Surcharge de configurations initiales : Absence de paramètres par défaut pré-configurés imposant un choix technique d'entrée.

### Règles d'or opérationnelles (DO)

- Vocabulaire métier unifié : Remplacer l'ensemble de la terminologie technique par le lexique utilisé par le métier. Maintenir une désignation unique par objet sur l'intégralité de l'interface.

- Signifiants explicites (Affordance) : Structurer visuellement les éléments interactifs (boutons dotés d'un relief ou d'un fond affirmé, liens soulignés ou colorés, champs de saisie encadrés).

- Micro-copies explicatives : Placer sous les champs complexes une phrase d'aide intégrant un exemple concret (ex. « Exemple : 1 250 € ») au lieu d'une règle formelle.

```
┌─────────────────────────────────────────────────────────────┐
│ Label du champ                                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Saisie utilisateur...                                   │ │
│ └─────────────────────────────────────────────────────────┘ │
│ Ex. : 1 250 € (Montant TTC avant déduction)                 │
└─────────────────────────────────────────────────────────────┘
```

### Interdits (DON'T)

- Ne pas utiliser de termes issus de l'architecture logicielle (Database, Payload, Parsing, Token).

- Ne pas alterner entre plusieurs synonymes pour désigner un même composant ou objet (ex. ne pas mélanger « Dossier », « Projet » et « Espace »).

- Ne pas dissimuler des actions de saisie essentielles derrière des interactions uniquement visibles au survol de la souris.

### Critères de Validation QA

- L'interface ne comporte aucun terme issu du jargon technique logiciel.

- Chaque champ de formulaire complexe dispose d'une ligne d'aide avec un exemple de saisie.

- Le vocabulaire désignant les objets principaux est identique sur toutes les pages de l'application.

## 7. Personnalisation de l'Interface

### Source scientifique / Études

- NN/g (Customization vs. Personalization) : Différence d'impact entre la personnalisation explicite (contrôlée par l'utilisateur) et implicite (calculée par le système).

- Barry Schwartz (The Paradox of Choice) : L'excès de choix d'aménagement augmente l'anxiété et diminue la satisfaction d'utilisation.

- Effet IKEA (Norton, Mochon & Ariely, 2012) : Une personnalisation ciblée accroît l'appropriation du produit, sous réserve qu'elle ne demande pas un effort d'installation excessif.

### Ce que les utilisateurs apprécient (Personnalisation utile)

```
┌─────────────────────────────────────────────────────────────┐
│ PRÉFÉRENCES D'AFFICHAGE                                     │
├─────────────────────────────────────────────────────────────┤
│ Thème d'affichage :  ( ) Clair   ( ) Sombre   (•) Système   │
│ Densité de la grille: (•) Confortable  ( ) Compacte         │
│ Navigation rapide :  [★ Projets Actifs]  [★ Factures]       │
└─────────────────────────────────────────────────────────────┘
```

- Thème visuel : Bascule explicite entre thème Clair, Sombre et Alignement sur le Thème Système.

- Densité d'affichage : Choix du niveau de densité des tableaux et listes (Confortable [remplissage 12 px] / Compacte [remplissage 6 px]).

- Favoris : Possibilité d'épingler 3 à 5 raccourcis de dossiers ou vues dans la section supérieure de la navigation.

- Mémorisation contextuelle : Sauvegarde automatique des filtres appliqués, du tri sélectionné et de l'état (ouvert/fermé) de la navigation latérale.

### Les pièges mortels à éviter (DON'T)

- Le syndrome de la page blanche : Ne jamais livrer un tableau de bord vierge d'indicateurs exigeant une configuration manuelle préalable. Fournir une disposition par défaut optimisée.

- La sur-personnalisation cosmétique : Interdire la modification arbitraire des couleurs primaires de l'interface ou des familles typographiques afin de préserver l'accessibilité et la cohérence de marque.

- L'absence de réinitialisation : Proposer impérativement un bouton permettant le retour à la configuration visuelle d'origine (Rétablir l'affichage par défaut).

### Critères de Validation QA

- Un bouton « Rétablir l'affichage par défaut » est présent sur tous les écrans personnalisables.

- La première connexion d'un utilisateur affiche un tableau de bord opérationnel pré-configuré.

- Les modifications de densité et de thème n'altèrent pas la lisibilité des textes ni les ratios de contraste.

## 8. Grille Complète de Critères de Validation QA

Le tableau ci-dessous récapitule les 12 points de contrôle indispensables pour valider la conformité de l'interface avant la mise en production.

```
{
  "title": "Grille de contrôle QA - Ergonomie et Navigation"
}
| ID | Domaine | Point de contrôle QA | Méthode de vérification | Statut |
|---|---|---|---|---|
| QA-01 | Navigation | La Sidebar se replie via `Ctrl/Cmd + B` et conserve son état au rafraîchissement. | Test manuel clavier + Refresh | [ ] Pass |
| QA-02 | Navigation | Le Fil d'Ariane (Breadcrumb) est affiché et cliquable dès le niveau 3 de l'arborescence. | Inspection visuelle | [ ] Pass |
| QA-03 | Écrans | Aucune modale ne s'ouvre par-dessus une autre modale. | Test de parcours d'édition | [ ] Pass |
| QA-04 | Écrans | Une seule barre de défilement verticale principale est active par fenêtre. | Contrôle du défilement | [ ] Pass |
| QA-05 | Dashboard | Tous les indicateurs (KPI) du tableau analytique sont cliquables et filtrent les données sources. | Test de cliquabilité | [ ] Pass |
| QA-06 | Dashboard | Le Dashboard analytique comporte au maximum 7 modules sur un même écran. | Comptage des composants | [ ] Pass |
| QA-07 | Kanban | Toute action du Kanban est réalisable au clavier via un menu déroulant de statut. | Navigation par touche Tab/Entrée | [ ] Pass |
| QA-08 | Kanban | Les cartes Kanban contiennent 3 informations maximum (Titre 2 lignes max, Badge, Échéance/Avatar). | Inspection visuelle | [ ] Pass |
| QA-09 | Statuts | Chaque statut utilise un triple codage (Couleur, Icône/Point, Texte explicite). | Inspection visuelle | [ ] Pass |
| QA-10 | Vocabulaire | Absence totale de terme technique issu de la base de données dans l'interface UI. | Audit lexical du contenu | [ ] Pass |
| QA-11 | Accessibilité | Les champs de saisie complexes comportent une ligne d'aide explicite avec exemple. | Inspection des formulaires | [ ] Pass |
| QA-12 | Réglages | Un bouton « Rétablir l'affichage par défaut » réinitialise les modifications visuelles. | Test d'action | [ ] Pass |
```
