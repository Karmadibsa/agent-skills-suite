# 03 — Onboarding, Empty States, Iconographie & Feedback Utilisateur

Spécifications d'interaction et directives d'expérience utilisateur pour le guidage, l'optimisation des flux d'accueil, la clarté visuelle et la réactivité du système.

## 1. Onboarding & Time-to-First-Value (TTFV)

### Source Scientifique & Fondements

- NN/g — Mobile-App Onboarding & Contextual Help : L'apprentissage passe par l'interaction directe (learning by doing). Les carrousels d'introduction statiques sont ignorés par la majorité des utilisateurs.

- Renkl et al. (2004) — Guidage dégressif (Faded Guidance) : Réduction progressive de l'assistance au fur et à mesure de l'acquisition de compétences par l'utilisateur pour éviter la charge cognitive inutile.

### Directives de Conception

**À faire**

- Visor une Time-to-First-Value (TTFV) < 30 secondes. Permettre à l'utilisateur de réaliser une première action créatrice de valeur immédiatement.
- Offrir un mode invité ou une approche local-first : ne pas imposer la création de compte avant la démonstration concrète de la valeur du produit.
- Intégrer de l'aide contextuelle Just-In-Time (tooltips discrets, micro-guides déclenchés uniquement au survol ou à l'utilisation initiale de la fonctionnalité).
- Proposer des choix initiaux légers (2 à 3 options maximum de profilage ou d'objectifs) et s'assurer qu'ils restent toujours réversibles dans les paramètres.

**À éviter**

- Bloquer l'accès à l'application avec un carrousel obligatoire de 5 écrans génériques de bienvenue.
- Exiger la saisie d'un formulaire complet d'inscription dès l'ouverture de l'application.

### Critères QA

- La première action utile est-elle réalisable sans création de compte ?

- Le temps nécessaire pour atteindre la première valeur perçue est-il sous le seuil de 30 secondes ?

- Les info-bulles d'aide contextuelle apparaissent-elles uniquement lors de l'action concernée ?

- Les préférences choisies durant l'accueil sont-elles modifiables ultérieurement ?

## 2. États Vides (Empty States) & Gestion des Erreurs

### Source Scientifique & Fondements

- NN/g — Designing Empty States in Complex Applications : Un écran vide constitue un moment clé de l'engagement utilisateur. L'absence d'éléments ne doit pas générer d'incertitude sur l'état du système mais guider l'utilisateur vers la création de contenu.

### Directives de Conception

**À faire**

- Structurer chaque état vide selon les 3 piliers : (1) Icône ou illustration sobre contextualisée, (2) Phrase d'explication claire sur l'utilité de l'espace, (3) Bouton d'action principal unique pour créer ou charger un exemple.
- Fournir des erreurs constructives : spécifier la cause de l'erreur, la situation actuelle, et offrir un moyen direct de résoudre le problème en 1 clic (ex: « Réessayer », « Charger un jeu de données test »).

**À éviter**

- Laisser une zone de contenu vide sans indication visuelle ou textuelle (écran blanc).
- Afficher des messages d'erreur génériques, techniques ou culpabilisants (ex: « Erreur 500 », « Action impossible »).

### 2.2 Taxonomie des Erreurs & Autonomie Utilisateur (Distinction Erreur Utilisateur vs Erreur Système — Norman & Nielsen)

- Donald Norman (The Design of Everyday Things) — Slips vs Mistakes : Distinction essentielle entre l'erreur d'exécution (glissement) et l'erreur d'intention (erreur de planification). L'interface doit prévenir les glissements et clarifier le modèle mental pour éliminer les erreurs d'intention.

- Heuristique de Nielsen #9 — Help users recognize, diagnose, and recover from errors : Les messages d'erreur doivent être exprimés en langage clair (sans code), indiquer précisément le problème et suggérer une solution constructive.

- Principe fondamental : Distinguer strictement les erreurs causées par une saisie ou action de l'utilisateur (qu'il peut résoudre lui-même immédiatement si on lui explique clairement quoi faire) des pannes techniques du système (où l'utilisateur n'y peut rien).

