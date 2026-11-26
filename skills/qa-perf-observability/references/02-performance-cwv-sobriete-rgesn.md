# 02 — Performance Core Web Vitals, Sobriété Numérique (RGESN) & Résilience Offline (V2.0)

Statut : Référentiel QA, Performance & Sobriété V2.0 · Skill : qa-perf-observability

## 1. Performance Web & Budgets de Ressources (Google Core Web Vitals) [N4]

La performance Web conditionne directement la qualité de l'expérience utilisateur et le référencement. L'analyse des performances s'appuie sur la mesure des Google Core Web Vitals au 75e percentile (p75 — Mobile et Desktop) sur des profils d'appareils mobiles et desktop standard. L'évaluation s'appuie prioritairement sur des outils gratuits (Chrome DevTools, PageSpeed Insights, et la bibliothèque JavaScript officielle web-vitals).

### 1.1 Metrics Clés Core Web Vitals (Seuils p75)

- LCP (Largest Contentful Paint) : <= 2,5 s

- Mesure le temps nécessaire pour afficher le composant visuel principal (image standard, bloc de texte majeur ou média principal).

- Objectif d'excellence : < 1,8 s.

- INP (Interaction to Next Paint) : <= 200 ms

- Mesure la réactivité globale de l'interface utilisateur lors de toutes les interactions (clics, appuis, saisies au clavier) durant tout le cycle de vie de la page. Note : L'INP a officiellement remplacé le FID (First Input Delay) en mars 2024. Le TBT (Total Blocking Time) mesuré en laboratoire ne constitue qu'un proxy partiel de l'INP réel subit sur le terrain.

