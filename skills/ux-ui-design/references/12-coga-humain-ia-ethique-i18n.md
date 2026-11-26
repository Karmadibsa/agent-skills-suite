# Document 12 — Accessibilité Cognitive (W3C COGA), Interactions Humain-IA, Éthique & i18n

Ce document normatif établit les exigences transversales relatives à l'accessibilité cognitive, à l'ergonomie des systèmes à intelligence artificielle, à l'éthique de la conception (anti-dark patterns) et à la résilience des interfaces internationalisées.

## 1. Accessibilité Cognitive & Diversité des Utilisateurs (W3C COGA & ISO 9241)

### 1.1 Cadre Scientifique et Niveaux de Preuve

- W3C COGA Task Force (2021) — Making Content Usable for People with Cognitive and Learning Disabilities [N1]

- ISO 9241-210:2019 — Conception centrée sur l'opérateur humain pour les systèmes interactifs [N2]

- ISO 9241-11:2018 — Ergonomie de l'interaction homme-système — Utilisabilité : Efficacité, efficience, satisfaction [N2]

- Évaluation Standardisée — System Usability Scale (SUS, Brooke, 1996) et UMUX-LITE (Finstad, 2010) [N3]

### 1.2 Règles Opérationnelles [N1 / N3]

#### A. Clarté structurelle et prévisibilité [N3]

- DO : Maintenir une cohérence spatiale stricte pour les éléments de navigation, de recherche et d'actions principales à travers tout l'application.

- DO : Avertir l'utilisateur avant tout changement de contexte majeur (ouverture de fenêtre modale, redirection externe, rafraîchissement dynamique de section).

- DON'T : Modifier la disposition des menus principaux ou la sémantique des icônes en fonction des sections de l'application.

#### B. Soutien à la mémoire et à l'attention [N3]

- DO : Mettre en œuvre la persistance automatique des données de formulaire (brouillon local) pour éviter toute perte en cas de fermeture accidentelle ou de saut d'écran.

- DO : Fournir des indicateurs d'avancement explicites avec possibilité de sauvegarder et reprendre les parcours multi-étapes sans contrainte.

- DON'T : Obcompiler la mémoire de travail de l'utilisateur en exigeant le transfert manuel de codes, d'identifiants ou d'informations d'un écran à un autre.

#### C. Délais ajustables & authentification accessible [N1] (WCAG 2.2 AA 2.2.1 & 3.3.8)

- DO : Offrir une option systématique pour désactiver, ajuster ou prolonger d'au moins 10 fois toute limite temporelle (session, expiration de saisie).

- DO : Permettre l'utilisation de gestionnaires de mots de passe, le coller automatique et la connexion biométrique ou par lien magique.

- DON'T : Imposer des épreuves cognitives pour l'authentification (puzzles, calculs mentaux, recopie de caractères altérés/CAPTCHA visuel complexe).

#### D. Langage clair et structuré [N3]

- DO : Rédiger avec des phrases courtes (moins de 25 mots), à la voix active, en définissant la première occurrence de chaque sigle ou acronyme via l'élément <abbr>.

- DO : Proposer une aide contextuelle accessible directement au point de saisie sans faire perdre le focus à l'utilisateur.

- DON'T : Employer du jargon technique interne ou des structures de phrases négatives complexes dans les messages d'erreur ou d'instruction.

## 2. Conception des Interactions Humain-IA (Human-AI Guidelines)

### 2.1 Cadre Scientifique et Niveaux de Preuve

- Amershi et al. (2019) — Guidelines for Human-AI Interaction, ACM CHI '19 (Microsoft Research) [N2]

- Google PAIR — People + AI Guidebook [N3]

### 2.2 Directives Inter-Phases [N2 / N3]

```
[ Phase 1: Avant ]    -->    [ Phase 2: Pendant ]    -->    [ Phase 3: Erreur ]    -->    [ Phase 4: Durée ]
  Expliciter capacités         Distinguer IA / Données        Offrir contrôle humain        Collecter feedback
  et limites du modèle         Afficher le niveau de confiance  Modifier / Annuler          Sans interrompre
```

