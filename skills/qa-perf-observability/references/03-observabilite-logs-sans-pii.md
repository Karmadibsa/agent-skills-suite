# 03 — Observabilité, Logs Structurés Sans PII & Alertes Actionnables

Statut : Référentiel QA, Performance & Sobriété V2.0 · Skill : qa-perf-observability

## 1. Journalisation Structurée & Niveaux de Logs (OWASP Logging Cheat Sheet) [N3 / N4]

La journalisation constitue le pilier fondamental de l'observabilité logicielle. Conformément aux recommandations OWASP et aux standards OpenTelemetry, tous les logs de l'application doivent être émis au format JSON structuré de manière unifiée, éliminant totalement les logs au format texte brut non exploitables par des agrégateurs automatisés. Dans une approche frugale KISS / 0 €, aucun collecteur OpenTelemetry payant ou infrastructure complexe n'est requis par défaut : l'écriture JSON sur la sortie standard (stdout/stderr) ou dans un fichier local à rotation automatique suffit amplement pour démarrer, à condition de maintenir une cardinalité maîtrisée des événements.

### 1.1 Attributs Obligatoires de la Structure JSON

Chaque entrée de journal doit comporter au minimum les champs normalisés suivants :

- timestamp : Horodatage exact au format UTC ISO 8601 / RFC 3339 avec précision en millisecondes (ex. 2023-10-24T14:32:01.045Z).

- level : Niveau de sévérité strict (DEBUG, INFO, WARN, ERROR, FATAL).

- event : Identifiant court, hiérarchique et stable de l'événement (ex. auth.login.failed, import.csv.completed, db.query.timeout).

- correlation_id / request_id : Identifiant unique universel (UUIDv4) généré dès l'entrée de la requête côté front-end ou gateway, propagé à travers l'ensemble des couches d'exécution (fonctions, bases de données, services tiers).

- duration_ms : Temps d'exécution mesuré en millisecondes, obligatoire pour toute opération réseau, E/S ou transaction critique.

- service : Nom du composant ou microservice émetteur (ex. api-gateway, auth-service). Obligatoire en architecture distribuée / microservices, optionnel en mode monolithe ou environnement local.

### 1.2 Exemple de Payload Structuré Standardisé

```
{
  "timestamp": "2023-10-24T14:32:01.045Z",
  "level": "WARN",
  "event": "auth.login.failed",
  "correlation_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "duration_ms": 142,
  "service": "api-gateway",
  "context": {
    "attempt_count": 3,
    "reason": "invalid_credentials"
  }
}
```

### 1.3 Matrice d'Usage Strict des Niveaux de Log

| Niveau | Cas d'usage autorisés | Comportement en Production |
| --- | --- | --- |
| DEBUG | Traces détaillées d'exécution, variables internes, flux de contrôle pas-à-pas lors des phases de développement. | Désactivé par défaut. Activation temporaire ciblée sur périmètre restreint. |
| INFO | Événements métier notables, cycles de vie de l'application (démarrage/arrêt serveur, migrations de BD réussies, génération d'exports). | Activé. Exploité pour les statistiques d'usage et le suivi nominal. |
| WARN | Anomalies récupérables, dégradations de service sans interruption (échec d'une tentative de connexion, seuil de quota proche, repli sur cache). | Activé. Fait l'objet d'une surveillance globale et de métriques d'analyse. |
| ERROR | Échecs d'opérations nécessitant une intervention ou une investigation (exceptions non gérées, rupture de connectivité BD, rejets d'API tierces). | Activé. Déclenche un enregistrement prioritaire et alimente les dashboards d'incidents. |
| FATAL | Incapacité critique du système à poursuivre son exécution (corruption de mémoire, configuration vitale absente, port bloqué). | Activé. Entraîne une alerte immédiate (astreinte) et la terminaison du processus. |

## 2. Interdiction Absolue de Données Personnelles ou Secrets dans les Logs (RGPD Art. 5 & 32) [N1]

### 2.1 Règle d'Étanchéité des Fichiers de Log

Un fichier de journalisation est une structure itinérante : il est fréquemment agrégé, archivé, copié sur des environnements d'analyse, ou joint à des tickets d'assistance (notamment via le module « Bug ou idée ? »).

En application directe des principes de minimisation, de sécurité et de conservation du RGPD (Art. 5.1.c, Art. 5.1.e, Art. 17 & Art. 32), aucune donnée à caractère personnel (PII) ni aucun secret d'authentification ne doit figurer dans les logs. Les durées de conservation des fichiers de log doivent être strictement encadrées (repères CNIL de 6 à 24 mois selon la finalité et le contexte légal), avec un mécanisme d'effacement ou de purge automatisé.

#### Éléments à exclusion stricte et absolue :

- Secrets & Authentifiants : Mots de passe en clair ou hashés, jetons JWT (access & refresh tokens), clés d'API, cookies de session, en-têtes Authorization.

- Données Personnelles Directes (PII) : Noms, prénoms, adresses email, numéros de téléphone, adresses IP publiques, numéros de sécurité sociale, coordonnées bancaires (IBAN/PAN), données de santé ou géolocalisation précise.

### 2.2 Technique de Masquage Automatique (Redaction)

Afin de prévenir toute fuite accidentelle, le système de journalisation doit intégrer un filtre centralisé non débraillable, positionné en amont de l'écriture physique du log (interceptor / middleware).

#### Algorithme de filtrage et d'assainissement :

- Inspection récursive des clés du payload JSON.

- Détection par liste noire de clés régulières : password, passwd, secret, token, authorization, email, iban, creditcard, ssn.

- Substitution systématique de la valeur détectée par la chaîne litérale "[REDACTED]".

