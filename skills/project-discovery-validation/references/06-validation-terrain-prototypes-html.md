# 06 — Validation Terrain & Prototypes HTML Interactifs (« Bug ou idée ? »)

Statut : Référentiel Discovery & Roadmap V2.0 · Skill : project-discovery-validation

## 1. Fondements Scientifiques : Tester Tôt avec des Prototypes Interactifs

La validation terrain précoce repose sur un constat empirique documenté par la recherche en ingénierie logicielle et en ergonomie des interfaces : la correction d'une erreur de conception coûte de manière exponentielle au fur et à mesure que l'on avance dans le cycle de développement.

### Sources théoriques et méthodologiques

- Jakob Nielsen (2000 — Why You Only Need to Test with 5 Users, NN/g) : Il s'agit d'une heuristique qualitative permettant de détecter environ 85 % des problèmes majeurs d'ergonomie et de compréhension d'une interface lors d'une itération rapide. Toutefois, si le produit s'adresse à plusieurs segments d'utilisateurs distincts (ex. novices vs experts, ou patients vs soignants), il convient de prévoir 3 à 5 testeurs par segment. Pour des mesures statistiques quantitatives (taux de conversion, benchmarks chiffrés), des échantillons plus larges (20 à 40+ participants) sont requis.

- Carolyn Snyder (Paper Prototyping & Prototypage rapide) : La fidélité comportementale prévaut sur la fidélité visuelle. Un prototype interactif immédiatement manipulable offre un réalisme d'usage suffisant pour révéler les failles d'alignement mental entre l'utilisateur et l'application.

- Rob Fitzpatrick (The Mom Test) : L'évaluation d'un produit ne doit jamais reposer sur des opinions spéculatives (« Est-ce que vous utiliseriez cette fonctionnalité ? »), mais sur l'observation de comportements factuels et la confrontation directe à des scénarios réels (« Essayez d'exécuter cette tâche spécifique sans aide »).

### Économie de la détection précoce des erreurs

Le coût de rectification d'un défaut de conception évolue selon une échelle logarithmique. Détectée au stade du prototype HTML/CSS/JS, une modification ne nécessite que quelques réajustements de structure ou de style. Une fois le code métier connecté aux API et à la base de données, la même modification impose des refactorisations d'architecture, des migrations de données et des réécritures de tests d'intégration.

| Phase de détection | Coût relatif de modification | Impact opérationnel |
| --- | --- | --- |
| Prototype HTML interactif | 1x | Modification rapide des structures HTML/CSS/JS locales |
| Développement Backend / API | 10x | Refactorisation du modèle de données, des routes et de la logique métier |
| Post-déploiement Production | 100x | Migration de base de données, ruptures de service, support et correction d'urgence |

### Supériorité du prototype HTML autonome sur les maquettes statiques

Bien que les outils de design graphique (ex. Figma statique) soient adaptés aux phases d'exploration visuelle, ils masquent une part importante des contraintes d'usage réelles. Un prototype HTML/CSS/JS autonome exécuté en local présente des avantages déterminants pour la validation terrain :

- Dynamique des contenus et longueurs réelles : Les maquettes statiques exploitent des textes parfaitement ajustés. Le HTML autonome permet de tester l'interface face à des titres longs sur deux lignes, des descriptions volumineuses et des variations dynamiques d'affichage.

- Comportement de défilement et contraintes mobiles : L'expérience de navigation tactile (taille des cibles au pouce, zone d'atteinte sur écran mobile, défilement fluide) ne peut être évaluée rigoureusement que dans le navigateur réel du terminal cible.

- États d'interface dynamiques : Le HTML permet de faire basculer instantanément l'interface entre ses différents états (vide, chargement, erreur de saisie, données denses) sans multiplier les écrans statiques déconnectés.

- Collecte de retours contextuels automatisée : Seul un environnement web fonctionnel permet d'intégrer des scripts locaux capables de capturer l'état exact du DOM, les dimensions de l'écran et les éléments ciblés par l'utilisateur lors d'une remarque.

## 2. Protocole Standard de Prototype HTML + Module « Bug ou idée ? »

Tout prototype de validation élaboré avant le développement complet de l'application doit se conformer à trois règles opérationnelles impératives.

### 2.1 Maquette HTML autonome et réaliste

- Données réalistes obligatoires : Interdiction d'utiliser des textes génériques (Lorem Ipsum, "John Doe", "Test 123"). Le prototype doit intégrer des jeux de données proches du domaine métier (ex. vrais noms d'entreprises, montants réalistes, intitulés complets).

- Gestion systématique des trois états clés :

- État vide (Zero State) : Affichage lors de la première utilisation (invitations à l'action claires, explications du bénéfice, absence d'éléments visuels cassés).

- État normal (Standard State) : Affichage nominal avec une densité de données représentative d'un usage courant.

- État limite / Erreur (Edge Cases) : Comportement de l'interface en cas d'erreur de formulaire, de données très longues ou de dépassement de capacités.

### 2.2 Intégration native du module « Bug ou idée ? »

Le prototype HTML intègre directement en local le composant universel de capture de retours (référencié dans la documentation UX/UI 08).

+-----------------------------------------------------------------------+

|  INTERFACE DU PROTOTYPE HTML                                          |

|                                                                       |

|  [ Tableau de bord / Action métier ]                                  |

|                                                                       |

|                                                                       |

|  +---------------------------+  +----------------------------------+  |

|  |  💬 Bug ou idée ?        |  |  📦 Mes retours (Export ZIP)    |  |

|  +---------------------------+  +----------------------------------+  |

