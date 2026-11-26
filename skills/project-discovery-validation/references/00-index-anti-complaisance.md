# 00 — Index, Taxonomie des Preuves & Anti-Complaisance IA (Version 2.0)

Statut : Référentiel Discovery & Roadmap V2.0 · Destiné aux agents IA avant toute rédaction de cahier des charges ou de code
Skill : project-discovery-validation (Maillon 0)

## 1. Mission du Maillon 0

Le Maillon 0 (project-discovery-validation) constitue le socle critique et obligatoire de tout processus de conception logicielle. Il intervient en tout premier lieu, amont aux phases de spécification fonctionnelle (product-spec-docs) et d'architecture d'interface (ux-ui-design).

Sa mission est triple :

- Anti-« Feature Factory » : Empêcher le développement systématique et non questionné de fonctionnalités inutiles, gadgets ou prématurées, en soumettant chaque idée à une grille d'évaluation rigoureuse.

- Ancrage Terrain & Validation Factuelle : Vérifier l'écosystème existant (dépôts GitHub, discussions Reddit, forums spécialisés, solutions concurrentes) afin de détecter les frustrations réelles, les angles morts et les opportunités scientifiques ou comportementales.

- Traçabilité & Roadmap Séquencée : Établir une trajectoire de développement progressive et réaliste, adossée à des preuves vérifiables et des jalons étanches.

Tout agent IA ou concepteur humain doit exécuter ce maillon avant de produire la moindre ligne de code ou de rédiger une spécification technique.

## 2. Carte des Documents du Référentiel

