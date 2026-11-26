# 07 — Anti-Patterns Produit, Études de Cas & Prompts Prêts à Injecter

Statut : Référentiel Discovery & Roadmap V2.0 · Skill : project-discovery-validation

## 1. Catalogue des 8 Anti-Patterns Produit à Éliminer Avant de Coder

Ce catalogue recense les erreurs de conception produit les plus fréquentes observées en phase de framing. L'application systématique du Skill project-discovery-validation permet d'identifier et de neutraliser ces biais avant d'engager la moindre ligne de code.

N°

Anti-Pattern Produit

Pourquoi c'est nocif (base scientifique / terrain)

Correction obligatoire

1

Syndrome du Couteau Suisse (Feature Creep)

Paradoxe du choix (Schwartz) : la surabondance d'options augmente l'anxiété, provoque la paralysie décisionnelle et alourdit la charge cognitive. Entraîne systématiquement un retard de livraison et une dette UX dès le lancement.

Isoler les 2 à 3 fonctionnalités Must-be (modèle de Kano). Verrouiller le périmètre du MVP et basculer arbitrairement l'intégralité des fonctionnalités secondaires en V1.1+.

2

IA Générative partout (Shiny Object Syndrome)

Seuil de Doherty (~400ms) : la latence des LLM (> 1s) détruit la fluidité de l'expérience utilisateur. S'y ajoutent les coûts d'infrastructures récurrents, l'imprédictibilité des réponses et le risque d'hallucination sur des tâches simples.

Employer des règles déterministes, de la logique booléenne ou des filtres codés en dur lorsque la logique métier est connue. Réserver les LLM exclusivement aux problèmes à forte ambiguïté textuelle ou contextuelle.

3

Gamification punitive (Streaks rigides, classements)

Self-Determination Theory (Deci & Ryan) : la contrainte externe et la menace de perte détruisent la motivation intrinsèque. La rupture d'une série (streak) provoque un sentiment d'échec et entraîne l'abandon définitif du produit.

Privilégier une continuité souple (ex: objectifs hebdomadaires), des bilans bienveillants, et valoriser la progression personnelle sans comparaison sociale forcée ni culpabilisation.

4

Compte obligatoire avant la valeur (Registration Wall)

Chute du Time-to-First-Value (NN/g) : forcer la création de compte au premier lancement crée une friction d'acquisition critique. L'utilisateur refuse de s'engager sans avoir mesuré la valeur réelle de l'outil.

Adopter une approche Local-First ou un mode invité immédiat. Différer l'inscription et la solliciter uniquement lorsqu'une action nécessite une synchronisation multi-appareils ou une sauvegarde distante.

5

Tableau de bord passif (Vanity Metrics)

Loi de Hick & Principes de Stephen Few : accumuler des indicateurs statiques surcharge l'attention visuelle sans orienter la décision. Voir une donnée sans pouvoir agir génère de la frustration et de l'inattention.

Restreindre le tableau de bord aux seules données décisionnelles. Chaque élément affiché doit être directement couplé à une action concrète à exécuter ou à une prise de décision immédiate.

6

Prison de données (Format propriétaire)

Anxiété de rétention et rejet technique : le verrouillage des données (lock-in) suscite une défiance immédiate chez les utilisateurs avertis et freine l'adoption (signaux récurrents sur GitHub/Reddit).

Implémenter dès le MVP des modules d'exportation et d'importation intégrés dans des formats standards ouverts (JSON, CSV, Markdown).

7

Architecture par couches (Big Bang Slicing)

Biais d'engagement & méthodologie Lean : construire séparément toute la base de données, puis toutes les API, retardera l'accès aux tests utilisateurs. Les fausses hypothèses de conception sont découvertes trop tard.

Structurer le développement en tranches verticales (Vertical Slicing). Chaque jalon doit livrer une fonctionnalité complète, du stockage à l'interface utilisateur, testable en conditions réelles.

8

Configuration préalable obligatoire

Loi de Tesler (Conservation de la complexité) : imposer la saisie de nombreux paramètres avant la première utilisation transfère injustement la complexité du système sur l'utilisateur.

Fournir des configurations par défaut prêtes à l'emploi et opérationnelles dès le premier lancement. Permettre l'ajustement progressif des paramètres experts in situ.

## 2. Études de Cas « Avant / Après » (Arbitrage du Skill 0)

Ces études de cas illustrent l'arbitrage rendu par le moteur de validation du Skill 0 face à une IA complaisante qui validerait sans filtre les demandes de fonctionnalités.

