# Document 05 — Règles Spécifiques PC Desktop & Mobile (Gestion à une main)

Standard d'ergonomie inter-plateformes pour le design d'interfaces adaptatives, la disposition spatiale et la productivité utilisateur.

## PARTIE A — MOBILE & GESTION À UNE MAIN (One-Handed Ergonomics)

### 1. Zone du Pouce (Thumb Zone)

- Source scientifique : Steven Hoober (2013–2017 — Mobile Design Research). Les études démontrent que 49 % à 75 % des interactions sur smartphone s'effectuent à un seul pouce. Le confort d'accès physique conditionne la vitesse d'exécution et le taux d'erreur.

#### Découpage vertical de l'écran

- Zone Naturelle (tiers inférieur) : Placer la navigation principale (Barre basse / Tab Bar), le bouton d'action primaire (FAB ou barre d'action fixe collée en bas), les filtres rapides et les contrôles de lecture ou de validation.

- Zone d'Étirement (tiers central) : Dédiée au contenu consultable, aux cartes d'information, aux listes récapitulatives et aux corps de formulaires.

- Zone Difficile (tiers supérieur, coins hauts) : Réservée exclusivement aux éléments à faible fréquence d'accès (titre fixe de page, bouton retour secondaire, paramètres globaux, boutons de fermeture).

#### Tiroirs inférieurs (Bottom Sheets) vs Modales centrées

- Règle opérationnelle (DO) : Ouvrir les menus contextuels, sélecteurs d'options et formulaires rapides sous forme de tiroir inférieur (Bottom Sheet) ancré en bas d'écran, fermable par glissement vers le bas ou bouton explicite.

