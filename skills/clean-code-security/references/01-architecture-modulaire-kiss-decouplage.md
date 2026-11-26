# 01 — Architecture Modulaire, KISS & Découplage Métier/UI

Statut : Référentiel Code Propre, Sécurité & Git V2.0 · Skill : clean-code-security

## 1. Principe KISS Avant Tout (Keep It Simple, Stupid — Kelly Johnson) [N4]

### Sources & Principes Directeurs

Le principe KISS, formulé à l'origine par l'ingénieur aéronautique Kelly Johnson, stipule que la plupart des systèmes fonctionnent mieux s'ils restent simples plutôt que compliqués. Dans le développement logiciel, la complexité inutile est la source primaire de bugs, de failles de sécurité et de dégradation de la maintenabilité.

### Règles Opérationnelles (DO)

- Rechercher la simplicité directe : Choisir systématiquement la solution la plus simple qui résout proprement et intégralement le problème actuel sans anticiper des besoins hypothétiques (YAGNI - You Aren't Gonna Need It).

- Appliquer la Règle des 3 Occurrences (Rule of Three — Martin Fowler) [N4] : Repère heuristique pour éviter l'abstraction prématurée. Deux blocs d'ingénierie similaires peuvent rester simples ou être explicitement commentés ; ne factoriser une abstraction générique ou créer un composant réutilisable qu'à partir de la 3e duplication réelle dans le code.

- Adopter des dépendances frugales : Avant d'ajouter un package externe (npm, pip, cargo), évaluer la bibliothèque standard du langage. Si la fonctionnalité s'implémente en moins de 10 à 15 lignes de code natif, privilégier l'écriture interne pour réduire la surface d'attaque et la dette de maintenance.

### Pratiques Interdites (DON'T)

- Sur-ingénierie générée ou amplifiée par IA : Interdiction de multiplier les couches d'abstraction inutiles (ex: Controller → Service → Manager → Factory → Repository) pour une simple opération CRUD sur une base de données locale ou une entité basique.

- Résolution de problèmes futurs inexistants : Ne pas concevoir d'architectures distribuées, de systèmes d'évènements complexes ou de modèles de données ultra-génériques "au cas où" le besoin évoluerait dans plusieurs mois.

## 2. Séparation Stricte : Cœur Métier vs Persistance vs Interface UI (Dijkstra / Clean Architecture) [N2]

### Sources & Principes Directeurs

Inspirée par la séparation des préoccupations (Separation of Concerns) d'Edsger Dijkstra et formalisée par la Clean Architecture, cette règle impose une isolation claire entre la logique métier pure, le stockage de données et les mécanismes de présentation. La granularité du découpage (domain/, data/, ui/) doit s'adapter à la taille du projet : sur un petit script ou outil local simple, un fichier domaine dédié au sein d'un dossier plat suffit sans imposer une arborescence lourde.

### Découpage Architecturel en 3 Zones

```
  ┌─────────────────────────────────────────────────────────┐
  │                 1. DOMAINE / CŒUR MÉTIER                │
  │     (domain/ ou core/) — Fonctions pures & denses       │
  │     Zéro dépendance UI · Zéro appel réseau direct       │
  └────────────────────────────▲────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            │                                     │
  ┌─────────┴───────────────┐         ┌───────────┴─────────────┐
  │   2. ACCÈS DONNÉES /    │         │     3. INTERFACE UI     │
  │   SERVICES EXTERNES     │         │ (ui/ ou components/)    │
  │  (data/ ou adapters/)   │         │ Affichage, états & UI   │
  └─────────────────────────┘         └─────────────────────────┘
```

- Domaine / Logique Métier (domain/ ou core/) : Contient l'ensemble des fonctions pures et déterministes (calculs financiers, règles RM-XX, validations, machines à états). Zéro import UI (aucun élément React, Vue, DOM) et zéro appel réseau direct. 100 % du cœur métier doit être exécutable et testable en quelques millisecondes via des tests unitaires isolés.

- Accès aux Données & Services Externes (data/ ou adapters/) : Gère l'infrastructure, les requêtes SQLite/PostgreSQL, les appels API HTTP, les I/O de fichiers et les interactions avec le coffre-fort de l'OS.

- Interface Utilisateur (ui/ ou components/) : Se limite à l'affichage visuel, la gestion de l'état graphique local (états de chargement, d'erreur, d'absence de données) et la capture des événements utilisateur pour les transmettre aux services.

### Exemples de Structuration

| Zone Architecturelle | Responsabilités Autorisées | Éléments Stricte ment Interdits |
| --- | --- | --- |
| domain/ | Calculs d'éligibilité, règles d'arrondi, règles métier RM-XX, structures de données | Imports react, vue, fetch, axios, requêtes SQL, manipulation du DOM |
| data/ | Mappings ORM, requêtes SQL, clients HTTP, lecture/écriture de fichiers | Logique de présentation visuelle, calculs de business rules complexes |
| ui/ | Rendement JSX/HTML, bindings d'événements, états d'animation, feedback visuel | Calculs financiers directes, requêtes SQL, logique métier globale |

### Pratiques Interdites (DON'T)

- Importer des composants UI ou des wrappers de framework visuel dans la couche domain/.

- Écrire des calculs financiers, des règles d'éligibilité ou des requêtes SQL directement au sein d'un composant de bouton, d'un handler d'événement UI ou d'une vue HTML.

## 3. Lisibilité, Nommage & Taille des Fonctions (ISO/IEC 25010 — Maintenabilité) [N4]

### Sources & Principes Directeurs

Conforme à la norme ISO/IEC 25010 sur la qualité et la maintenabilité du logiciel, le code doit être auto-explicatif. Le nommage doit s'appuyer strictement sur le langage omniprésent du domaine (Ubiquitous Language issus du DDD).

### Règles Opérationnelles (DO)

#### Normes de Nommage

- Fonctions et Méthodes : Utiliser impérativement la structure verbe + objet exprimant clairement l'intention métier.

- Exemples recommandés : calculateCommittedBudget(), importBankCsv(), anonymizeUser().

- Variables Booléennes : Préfixer obligatoirement par un verbe d'état (is, has, can, should).

- Exemples recommandés : isEligible, hasPendingOrders, canExecuteOperation.

#### Structuration des Fonctions & Guard Clauses

- Focalisation Unique : Une fonction doit réaliser une seule tâche métier explicite.

- Signaux d'Alerte & Seuils de Revue (Clean Code & Code Complete) [N4] :

- Longueur indicative : ~40 à 50 lignes de code. Un dépassement constitue un signal d'alerte invitant à vérifier si la fonction peut être découpée via des Guard Clauses ou extraite en sous-fonctions, tout en tolérant les cas justifiés (ex. parseur complexe, table de correspondance ou instruction switch dense).

- Profondeur d'imbrication maximale recommandée : 3 niveaux d'indentation (signal d'alerte pour appliquer le refactoring par Guard Clauses).

- Utilisation des Guard Clauses (Retours Anticipés) : Valider les préconditions immédiatement et sortir de la fonction en début d'exécution pour éviter les structures if/else profondément imbriquées.

```
// INCORRECT (DON'T)
function processOrder(order) {
  if (order != null) {
    if (order.isValid) {
      if (order.isPaid) {
        // Traitement principal
      }
    }
  }
}
// CORRECT (DO - Guard Clauses)
function processOrder(order) {
  if (!order || !order.isValid) return;
  if (!order.isPaid) return;
  // Traitement principal
}
```

#### Constantes Nommées

- Remplacer systématiquement tout nombre, valeur magique ou chaîne littérale par une constante nommée et documentée en majuscules (UPPER_SNAKE_CASE).

- Exemple : Préférer ORDER_STATUS.PAID à 3, et ONE_DAY_IN_MS à 86400000.

### Pratiques Interdites (DON'T)

- Noms d'identifiants opaques, tronqués ou génériques (data2, tmp, mgr, proc, val, arr).

- Fonctions monolithe effectuant à la fois la validation, le calcul, la persistance et l'affichage.

## 4. Gestion Explicite des Erreurs Typées [N4]

### Sources & Principes Directeurs

La gestion des erreurs ne doit jamais être un traitement secondaire. Un système robuste doit anticiper les défaillances et fournir des contextes précis pour le débogage et l'expérience utilisateur sans compromettre la sécurité.

### Règles Opérationnelles (DO)

- Typage et Distinction des Erreurs :

- Erreurs Métier Attendues : Problèmes de validation, fichier au mauvais format, doublon d'entrée. Elles doivent être typées et manipulées comme des flux normaux de la logique d'application.

- Pannes Techniques Inattendues : Épuisement du stockage, coupure réseau, panne d'infrastructure. Elles doivent être capturées et converties en exceptions contrôlées.

- Objets d'Erreur Structurés : Renvoyer ou lever des erreurs contenant une structure riche et exploitable :

```
{
  "type": "https://api.example.com/errors/account-disabled",
  "title": "Account Disabled",
  "status": 403,
  "detail": "Votre compte utilisateur est temporairement suspendu.",
  "instance": "/errors/req_123456",
  "code": "ERR_ACCOUNT_DISABLED",
  "invalid_params": []
}
```

### Pratiques Interdites (DON'T)

- Blocs Catch Muets : Interdiction absolue d'avaler silencieusement une erreur avec un bloc catch (e) {} vide.

- Logging Simple Non Traité : Ne pas se contenter d'un simple console.log(e) sans réémission, transformation ou remontée d'information structurée à l'utilisateur ou au système de supervision.

## 5. Grille de Validation QA (7 Points de Contrôle)

Chaque revue de code ou validation de PR (Pull Request) doit obligatoirement valider la grille d'évaluation ci-dessous :

| N° | Point de Contrôle QA | Critère d'Acceptation | Validation |
| --- | --- | --- | --- |
| 1 | Testabilité Métier Pure | 100 % de la logique domain/ est exécutable via des tests unitaires sans monter de composant UI ni initialiser de DOM. | [ ] |
| 2 | Absence de Sur-Abstraction | Moins de 3 occurrences similaires ne génèrent pas d'interface ou de classe abstraite prématurée. | [ ] |
| 3 | Application des Guard Clauses | Aucune fonction ne comporte plus de 3 niveaux d'indentation imbriqués (if/for). | [ ] |
| 4 | Constantes Nommées | Aucune valeur littérale (« magic number » ou string en dur) n'est présente dans la logique conditionnelle. | [ ] |
| 5 | Gestion des Erreurs | Aucun bloc catch vide ou réduit à un simple log passif n'existe dans le code. | [ ] |
| 6 | Taille des Fonctions | Aucune fonction ne dépasse 50 lignes sans justification explicite (parseur, dispatch switch). | [ ] |
| 7 | Alignement du Nommage | Les identifiants respectent la convention verbe + objet et le vocabulaire du glossaire métier. | [ ] |
