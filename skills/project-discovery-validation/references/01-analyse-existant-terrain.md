# Document 01 — Analyse de l'Existant, Concurrence & Signaux Terrains

## Cadre Méthodologique & Objectifs

L'analyse de l'existant constitue le pilier fondamental de la phase d'exploration (Discovery). Elle vise à ancrer la conception du produit dans des preuves empiriques issues du terrain plutôt que dans des suppositions théoriques.

### Sources Méthodologiques

- Continuous Discovery Habits (Teresa Torres) : Focalisation sur la cartographie des opportunités à partir des douleurs, désirs et besoins non satisfaits exprimés directement par les utilisateurs finaux dans leur contexte quotidien.

- Lean Startup (Eric Ries) : Application du principe d'apprentissage validé (Validated Learning). L'objectif prioritaire est de minimiser le temps de cycle total entre l'idée et la mesure de l'impact réel, en évitant le sur-développement (over-engineering) de fonctionnalités non validées.

### Règles Opérationnelles (DO)

- DO 01 : Extraire des citations textuelles (verbatim) ou des patterns d'utilisateurs issus de canaux d'écoute spontanés (Reddit, GitHub Issues, Forums spécialisés).

- DO 02 : Identifier systématiquement les solutions de contournement artisanales (tableurs Excel complexes, scripts Bash/Python, carnets physiques) comme preuves irréfutables d'un besoin non satisfait.

- DO 03 : Évaluer scrupuleusement la maturité des dépendances et briques Open Source existantes avant de décider de réinventer un composant logiciel.

- DO 04 : Documenter l'écart exact entre ce que le marché propose actuellement et l'angle mort stratégique qu'exploite le produit.

### Interdits Strictement Proscrits (DON'T)

- DON'T 01 : Ne jamais inventer de données d'étude, de métriques d'engagement, de verbatims d'utilisateurs ou de noms de dépôts GitHub.

- DON'T 02 : Ne pas se baser uniquement sur la demande déclarée (« Les utilisateurs disent qu'ils aimeraient X ») mais privilégier la douleur vécue (« Les utilisateurs souffrent actuellement de Y et ont bricolé Z pour compenser »).

- DON'T 03 : Ne pas négliger l'analyse technique des projets Open Source abandonnés : leur échec contient des enseignements critiques sur la viabilité de l'architecture ou du modèle.

## 1. Fondements de l'Evidence-Based Discovery

### 1.1 Éviter la Réinvention de la Roue et la Répétition d'Erreurs

Le développement d'un nouveau produit logiciel comporte un risque majeur : concevoir à nouveau des fonctionnalités déjà résolues par l'écosystème Open Source ou reproduire des erreurs d'architecture ayant conduit à l'abandon de projets similaires.

L'analyse systématique du code existant et des historiques de commits/issues permet d'isoler les complexités cachées (ex. gestion de la synchronisation hors-ligne, contraintes de scalabilité de base de données, edge cases réglementaires) avant d'écrire la première ligne de code.

### 1.2 Distanciation entre Demande Déclarée et Douleur Réelle Vécue

Une erreur classique en phase de cadrage consiste à construire une feuille de route (roadmap) sur la base d'enquêtes d'opinion ou d'interviews déclaratives.

| Dimension | Demande Déclarée | Douleur Réelle Vécue |
| --- | --- | --- |
| Source | Sondages, formulaires de feedback, interviews guidées. | Discussions Reddit non sollicitées, issues GitHub, forums métiers. |
| Nature de la donnée | Intention prospective, projection idéale (« J'aimerais que... »). | Comportement passé et présent, frustration active (« Je me bats avec... »). |
| Signal de valeur | Faible à moyen (biais de désirabilité sociale). | Très élevé (investissement temporel ou financier pour résoudre le problème). |
| Indicateur de validation | "Idée intéressante" sans engagement. | Existence d'un bricolage (scripts, Excel) ou migration manuelle. |

## 2. Protocole de Recherche Multi-Sources

### 2.1 Analyse GitHub (Dépôts Open Source, Issues & Discussions)

L'écosystème Open Source offre un miroir fidèle de la viabilité technique et du niveau d'insatisfaction lié aux solutions logicielles actuelles.

#### Audit des Dépôts Similaires

- Indicateurs d'activité : Volume d'étoiles (stars), fréquence des commits, réactivité sur les pull requests, date de la dernière release.

- Analyse de caducité : Identifier les projets "Orphelins" (pas de commit depuis > 12 mois avec de nombreuses issues ouvertes). Analyser les motifs d'abandon (complexité de maintenance, obsolélisme de la pile technique, modèle d'hébergement intenable).

#### Exploration des Issues & Discussions

- Recherche ciblée sur les étiquettes : bug, feature request, help wanted, performance.

- Identification des bugs récurrents ignorés par la feuille de route principale des projets concurrents.

