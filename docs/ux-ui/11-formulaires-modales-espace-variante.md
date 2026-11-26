# Document 11 — Formulaires Intelligents, Modales Stables, Navigation Avancée & Optimisation d'Espace

Guide des standards opérationnels pour le design d'interface moderne, l'ergonomie cognitive et l'ingénierie des composantes d'interaction complexes.

## 1. Modales Stables & Assistants Multi-Étapes (Stabilité Spatiale & Loi de Fitts)

### Source scientifique & Études

- Loi de Fitts (1954) : Le temps nécessaire pour atteindre une cible est fonction de la distance à la cible et de sa taille. La modification imprévue des coordonnées spatiales des éléments d'interaction détruit la mémoire motrice et ralentit l'exécution.

- Nielsen Norman Group (NN/g) : Études sur les assistants (Wizards) et la désorientation spatiale. Les changements imprévisibles de dimensions de fenêtre provoquent une charge cognitive élevée et des clics erronés récurrents.

### Principe

Garantir une stabilité visuelle et spatiale stricte lors de la navigation au sein des interfaces modales et assistants multi-étapes, préservant la mémoire motrice de l'utilisateur et limitant la désorientation lors des transitions d'état.

### Règles opérationnelles (DO)

- Stabilité visuelle & adaptabilité au viewport : Privilégier des dimensions stables (ex. min-height cohérent et pied de page fixe) afin de prévenir le déplacement imprévu des boutons sous le curseur (Loi de Fitts [N2]), tout en conservant une largeur et une hauteur adaptatives au viewport, au zoom 200 % et au reflow mobile (WCAG 1.4.10 [N1]).

- Défilement interne contraint : Si l'étape requiert un volume d'information supérieur, conserver l'en-tête (Header) et le pied de page (Footer) ancrés de manière absolue. Seul le corps central de la modale (overflow-y: auto) doit faire l'objet d'un défilement.

- Coordonnées des contrôles fixes : Conserver les boutons d'action d'étape (« Suivant », « Précédent », « Valider ») exactement aux mêmes coordonnées x, y tout au long du parcours.

- Indicateur de progression explicite : Afficher un fil d'Ariane ou une mention textuelle normalisée en haut de modale (ex. « Étape 2 sur 4 — Informations de paiement »).

### Interdits (DON'T)

- Ne jamais modifier dynamiquement les dimensions d'une modale de manière à déplacer brutalement les cibles d'action principales sous le curseur de l'utilisateur.

- Ne jamais déplacer le bouton principal de validation ou de progression entre deux étapes.

- Ne jamais intégrer de défilement s'appliquant à l'ensemble de la modale en déplaçant l'en-tête et les boutons d'action hors du champ visuel.

### Critères de Validation QA

| Test | Condition d'acceptation | Validé |
| --- | --- | --- |
| Stabilité des dimensions | Les limites bounding box de la modale restent identiques de l'étape 1 à N. | [ ] |
| Ancrage des actions | Les boutons « Précédent » et « Suivant » restent positionnés au pixel près. | [ ] |
| Isolation du défilement | La barre de défilement n'affecte que la zone centrale de contenu. | [ ] |
| Indicateur d'étape | Le titre principal indique la position exacte dans le processus multi-étapes. | [ ] |

## 2. Formulaires Intelligents : Pré-remplissage & Matrice Scientifique de Choix des Champs

### Source scientifique & Études

