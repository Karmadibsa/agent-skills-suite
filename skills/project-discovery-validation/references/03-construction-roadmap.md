# 03 — Construction de la Roadmap (Jalon 0 → MVP → V1 → Itérations) (Version 2.0)

Guide opérationnel et méthodologique pour découper le développement d'un logiciel par couches de valeur, valider chaque étape stratégique et sécuriser l'exécution technique.

## 1. Principe Fondamental : Construire par Couches de Valeur (et non par Couches Techniques)

L'erreur la plus coûteuse dans le développement logiciel consiste à organiser le projet par couches technologiques horizontales : modéliser l'intégralité de la base de données, puis développer l'ensemble des API backend, puis concevoir tout le design system, pour enfin assembler le frontend.

Cette approche en « tunnel » présente un risque majeur : le produit ne livre aucune valeur testable avant plusieurs mois d'effort. Si une hypothèse métier est fausse ou si l'architecture rencontre un blocage, la découverte intervient trop tard, entraînant des refontes lourdes et coûteuses.

### L'approche recommandée : Le Vertical Slicing (Lean Product Development)

S'inspirant des travaux d'Eric Ries (The Lean Startup) et de Marty Cagan (Inspired), la construction par tranches verticales (Vertical Slicing) préconise la livraison rapide d'un parcours utilisateur complet de bout en bout sur la fonctionnalité principale.

```
[Approche Horizontale - À ÉVITER]      [Approche Verticale - RECOMMANDÉE]
+---------------------------------+   +---------------------------------+
| UI / Design (Étape 4)           |   |       Parcours Complet 1        |
|---|---|---|
| Backend / API (Étape 3)         |   |  en bout sur le cas critique)   |
+---------------------------------+   +---------------------------------+
| Logique Métier (Étape 2)        |   |       Parcours Complet 2        |
+---------------------------------+   +---------------------------------+
| Base de Données (Étape 1)       |   | Évolutions & Extensions         |
+---------------------------------+   +---------------------------------+
```

Chaque tranche traverse toutes les couches techniques (BDD, logique, API, UI) mais sur un périmètre fonctionnel extrêmement étroit. Cette méthode permet de :

- Valider immédiatement l'architecture sur du code réel et exécutable.

- Tester l'ergonomie et le flux de données auprès d'utilisateurs dès les premières semaines.

- Limiter le coût du changement en ajustant le tir à chaque itération.

## 2. Les 5 Jalons Standards d'une Roadmap Logicielle

### Jalon 0 — Cadrage, Validation & Architecture Minimale (Avant de coder)

- Objectif : Verrouiller le problème à résoudre, valider l'alignement des fonctionnalités avec les priorités stratégiques, choisir la stack technique et rédiger la documentation de référence (product-spec-docs).

- Ce qui est inclus :

- Spécifications fonctionnelles et modèle conceptuel de données de base.

- Choix des technologies, des services tiers et définition de l'architecture cible.
*Maquettes basse fidélité (wireframes) des parcours utilisateur critiques.

- Ce qui est interdit : Écrire du code d'interface finale, mettre en place du style visuel avancé ou optimiser des détails graphiques secondaires.

- Critère de passage (Gate 0) : Périmètre MVP verrouillé, risques/RGPD identifiés, stack validée.

- Gouvernance & Validation : Validé par le Product Manager, Tech Lead et le Sponsor Projet.

- Métriques & Lean Business Case : Validation de l'estimation budgétaire temps/infrastructure et alignement avec la North Star Metric.

### Jalon 1 — Noyau Métier (Core Engine)

- Objectif : Implémenter et faire fonctionner la logique métier principale (calculs complexes, intégrations clés, stockage persistant) avec une interface minimale ou des tests d'intégration.

- Pourquoi avant le design : Si l'algorithme central ou la gestion des données échoue, aucune interface esthétique ne pourra sauver le produit. Valider le moteur garantit la faisabilité technique.

- Ce qui est inclus :

- Scripts, API internes et structures de bases de données fonctionnelles.

- Interface simplifiée (formulaires nus, boutons standards) ou suites de tests automatisés validant le comportement.

- Ce qui est interdit : Travailler sur le polissage UX/UI, la gestion des micro-interactions ou l'optimisation des performances non critiques.

- Critère de passage (Gate 1) : Logique métier centrale et stockage fonctionnels de bout en bout sur données réelles.

- Gouvernance & Validation : Validé par l'équipe d'ingénierie (Tech Lead & Lead Dev).

- Métriques & Lean Business Case : Couverture de tests unitaires/intégration > 80% sur le cœur métier et respect de l'enveloppe de complexité.

### Jalon 2 — MVP Testable & Prototype Terrain

- Objectif : Produire une version utilisable et autonome permettant à un utilisateur d'accomplir la tâche principale de A à Z dans des conditions ergonomiques correctes.

