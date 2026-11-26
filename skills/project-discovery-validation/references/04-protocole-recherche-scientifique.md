# 04 — Protocole de Recherche Scientifique & Revue de Littérature

Statut : Référentiel Discovery & Roadmap V2.0 · Skill : project-discovery-validation

## 1. Objectif : Ancrer les Décisions Produit dans la Science (Evidence-Based Practice)

La conception logicielle et l'architecture d'expériences utilisateurs ne doivent pas reposer sur des intuitions individuelles, des dogmes d'équipe ou des tendances éphémères. La psychologie cognitive, l'économie comportementale, l'ergonomie (HCI) et les sciences de l'éducation fournissent un ensemble de lois empiriques et expérimentales validées. Ces lois permettent d'évaluer la pertinence d'une fonctionnalité, de prédire les risques de friction et d'optimiser l'efficacité cognitive avant toute écriture de code.

### Fondements Méthodologiques

- Evidence-Based Management (Pfeffer & Sutton, 2006) : Pratique managériale et décisionnelle qui substitue aux préjugés et aux conventions des preuves formelles tirées de la recherche systématique et de données probantes.

- Adaptation du cadre GRADE / Cochrane aux Human-Computer Interaction (HCI) : Hiérarchisation de la preuve pour pondérer l'impact d'une donnée scientifique sur la conception logicielle. Une décision d'architecture d'interaction doit s'appuyer sur le niveau de preuve le plus élevé disponible dans la littérature académique.

## 2. Hiérarchie de Fiabilité des Sources

Le tableau suivant établit la classification théorique et opérationnelle des sources documentaires, de la preuve la plus robuste au simple signal qualitatif.

Niveau

Type de Source

Description & Exemples Académiques / Techniques

Valeur Décisionnelle

Statut

Niveau 1

Méta-analyses & Revues Systématiques

Synthèses quantitatives et qualitatives d'études contrôlées publiées dans des revues à comité de lecture (Psychological Bulletin, ACM Transactions on Computer-Human Interaction).

Preuve absolue. Base de cadrage conceptuel et fonctionnel.

Niveau 2

Études Expérimentales Contrôlées

Essais contrôlés randomisés (RCT) et études de laboratoire validées par les pairs (ACM CHI, UIST, Journal of Experimental Psychology).

Fiabilité élevée. Validation des mécanismes d'interaction complexes.

Niveau 3

Normes Officiellement Reconnues

Spécifications et standards établis par des organismes internationaux (W3C WCAG 2.2, ISO 9241, OWASP Top 10).

Référence normative et légale. Conformité obligatoire.

Niveau 4

Études Empiriques Terrain à Grande Échelle

Rapports d'instituts de recherche UX et audits à grande échelle (Nielsen Norman Group, Baymard Institute, audits d'accessibilité multi-sites).

Recommandation empirique métier. Directives d'implémentation UX.

Niveau 5

Publications Informelles & Billets d'Opinion

Articles de blog, publications sur réseaux sociaux, retours d'expérience non contrôlés, avis d'experts non sourcés.

Piste de réflexion ou hypothèse à tester. Valeur de preuve nulle.

## 3. Cartographie des Disciplines Scientifiques par Domaine Produit

Afin d'éviter la projection de concepts inadaptés, l'analyse scientifique doit mobiliser les cadres théoriques correspondant au domaine fonctionnel de l'application.

### 3.1. Apprentissage, Révision & Pédagogie (EdTech)

- Mémorisation Espacée (Spaced Repetition) : Modélisation des courbes d'oubli (Ebbinghaus, Cepeda et al.) pour optimiser les intervalles de rappel automatique dans les algorithmes d'apprentissage.

- Effet de Test (Testing Effect) : Priorisation de l'évaluation formative récurrente sur la simple relecture passive (Roediger & Karpicke).

- Théorie de la Charge Cognitive : Maintien de la charge extrinsèque au niveau le plus bas pour focaliser l'attention sur la charge germane (Sweller).