| Document | Contenu principal | Quand le charger |
| --- | --- | --- |
| 00 — Index, Taxonomie des Preuves & Anti-Complaisance IA | Règles d'anti-complaisance IA, niveaux de preuve [N1] à [N6], protocole d'arbitrage et cadrage global. | Toujours (systématiquement présent dans le contexte d'analyse). |
| 01 — Analyse de l'Existant, Concurrence & Signaux Terrains (GitHub, Reddit, Forums) | Recherche méthodique sur GitHub, Reddit, forums spécialisés et concurrents. Identification des frustrations réelles, des angles morts et de la faisabilité de différenciation. | Dès le démarrage d'un projet ou avant l'évaluation d'une nouvelle fonctionnalité majeure. |
| 02 — Sens des Features, Validation Scientifique & Faisabilité Technique | Cadre Jobs-to-be-Done (JTBD), modèle de Kano, principe de falsifiabilité (Popper), sciences comportementales, charge cognitive et coût de maintenance technique. | Pour chaque fonctionnalité proposée avant intégration au backlog. |
| 03 — Construction de la Roadmap (Jalon 0 → MVP → V1 → Itérations) | Méthode standard de découpage d'un projet en 5 étapes (Jalon 0 Cadrage, Jalon 1 Noyau Métier, Jalon 2 MVP Testable, Jalon 3 Stabilisation V1.0, Jalon 4+ Évolutions & Découverte Continue) et critères de passage (Gates). | Dès qu'il s'agit de planifier et d'ordonnancer l'exécution d'un projet logiciel. |
| 04 — Protocole de Recherche Scientifique & Revue de Littérature | Méthodologie de recherche académique et appliquée, validation par la littérature peer-reviewed et grilles d'évaluation scientifique. | Lorsqu'une hypothèse nécessite une justification scientifique approfondie ou un niveau de preuve [N2]. |
| 05 — Arbitrage Technique, Stack, Coûts & Build vs Buy | Choix d'architecture, évaluation du ratio Build vs Buy, analyse des coûts d'infrastructure, de la dette technique et des contraintes de performance. | Avant toute décision d'architecture, de choix de stack ou d'engagement de coûts techniques. |
| 06 — Validation Terrain & Prototypes HTML Interactifs (« Bug ou idée ? ») | Expérimentation rapide par prototypes HTML/JS legers, tests utilisateur guidés et distinction entre bugs d'ergonomie et pertinence de l'idée. | Lorsqu'une fonctionnalité est classée « À TESTER AVANT DE CODER » pour valider l'usage réel. |
| 07 — Anti-Patterns Produit, Études de Cas & Prompts Prêts à Injecter | Bibliothèque d'anti-patterns documentés, retours d'expérience, études de cas réelles et prompts d'arbitrage pour guider les agents IA. | Pour auditer une proposition, injecter des prompts de validation ou éviter les pièges de conception fréquents. |

## 3. Taxonomie des Niveaux de Preuve

Afin d'éviter les décisions fondées sur de simples impressions, toute affirmation, exigence ou proposition de fonctionnalité doit être adossée à un Niveau de Preuve explicite (standardisé de [N1] à [N6]).

- [N1] Exigence réglementaire, conformité & sécurité vérifiées : Contrainte juridique stricte, conformité RGPD/privacy, sécurité, éthique IA, accessibilité légale (RGAA/WCAG) et évaluation précoce des risques majeurs.

- [N2] Résultat scientifique publié : Fait établi par la recherche scientifique (psychologie cognitive, économie comportementale, ergonomie, études empiriques peer-reviewed).

- [N3] Signal terrain vérifié, métriques & retours sourcés : Retours utilisateurs documentés, occurrences sur Reddit/GitHub, métriques d'impact mesurées, avis vérifiables ou benchmarks concurrentiels précis.

- [N4] Standard, contrainte technique & seuil d'interactivité : Limite d'API, contrainte d'infra, complexité algorithmique et respect du seuil de réactivité Doherty (~400 ms) aligné sur le référentiel UX/UI (00B).

- [N5] Hypothèse produit argumentée : Déduction logique basée sur une cohérence métier interne, mais ne disposant pas encore d'une confirmation directe sur le terrain.

- [N6] Intuition brute à tester : Idée non vérifiée, préférence personnelle ou concept abstrait nécessitant un protocole de test impératif avant d'investir du temps de développement (risque élevé de gadget).

## 4. Règles Strictes Anti-Complaisance IA

Les modèles de langage (LLM) présentent un biais structurel documenté de complaisance (sycophancy — Perez et al., 2022 ; Sharma et al., 2023), les inclinant à valider systématiquement les propositions de l'utilisateur, à sur-approuver les idées complexes et à éviter la contradiction.

Dans le cadre du Skill project-discovery-validation, l'IA doit impérativement briser ce biais en appliquant 5 règles de garde-fou absolues :

### Règle 1 : Interdiction de valider par réflexe

L'IA a l'interdiction formelle de répondre par des formules de validation bienveillantes systématiques ("Excellente idée !", "C'est très pertinent"). L'analyse doit rester sobre, neutre et axée sur l'évaluation des risques.
Pour garantir une approche fluide, la rigueur s'applique de manière proportionnée :

- Idées mineures / Ajustements secondaires : Arbitrage rapide sans sur-procédure, centré sur la cohérence globale et l'impact immédiat.

- Décisions structurantes / Features majeures : Analyse complète soumise aux 5 filtres d'évaluation et à la taxonomie des preuves.

### Règle 2 : Test du « Contre-Argument Obligatoire »

Pour chaque fonctionnalité analysée, l'IA doit obligatoirement rédiger une section intitulée :
« Pourquoi cette fonctionnalité pourrait être inutile ou nuisible ».
Cette section doit évaluer au minimum :

- La charge cognitive supplémentaire imposée à l'utilisateur.

- La friction d'usage ou la dégradation de l'expérience globale.

- Les effets secondaires psychologiques (ex. anxiété du choix, lassitude).

- La complexité de maintenance et la dette technique induite.

### Règle 3 : Proposition systématique d'une alternative minimaliste

Pour chaque fonctionnalité proposée, l'IA doit obligatoirement concevoir une Version Minimaliste (3x plus simple). Cette variante doit réduire le temps de développement et la complexité d'usage par un facteur trois (ex. remplacer un moteur de configuration dynamique par un paramètre par défaut intelligent, ou un tableau de bord 3D par une liste textuelle structurée).

### Règle 4 : Détection explicite des biais cognitifs

L'IA doit analyser la demande de l'utilisateur et signaler explicitement la présence potentielle des biais suivants :

- Biais de confirmation : Ne retenir que les signaux qui arrangent l'idée initiale.

- Effet IKEA : Survaloriser une fonctionnalité au seul motif qu'on a passé du temps à la concevoir.

- Syndrome de l'objet brillant (Shiny Object Syndrome) : Vouloir intégrer des technologies complexes (IA, Blockchain, 3D, animations lourdes) sans besoin utilisateur réel.

- Biais des coûts irrécupérables : Persister dans le développement d'un module bancal sous prétexte qu'il a déjà été commencé.

### Règle 5 : Grille d'arbitrage et Verdict tranché

Chaque évaluation de fonctionnalité doit se conclure par l'attribution stricte de l'un des 4 statuts suivants, accompagnée de la justification et des niveaux de preuve associés :

- [VALIDÉ - CŒUR MVP] : Fonctionnalité indispensable au fonctionnement minimal du produit, adossée à une preuve [N1], [N2], [N3] ou [N4].

- [ADAPTÉ - VERSION SIMPLIFIÉE] : L'idée de base est retenue mais ramenée à sa version minimaliste pour réduire le coût et la complexité.

- [À TESTER AVANT DE CODER] : Hypothèse prometteuse mais relevant du niveau [N5] ou [N6]. Exige un test utilisateur ou un prototype rapide avant tout développement.

- [ÉCARTÉ / REPORTÉ] : Fonctionnalité identifiée comme gadget, inutile, nuisible à l'expérience utilisateur ou techniquement disproportionnée.