#### Les 4 types d'erreurs et la réponse UX obligatoire

**À faire**

- Erreur de saisie / format (faute utilisateur) : Message précis placé directement sous le champ concerné (jamais uniquement en haut de page), formulé sans jargon ni ton culpabilisant, indiquant la règle attendue et un exemple concret (ex. « Le format de date attendu est JJ/MM/AAAA (ex. 25/11/2026) » au lieu de « Date invalide »).
- Erreur métier / prérequis manquant : Expliquer le blocage en langage humain et fournir un bouton d'action directe vers la solution (ex. « Impossible de valider : aucun compte n'est sélectionné. [Choisir un compte] »).
- Erreur de droits ou de fichier importé : Indiquer exactement ce qui bloque (ex. « Ce fichier dépasse 5 Mo ou n'est pas au format CSV UTF-8 ») et comment corriger (ex. lien vers un modèle CSV valide ou outil de compression).
- Erreur technique / réseau (faute système) : Ne jamais afficher de stack trace ou code brut ; indiquer « Le serveur ne répond pas pour le moment. Vos saisies sont conservées localement. [Réessayer] ».

**À éviter**

- Effacer le formulaire après une erreur de validation (l'utilisateur doit pouvoir corriger uniquement le champ en erreur sans tout retaper).

### Critères QA

- Tous les écrans sans données présentent-ils une illustration/icône, une explication et un CTA principal ?

- Le CTA principal d'un état vide mène-t-il directement à la création de contenu ou à l'injection d'un exemple ?

- Les messages d'erreur indiquent-ils la cause et la solution immédiate en un clic ?

- Les erreurs de saisie sont-elles positionnées directement sous le champ concerné avec un exemple de format valide ?

- Les erreurs métier intègrent-elles un CTA direct menant à la résolution du prérequis ?

- En cas d'erreur réseau ou serveur, les données déjà saisies par l'utilisateur sont-elles préservées dans le formulaire ?

## 3. Grammaire d'Iconographie Universelle

### Source Scientifique & Fondements

- NN/g — Icon Usability (Aurora Harley) : Les icônes universelles accélèrent le traitement visuel parallèle et libèrent la charge mentale. Les icônes ambiguës sans texte ralentissent la navigation et augmentent le taux d'erreur.

### Directives de Conception

**À faire**

- Utiliser des icônes universelles autonomes uniquement pour le jeu standardisé : Poubelle (Supprimer), Crayon (Modifier), Loupe (Rechercher), Engrenage (Paramètres), Croix (Fermer), Plus (Ajouter), Flèche retour (Retour), Étoile/Cœur (Favori). Garantir un aria-label et un tooltip explicatif au survol.
- Associer obligatoirement un libellé textuel court (1 à 2 mots) à toute icône ambiguë, métier ou spécifique au domaine d'application.
- Maintenir l'homogénéité visuelle : utiliser une seule famille d'icônes (Lucide, Phosphor ou Heroicons), fixer l'épaisseur de trait (stroke-width: 1.75px ou 2px), et respecter le dimensionnement (16px inline, 20px boutons/menus, 24px navigation mobile).

**À éviter**

- Exploiter des icônes seules pour des actions complexes, rares ou propriétaires sans étiquette textuelle associée.
- Mélanger plusieurs ensembles d'icônes avec des styles visualement incompatibles (ex: mélanger du solid et du line avec des épaisseurs de trait variables).

### Critères QA

- Toutes les icônes autonomes appartiennent-elles à la liste des icônes universelles validées ?

- Les icônes métier ou ambiguës sont-elles accompagnées d'un texte explicatif ?

- Les attributs d'accessibilité (aria-label) et tooltips sont-ils présents sur les icônes sans texte ?

- L'ensemble des icônes de l'interface respecte-t-il la taille standardisée et la même épaisseur de trait ?

## 4. Système de Retour Utilisateur & Notifications de Validation

### Source Scientifique & Fondements

- Heuristiques de Nielsen #1 — Visibilité de l'état du système : L'interface doit constamment informer l'utilisateur de ce qui se passe, par des retours appropriés et dans un délai raisonnable, afin d'établir un sentiment de contrôle.

### Directives de Conception

**À faire**

- Fournir un retour visuel immédiat en moins de 100 ms pour toute interaction utilisateur (changement d'état visuel du bouton, micro-spinners, ou animation de transition).
- Privilégier les notifications de confirmation non bloquantes (Toast / Snackbar) pour les réussites (« Élément enregistré », « Lien copié »). Afficher pendant 3 à 4 secondes sans masquer les éléments critiques de navigation (bas-droite sur Desktop, haut ou au-dessus de la navigation sur Mobile).
- Mettre en place un Toast avec option « Annuler » (Undo) d'une durée de 5 secondes pour les suppressions courantes, à la place des modales de confirmation.
- Réserver les modales de confirmation exclusivement aux actions destructives, irréversibles et à fort impact (ex: suppression définitive de compte ou réinitialisation d'une base de données).

**À éviter**

- Interrompre le flux de travail avec une modale de confirmation (« Êtes-vous sûr ? ») pour des actions réversibles du quotidien.
- Laisser un délai d'attente supérieur à 100 ms sans indicateur visuel de chargement ou d'enregistrement.

### Critères QA

- Toute action utilisateur déclenche-t-elle une réponse visuelle dans le seuil des 100 ms ?

- Les notifications de succès (Toast) s'effacent-elles automatiquement au bout de 3 à 4 secondes sans bloquer l'écran ?

- L'action d'annulation (« Undo ») est-elle disponible pendant au moins 5 secondes pour les suppressions usuelles ?

- Les modales de confirmation sont-elles strictement limitées aux actions irréversibles et destructives ?

### États de Chargement (Spinners, Skeletons & Barres de Progression)

- Luke Wroblewski & Viget — Perception du temps d'attente : L'utilisation de Skeleton Screens (écrans fantômes) focalise l'attention sur le contenu en cours de chargement plutôt sur le temps d'attente lui-même, réduisant ainsi la durée perçue par rapport à un spinner traditionnel.

- Règles des seuils temporels de réponse (Miller / Nielsen) : La perception de l'attente varie fortement selon la durée du traitement et nécessite des indicateurs visuels adaptés à chaque palier de temps.

**À faire**

- < 100 ms : Ne présenter aucun indicateur de chargement (la réponse du système est perçue comme instantanée).
- 100 ms à 1 s : Afficher un indicateur rotatif sobre (Spinner) directement dans le bouton déclencheur (en désactivant le bouton pour éviter les doubles soumissions et en conservant sa largeur fixe pour éviter tout saut de mise en page / CLS) ou au centre de la zone concernée, avec role="status" et aria-label="Chargement en cours".
- 1 s à 5 s : Afficher un Skeleton Screen (gabarit fantôme reproduisant la structure exacte du contenu attendu) pour réduire la perception du temps d'attente.
- > 5 s (exports lourds, traitement IA, génération de fichiers) : Afficher une barre de progression déterminée avec pourcentage ou étape explicite (« Analyse des données… 2/3 ») et la possibilité d'annuler l'action.

**À éviter**

- Afficher un spinner plein écran bloquant ou un indicateur indéterminé pour un traitement long (> 5 s) sans option d'annulation.
- Faire varier la taille du bouton lors de l'apparition du spinner inline, provoquant un saut d'agencement (CLS).

### Critères QA — États de Chargement

- Aucun indicateur visuel n'est-il affiché si la réponse intervient en moins de 100 ms ?

- Les traitements entre 100 ms et 1 s affichent-ils un spinner inline désactivant le bouton sans altérer sa largeur ?

- Les chargements de 1 s à 5 s utilisent-ils un Skeleton Screen reproduisant la disposition exacte du contenu ?

- Les traitements longs (> 5 s) proposent-ils une barre de progression déterminée, des étapes explicites et une option d'annulation ?

- Les spinners possèdent-ils les attributs d'accessibilité appropriés (role="status" et aria-label) ?