- Guidage Dégressif (Faded Guidance) : Réduction progressive des étayages et aides visuelles à mesure que l'utilisateur gagne en expertise (Renkl).

### 3.2. Sport, Santé & Changement de Comportement (Behavioral Health)

- Théorie de l'Autodétermination (Self-Determination Theory) : Soutien permanent des trois besoins psychologiques fondamentaux : autonomie, compétence et affiliation sociale (Deci & Ryan).

- Intentions d'Implémentation : Structuration des actions de l'utilisateur sous la forme conditionnelle « Si [situation X], alors je ferai [action Y] » pour augmenter le taux de passage à l'acte (Gollwitzer).

- Sentiment d'Auto-efficacité : Renforcement des croyances de l'utilisateur dans sa capacité à accomplir la tâche par la maîtrise progressive (Bandura).

- Gestion des Risques d'Épuisement Comportemental : Évitement des mécanismes punitifs ou de rupture de chaînes d'assiduité (streaks rigides) susceptibles de provoquer un abandon total suite à un échec ponctuel (What-the-Hell Effect).

### 3.3. Finance Personnelle, Budget & Prise de Décision (FinTech)

- Comptabilité Mentale (Mental Accounting) : Prise en compte de la manière dont les utilisateurs séparent et catégorisent leurs ressources financières (Thaler).

- Aversion à la Perte & Théorie des Perspectives : Évaluation de l'impact asymétrique des gains et des pertes sur les choix d'investissement et de dépense (Kahneman & Tversky).

- Architecture de Choix & Options par Défaut : Implémentation d'aménagements environnementaux (Nudges) respectant la liberté de choix tout en orientant vers les décisions financières les plus favorables (Thaler & Sunstein).

### 3.4. Productivité, Outils Métiers & Systèmes Complex (SaaS / Enterprise)

- Loi de Fitts : Optimisation de la taille et de la distance des zones d'interaction cibles pour accélérer l'exécution des commandes.

- Empan de Mémoire de Travail (Cowan) : Structuration des éléments d'information simultanés en unités distinctes respectant la limite de la mémoire à court terme (4 ± 1 éléments).

- Seuil de Doherty : Maintien des temps de réponse système sous la barre des 400 ms pour préserver l'état de concentration ininterrompu.

- Loi de Tesler (Conservation de la Complexité) : Gestion du déplacement de la complexité incontournable du système vers l'interface ou le code d'arrière-plan.

- Perception Graphique (Cleveland & McGill) : Choix des encodages visuels les plus précis (ex. alignement sur échelle commune vs surface/couleur) pour la visualisation de données.

### 3.5. Jeux, Interfaces Interactives & Immersion (Gaming / Real-time)

- Théorie du Flow : Maintien d'un équilibre dynamique permanent entre le niveau de défi proposé et le niveau de compétence de l'utilisateur (Csikszentmihalyi).

- Boucle d'Interaction & Visibilité de l'État : Application des principes fondamentaux du design centré utilisateur : retour d'information immédiat, visibilité des états du système et cartes mentales claires (Norman).

## 4. Protocole Anti-Hallucination Bibliographique (Intégrité Académique)

Afin d'assurer la rigueur absolue des références exploitées par l'agent IA, les règles d'intégrité suivantes doivent être appliquées sans exception :

### 4.1. Interdiction d'Invention

L'IA a l'interdiction formelle d'inventer, d'interpoler ou d'extrapoler des métadonnées bibliographiques. Cela comprend les noms d'auteurs, années de publication, titres d'articles, noms de revues ou identifiants DOI. Aucune référence fictive ou approximative ne doit être générée.

### 4.2. Protocole Méthodologique en 4 Étapes (Inspiré de PRISMA)

Pour garantir la rigueur scientifique et la répétabilité de l'analyse, l'exploration de la littérature académique doit obligatoirement suivre un processus structuré en 4 étapes inspiré des directives PRISMA (Preferred Reporting Items for Systematic Reviews and Meta-Analyses) :