- Interdit (DON'T) : Ne pas utiliser de fenêtres modales centrées ou de pop-ups haut placées nécessitant un changement de prise en main ou l'intervention d'une seconde main pour atteindre la croix de fermeture.

- Critère QA : 100 % des actions critiques et fréquentes doivent être déclenchables et validables sans étirement du pouce au-delà de la moitié inférieure de l'écran.

### 2. Cibles Tactiles & Espacement

- Source scientifique : Apple Human Interface Guidelines (HIG), Material Design 3, MIT Touch Lab, WCAG 2.5.5 (Target Size - Enhanced) & WCAG 2.5.8 (Target Size - Minimum).

#### Dimensions et espacements réglementaires

- Règle opérationnelle (DO) : Configurer une taille minimale de cible tactile de 44×44 pt (iOS) à 48×48 dp (Android). Assurer un espacement libre d'au moins 8 px entre deux boutons adjacents.

- Interdit (DON'T) : Interdiction d'aligner des cibles de moins de 44 px de côté, particulièrement si l'une des actions est destructive (ex. supprimer à côté d'éditer).

- Critère QA : Zéro erreur de frappe (« fat-finger error ») constatée lors des tests d'accessibilité sur appareils mobiles de diagonale moyenne (4.7" à 6.7").

| Plateforme / Norme | Taille minimale de cible | Espacement minimal adjacent |
| --- | --- | --- |
| Apple iOS (HIG) | 44 × 44 pt | 8 px |
| Android (Material 3) | 48 × 48 dp | 8 px |
| WCAG 2.5.8 (Niveau AA) | 24 × 24 px | Marge globale compensatoire |
| WCAG 2.5.5 (Niveau AAA) | 44 × 44 px | 8 px |

### 3. Navigation Mobile & Safe Areas

#### Directives d'intégration mobile

- Source scientifique : Spécifications W3C CSS Mobile Text Input / iOS Safe Area Layout Guides.

- Règle opérationnelle (DO) :

- Limiter la barre de navigation basse à 3 à 5 destinations maximum, accompagnées chacune d'une icône explicite et d'un libellé court sans troncature.

- Absorber obligatoirement les contraintes matérielles (encoches, barres de gestes) via les variables CSS env(safe-area-inset-bottom) et env(safe-area-inset-top).

- Définir systématiquement les attributs HTML d'interaction clavier (inputmode="numeric", type="email", autocomplete).

- Maintenir le bouton de validation du formulaire ancré au-dessus du clavier virtuel lors de sa levée.

- Interdit (DON'T) :

- Masquer la navigation sous plus de 5 items dans une barre basse.

- Proposer un geste tactile complexe obligatoire (ex. swipe-to-delete, pinch, long-press) sans alternative textuelle ou visuelle accessible au simple tap.

- Laisser le clavier virtuel masquer le champ actif ou le bouton de soumission.

- Critère QA : Déroulement complet d'un parcours de saisie et de validation sans masque visuel dû au clavier et avec 100 % des fonctionnalités accessibles au tap simple.

## PARTIE B — PC DESKTOP (Ergonomie Souris, Clavier & Grands Écrans)

### 1. Architecture & Densité Desktop (1280×800, 1366×768, 1920×1080+)

- Source scientifique : Loi de Fitts (vitesse et précision en fonction de la distance et de la taille de la cible) et principes de densité d'information d'Edward Tufte.

#### Layout et structures adaptées aux grands écrans

- Règle opérationnelle (DO) :

- Exploiter la largeur utile de l'écran via des mises en page réactives.

- Implémenter une navigation latérale gauche (Sidebar compacte de 220–260 px, repliable en mode icônes) ou une barre supérieure fine (48–56 px).

- Utiliser des panneaux latéraux contextuels (Split View / Master-Detail) pour permettre l'édition d'un enregistrement sans perte du contexte de la liste.

- Structurer les données volumineuses en tableaux optimisés (height: 44–52 px par ligne) avec alignement strict : texte à gauche, valeurs numériques alignées à droite en police tabulaire (font-variant-numeric: tabular-nums).

- Interdit (DON'T) :

- Enfermer une application métier, un back-office ou un outil de gestion dans une colonne centrale étroite de 600 px à 800 px dérivée des mises en page de blogs.

- Recourir à des cartes d'information (cards) trop aérées contenant de grands espaces vides pour afficher des données denses ou répétitives.

- Critère QA : Affichage d'au moins 15 à 20 lignes de données utiles au-dessus de la ligne de flottaison sur une résolution standard 1920×1080.

### 2. Productivité Clavier & Souris

- Source scientifique : Microsoft Fluent Design System Guidelines & macOS Human Interface Guidelines (Desktop Productivity Patterns).

#### Raccourcis, survol et gestion des grands volumes

- Règle opérationnelle (DO) :

- Intégrer une palette de commandes globale accessible via Cmd + K (macOS) ou Ctrl + K (Windows).

- Assurer la gestion intégrale du clavier : Esc pour fermer les fenêtres/panneaux, Entrée pour confirmer, touches fléchées pour naviguer dans les listes.

- Définir des états de survol (:hover) réactifs et visuellement distincts pour tous les éléments interactifs.

- Implémenter la pagination ou la virtualisation du DOM (windowing) dès que le nombre d'éléments dépasse 50 à 100 unités dans une liste ou un tableau.

- Interdit (DON'T) :

- Rendre une fonctionnalité clé accessible uniquement lors du survol à la souris (:hover), rendant l'action impossible d'accès au clavier ou sur écran tactile.

- Tolérer des ralentissements d'affichage (chute sous 60 fps) lors du défilement de listes longues.

- Critère QA : Navigation, saisie, modification et validation réalisables à 100 % exclusivement au clavier (sans recours à la souris).

| Fonctionnalité | Raccourci standard | Action attendue |
| --- | --- | --- |
| Palette de commandes | Cmd/Ctrl + K | Ouvre la recherche globale et les actions rapides |
| Fermeture / Annulation | Esc | Ferme le panneau actif, la modale ou annule la saisie |
| Validation / Soumission | Cmd/Ctrl + Enter ou Enter | Valide le formulaire ou confirme l'action principale |
| Navigation dans les listes | ↑ / ↓ | Déplace le focus visuel d'une ligne à l'autre |
| Menu d'actions contextualisé | Shift + F10 ou touche Menu | Ouvre le menu contextuel de l'élément sélectionné |