- Baymard Institute : Form Usability Research (15+ années d'études ocularimétriques et de tests utilisateurs). Réduire l'effort de saisie augmente directement le taux de complétion.

- Luke Wroblewski : Web Form Design: Filling in the Blanks. Travaux sur la validation en temps réel (Inline Validation: Reward Early, Punish Late) et la réduction du nombre d'interactions clavier.

- Loi de Tesler : Loi de conservation de la complexité. La complexité inhérente à un système doit être prise en charge par l'application et non par l'utilisateur.

### Principe

Minimiser l'effort cognitif et mécanique de saisie en automatisant la saisie contextuelle et en employant le composant d'interaction strictement adapté au volume et à la nature des données requises.

### Règles opérationnelles (DO)

- Pré-remplissage et valeurs par défaut sûres : Privilégier des valeurs par défaut sûres et réversibles à partir des données connues ou déductibles (adresse IP, géolocalisation, historique, données de session). Distinguer visuellement toute valeur déduite ou suggérée (« Suggéré ») afin de prévenir les validations involontaires d'informations erronées tout en offrant une modification en 1 clic.

- Validation Inline (Reward Early, Punish Late) :

- Afficher le signal de confirmation (icône verte, contour d'approbation) dès que le format saisi atteint la validité.

- Différer l'affichage des messages d'erreur au changement de focalisation (onBlur) pour ne pas interrompre l'utilisateur pendant sa frappe.

### Matrice de choix des composants (Recommandations empiriques contextuelles [N3])

- 2 options mutuellement exclusives (Recommandation [N3]) : Toggle Switch si l'effet est immédiat (ex. activation d'un paramètre sans soumission requis). Radio Button ou Segmented Control au sein d'un formulaire exigeant une validation explicite.

- 2 à 5 options (Recommandation [N3]) : Radio Buttons (choix unique) ou Checkboxes (choix multiples) ou Segmented Controls. Conserver l'intégralité des options visibles directement sans action d'ouverture.

- 6 à 15 options connues (Recommandation [N3]) : Menu déroulant classique (Select), ordonné par fréquence d'usage puis par ordre alphabétique.

- > 15 options (Recommandation [N3]) : Composant Combobox / Autocomplete interactif conforme aux WAI-ARIA Authoring Practices (APG) [N3], avec filtrage en temps réel dès la deuxième lettre saisie, support complet des touches directionnelles et de la touche Entrée.

- Ajustement visuel de valeurs bornées : Composant Slider impérativement synchronisé avec un champ de saisie numérique adjacent.

- Dates & Heures : Champ de saisie au format texte typé (JJ/MM/AAAA) couplé à un calendrier contextuel affiché au clic.

### Interdits (DON'T)

- Ne jamais utiliser un élément <select> natif non filtrable pour un volume supérieur à 15 options (ex. listes de pays ou de codes NAF).

- Ne jamais afficher d'état d'erreur rouge dès la saisie du premier caractère dans un champ vierge.

- Ne jamais forcer la saisie manuelle d'informations identifiables via une API tierce ou un champ amont (ex. forcer la saisie de la Ville si le Code Postal est renseigné).

- Accessibilité & Résilience des formulaires (APG & Hors-connexion) [N3] : Consulter les WAI-ARIA Authoring Practices (APG) [N3] pour l'implémentation conforme des modales, onglets et Combobox. Gérer explicitement les états de formulaire hors connexion et la détection des données obsolètes.

### Critères de Validation QA

| Test | Condition d'acceptation | Validé |
| --- | --- | --- |
| Validation différée | Aucun message d'erreur n'apparaît durant la frappe initiale (onInput). | [ ] |
| Composant adapté | Tout champ > 15 options intègre un filtre de recherche texte instantané. | [ ] |
| Synchronisation Slider | Modifier la valeur du Slider met à jour le champ numérique et inversement. | [ ] |
| Saisie assistée | Les champs pré-remplis restent modifiables sans réinitialisation complète. | [ ] |

## 3. Architectures de Navigation Avancées & Hybrides

### Source scientifique & Études

- Nielsen Norman Group : Navigation Patterns & Spatial Memory. La structuration hiérarchique doit refléter le modèle mental de l'utilisateur plutôt que l'organisation interne de la base de données.

- Apple Human Interface Guidelines (HIG) : Directives sur la navigation fractionnée (Split View) et la palette de commandes.

### Principe

Fournir des chemins de navigation directifs, adaptés à la densité d'information de l'application et au niveau d'expertise de l'utilisateur, en combinant les modèles d'accès broad (largeur) et deep (profondeur).

### Typologie des 7 modèles de navigation

```
1. Topbar Pure             [ App Header | Nav1  Nav2  Nav3  Nav4 ]
2. Sidebar Rétractable     [ [=] Nav1 Nav2 Nav3 | Zone de travail ]
3. Double Rail (Hybride)   [ Topbar: Espace de travail A | Espace de travail B ]
                           [ Sidebar: Sous-menu A1  Sous-menu A2           ]
4. Hub & Spoke             [ Hub Central ] --> (Spoke 1 | Spoke 2 | Spoke 3)
5. Master-Detail           [ Liste items 35% | Vue détaillée item 65%   ]
6. Omnibox / Command Bar   [ Cmd + K -> Modal de recherche universelle ]
7. Contextuelle            [ Clic sur donnée -> Navigation vers filtre direct ]
```

- Topbar pure : Barre supérieure fixe comprenant 3 à 5 entrées principales. Modèle préconisé pour les sites vitrines et applications grand public à faible profondeur.

- Sidebar rétractable : Barre latérale gauche hébergeant 5 à 9 entrées. Destinée aux applications métier et outils SaaS nécessitant une continuité d'accès.

- Navigation Hybride Topbar + Sidebar Contextuelle (Double Rail) : Navigation de premier niveau en barres supérieures pour commuter d'espace de travail (Domain) ; navigation de second niveau en latérale gauche affichant uniquement les sous-rubriques associées.

- Hub & Spoke (Étoile) : Point d'accès central (Hub) distribuant vers des modules indépendants (Spokes). L'utilisateur accomplit sa tâche dans le module puis réintègre le Hub.

- Master-Detail (Split View) : Affichage scindé en deux colonnes. Colonne de gauche (30–35 % de largeur) listant les entités ; colonne de droite (65–70 %) présentant le détail complet de l'élément sélectionné.

- Palette de Commandes Omnibox (Cmd/Ctrl + K) : Interface de recherche et d'exécution rapide superposée. Permet d'accéder à tout composant, dossier ou action via une saisie textuelle avec autocomplétion.

- Navigation Contextuelle / Diégétique (Drill-down direct) : Activation d'un filtre ou changement de vue par interaction directe sur un composant métier (clic sur la section d'un graphique, un badge de statut ou un identifiant dans un tableau).