#### Phase 1 — Avant l'interaction (Attentes)

- DO : Présenter clairement le périmètre fonctionnel du système IA et ses limites de précision dès l'initialisation.

- DON'T : Suggérer une omniscience ou une exactitude infaillible de l'agent conversationnel ou du moteur de recommandation.

#### Phase 2 — Pendant l'interaction (Contexte & Incertitude)

- DO : Marquer visuellement l'origine des contenus générés à l'aide d'un badge explicite (ex. Suggestion IA) pour les différencier des données système vérifiées.

- DO : Exprimer visuellement l'incertitude du modèle (ex. score de confiance ou plage de probabilité) lorsque la réponse présente une ambiguïté.

- DON'T : Insérer des suggestions générées automatiquement sans distinction typographique ou structurelle claire avec les données sources.

#### Phase 3 — En cas d'erreur ou d'incertitude (Contrôle humain)

- DO : Mettre à disposition un mécanisme immédiat de débrayage permettant d'annuler, d'éditer ou de rejeter toute proposition faite par l'IA.

- DO : Fournir une explication synthétique sur les variables ayant produit une recommandation (explicabilité/XAI).

- DON'T : Exécuter des actions destructrices ou irréversibles de manière autonome sans confirmation humaine explicite.

#### Phase 4 — Dans la durée (Apprentissage & Feedback)

- DO : Intégrer des commandes d'évaluation légères (ex. pouces haut/bas, signalement) à proximité immédiate des résultats produits.

- DON'T : Interrompre le flux de travail principal par des pop-ups de notation intrusives post-génération.

## 3. Éthique du Design, Prévention des Dark Patterns & Privacy-by-Design

### 3.1 Cadre Légatif et Scientifique

- Mathur et al. (2019) — Dark Patterns at Scale, ACM CSCW [N2]

- Harry Brignull (2010) — Deceptive Design Taxonomy [N2]

- RGPD (UE 2016/679) — Articles 5 (Principes) & 25 (Privacy by design/default) [N1]

- Digital Services Act (DSA) — Article 25 (Interdiction des interfaces trompeuses) [N1]

### 3.2 Règles Opérationnelles [N1 / N2]

#### A. Symétrie des choix & Neutre cognitif [N1]

- DO : Offrir une stricte équivalence visuelle et ergonomique entre l'acceptation et le refus d'une option (boutons de même taille, contraste et niveau d'effort requérant le même nombre de clics).

- DON'T : Utiliser le Confirmshaming (formulation culpabilisante pour le refus) ou le Roach Motel (inscription aisée mais désabonnement complexe).

#### B. Transparence des coûts et des actions [N1]

- DO : Exiger une action affirmative (opt-in explicite) pour toute option payante, complémentaire ou d'abonnement.

- DON'T : Pré-cocher des cases d'options payantes ou ajouter automatiquement des éléments au panier d'achat.

- DON'T : Créer une fausse urgence (Urgency pattern) via des compteurs à rebours factices ou de faux indicateurs de rareté/stock.

#### C. Minimisation et contrôle des données [N1]

- DO : Restreindre les champs de collecte au strict périmètre nécessaire au traitement en cours.

- DO : Proposer un tableau de bord permettant l'export au format standard (JSON/CSV) et la suppression complète des données personnelles en 1-clic.

- DON'T : Masquer les paramètres de confidentialité derrière des sous-menus profonds ou des terminologies ambiguës.

## 4. Internationalisation (i18n) & Résilience des Interfaces

### 4.1 Cadre Technique et Normes

- W3C Internationalization (i18n) Best Practices [N3]

- W3C Web Application Architecture — Offline-First Patterns [N4]

### 4.2 Règles Opérationnelles [N3 / N4]

#### A. Expansion textuelle & Layouts flexibles [N3]

- DO : Dimensionner les conteneurs (boutons, onglets, en-têtes) en prévoyant une tolérance de +30 % à +40 % d'expansion textuelle (ex. passage de l'anglais au français/allemand).