- Ce qui est inclus :

- Application du design system de base (ux-ui-design : états vides, gestion des erreurs, feedbacks visuels, accessibilité essentielle).

- Exclusivité des fonctionnalités classées Must-be (Modèle de Kano).

- Module d'aide ou de collecte de retours directement dans l'interface.

- Ce qui est interdit : Ajouter des fonctionnalités secondaires (Nice-to-have), des options d'automatisation avancées ou de la personnalisation d'interface.

- Critère de passage (Gate 2) : Validation sur prototype HTML interactif (avec module « Bug ou idée ? ») et parcours principal réussi sans blocage sur les fonctions Must-be.

- Gouvernance & Validation : Validé par l'UX/UI Designer, le Product Owner et le Panel d'utilisateurs bêta.

- Métriques & Lean Business Case : Taux de complétion du parcours principal > 90% et coût d'acquisition/activation initial conforme.

### Jalon 3 — Recette Terrain, Retours Utilisateurs & Stabilisation (V1.0)

- Objectif : Déployer le produit auprès d'un panel restreint, analyser l'usage réel, corriger les points de friction constatés et consolider la robustesse de la plateforme.

- Règle d'or : Traiter et corriger en priorité absolue tout élément qui bloque ou ralentit les utilisateurs existants avant de planifier la moindre nouvelle fonctionnalité.

- Ce qui est inclus :

- Analyse des tickets de bugs et des retours d'expérience contextuels.

- Refactoring ciblé, optimisation des temps de réponse et correction des failles d'ergonomie.

- Finalisation de la documentation utilisateur et de l'infrastructure de production.

- Ce qui est interdit : Modifier le périmètre fonctionnel principal ou intégrer de nouvelles requêtes non validées.

- Critère de passage (Gate 3) : Zéro bug bloquant, sauvegarde/export vérifiés, métriques de succès instrumentées.

- Gouvernance & Validation : Validé par la QA, le Tech Lead, le PM et le Legal/Compliance Officer.

- Métriques & Lean Business Case : Temps de réponse < 200ms, disponibilité 99.9%, NPS/CSAT initial mesurable.

### Jalon 4+ — Évolutions & Découverte Continue (V1.1, V2…)

- Objectif : Développer par cycles courts et incrémentaux les fonctionnalités à forte valeur ajoutée (One-dimensional et Attractive selon le modèle de Kano) confirmées par les retours terrain.

- Règle d'or : Toute proposition d'évolution doit être documentée et évaluée via la fiche de validation formelle avant d'être inscrite au backlog de développement.

- Ce qui est inclus :

- Automatisations, intégrations secondaires, fonctionnalités d'export avancées.

- Optimisations visuelles et enrichissement de l'expérience utilisateur.

- Critère de passage (Gate 4) : Itérations pilotées par les retours terrain continus et le scoring RICE / Kano.

- Gouvernance & Validation : Validé par le Comité Produit / Steering Committee sur base du scoring RICE et des retours utilisateurs.

- Métriques & Lean Business Case : ROI par fonctionnalité, rétention utilisateur (LTV/CAC) et évolution de la North Star Metric.

### Découverte Continue (Continuous Discovery) & Gouvernance

S'appuyant sur la méthodologie de Teresa Torres (Continuous Discovery Habits), la roadmap n'est jamais figée après le lancement de la V1.0. Un cycle régulier d'observation et d'expérimentation est instauré pour alimenter en continu les décisions de produit :

- Entretiens Utilisateurs Hebdomadaires : Mener au moins 2 à 3 échanges directs avec des utilisateurs chaque semaine pour identifier les points de friction et les opportunités non captées.

- Analyse des Analytics et Métriques Réelles : Suivre l'utilisation effective des fonctionnalités déployées et confronter les usages observés aux hypothèses initiales.

- Ré-évaluation Systématique du Backlog : Réajuster les priorités à chaque sprint en fonction de la valeur mesurée et des apprentissages terrain.

## 3. Synthèse des Jalons et Gates de Passage