### Interdits (DON'T)

- Ne pas utiliser de menus déroulants en cascade (hover dropdowns à plusieurs niveaux) dans une Topbar.

- Ne pas combiner une Sidebar complète avec une Topbar contenant également un second niveau de navigation arborescente.

- Ne pas recharger la page complète lors d'une transition dans un schéma Master-Detail.

### Critères de Validation QA

| Test | Condition d'acceptation | Validé |
| --- | --- | --- |
| Mesure du Chrome | L'ensemble Topbar + Sidebar + Headers de page occupe < 20 % de la zone d'affichage. | [ ] |
| Hauteur des tableaux | La hauteur d'une ligne de tableau de données denses ne dépasse pas 40px. | [ ] |
| Absence de suremboîtement | Aucune zone ne présente plus de 2 niveaux de conteneurs (Cards) imbriqués. | [ ] |

## 4. Science de l'Optimisation d'Espace & Densité Visuelle

### Source scientifique & Études

- Edward Tufte : The Visual Display of Quantitative Information. Le ratio Données/Encre (Data-Ink Ratio) stipule que toute quantité d'encre (ou de pixels) ne servant pas directement à présenter une information est superflue.

- Stephen Few : Information Dashboard Design. Maximisation de la densité d'information sans saturation visuelle.