- DO : Employer le retour à la ligne contrôlé et les propriétés CSS de dimensionnement intrinsèque (min-content, max-content, fit-content).

- DON'T : Fixer des largeurs en pixels (width: 120px) ou couper des libellés avec text-overflow: ellipsis sur des éléments de commande critiques.

#### B. Support bidirectionnel (LTR / RTL) [N3]

- DO : Utiliser exclusivement les propriétés logiques CSS pour la mise en page (margin, padding, border, alignment).

- DON'T : Employer les propriétés physiques directionnelles pour l'agencement structural.

Propriété Physique (À proscrire)

Propriété Logique CSS (Obligatoire)

margin-left / margin-right

margin-inline-start / margin-inline-end

padding-left / padding-right

padding-inline-start / padding-inline-end

left / right (Positionnement)

inset-inline-start / inset-inline-end

text-align: left / right

text-align: start / end

#### C. Formatage localisé des données [N3]

- DO : Dériver le formatage des dates, heures, nombres et devises de la locale utilisateur via l'API native Intl.

```
// Formatting standardisé obligatoire
const amount = 1250.50;
const formattedAmount = new Intl.NumberFormat(userLocale, { 
  style: 'currency', 
  currency: targetCurrency 
}).format(amount);
const date = new Date();
const formattedDate = new Intl.DateTimeFormat(userLocale, { 
  dateStyle: 'full' 
}).format(date);
```

#### D. Résilience réseau & Mode dégradé [N4]

- DO : Intercepter l'état de la connexion (navigator.onLine et échecs d'appels API) pour basculer l'interface en mode hors-ligne sans blocage.

- DO : Sauvegarder les saisies utilisateur dans un stockage local persistant (IndexedDB / localStorage) avec synchronisation automatique dès le rétablissement du réseau.

- DO : Indiquer clairement par un composant d'état (ex. Bannière Données en cache) la fraîcheur des informations présentées.

- DON'T : Afficher une page d'erreur générique non récupérable ou vider les formulaires en cas de micro-coupure réseau.

## 5. Grille de Validation QA (10 Points de Contrôle)

#

Domaine

Critère d'évaluation

Méthode de vérification

Statut

01

COGA

Absence de contrainte temporelle ou présence d'un mécanisme de prolongation d'au moins 10x.

Test manuel de temporisation & inspection WCAG 2.2 (2.2.1)

02

COGA

Support complet de la saisie automatique et des gestionnaires de mots de passe sans blocage du coller.

Test de saisie automatique sur formulaire d'authentification (3.3.8)

03

Human-AI

Distinction visuelle claire entre les données système et les suggestions d'IA via un composant dédié.

Inspection visuelle et analyse du DOM (présence de tags sémantiques)

04

Human-AI

Présence d'une commande permettant de modifier, révoquer ou rejeter une action générée par l'IA.

Test d'usabilité sur le flux d'interaction IA

05

Éthique

Parité visuelle et fonctionnelle absolue entre l'option de refus et l'option d'acceptation (Consentement).

Audit UI (mesure des ratios de contraste, dimensions et clics requis)

06

Éthique

Absence totale de cases pré-cochées, de frais cachés et de décompte d'urgence artificiel.

Audit du parcours de conversion et d'achat

07

i18n

Tolérance des conteneurs UI à une expansion textuelle de +40 % sans chevauchement ni tronquage.

Test de surcharge linguistique (injection de chaînes longues en DE/FR)

08

i18n

Utilisation stricte des propriétés logiques CSS (inline/block) pour le support RTL.

Code review CSS / Inversion du paramètre dir="rtl" sur <html>

09

i18n

Emploi exclusif de l'API Intl pour les dates, nombres et monnaies selon la locale du navigateur.

Inspection du code source JavaScript / Tests unitaires i18n

10

Résilience

Preservation locale des données de saisie et affichage d'un statut clair lors d'une coupure réseau.

Simulation de coupure réseau (Chrome DevTools Offline Mode)