- Hachage anonymisant (ex. HMAC-SHA256 avec sel tournant) si un identifiant doit impérativement être tracé à des fins de corrélation technique, sans possibilité de remonter à l'identité réelle.

```
[Payload Bruts] ---> [ Logger Interceptor (Redaction Filter) ] ---> [ Payload Assaini / Fichier JSON ]
                           |
                           +-- Clé sensible détectée ? 
                               ├── OUI  ==> Remplacer valeur par "[REDACTED]"
                               └── NON  ==> Conserver valeur exacte
```

## 3. Gestion Globale des Erreurs & Diagnostic Utilisateur [N4]

### 3.1 Front-end : Isolation via Error Boundaries

Afin d'éviter les pannes en cascade et les écrans blancs non explicatifs (White Screen of Death), l'architecture front-end doit inclure des composants d'isolation des erreurs (Error Boundaries).

- Confinement de l'erreur : L'échec d'un composant UI localisé (ex. un widget de graphique ou un module d'export) ne doit pas faire tomber l'ensemble de l'application.

- Affichage de secours (Fallback UI) : Présentation d'un message clair et rassurant pour l'utilisateur :« Une erreur inattendue est survenue lors de l'affichage de ce module. Vos données locales sont intactes et en sécurité. [Recharger l'écran] »

- Remontée contextuelle : L'Error Boundary capture l'exception JS, l'associe au correlation_id courant et transmet un rapport d'erreur anonymisé au service de suivi d'incidents.

### 3.2 Capture Systématique des Erreurs Globales Non Gérées

Toutes les exceptions et promesses rejetées non interceptées au niveau applicatif doivent être capturées par des écouteurs globaux centralisés et journalisées de manière structurée sans PII :

- Côté Client (Navigateur / Mobile) : Écoute obligatoire des événements globaux window.onerror et unhandledrejection pour intercepter les plantages JS asymptomatiques.

- Côté Serveur / Processus : Écoute des signaux de niveau processus (ex. uncaughtException et unhandledRejection sous Node.js) afin d'enregistrer un crash log JSON valide avant toute tentative de redémarrage ou d'arrêt propre du service.

### 3.2 Point de Santé Serveur (Healthcheck)

Chaque microservice ou application serveur doit exposer un point d'accès standardisé, léger et non authentifié permettant aux sondes d'orchestration et de monitoring d'évaluer l'état réel du service.

- Endpoint : GET /health

- Sous-systèmes contrôlés : Disponibilité de l'application, connectivité à la base de données principale, état des pools de connexions et disponibilité des caches critiques.

- Format de réponse :

```
{
  "status": "UP",
  "timestamp": "2023-10-24T14:35:00.000Z",
  "checks": [
    { "name": "database", "status": "UP", "latency_ms": 4 },
    { "name": "redis_cache", "status": "UP", "latency_ms": 1 }
  ]
}
```

En cas de défaillance d'un composant critique, le statut global passe en DOWN avec un code d'état HTTP 503 Service Unavailable.

## 4. Grille de Validation QA Observabilité

Cette checklist constitue la grille de contrôle obligatoire avant tout passage d'une version en environnement de production.

| N° | Point de Contrôle | Description de la Vérification | Méthode de Test / Script |
| --- | --- | --- | --- |
| 1 | Format JSON Structuré | Vérifier que 100 % des logs émis par le back-end et le front-end respectent le schéma JSON d'entreprise avec tous les attributs requis (timestamp, level, event, correlation_id). | Extraction d'un échantillon de 1000 lignes de log en dev/staging et validation par schéma JSON Schema validation. |
| 2 | Étanchéité PII & Secrets | Exécuter des requêtes contenant des mdp incorrects, des jetons invalides, des créations de compte et des envois d'email pour garantir qu'aucune donnée sensible n'apparaît dans les fichiers ou agrégateurs de logs. | Test d'injection : Envoi d'une requête POST /login en échec et POST /register / envoi d'email, puis vérification que password, email et jetons sont marqués "[REDACTED]". |
| 3 | Propagation Correlation ID | S'assurer qu'un correlation_id généré côté client est correctement transmis via les en-têtes HTTP (X-Correlation-ID) et conservé à chaque étape de traitement logguée. | Traçage d'une transaction de bout en bout de l'UI jusqu'à la BD et vérification de l'unicité de l'UUID dans les logs. |
| 4 | Résilience Front-End (Error Boundaries) | Provoquer artificiellement un crash JS dans un composant enfant de l'UI pour vérifier le confinement et le rendu du composant de fallback. | Injection d'une exception throw new Error() dans la méthode render d'un composant et contrôle visuel de l'écran de secours. |
| 5 | Endpoint Healthcheck | S'assurer de l'accessibilité de GET /health et de l'exactitude des codes HTTP retournés selon l'état des dépendances système. | Simulation d'une coupure de base de données en staging et vérification du passage du statut de 200 OK à 503 Service Unavailable. |
| 6 | Rotation & Purge des Logs | Vérifier l'application des règles de rotation automatique des fichiers de log (taille max, conservation) pour éviter la saturation des volumes disques. | Inspection des fichiers de configuration (logrotate / appendertracking) et vérification des politiques de rétention (ex. 14 jours max). |
| 7 | Capture Erreurs Globales | S'assurer que toutes les erreurs non gérées (client: window.onerror, unhandledrejection ; serveur: uncaughtException, unhandledRejection) sont remontées et journalisées au format JSON sans PII. | Provoquer une exception non interceptée dans un composant UI et un rejet de promesse serveur non géré, puis vérifier la génération du log JSON structuré. |