- NN/g : Principes de réduction du Chrome (éléments de cadrage d'interface) au profit du Content (données métier).

### Principe

Maximiser le ratio de surface consacré aux données utiles en minimisant la surface occupée par la structure visuelle, l'habillage et les composants de navigation contextuelle.

### Règles opérationnelles (DO)

- Ratio Content vs Chrome : Conserver un minimum de 80 % de la surface utile de l'écran dédié au contenu métier. Les éléments de navigation et de structure ne doivent pas dépasser 15 à 20 % de la surface globale.

- Fusion d'en-tête (Single-line Header) : Regrouper sur une ligne unique d'une hauteur maximale de 48–52px le titre du module, la barre de recherche contextuelle, les filtres principaux et le bouton d'action primaire.

- Édition Inline : Permettre la modification directe de la donnée à son emplacement d'affichage au clic (titres, valeurs de tableaux, statuts) afin de proscrire le recours à des modales ou formulaires de saisie secondaires.

- Formulaires denses (Labels alignés à gauche) : Pour les environnements de travail PC denses, positionner les libellés à gauche des champs de saisie (grid-template-columns: 180px 1fr). Cette disposition réduit l'empreinte verticale de 40 % par rapport aux dispositions empilées verticalement.

```
Layout empilé classique (Hauteur élevée)
+------------------------------------------+
| Libellé de champ                         |
| [ Zone de saisie                       ] |
+------------------------------------------+
Layout dense recommandé (Économie verticale de 40%)
+------------------------------------------+
| Libellé de champ  [ Zone de saisie     ] |
+------------------------------------------+
```

- Suppression de l'imbrication inutile : Proscrire l'alignement successif d'éléments dans des conteneurs isolés (cards in cards). Remplacer l'usage des bordures d'imbrication par de l'espace négatif calculé ou des séparateurs fins.

### Interdits (DON'T)

- Ne jamais empiler plus de 2 barres d'outils horizontales sous l'en-tête principal.

- Ne pas utiliser de conteneurs avec marges internes (padding) successives créant des pertes d'espace de plus de 48px par côté.

- Ne pas espacer exagérément les lignes de tableaux de données métier (hauteur de ligne cible sur PC : 36px à 40px maximum).

### Critères de Validation QA

| Test | Condition d'acceptation |
| --- | --- |
| Mesure du Chrome | L'ensemble Topbar + Sidebar + Headers de page occupe < 20 % de la zone d'affichage. |
| Hauteur des tableaux | La hauteur d'une ligne de tableau de données denses ne dépasse pas 40px. |
| Absence de suremboîtement | Aucune zone ne présente plus de 2 niveaux de conteneurs (Cards) imbriqués. |

## 5. Protocole de Vérification Interface & Auto-Justification Scientifique

### Grille de vérification complète (Audit en 4 passes)

#### Passe 1 — Architecture & Espace

- Le ratio Content / Chrome est-il supérieur ou égal à 80/20 ?

- La structure d'en-tête de page tient-elle sur une seule ligne horizontale ?

- Les fenêtres modales multi-étapes conservent-elles des dimensions strictement constantes ?

- Les conteneurs évitent-ils les effets de suremboîtement (cards in cards) ?

#### Passe 2 — Formulaires & Clarté

- Tous les champs dont la valeur est déductible sont-ils pré-remplis de manière explicite ?

- Les champs présentant plus de 15 options sont-ils équipés d'une Combobox à recherche instantanée ?

- La validation visuelle respecte-t-elle le principe Reward Early, Punish Late ?

- Les composants d'interaction utilisés correspondent-ils à la matrice de choix ?

#### Passe 3 — Ergonomie & Accessibilité

- La navigation au clavier est-elle intégrale (Tab, Shift+Tab, Flèches, Entrée, Échap) ?

- Le contraste du texte par rapport au fond est-il supérieur ou égal à 4.5:1 ?

- Tous les états de statut utilisent-ils un codage triple (Couleur + Forme/Icône + Texte) ?

- Les cibles d'action respectent-elles les dimensions minimales définies par la Loi de Fitts (44x44px sur tactile, 32x32px sur desktop) ?

#### Passe 4 — Performance & Vivacité

- Les états de chargement s'appuient-ils sur des indicateurs squelette (Shimmer) ?

- Les transitions d'interface sont-elles exécutées entre 150ms et 250ms via du rendu matériel (transform, opacity) ?

- Les actions destructives disposent-elles d'un mécanisme d'annulation immédiat (Undo/Toast) plutôt que d'une modale d'interruption ?

### Protocoles d'Auto-Justification Scientifique (Règle d'Ingénierie IA)

Chaque décision d'architecture visuelle ou de composant majeur produite par l'IA doit comporter une justification synthétique et explicite référençant les théories, standards ou recherches UX associées, sans imposer de justification artificielle sur les micro-détails.

```
Exemples de mentions de justification conformes :
- "Utilisation d'une Combobox filtrable plutôt qu'un Select natif (Baymard Institute — >15 options)"
- "Hauteur fixe de la modale multi-étapes (Loi de Fitts — stabilité des cibles d'action)"
- "Alignement des libellés à gauche du formulaire (Optimisation d'espace — réduction de 40% de la hauteur verticale)"
- "Validation différée au blur (Luke Wroblewski — Reward Early, Punish Late)"
```

## 6. Synthèse des Exigences de Validation

```
               [ CHECKLIST D'EXÉCUTION TECHNIQUE ]
 _________________________________________________________________
| Domaine         | Règle Stricte              | Valeur Cible    |
|=================|============================|=================|
| Modales         | Variation de dimensions    | 0 px            |
| Modales         | Défilement                 | Corps uniquement|
| Formulaires     | Seuil pour Combobox        | > 15 options    |
| Formulaires     | Erreur de validation       | Au blur uniquement|
| Navigation      | Raccourci Palette Commandes| Cmd/Ctrl + K    |
| Navigation      | Ratio Surface Utile        | >= 80%          |
| Layout Desktop  | Hauteur ligne de tableau   | 36px - 40px     |
| Layout Desktop  | Formulaire dense           | Labels à gauche |
 -----------------------------------------------------------------
```

```
Spécification validée le : <span type="placeholder" placeholder-type="date"></span>
Responsable UX / QA : <span type="placeholder" placeholder-type="person"></span>
Fichier de référence système : <span type="placeholder" placeholder-type="file"></span>
```