- Objectif interne strict : < 100 ms (aligné sur le seuil d'attention immédiate de Doherty).

- CLS (Cumulative Layout Shift) : <= 0,1

- Évalue la stabilité visuelle de la page en calculant le cumul des décalages d'infrastructures inattendus.

- Objectif interne strict : 0.0 (aucun saut de mise en page après le premier affichage).

### 1.2 Budgets de Ressources Recommandés (Chargement Initial)

Afin de préserver des temps d'analyse CPU et de transfert réseau optimaux, toute application doit respecter le budget de taille de ressources suivant :

- JavaScript Initial (Bundle principal) :

- Taille cible compressée (gzip / brotli) : < 150–200 Ko (repère clé de sobriété numérique et d'efficacité de chargement).

- Règle d'éco-conception : Interdiction d'ajouter des dépendances lourdes (ex. Moment.js, Lodash complet) pour des besoins ponctuels pouvant être résolus en JS natif. Utiliser le code-splitting dynamique par route.

- Polices Web (Typography) :

- Format accepté : WOFF2 exclusivement (compression maximale).

- Optimisation : Sous-ensemblement latin (unicode-range), application de la propriété font-display: swap pour prévenir le texte invisible (FOIT).

- Limitation : Maximum 2 familles de polices et 3 graisses cumulées.

- Médias & Images :

- Formats requis : AVIF en priorité, WebP en repli.

- Dimensionnement : Attributs width et height explicitement déclarés en HTML pour réserver l'espace visuel et annuler le CLS.

- Chargement différé : loading="lazy" obligatoire sur toutes les images sous la ligne de flottaison (below the fold).

### 1.3 Performance Base de Données & Backend

La performance côté client repose sur des réponses backend rapides et prévisibles.

- Élimination stricte des requêtes N+1 :

- Interdiction de charger des sous-ressources dans une boucle d'itération (for / forEach).

- Exécution obligatoire de requêtes jointes (eager loading via ORM) ou de requêtes d'agrégation unique.

- Gestion des volumes de données affichés :

- Toute liste ou tableau dépassant 100 éléments doit mettre en œuvre une virtualisation d'affichage (DOM virtualization) ou une pagination côté serveur (limit/offset ou pagination par curseur).

## 2. Sobriété Numérique & Éco-conception (Référentiel RGESN) [N3]

Le Référentiel Général d'Éco-conception de Services Numériques (RGESN version 2024 — DINUM/Arcep), piloté par la DINUM et l'Arcep, est un guide de bonnes pratiques structuré en familles de critères méthodologiques (sobriété réseau/CPU, compatibilité avec le matériel ancien, pause des animations lors du masquage d'onglet) et non un algorithme de calcul d'un seuil carbone chiffré universel.

### 2.1 Architecture Frugale & Local-First

- Minimisation des transferts réseau : Réduire le nombre de requêtes API inutiles.

- Stratégie de Cache Amont : Exploitation maximale des mécanismes de cache navigateur (HTTP Cache Headers, IndexedDB, LocalStorage) pour stocker les référentiels statiques ou peu évolutifs.

- Traitements Déportés : Privilégier l'exécution des fonctions d'assainissement ou de formatage de données côté client plutôt qu'au travers d'allers-retours serveurs systématiques.

### 2.2 Annulation des Traitements Inutiles en Arrière-Plan

- Suppression du Polling HTTP agressif : Interdiction d'émettre des requêtes répétitives à fréquence fixe sans condition d'activité. Remplacer par des architectures événementielles (WebSockets, Server-Sent Events) si nécessaire, ou des rafraîchissements manuels à la demande.

- Mise en pause lors du changement d'onglet : Écouter l'événement document.visibilityState.

- Lorsque l'état bascule sur 'hidden', les timers, animations CSS/JS, flux de données en temps réel et cycles de pré-chargement doivent immédiatement être suspendus.

### 2.3 Sobriété Matérielle & Compatibilité Long terme

- Compatibilité avec le matériel ancien : L'interface doit conserver une navigation à 60 fps sans surcharge processeur sur un smartphone milieu de gamme datant de 4 à 5 ans ou un ordinateur portable de bureautique standard.

- Lutte contre l'obsolescence logicielle : Ne pas bloquer l'accès aux interfaces pour des versions de navigateurs récentes mais non-ultra-majoritaires. Éviter le recours systématique à des scripts d'émulation (polyfills) volumineux.

## 3. Résilience Réseau & Mode Hors Connexion (Offline-First) [N3 / N4]

Une application web moderne doit continuer de fonctionner de manière dégradée mais stable face aux variations de connectivité (réseau instable, mode avion, zones blanches).

```
         +-------------------------------------------------------+
         |           Détection État Réseau (online/offline)      |
|---|
                                     |
                    +----------------+----------------+
                    |                                 |
            [ En Ligne (Online) ]             [ Hors Ligne (Offline) ]
                    |                                 |
       +------------+------------+       +------------+------------+
       | Recommandation réseau   |       | Activation mode dégradé |
       | Timeout Fetch (Abort)   |       | Bandeau d'information   |
       | Synchro file d'attente  |       | Lecture seule (Cache)   |
       +-------------------------+       +-------------------------+
```

### 3.1 Détection Dynamique et Atténuation des Interruption Network

- Écoute active des indicateurs de connexion : Surveillance continue via window.addEventListener('online') et window.addEventListener('offline').

- Gestion stricte du Timeout Réseau :

- Toute requête réseau (fetch / axios) doit obligatoirement être associée à un AbortController définissant un délai d'expiration explicite (ex. 5 000 ms).

- Une requête ne répondant pas dans la fenêtre impartie doit échouer proprement sans bloquer le fil d'exécution JavaScript.

### 3.2 Dégradation Gracieuse & Traitement Hors Ligne

- Bandeau d'information contextuel :

- En cas de perte de connectivité, basculer l'interface vers un état hors ligne visible via un bandeau discret non bloquant (ex: « Mode hors ligne — Consultation des données locales. Vos actions seront synchronisées ultérieurement »).

- Accès local aux données :

- Maintien de la consultation des contenus précédemment mis en cache (Cache API / Service Worker / IndexedDB).

- Synchronisation et Résolution des Conflits :

- Les actions d'écriture réalisées en mode hors ligne sont empilées dans une file d'attente persistante (mutation queue).

- Dès le rétablissement du réseau (online), déclenchement automatique d'une synchronisation en arrière-plan.

- Gestion d'une limite de taille maximale sur la file d'attente hors ligne afin d'éviter la saturation mémoire du stockage local.

- Cycle de Vie du Service Worker & Gestion du Cache PWA :

- Mise en place d'une stratégie claire de mise à jour des Service Workers lors des changements de version de cache pour éviter le verrouillage sur des assets obsolètes.

- Vérification et demande explicite de persistance du stockage local via l'API navigator.storage.persist() pour prémunir les données hors ligne contre la purge automatique du navigateur.

- Mise en œuvre d'une règle claire de gestion des conflits (ex. Last-Write-Wins ou validation utilisateur ciblée).

## 4. Grille de Validation QA Performance & Sobriété

La grille ci-dessous constitue le protocole de recette technique à exécuter avant toute livraison en environnement de production.

N°

Point de Contrôle

Domaine

Critères d'Acceptation & Seuils

Méthode / Outil de Test

01

Core Web Vitals (p75)

Performance Client

LCP <= 2,5 s, INP <= 200 ms (remplaçant du FID), CLS <= 0,1 mesurés au 75e percentile (p75 — Mobile et Desktop). TBT utilisé en labo comme proxy partiel.

Chrome UX Report (CrUX) / PageSpeed Insights / bibliothèque JS web-vitals / Chrome DevTools

02

Budget JavaScript Initial

Empreinte Code

Bundle JS principal compressé < 150–200 Ko (gzip/brotli), repère de sobriété. Dynamic imports en place pour les sous-routes.

Vite Visualizer / Webpack Bundle Analyzer

03

Optimisation des Polices & Images

Assets Web

Polices WOFF2 uniquement avec font-display: swap. Images au format AVIF/WebP avec width/height définis et loading="lazy".

Audits Lighthouse / Developer Tools (Network Tab)

04

Absence de Requêtes N+1

Backend & BDD

Aucune boucle exécutant des appels SQL/API séquentiels. Chargement groupé ou jointures vérifiés sur les API complexes.

Profiler ORM / Logs Backend / Network Tracing

05

Veille CPU & Mise en Pause

Sobriété (RGESN 2024)

Arrêt complet des animations JS, timers et requêtes de polling lorsque l'onglet est masqué (visibilityState === 'hidden').

Chrome DevTools (Performance & Rendering Tab)

06

Résilience Réseau & Timeout

Robustesse

Tous les appels fetch comportent un AbortController (timeout max 5s). Présence d'un bandeau discret non bloquant si perte de réseau. Simulation DevTools (« Offline » / « Slow 3G »).

Simulation "Offline" & "Slow 3G" dans DevTools

07

Comportement Offline-First

Résilience

Consultation continue des données en cache local. File d'attente bornée des mutations, gestion du cycle de vie du SW/cache et vérification de la persistance via navigator.storage.persist().

Test fonctionnel en mode Avion sur appareil cible