| Jalon | Intitulé | Objectif Principal | Périmètre Inclus | Livrable & Gate de Passage |
| --- | --- | --- | --- | --- |
| Jalon 0 | Cadrage & Architecture | Structurer et valider les choix fondamentaux | Spécifications, modèle de données, Wireframes, Stack technique | Gate 0 : Périmètre MVP verrouillé, risques/RGPD identifiés, stack validée. |
| Jalon 1 | Noyau Métier (Core Engine) | Valider la faisabilité de la logique centrale | Algorithmes, BDD, API internes, UI brute ou tests | Gate 1 : Logique métier centrale et stockage fonctionnels de bout en bout sur données réelles. |
| Jalon 2 | MVP Testable & Prototype Terrain | Valider l'usage principal en conditions réelles | Exigences Must-Have, UI ergonomique, gestion des erreurs | Gate 2 : Validation sur prototype HTML interactif (avec module « Bug ou idée ? ») et parcours principal réussi sans blocage sur les fonctions Must-be. |
| Jalon 3 | Stabilisation & V1.0 | Assurer la fiabilité et polir l'expérience | Corrections de bugs, optimisations UX, documentation | Gate 3 : Zéro bug bloquant, sauvegarde/export vérifiés, métriques de succès instrumentées. |
| Jalon 4+ | Évolutions & Découverte Continue (V1.1, V2…) | Maximiser la valeur et la différenciation | Features Should/Could-Have, automatisations | Gate 4 : Itérations pilotées par les retours terrain continus et le scoring RICE / Kano. |

## 4. Priorisation du Backlog : Articulation Kano + RICE + MoSCoW

Pour éviter le surgonflement du périmètre (Scope Creep), l'attribution de chaque fonctionnalité suit un processus d'arbitrage en trois étapes articulant le Modèle de Kano, le score RICE et la qualification MoSCoW :

- 1. Modèle de Kano (Nature de la Valeur) : Classifier la fonctionnalité selon le type d'attente utilisateur (Must-be, One-dimensional, Attractive).

- 2. Score RICE (Score d'Arbitrage Quantitatif) : Calculer la formule RICE = (Reach × Impact × Confidence) / Effort pour obtenir une valeur objective d'arbitrage.

- 3. Classification MoSCoW (Affectation aux Jalons) : Déduire la catégorie MoSCoW finale pour positionner l'élément dans le jalon approprié de la roadmap.

       IMPACT UTILISATEUR

             ^

             |

        HIGH |  [ MUST HAVE ]         [ SHOULD HAVE ]

             |  Jalon 2 (MVP)          Jalon 3 (V1.0)

             |

         LOW |  [ WON'T HAVE ]        [ COULD HAVE ]

             |  Écarté / Exclu         Jalon 4+ (V1.1+)

             +---------------------------------------->

                LOW                    HIGH      EFFORT TECHNIQUE

### Définitions des Catégories MoSCoW

- Must Have (Indispensable - MVP / Jalon 2)

- Définition : Vital. Sans cette fonctionnalité, le produit ne répond pas au besoin fondamental et ne peut pas être exploité.

- Règle : Si une seule fonction Must Have est manquante, le produit ne peut pas être mis en ligne.

- Should Have (Important - V1.0 / Jalon 3)

- Définition : Forte valeur ajoutée. L'absence de la fonctionnalité impacte l'efficacité, mais des alternatives manuelle ou temporaires existent.

- Règle : À intégrer dès que le noyau central est stabilisé.

- Could Have (Confort - V1.1+ / Jalon 4+)

- Définition : Amélioration secondaire. Souhaitable si les ressources et le calendrier le permettent, mais sans impact négatif sur l'usage principal si omis.

- Règle : Traité uniquement après finalisation complète des éléments Should Have.

- Won't Have (Hors Périmètre - Exclu)

- Définition : Non retenu pour la version actuelle. Idée hors sujet, trop complexe par rapport à sa valeur, ou prématurée.

- Règle : Explicitement documenté comme exclu pour éviter toute ambiguïté au sein de l'équipe.

## 5. Grille de Validation QA d'une Roadmap (8 Points de Contrôle)

Avant de lancer le développement, la roadmap doit être auditée en s'assurant du respect des 8 critères fondamentaux suivants :

- 1. Découpage Vertical : Le Jalon 1 et le Jalon 2 livrent-ils un parcours complet de bout en bout plutôt qu'une couche technique isolée ?

- 2. Délai d'Accès au MVP : Le Jalon 2 (MVP) est-il atteignable dans un délai court permettant un test rapide sur le terrain ?

- 3. Séquencement des Dépendances : Les prérequis techniques et fonctionnels sont-ils ordonnés de manière logique d'un jalon à l'autre ?

- 4. Clarté des Critères de Sortie (Gates) : Chaque jalon dispose-t-il d'un critère de passage mesurable, binaire et incontestable ?

- 5. Étanchéité du Périmètre MVP : Le périmètre du MVP est-il strictement limité aux fonctionnalités Must-Have du modèle MoSCoW ?

- 6. Dispositif de Feedbacks Intégré : Un mécanisme de collecte des retours utilisateurs (ex: module d'évaluations/bugs) est-il prévu dès le Jalon 2 ?

- 7. Gestion des Erreurs et Éligibilité UX : L'effort d'intégration ergonomique (états vides, retours visuels) est-il bien budgété au Jalon 2 ?

- 8. Procédure d'Évolution Rigoest : La règle imposant le passage de toute nouvelle idée par une fiche de validation avant intégration est-elle formalisée ?
