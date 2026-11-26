# Document 02 — Sens des Features, Validation Scientifique & Faisabilité Technique (Version 2.0)

Cadre méthodologique d'évaluation, d'arbitrage et de validation pour le développement produit.

## 1. Trouver le Vrai Sens Derrière la Feature : Jobs-to-be-Done (JTBD)

### Cadre scientifique

La théorie des Jobs-to-be-Done (Clayton Christensen et al., Anthony Ulwick) stipule qu'un utilisateur n'achète ni n'adopte une fonctionnalité pour ses caractéristiques intrinsèques, mais pour l'« embaucher » afin d'accomplir un progrès au sein d'une situation contextuelle donnée. Il s'agit d'une approche phénoménologique du progrès recherché qui intègre trois dimensions indissociables : fonctionnelle (accomplir la tâche), émotionnelle (se sentir en confiance, réduire le stress) et sociale (comment on est perçu par ses pairs). L'analyse doit extraire la motivation fondamentale en se détachant d'un simple besoin technique ou d'une solution d'interface préconçue.

### Formule obligatoire de cadrage

Chaque fonctionnalité proposée doit impérativement être justifiée par la structure suivante avant toute entrée en phase d'ingénierie :« Quand [situation concrète et déclencheur contextuel], je veux pouvoir [action ou progrès recherché], afin de [bénéfice réel et mesurable dans ma vie ou mon travail]. »

### Règles opérationnelles (DO)

- Rédiger la formule JTBD avant la création de tout ticket ou spécification fonctionnelle.

- Valider que la situation décrit un déclencheur environnemental ou temporel précis, et non une action système.

- Axer le bénéfice sur la résolution d'une friction réelle (gain de temps, réduction d'anxiété, clarté décisionnelle).

### Interdits (DON'T)

- Ne jamais inclure d'éléments de solution UI/UX dans la formule (ex. « Quand j'ouvre l'app, je veux voir un graphique 3D... »).

- Ne pas confondre le besoin de l'utilisateur avec l'objectif business de l'entreprise (ex. « ...afin de remplir le formulaire d'inbound »).