- Recherche de la présence de briques logicielles réutilisables (bibliothèques graphiques, moteurs de calcul, modules d'authentification) répondant à la norme de licence appropriée.

```
# Exemple de requêtes de recherche GitHub (À adapter au domaine)
topic:domain-name stars:>100 pushed:>2023-01-01
is:issue is:open label:"feature request" "pain point"
is:issue is:closed label:"wontfix"
```

### 2.2 Extraction de Signaux Terrains (Reddit & Forums Spécialisés)

Les communautés en ligne (ex. r/selfhosted, subreddits métiers, forums d'utilisateurs passionnés) constituent le réservoir le plus dense de signaux non filtrés.

#### Cartographie des Plaintes Spontanées

La recherche doit s'articuler autour d'expressions clés de frustration structurées :

- « Why is there no tool that... »

- « I hate how [Product] forces me to... »

- « Alternative to [Product] without subscription/cloud »

- « How do you guys manage [Workflow] without getting crazy? »

#### Détection des Bricolages Manuels (Workarounds)

La preuve ultime d'un besoin de marché non satisfait réside dans l'existence de systèmes de substitution complexes créés par les utilisateurs :

- Fichiers Excel ou Google Sheets comportant de multiples macros VBA / AppScripts.

- Enchaînements d'automatisations No-Code (Zapier/Make) fragiles et coûteux.

- Carnets papier, processus manuels papier-crayon ou checklists dispersées.

### 2.3 Matrice d'Analyse Concurrencie & Angles Morts

L'évaluation de 3 à 5 concurrents (directs ou indirects) doit permettre de dégager l'angle mort exploitable.

| Concurrent | Points Forts | Frustrations Majeures Utilisateurs | Angle Mort Exploitable |
| --- | --- | --- | --- |
| Concurrent A (SaaS Enterprise) | Riche en fonctionnalités, support 24/7. | Tarification prohibitive, complexité d'installation, cloud propriétaire. | Local-First & Simplicité : Déploiement ultra-léger, données 100% locales. |
| Concurrent B (Legacy On-Premise) | Robustesse historique, complet. | Interface datée (UI/UX), absence d'API moderne, mises à jour lourdes. | UX Moderne & API Native : Interface épurée, intégrations webhooks directes. |
| Concurrent C (App Mobile Grand Public) | Prise en main immédiate, freemium. | Bourré de publicités, fonctionnalités métier absentes, export bloqué. | Spécialisation Métier : Zéro pub, exports standards, focus sur la donnée brute. |
| Solution Manuelle (Excel / Papier) | Gratuit, flexibilité totale. | Risque d'erreur humaine, pas de multi-utilisateur, chronophage. | Structure & Automation : Validation de données automatisée, zéro saisie double. |

## 3. Traçabilité des Sources et Rigueur d'Analyse [N3]

En présence d'outils d'assistance ou d'agents d'IA dans l'élaboration de cette analyse, les règles d'intégrité de la donnée suivantes doivent être appliquées à la lettre :

- Absence de Simulation de Données : Il est strictement interdit de générer de faux verbatims, d'inventer des dépôts GitHub inexistants ou de simuler des volumes de recherche non vérifiés.

- Mentions d'Accès Web & Limites : Si l'outil d'analyse ne dispose pas d'un accès web direct au moment de l'exécution, cela doit être explicitement documenté, et les requêtes précises doivent être fournies pour exécution et vérification manuelle par l'équipe.

- Formalisation des Requêtes : Les recherches sur Reddit, GitHub ou Google doivent être documentées sous forme de chaînes de recherche exactes (strings de requête) afin de permettre la reproductibilité des audits.

## 4. Grille de Validation QA (Quality Assurance)

Avant de valider l'étape de recherche et d'initier la phase de conception fonctionnelle (Document 02), l'analyse doit satisfaire aux 6 points de contrôle suivants :

```
[ ] QA-01 : Au moins 3 projets Open Source similaires ou connexes ont été audités (ou l'absence avérée d'alternatives Open Source a été documentée).
[ ] QA-02 : Les 3 frustrations majeures récurrentes des utilisateurs de solutions existantes ont été clairement identifiées et documentées avec des preuves terrains.
[ ] QA-03 : Au moins un bricolage manuel (Excel, script, workflow d'outils) a été identifié comme preuve de la valeur d'usage.
[ ] QA-04 : L'angle mort stratégique (Local-First, Simplicité radicale, Spécialisation métier, etc.) est clairement qualifié et différencié de l'offre actuelle.
[ ] QA-05 : L'ensemble des verbatims et données techniques provient de sources réelles et vérifiables (aucun fait inventé).
[ ] QA-06 : Les requêtes d'extraction utilisées sur GitHub/Reddit/Forums sont enregistrées pour re-verification périodique.
```