- Étape 1 : Identification — Formulation explicite de la question de recherche et établissement d'une liste de mots-clés ciblés, combinés via des opérateurs booléens, tant en français qu'en anglais (ex. « cognitive load » AND « user interface »).

- Étape 2 : Sélection (Screening) — Application stricte des critères d'inclusion (revues systématiques, essais contrôlés, normes officielles WCAG/ISO, études empiriques fondatrices) et d'exclusion (billets d'humeur, contenu promotionnel, articles non sourcés ou méthodologiquement faussés).

- Étape 3 : Extraction — Relevé rigoureux des métadonnées clés : cadre et contexte expérimental, taille et caractéristiques de l'échantillon d'étude, variables et résultats quantitatifs/qualitatifs mesurés, ainsi que les limites explicites formulées par les auteurs.

- Étape 4 : Synthèse & Transposition — Établissement d'une frontière nette entre les faits formellement démontrés par l'étude et les extrapolations ergonomiques/fonctionnelles proposées pour le projet.

### 4.3. Bases Documentaires & Sources Référentes Accessibles

La vérification et l'extraction des données doivent s'appuyer prioritairement sur les bases documentaires et plateformes suivantes :

- Google Scholar & Semantic Scholar : Moteurs de recherche scientifiques ouverts pour la localisation d'articles et la consultation des citations.

- PubMed : Base de données biomédicale et de sciences cognitives/comportementales en libre accès.

- ACM Digital Library : Consultation des résumés (abstracts) et actes de conférences de référence en Human-Computer Interaction (CHI, UIST).

- Normes Officieuses & Standards (W3C / ISO) : Directives WCAG 2.2 et normes d'ergonomie des logiciels (ISO 9241).

- Instituts d'Études UX Terrain (Nielsen Norman Group, Baymard Institute) : Rapports d'usabilité et recherches empiriques à grande échelle sur l'expérience utilisateur.

### 4.2. Traitement de l'Incertitude

Lorsque l'IA n'a pas accès à une base académique en temps réel pour valider une référence exacte :

- Elle ne doit pas générer une citation plausible.

- Elle doit utiliser la notation standard d'incertitude :« À vérifier dans la littérature académique : [Concept théorique / Auteur présumé] »

### 4.4. Traitement de l'Incertitude

### 4.5. Dissociation Factuelle

- La preuve scientifique établie : Ce qui a été formellement mesuré et démontré dans le périmètre d'expérimentation restreint de l'étude.

- L'hypothèse d'application produit : L'extrapolation ergonomique ou technique proposée pour le projet en cours (qui reste une hypothèse à vérifier par le test utilisateur).

## 5. Grille de Validation QA (Quality Assurance)

Avant toute validation du document de cadrage scientifique, l'ensemble des points suivants doit être vérifié :

- 1. Vérification de la Hiérarchie des Preuves : Les choix critiques d'architecture ou d'expérience reposent-ils sur des sources de niveau [N1] à [N3] ?

- 2. Traçabilité des Assertions Comportementales : Chaque affirmation sur la psychologie ou le comportement de l'utilisateur est-elle appuyée par une référence explicite ?

- 3. Pertinence Disciplinaire : Les cadres théoriques invoqués correspondent-ils exactement au domaine métier de l'application ?

- 4. Absence d'Hallucination Bibliographique : L'intégralité des références (Auteurs, Année) a-t-elle été vérifiée ou correctement étiquetée en tant qu'hypothèse à vérifier ?

- 5. Isolation Faits vs Extrapolations : La frontière entre le résultat scientifique brut et son adaptation sous forme de fonctionnalité produit est-elle sans ambiguïté ?

- 6. Audit des Risques d'Effets Indésirables : Le document identifie-t-il les effets pervers potentiels des mécanismes intégrés (ex. surcharge cognitive, effet Dark Pattern involontaire, rupture d'engagement) ?