### Cas 1 — Application de reprise d'activité physique

- Demande initiale : « Intégrer un système de séries quotidiennes (streaks) avec perte de points en cas de jour manqué, complété par un classement public entre utilisateurs. »

- Analyse de l'IA complaisante : « Excellente idée d'engagement ! Nous allons créer un tableau de bord avec des animations de flammes pour la série et un système de badges de bronze à diamant. »

- Arbitrage Skill 0 : ÉCARTÉ / ADAPTÉ

- Base scientifique : Selon la Théorie de l'Auto-détermination (Deci & Ryan), l'introduction de punitions (perte de points/série brisée) convertit une motivation intrinsèque (santé, bien-être) en une contrainte contrôlée externe. En cas de première journée manquée (imprévu, fatigue), l'utilisateur subit un effet de rupture qui mène à l'abandon total de l'application.

- Décision : Suppression des streaks quotidiens stricts. Remplacement par un indicateur de régularité hebdomadaire souple (ex: "3 séances cette semaine"). Aucune pénalité en cas d'interruption et masquage des classements publics au profit d'objectifs individuels.

### Cas 2 — Application de budget personnel local-first

- Demande initiale : « Développer un moteur d'IA générative et OCR capable de photographier, scanner et catégoriser automatiquement chaque ticket de caisse dès le MVP. »

- Analyse de l'IA complaisante : « Très moderne ! Nous allons intégrer un modèle de vision par ordinateur couplé à un LLM pour extraire chaque ligne d'article et la mapper dans une base de données. »

- Arbitrage Skill 0 : REPORTÉ V2 / SIMPLIFIÉ MVP

- Base technique & UX : Complexité d'ingénierie disproportionnée pour un MVP. Les taux d'erreur de l'OCR sur tickets froissés ou mal éclairés enfreignent l'exigence de prévisibilité d'un outil financier. La latence du traitement d'image viole le seuil de Doherty (~400ms).

- Décision : Reporter le module vision/IA en V2. Pour le MVP, implémenter un import rapide de fichiers bancaires (CSV/OFX) associé à un moteur de règles déterministes par mots-clés (ex: "Si le libellé contient 'Total', catégoriser en 'Courses'"). Traitement instantané, coût nul et fiabilité à 100%.

### Cas 3 — Outil d'organisation d'événements et de cadeaux

- Demande initiale : « Ajouter 12 graphiques analytiques sur le tableau de bord principal (répartition des coûts par catégorie, évolution temporelle des achats, diagrammes en camembert). »

- Analyse de l'IA complaisante : « Superbe pour le suivi ! Nous pouvons afficher des diagrammes circulaires, des histogrammes empilés et des courbes de tendance dès la page d'accueil. »

- Arbitrage Skill 0 : ÉCARTÉ

- Base ergonomique : Loi de Hick & Principes de Stephen Few. Dans le cadre de l'organisation d'un événement, l'utilisateur cherche à exécuter des tâches logistiques précises. L'accumulation de visualisations passives engendre une surcharge cognitive inutile.

- Décision : Suppression des graphiques analytiques. Remplacement par un tableau de bord opérationnel orienté action à 100% : une liste synthétique affichant uniquement deux informations critiques — Qui n'a pas encore de cadeau attribué ? et Quelles commandes restent à effectuer ? avec boutons d'action directe.

## 3. Prompt Maître Prêt à Injecter

Ce prompt est conçu pour déclencher l'exécution complète du protocole du Skill 0 (project-discovery-validation). Il force l'IA à adopter une posture critique, appuyée sur des bases scientifiques et de l'analyse terrain.

Vous êtes un expert en Conception Produit, Ingénierie Logicielle et UX Psychology, agissant sous les directives strictes du "Skill 0 : Project Discovery & Validation".

Votre rôle est de challenger sans complaisance mon idée de projet ou ma demande de fonctionnalité, afin de m'éviter de coder un produit inutile, trop complexe ou ergonomiquement défaillant.

Voici les informations sur mon projet / ma fonctionnalité :

- Idée / Fonctionnalité : <DÉCRIRE VOTRE PROJET OU VOTRE FEATURE ICI>

- Cible visée : <PRÉCISER LES UTILISATEURS CIBLES>

- Problème supposé : <PRÉCISER LE PROBLÈME À RÉSOUDRE>

Exécutez le protocole d'analyse ci-dessous et fournissez votre réponse de manière structurée :

---

### 1. Analyse des Signaux Terrain & État de l'Art

