# 00 — Index, Pyramide des Tests & Niveaux de Preuve (Skill 5 : qa-perf-observability)

Statut : Référentiel QA, Performance & Sobriété V2.0 · Standards : ISTQB, WCAG 2.2 / axe-core, Core Web Vitals, RGESN

## 1. Mission du Skill 5

Un code propre et sécurisé n'est fiable que s'il est prouvé par des tests reproductibles, rapide sur des terminaux réels, sobre en ressources et capable d'expliquer ses erreurs sans exposer de données personnelles.

Ce référentiel garantit :

- Des tests utiles et non fragiles : tester le comportement observable par l'utilisateur plutôt que les détails internes d'implémentation du code.

- Une performance et une sobriété mesurées : respecter les seuils Core Web Vitals et éviter le gaspillage réseau/CPU conformément au Référentiel Général d'Éco-conception de Services Numériques (RGESN).

- Une observabilité respectueuse du RGPD : diagnostiquer rapidement un incident en production grâce à des logs structurés contenant zéro donnée personnelle identifiable (PII).

## 2. Taxonomie des Niveaux de Preuve (Alignée sur le monorepo)

Chaque affirmation technique, exigence de test ou métrique de performance contenue dans les référentiels de ce skill s'appuie sur une grille rigoureuse de niveaux de preuve et sur les techniques de conception ISTQB (partitionnement d'équivalence, analyse des valeurs limites, tables de décision, transitions d'états) :

- [N1] Exigence réglementaire / légale vérifiée : Conformité au RGPD (Art. 5 sur la minimisation & Art. 32 sur la sécurité du traitement), Directives Européennes sur l'accessibilité numérique et obligations légales d'inclusivité.

- [N2] Principe fondamental d'ingénierie qualité / performance : Lois de la physique des systèmes informatiques, théorie des files d'attente (Loi de Little), seuil d'interactivité de Doherty (~400 ms), coûts exponentiels de correction des défauts selon la phase de détection.

- [N3] Standard ou référentiel reconnu : Normes de l'industrie internationale comprenant ISTQB, principes WAI-ARIA / Testing Library, Google Core Web Vitals (mesurés au 75e percentile), RGESN, et la spécification OpenTelemetry.

- [N4] Convention d'ingénierie logicielle éprouvée : Pyramide des tests de Mike Cohn, budgets de performance, patterns d'observabilité via logs structurés JSON.

- [N5] Outillage spécifique à la stack : Configurations et bonnes pratiques adaptées aux frameworks de l'écosystème (Vitest, Jest, Pytest, Cargo test, Playwright, Lighthouse CI).

- [N6] Hypothèse de charge ou d'optimisation à confirmer : Métriques personnalisées nécessitant une validation empirique via profilage réel en environnement de staging ou canary production.

## 3. La Pyramide des Tests Pragmatique & Niveaux ISTQB [N4]

Plutôt qu'une répartition statistique rigide, la stratégie de qualification s'appuie sur une heuristique qualitative et contextuelle alignée sur les niveaux ISTQB (composant/unitaire, intégration, système/E2E, acceptation). Elle applique systématiquement la distinction entre tests de non-régression (garantir la stabilité de l'existant) et tests de confirmation (vérifier la correction effective d'une anomalie) tout en adaptant le volume de tests à la nature du projet :

### Base — Tests Unitaires & Composants (Cœur Métier domain/)

- Périmètre : Logique métropolitaine, règles de calcul business (RM-XX), validation d'invariants et états de domaine purement isolés.

- Exécution : En millisecondes, sans I/O (zéro accès base de données, zéro appel réseau, zéro DOM).

- Objectif : Couverture complète des cas aux limites via le partitionnement d'équivalence et l'analyse des valeurs limites.

### Milieu — Tests d'Intégration & Contrats d'API (Données, API, Migrations)

- Périmètre : Interaction entre composants, requêtes SQL/NoSQL, contrats d'interface d'API HTTP/gRPC (validation OpenAPI / RFC 9457), stratégies de persistance, contrôles d'accès IDOR et tables de décision.

- Exécution : En secondes, avec conteneurs légers ou bases de données de test dédiées.

- Objectif : Valider la conformité des schémas d'échange d'API et la résilience aux pannes d'infrastructure.

### Sommet — Tests Systèmes, E2E & Acceptation (Parcours Critiques)

- Périmètre : Parcours utilisateurs vitaux (e.g., authentification, tunnel d'achat, transitions d'états complexes) exécutés dans un navigateur complet (Playwright).