- Ne pas valider une feature dont le bénéfice final est vague (ex. « ...afin d'avoir une meilleure expérience »).

### Critères QA

- Conformité syntaxique : La phrase respecte-t-elle strictement la structure en 3 temps ?

- Indépendance de la solution : La formule reste-t-elle vraie si l'interface graphique change totalement ?

- Test d'artifice : Si la formulation sonne centrée sur l'outil, le ticket est rejeté pour re-cadrage.

## 2. Arbitrage de Valeur : Modèle de Kano

### Cadre scientifique

Issu des travaux du Professeur Noriaki Kano (1984), ce modèle catégorise les fonctionnalités selon leur capacité à impacter la satisfaction de l'utilisateur en fonction de leur niveau d'accomplissement. Il s'agit d'un outil qualitatif et exploratoire qui n'impose aucun seuil numérique fixe ni ordre rigide universel ; il sert à guider les choix stratégiques pour éviter de sur-investir dans des éléments secondaires tant que les attentes fondamentales et obligatoires ne sont pas satisfaites.

### Typologie des 5 catégories officielles

Catégorie

Description & Impact

Stratégie d'arbitrage

1. Obligatoire (Must-be)

Caractéristiques indispensables attendues par défaut. Leur absence engendre une insatisfaction totale ; leur présence ne crée pas de satisfaction additionnelle.

Priorité absolue. À satisfaire impérativement avant toute sur-optimisation.

2. Performance / Linéaire (One-dimensional)

La satisfaction augmente proportionnellement au niveau d'exécution et à la qualité (vitesse, précision, capacité).

À dimensionner selon le ratio effort / valeur et la stratégie produit.

3. Attractif (Attractive)

Attributs inattendus apportant un fort niveau de réjouissance. Leur absence n'engendre aucune insatisfaction.

À planifier stratégiquement pour se différencier après consolidation du socle.

4. Indifférent (Indifferent)

Caractéristiques dont la présence ou l'absence n'impacte absolument pas la satisfaction de l'utilisateur.

À éviter ou éliminer pour concentrer les ressources sur l'essentiel.

5. Inverse (Reverse)

Fonctionnalités dont la présence provoque de l'insatisfaction ou dégrade l'expérience pour certains utilisateurs.

À proscrire ou rendre optionnelles selon les segments d'utilisateurs.

### Règles opérationnelles (DO)

- Classer chaque proposition d'évolution dans l'une des 4 catégories avant arbitrage de roadmap.

- Sécuriser 100 % des attributs Must-be avant d'allouer des ressources aux éléments Attractive.

- Mesurer la performance linéaire avec des indicateurs objectifs (ex. temps de chargement en ms, précision des recherches en %).

### Interdits (DON'T)

- Ne pas développer d'éléments Attractive si le socle Must-be présente des défaillances ou de l'instabilité.

- Ne jamais maintenir une fonctionnalité classée comme Indifférente ou Inverse sous prétexte qu'elle est techniquement finalisée.

- Eviter la sur-ingénierie des Must-be : ils doivent être irréprochables mais simples.

### Critères QA

- Matrice de classification : Chaque feature de la roadmap dispose-t-elle d'un statut Kano documenté ?

- Couverture des fondamentaux : Existe-t-il des dette-bugs non résolus sur des fonctionnalités Must-be ?

- Chasse au nuisible : Les éléments générant du rejet ou de l'indifférence ont-ils été retirés des spécifications ?

## 3. Validation par les Sciences Comportementales & Ergonomiques

### Cadre scientifique

L'architecture logicielle doit s'aligner sur les capacités cognitives humaines. Nous appliquons les principes de la théorie de l'autodétermination (Deci & Ryan), de la charge cognitive (Sweller, Cowan), du paradoxe du choix (Schwartz), de la conservation de la complexité (Tesler) et du rationalisme critique (Popper).

                      +----------------------------------+

                      |   Proposition de Fonctionnalité  |

                      +----------------------------------+

                                        |

                                        v

  +----------------------------------------------------------------------------+

  |                        GRILLE D'ANALYSE ERGONOMIQUE                        |

  +----------------------------------------------------------------------------+

  |  1. Self-Determination : Respecte l'autonomie sans pression anxiogène ?    |

  |  2. Sweller & Cowan    : Limite l'effort mental sur l'écran principal ?    |

  |  3. Schwartz & Tesler  : Absorbe la complexité au lieu de la déléguer ?    |

  +----------------------------------------------------------------------------+

                                        |

                   +--------------------+--------------------+

                   |                                         |

               [ ÉCHEC ]                                [ SUCCÈS ]

                   |                                         |

                   v                                         v

         Rejet / Redesign requis                     +---------------+

                                                     | Test Popper   |

                                                     +---------------+

                                                             |

                                                             v

                                                   Formulation du critère

                                                   d'arrêt ou de retrait

### Grille d'évaluation comportementale

#### Motivation & Autonomie (Deci & Ryan)

Soutenir les trois besoins psychologiques innés et universels : Autonomie (sentiment de contrôle), Compétence (sentiment d'efficacité) et Affiliation (sentiment de connexion aux autres). Il s'agit d'un cadre qualitatif d'évaluation de la motivation. Proscrire la contrainte externe, les streaks punitifs, la culpabilisation ou le stress induit, particulièrement dans les environnements de santé ou d'apprentissage.

#### Charge cognitive & Capacité mnésique (Sweller, 1988 ; Cowan, 2001)

Distinguer la charge intrinsèque (liée à la complexité propre de la tâche) de la charge extrinsèque (engendrée par la présentation visuelle ou l'interface). L'empan de la mémoire de travail est limité à environ 4 blocs d'information actifs simultanés (Cowan, 2001). Ce chiffre sert de repère pour limiter la densité visuelle et guider le design, sans constituer une règle rigide ou une interdiction mécanique absolue.

#### Paradoxe du choix & Loi de Tesler (Schwartz, 2004 ; Tesler)

L'accumulation excessive d'options simultanées peut engendre de l'anxiété et de la paralysie décisionnelle chez les utilisateurs novices. Toutefois, les utilisateurs experts privilégient souvent un accès direct et étendu aux fonctionnalités. Le système doit absorber la complexité sous-jacente par défaut (Loi de Tesler) tout en s'appuyant sur la divulgation progressive et la segmentation d'usage.

#### Test de Falsifiabilité (Karl Popper)

Une hypothèse produit n'est valide que si elle est réfutable. Chaque fonctionnalité doit être accompagnée d'un critère d'invalidation clair. Les seuils chiffrés et temporels associés (ex. taux d'utilisation après 30 jours) sont des objectifs internes fixés arbitrairement par l'équipe produit pour rendre l'hypothèse rigoureusement testable, et non des constantes empiriques universelles.

### Règles opérationnelles (DO)

- Réduire au strict minimum les choix de configuration à l'initialisation.

- Définir systématiquement l'indicateur d'échec (ex. « Si après 30 jours, moins de 15 % des utilisateurs actifs l'utilisent au moins 1x/semaine, la feature est supprimée »).

- Masquer la complexité technique derrière des choix par défaut intelligents.

### Interdits (DON'T)

- Ne pas utiliser de mécanismes de dark patterns ou de rétention par la culpabilité.

- Ne jamais exposer à l'utilisateur des réglages techniques que le système peut déterminer de manière automatisée.

- Ne pas conserver une fonctionnalité dont le critère de falsification Popper a été atteint.

### Critères QA

- Validation de la charge mental : Le nombre d'actions requises pour réaliser la tâche principale est-il optimal ?

- Présence du critère d'arrêt : Le ticket comporte-t-il les conditions exactes d'invalidation et de dépréciation de la feature ?

- Autonomie respectée : L'interface est-elle exempte d'éléments coercitifs ?

## 4. Évaluation de la Faisabilité Technique & Coût de Maintenance

### Cadre scientifique

Cette étape évalue la viabilité de l'ingénierie et la pérennité architecturale à travers quatre dimensions d'analyse d'impact prédictives.

```text
                    +------------------------------------+
                    |   Matrice d'Arbitrage Impact/Coût  |
                    +------------------------------------+
        ÉLEVÉ  ^  +--------------------+--------------------+
               |  |  RÉVISION / REJET  |  PRIORITÉ ABSOLUE  |
               |  |  (Forte valeur mais|  (Victoire rapide  |
               |  |   coût trop cher)  |   ou ROI massif)   |
        IMPACT |  +--------------------+--------------------+
        CLIENT |  |  ÉLIMINATION      |  SECOND RANG       |
               |  |  (Gaspillage de    |  (À traiter si    |
               |  |   ressources)      |   bande passante)  |
        FAIBLE |  +--------------------+--------------------+
               +-------------------------------------------->
                  ÉLEVÉ <------------- EFFORT -------------> FAIBLE
                                  (Technique & Maint.)
```

### Grille d'évaluation à 4 dimensions

#### 1. Faisabilité & Dépendances

- La fonctionnalité est-elle réalisable avec la pile technique actuelle ?

- Introduit-elle une dépendance critique (ex. API tierce fermée, contraintes d'exécution navigateur, coûts d'infrastructure récurrents) ?

#### 2. Cas aux limites (Edge Cases) & Données

- Comportement du système en l'absence de données (empty state), avec données incomplètes, volumineuses ou en mode déconnecté.

- Prise en compte de la résilience du système face aux erreurs réseau ou de saisie.

#### 3. Coût de maintenance à long terme

- Évaluation de la dette technique induite.

- Estimation de l'effort d'entretien pour un cas d'usage ciblant une minorité d'utilisateurs (ex. maintenance d'un moteur de règles métier sur-mesure pour < 5 % de la base).

#### 4. Ratio Impact / Effort

- Alignement sur la matrice Impact vs Effort : recherche permanente des interventions à fort impact comportemental et faible complexité logicielle.

### Règles opérationnelles (DO)

- Effectuer une revue d'architecture technique systématique avant toute décision de build.

- Définir explicitement les états dégradés et les cas aux limites dans le cahier des charges fonctionnel.

- Refuser le développement d'une fonctionnalité dont le coût de maintenance annuel dépasse la valeur produite.

### Interdits (DON'T)

- Ne pas intégrer de services ou d'API tierces sans solution de repli (fallback) documentée.

- Ne pas valider de fonctionnalité sans l'accord explicite de l'équipe d'ingénierie sur l'effort de maintenance.

- Ne pas négliger l'impact sur les performances globales de l'application (temps de réponse, taille des bundles).

### Critères QA

- Robustesse aux limites : Tous les états (vide, erreur, chargement, hors-ligne) ont-ils été validés en environnement de test ?

- Score Impact/Effort : Le ratio a-t-il été évalué et jugé favorable par l'équipe produit et technique ?

- Absence de dépendance critique isolée : Le composant supporte-t-il la rupture d'un service tiers sans bloquer l'application ?

## 4. bis Arbitrage Complémentaire : Priorisation Quantitative, Risques & Métriques

### Priorisation quantitative structurée (Score RICE & WSJF)

En complément de la qualification Kano, les fonctionnalités candidates sont départagées à l'aide du score RICE pour établir un classement objectif basé sur les données :

- Reach (Portée) : Nombre d'utilisateurs ou d'événements impactés sur une période donnée.

- Impact : Effet estimé sur l'utilisateur (3 = massif, 2 = fort, 1 = moyen, 0.5 = faible, 0.25 = minime).

- Confidence (Confiance) : Pourcentage de certitude sur les estimations (100% = données précises, 80% = confirmation qualitative, 50% = intuition).

- Effort : Temps total requis par l'équipe globale (personnes-mois ou story points).

Formule RICE = (Reach × Impact × Confidence) / Effort

### Analyse des risques précoces, éthique IA & Conformité RGPD

Chaque projet de fonctionnalité doit faire l'objet d'un diagnostic d'impact préalable dès la phase d'idéation :

- Privacy by Design (RGPD) : Vérification systématique de la minimisation des données personnelles collectées et validité des bases légales de traitement.

- Sécurité & Résilience : Évaluation du risque d'exposition de données ou de vulnérabilités fonctionnelles (Risk Register léger).

- Éthique & Biais IA : Prévention des biais algorithmiques, transparence des systèmes automatisés et contrôle humain préservé.

### Métrique de Succès & Viabilité Économique (Lean Business Case)

- North Star Metric / KPI Actionnable : Rattachement de la feature à un indicateur de valeur mesurable et non manipulable (en évitant strictement les vanity metrics).

- Lean Business Case : Validation de l'équilibre financier rapide (coût serveur récurrent par utilisateur vs valeur générée).

## 5. Fiche de Décision Feature (Template Exécutif)

Ce gabarit synthétique doit être renseigné pour trancher objectivement l'opportunité de chaque proposition de fonctionnalité.

### Template de Décision Exécutif (v2.0)

| Item | Champ d'évaluation | Saisie & Analyse |
| --- | --- | --- |
| 01 | Nom de la Feature | [Ex. Exportation Automatisée des Rapports Hebdomadaires] |
| 02 | Formule JTBD (3 Dimensions) | Quand [situation], je veux [action/progrès], afin de [bénéfice fonctionnel, émotionnel & social]. |
| 03 | Classification Kano (5 Catégories) | [ ] Obligatoire    [ ] Performance    [ ] Attractif    [ ] Indifférent    [ ] Inverse |
| 04 | Score RICE & Priorisation | R: [ ] × I: [ ] × C: [ ]% / E: [ ] = Score RICE Final : [ Score ] |
| 05 | Validation Comportementale | Deci & Ryan (3 besoins), Charge Sweller/Cowan & Divulgation progressive : [Validé / À réviser] |
| 06 | Test de Falsifiabilité (Popper) | Critère d'invalidation produit : [Objectif interne chiffré + horizon temporel] |
| 07 | Risques, RGPD & Éthique IA | Privacy by Design : [Conforme] — Risk Register & Éthique : [Validé / Risque identifié] |
| 08 | Faisabilité & Business Case | Stack compatible & Edge Cases : [Oui/Non] — Viabilité économique : [Validée] |
| 09 | KPI & North Star Metric | Métrique de succès actionnable : [Indicateur clé de valeur mesurable] |
| 10 | DÉCISION FINALE |  |

```
[ GO / NO-GO / RE-DESIGN ] — Réviseur : 
```