+-----------------------------------------------------------------------+

- Fonctionnement du module :

- Un bouton flottant « Bug ou idée ? » permet à tout moment au testeur d'inspecter un composant, de sélectionner un élément de l'écran et d'émettre une remarque (problème de compréhension, libellé flou, dysfonctionnement).

- Le bouton « Mes retours » centralise l'ensemble des observations saisies pendant la session et génère un export structuré contenant :

- Un fichier retours.md compilant l'ensemble des points d'amélioration qualifiés avec leurs métadonnées (élément ciblé, résolution d'écran, type de retour).

- Les captures d'écran associées aux retours.

- Exploitation : Le fichier d'export .zip est réinjecté directement dans l'IA d'assistance pour exécuter les corrections sur la maquette HTML en temps réel.

### 2.3 Protocole d'Observation Utilisateur (5 Testeurs & The Mom Test)

La conduite des sessions de validation suit une méthodologie stricte garantissant la neutralité des observations :

- Définition de scénarios d'action précis : Soumettre au testeur 3 à 5 tâches métiers concrètes sans instructions de manipulation (ex. « Vous venez de recevoir une facture de 45 €, enregistrez-la et vérifiez votre budget restant »).

- Observation des points de friction et métriques qualitatives :

- Identifier toute hésitation supérieure à 3 secondes.

- Noter les erreurs de clic (zones cliquées à tort par l'utilisateur).

- Relever les incertitudes de vocabulaire ou de mise en page.

- Mesurer systématiquement le taux de réussite de la tâche (sans aide / avec hésitation / échec) et le temps d'accomplissement.

- Appliquer le Privacy by Design dès le prototype HTML : utiliser exclusivement des données fictives réalistes (jamais de vraies données personnelles ou médicales) et s'appuyer sur des solutions d'hébergement et de collecte à 0 € (exécution en local, export .zip ou dépôt statique).

- Postures et règles de l'évaluateur :

- Interdiction stricte de guider ou de défendre l'interface (ex. interdiction de dire : « Il faut cliquer sur le bouton bleu en haut »).

- Si un utilisateur ne parvient pas à accomplir une tâche, l'échec est attribué exclusivement à la conception de l'interface.

- Questionner l'utilisateur sur son interprétation des éléments affichés uniquement après l'exécution ou l'abandon de la tâche.

- Guide d'entretien conforme à The Mom Test (Rob Fitzpatrick) :

- Bonnes questions (orientées sur les faits passés et le comportement réel) : « Comment procédez-vous aujourd'hui pour effectuer cette tâche ? », « Pouvez-vous me montrer la dernière fois que cela s'est produit ? », « Qu'est-ce qui a été le plus difficile lors de votre dernière tentative ? »

- Mauvaises questions (suggestives ou spéculatives sur le futur) : « Est-ce que vous utiliseriez une fonctionnalité qui fait X ? », « Combien seriez-vous prêt à payer pour ce service ? », « Trouvez-vous cette interface facile à utiliser ? »

## 3. Boucle d'Itération Rapide (Prototype HTML → Retours ZIP → Correction IA)

Le processus d'itération fonctionne en boucle fermée. Les retours du terrain sont immédiatement traduits en modifications techniques sur le prototype autonome jusqu'à la levée complète des blocages.

+------------------------+

| Prototype HTML v1      |

| (+ Bug ou idée ?)      |

+-----------+------------+

            |

            v

+------------------------+

| Test réel              |

| (3-5 scénarios)        |

+-----------+------------+

            |

            v

+------------------------+

| Export retours.zip     |

| (retours.md + captures)|

+-----------+------------+

            |

            v

+------------------------+

| Injection dans l'IA    |

| (Correction du code)   |

+-----------+------------+

            |

            v

+------------------------+

| Prototype HTML v2      |

+-----------+------------+

            |

            v

+-------------------------------------------------------+

| Validation Gate 2                                     |

| (Passage au développement backend & production)       |

+-------------------------------------------------------+

## 4. Grille de Validation QA du Prototype Terrain (7 Points de Contrôle)

Avant de déclarer un prototype validé et d'autoriser le passage à la phase de développement backend (Gate 2), l'ensemble des critères suivants doit être vérifié et validé.

| N° | Point de contrôle | Description du critère | Statut |
| --- | --- | --- | --- |
| 01 | Données réalistes | Absence totale de Lorem Ipsum. Les textes, montants, noms et dates reflètent la réalité du domaine métier. | [ ] Validé |
| 02 | Couverture des 3 états | Les états Vide (Zero State), Normal (Standard) et Limite (Edge Case) sont directement vérifiables dans le prototype. | [ ] Validé |
| 03 | Module « Bug ou idée ? » | Le script local est intégré, fonctionnel et permet la capture d'éléments d'interface avec aperçu des retours. | [ ] Validé |
| 04 | Export ZIP opérationnel | La génération du fichier retours.zip produit un fichier retours.md valide et exploitable par l'IA d'assistance. | [ ] Validé |
| 05 | Exécution des scénarios | 100 % des 3 à 5 scénarios de test ont été soumis à une cohorte de 3 à 5 utilisateurs cibles. | [ ] Validé |
| 06 | Traçabilité des corrections | 100 % des retours classés comme "bloquants" ou "ambigus" ont fait l'objet d'une correction dans le HTML/CSS/JS. | [ ] Validé |
| 07 | Approbation Gate 2 | Le prototype corrigé (v2 ou ultérieur) permet l'exécution fluide des scénarios sans assistance externe. | [ ] Validé |