- Quels sont les retours récurrents ou frustrations identifiées sur ce type d'outil (retours types GitHub Issues, Reddit, Forums spécialisés) ?

- Quels sont les concurrents existants et pourquoi la plupart des solutions commettent-elles des erreurs de sur-conception ?

### 2. Définition du Just-In-Time Jobs-To-Be-Done (JTBD) & Priorisation

- Rédigez le JTBD principal sous la forme : "Quand [situation], je veux [action], afin de [bénéfice mesurable]."

- Appliquez le modèle de Kano pour classer les fonctionnalités proposées (Must-be, Performance, Delighter).

- Calculez le Score RICE (Reach, Impact, Confidence, Effort) pour justifier la priorisation des fonctionnalités.

- Identifiez la métrique clé de succès (North Star Metric) et ses indicateurs secondaires.

### 3. Évaluation Scientifique, Risques & Viabilité Économique

Évaluez la proposition au regard des concepts et dimensions suivantes :

- Principes UX & Psycho : Loi de Hick, Charge cognitive (Sweller), Seuil de Doherty (~400ms), Self-Determination Theory (Deci & Ryan), Paradoxe du Choix (Schwartz), Loi de Tesler.

- Registre des Risques & RGPD : Identification des risques critiques (techniques, légaux, conformité RGPD / données sensibles) et mesures de mitigation.

- Estimation économique (Lean Business Case / TCO) : Évaluation simplifiée des coûts d'infrastructure, de la complexité de maintenance et du ROI estimé.

### 4. Challenge & Contre-Argumentation Obligatoire

- Donnez AU MOINS 2 raisons scientifiques ou techniques pour lesquelles cette fonctionnalité ou ce projet risque d'échouer s'il est développé tel quel.

- Proposez une ALTERNATIVE 3× PLUS SIMPLE à coder, ne nécessitant aucune sur-ingénierie (sans IA inutile, sans base de données complexe, ou sans workflows superflus).

### 5. Arbitrage & Roadmap de Validation par Jalons

Rendez votre verdict parmi les options suivantes : [VALIDÉ MVP] / [REPORTÉ V2] / [REMANIÉ/SIMPLIFIÉ] / [ÉCARTÉ].

Fournissez un découpage strict selon la nomenclature des jalons standardisée :

- Jalon 0 (Cadrage) : Hypothèses critiques, JTBD et périmètre du cadrage.

- Jalon 1 (Noyau Métier) : Modèle de données minimal, règles métiers déterministes.

- Jalon 2 (MVP Testable & Prototype HTML) : Prototype fonctionnel et fonctionnalités Must-be testables.

- Jalon 3 (Stabilisation V1.0) : Tests de montée en charge, sécurité, RGPD et retours utilisateurs.

- Jalon 4+ (Évolutions & Découverte Continue) : Fonctionnalités secondaires, intégrations et IA contextuelle.

## 4. Protocole de Benchmark Comparatif (Avec Skill 0 vs Sans Skill 0)

Afin d'évaluer objectivement l'impact de l'activation du Skill 0 (project-discovery-validation) sur les réponses de l'IA, appliquez le grille de benchmark ci-dessous lors de vos tests d'ingénierie prompt.

Critère d'Évaluation

Sans Skill 0 (IA Standard Complaisante)

Avec Skill 0 (Project Discovery Validation)

Gain / Impact Mesurable

Complaisance & Esprit Critique

Validation immédiate des idées, enthousiasme sans nuance, encouragement à la sur-conception.

Challenging systématique, identification des biais produit, rejet des fonctionnalités superflues.

Élimination des fonctionnalités à faible valeur ajoutée dès le cadrage (réduction du périmètre MVP).

Couverture des Risques & RGPD

Absence d'analyse des risques techniques, légaux ou de confidentialité des données.

Registre des risques obligatoire, évaluation de l'impact RGPD et identification des points de défaillance.

Anticipation des blocages réglementaires et architecturaux avant la phase de développement.

Rigueur des Sources & UX

Conseils génériques sans fondement théorique ni métriques de validation précises.

Application rigoureuse des lois UX (Hick, Tesler, Doherty ~400ms, SDT) et scoring RICE / North Star.

Décisions produit appuyées sur des principes scientifiques reconnus et mesurables.

Structure de la Roadmap

Plan d'action linéaire, découpage par couches (DB, API, Front) favorisant l'effet Tunnel.

Découpage strict en tranches verticales (Jalons 0 à 4+) axé sur la valeur testable.

Livraison accélérée d'un MVP opérationnel et testable en conditions réelles.