- Exécution : En minutes, orchestrés sur des environnements d'intégration continue.

- Objectif : Garantir le fonctionnement des parcours d'entreprise critiques couplé à un audit d'accessibilité automatique via axe-core.

```
        /\
       /  \       E2E / Acceptation (Ciblés sur parcours critiques)
      / E2E\      [Playwright + axe-core]
     /------\
    / Intég. \    Intégration & Contrats d'API (Adapté au profil)
   /----------\   [DB, API OpenAPI / RFC 9457, Security]
  /  Unitaires \  Unitaires Cœur Métier (Majorité isolée)
 /--------------\ [Domain, Rules RM-XX, ISTQB cas limites]
```

### 3.2. Matrice d'Applicabilité par Profil de Projet (Principe KISS)

- Web / SaaS complet : Application intégrale de la pyramide (unitaires, intégration API, E2E Playwright multi-viewports, audit d'accessibilité axe-core, métriques Core Web Vitals et endpoint /health).

- PWA Offline-First : Tests ciblés du Service Worker, validation du respect du quota IndexedDB, simulation du mode avion et vérification de la synchronisation de la file d'attente.

- Desktop (Tauri / Electron) & CLI Local-First : Pas de healthcheck HTTP ni d'audit Lighthouse cloud superflus ; mesure prioritaire du temps de démarrage à froid (cold start), vérification des codes de sortie CLI, validation du comportement des verrous SQLite WAL et test d'interface WebView si applicable.

## 4. Carte des Documents du Référentiel (references/)

Fichier

Nom du Document

Contenu & Couverture

Condition de Chargement

references/00-index-pyramide-tests-preuves.md

Index & Pyramide des Tests

Mission du skill, taxonomie des niveaux de preuve [N1] à [N6], pyramide de Mike Cohn et grille de validation globale.

Chargé systématiquement au démarrage de toute tâche QA/Perf.

references/01-strategie-test-accessibilite.md

Stratégie de Test & Accessibilité

Patterns Testing Library, sélecteurs ARIA, tests d'intégration API, tests E2E Playwright et audits d'accessibilité axe-core / WCAG 2.2.

Lors de la rédaction ou révision de suites de tests unitaires, d'intégration ou E2E.

references/02-performance-eco-conception.md

Performance Web & Éco-conception

Budgets de performance, Core Web Vitals (LCP, INP, CLS), audits Lighthouse CI et règles d'éco-conception RGESN (sobriété CPU/réseau).

Lors d'opérations d'optimisation frontend, d'audit de charge ou d'éco-conception.

references/03-observabilite-logs-sans-pii.md

Observabilité & Sécurité des Logs

Logs structurés JSON, traçabilité OpenTelemetry, masquage strict PII/RGPD et classification des niveaux de log (ERROR, WARN, INFO).

Lors de la mise en place de journalisation, métriques, tracing ou gestion des erreurs.

## 5. Grille de Validation QA Globale (7 points de contrôle)

Toute livraison de code doit passer avec succès les 7 contrôles de la grille QA globale avant validation pour mise en production :

- Exécution complète de la pyramide de tests : Les tests unitaires et d'intégration s'exécutent sans erreur et couvrent l'intégralité des régressions potentielles du domaine métier.

- Résilience des sélecteurs E2E : Les tests Playwright utilisent exclusivement des rôles accessibles WAI-ARIA (getByRole, getByLabel) et ne s'appuient jamais sur des sélecteurs CSS fragiles ou du XPath.

- Zéro violation d'accessibilité critique : L'analyse statique et dynamique avec axe-core ne remonte aucune erreur de niveau "Critical" ou "Serious" sur les parcours révisés (WCAG 2.2 AA).

- Respect des budgets Core Web Vitals : Les seuils de performance au 75e percentile sont maintenus (LCP $\le$ 2.5s, INP $\le$ 200ms, CLS $\le$ 0.1).

- Conformité RGESN & Sobriété : Les requêtes réseau sont optimisées (pas de sur-traitement de données, requêtes inutiles éliminées) et le poids des assets reste dans les limites du budget établi.

- Absence totale de PII dans les logs : Aucun identifiant personnel (email, nom, jeton d'accès, adresse IP, mot de passe) n'est présent dans les sorties de journalisation standard ou de suivi d'erreurs.

- Format de log structuré : Toutes les erreurs d'application génèrent un log au format JSON structuré incluant le contexte d'exécution et un identifiant de trace unique (trace_id).
