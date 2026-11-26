# 02 — Contrats d'API REST/JSON, Erreurs RFC 9457 & Pagination

Statut : Référentiel Données & Contrats API V1.0 · Skill : api-data-architecture

## 1. Conception d'API REST / Ponts de Données Clairs (OpenAPI 3.1) [N3]

La spécification des interfaces REST repose sur une application stricte des conventions sémantiques Web et de la norme OpenAPI 3.1. Les contrats doivent être découpés, typés et prévisibles afin de garantir l'interopérabilité entre les clients (Web, Mobile, Desktop local) et les microservices d'infrastructure.

### Convention de nommage des ressources et verbes HTTP

- Noms d'entités au pluriel : Les URLs désignent des collections ou des ressources identifiées issues du Glossaire Métier. Elles sont exclusivement formulées en minuscules, au pluriel, séparées par des tirets (kebab-case).

- GET /api/v1/workspaces

- POST /api/v1/orders

- GET /api/v1/orders/{id}

- PATCH /api/v1/orders/{id}

- Verbes HTTP explicites : Interdiction formelle de faire figurer des verbes d'action dans le chemin (URL). L'intention d'action est véhiculée uniquement par la méthode HTTP sémantique :

- GET : Lecture seule, sûre et idempotente (aucun effet de bord).

- POST : Création d'une nouvelle ressource dans la collection ou déclenchement d'une opération complexe non idempotente.

- PUT : Remplacement complet d'une ressource existante.

- PATCH : Modification partielle et ciblée des champs d'une ressource.

- DELETE : Suppression de la ressource.

- Ponts IPC pour Applications Desktop Locales (Tauri / Electron) :

- Les applications clientes s'exécutant en local sans réseau HTTP standard doivent réutiliser la même rigueur de typage.

- Utilisation de commandes nommées sous la forme domain:action (ex: orders:create, workspaces:getById).

- Les charges utiles (payloads) d'entrée et de sortie doivent être soumises aux mêmes contrats et validateurs typés strictes que les endpoints HTTPS d'API REST.

### Validation Stricte aux Frontières (Boundary Validation)

Chaque point d'entrée d'API doit appliquer un filtre d'étanchéité strict avant l'exécution du moindre code métier ou de persistance :

- Validation par schéma typé : Intégration systématique d'un parseur de schéma à l'entrée de la couche d'exposition (Zod pour TypeScript, Pydantic pour Python, Serde avec types stricts pour Rust).

- Rejet des champs non déclarés : Configuration du compilateur/parseur de schéma pour interdire et rejeter immédiatement (strip ou strict parsing error) toute propriété absente du contrat OpenAPI.

- Contraintes structurales : Vérification exhaustive des types de données, de la plage des bornes numériques, de la longueur minimale/maximale des chaînes de caractères, et du respect des expressions régulières définies pour les formats spécifiques (UUIDv4, RFC 3339 datetime, e-mail).

## 2. Codes HTTP Sémantiques & Format d'Erreur Standardisé RFC 9457 (Problem Details) [N3]

### Table des Codes de Statut HTTP Métier

Code HTTP

Libellé Standard

Contexte d'Utilisation Métier & Technique

200

OK

Lecture (GET) réussie ou mise à jour (PATCH/PUT) retournant l'état final.

201

Created

Ressource créée avec succès. En-tête Location obligatoire (Location: /api/v1/orders/ord_12345).

204

No Content

Traitement réussi ne nécessitant aucun corps de réponse (ex: suppression DELETE).

400

Bad Request

Erreur de parsing structurel du payload (JSON mal formé, encodage invalide).

401

Unauthorized

Absence de jeton d'authentification valide, jeton expiré ou signature invalide.

403

Forbidden

Jetons valides mais privilèges/rôles insuffisants (RBAC/ABAC) pour accéder à la ressource.

404

Not Found

Ressource non trouvée ou masquée intentionnellement pour éviter l'énumération d'identifiants.

409

Conflict

Violations de contraintes d'unicité (UNIQUE), de dépendances ou conflits de version d'état.

422

Unprocessable Entity

Syntaxe JSON valide mais échec des validations de règles de gestion ou de types de champs.

429

Too Many Requests

Dépassement des quotas (Rate Limiting). En-tête Retry-After obligatoire.

415

Unsupported Media Type

Envoi d'un en-tête Content-Type non supporté (différent de application/json ou multipart/form-data).

### Structure d'Erreur Normalisée RFC 9457 (Problem Details)

Tout échec de traitement HTTP dans la plage 4xx ou 5xx sur l'ensemble des API publiques doit impérativement retourner un payload au format application/problem+json. Les chaînes de texte brut, messages HTML d'erreur génériques et fuites de traces d'exécution (stack traces) sont strictly interdits.

```
{
  "type": "https://api.domaine.fr/errors/validation-error",
  "title": "Données de saisie invalides",
  "status": 422,
  "detail": "Le montant doit être supérieur à 0,00 €.",
  "instance": "/api/v1/orders",
  "errors": [
    {
      "field": "amount",
      "code": "MIN_VALUE",
      "message": "Le montant minimum est 0,01 €."
    }
  ]
}
```

- Champs obligatoires RFC 9457 :

- type (string / URI) : URI pointant vers la documentation spécifique du type d'erreur.

- title (string) : Résumé court et lisible de la catégorie d'erreur.

- status (number) : Reprise du code de statut HTTP de la réponse.

- detail (string) : Explication humaine détaillée contextuelle de l'erreur survenue.

- instance (string / URI) : URI du point d'accès ayant généré l'erreur.

- errors (array, extension optionnelle) : Liste détaillée des erreurs de champs spécifiques pour la validation d'entrée.

- Protection contre les informations internes : Les extensions personnalisées (ex: le tableau errors[]) ne doivent jamais exposer de données internes, requêtes BDD brutes ou détails d'infrastructure.

- Protection BOLA / IDOR (OWASP API1:2023) : Vérification systématique du droit d'accès de l'utilisateur authentifié sur l'objet ciblé avant d'émettre un statut 200 OK ou 404 Not Found.

## 3. Pagination Bornée, Tri & Filtrage Sécurisés [N4]

### Strict Bounding sur les Collections

Il est formellement interdit d'exposer un endpoint retournant une liste non bornée. Toute requête de type collection doit imposer une pagination par défaut et un plafond strict de résultats retournés.

- Valeur par défaut : limit=25 (si absent de la requête client).

- Valeur maximale tolérée : max_limit=100. Tout paramètre limit supérieur à 100 est automatiquement ramené à 100 par la couche intermédiaire.

- Validation des types d'arguments : Les paramètres page et limit doivent obligatoirement être des entiers strictement positifs (>= 1). Toute valeur non valide entraîne immédiatement une erreur HTTP 422 Unprocessable Entity.

### Stratégies de Pagination

#### 1. Pagination par Curseur (cursor + limit) — Mode Prioritaire

Recommandée pour les flux de données continus, les tables à forte volumétrie et les structures temporelles.

- Mécanisme : Le curseur est un jeton opaque encodé (ex: Base64URL) contenant les clés de tri uniques du dernier élément du jeu de données (ex: created_at + id).

- Performance : Complexité temporelle constante $O(1)$ basée sur un index B-Tree SQL. Évite le coût croissant du balayage de la mémoire causé par les clauses OFFSET.

```
{
  "data": [
    { "id": "ord_01H12345678", "total_amount": 150.00 }
  ],
  "pagination": {
    "next_cursor": "eyJjcmVhdGVkX2F0IjoxNjg5MDAwMDAsImlkIjoib3JkXzAxSDEyMzQ1Njc4In0=",
    "has_more": true,
    "limit": 25
  }
}
```

#### 2. Pagination par Page (page + limit) — Mode Restreint

Réservée exclusivement aux interfaces utilisateurs d'administration nécessitant un affichage explicite par numéro de page.

- Structure de réponse :

```
{
  "data": [
    { "id": "ord_01H12345678", "total_amount": 150.00 }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 25,
    "total_pages": 4,
    "total_items": 98
  }
}
```

### Tri Sécurisé par Liste Blanche (Whitelisting)

Le tri dynamic des résultats via le paramètre de requête sort constitue un vecteur potentiel d'injection SQL sur les clauses ORDER BY.

- Règle absolue : Seuls les champs déclarés dans une liste blanche statique au niveau du contrôleur d'API sont acceptés (ex: sort=created_at:desc,status:asc).

- Comportement en cas de violation : Tout paramètre de tri non listé dans la liste blanche doit immédiatement soulever une erreur HTTP 422 Unprocessable Entity.

## 4. Idempotence & Concurrence Optimiste [N4]

### Idempotence via l'en-tête Idempotency-Key

Afin de prévenir la double exécution d'actions critiques non idempotentes par nature (création de paiements, génération de commandes, facturation), le backend doit supporter l'en-tête client Idempotency-Key. Cet en-tête doit impérativement être un UUIDv4 valide généré par le client lors des opérations POST critiques.

```
POST /api/v1/orders HTTP/1.1
Host: api.domaine.fr
Idempotency-Key: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d
Content-Type: application/json
{
  "workspace_id": "wsp_01H9988",
  "amount": 99.90
}
```

- Fonctionnement du Middleware d'Idempotence :

- À la réception de l'en-tête Idempotency-Key (UUIDv4), le middleware interroge un cache d'état rapide à haut débit (Redis).

- Si la clé est absente : La clé est verrouillée à l'état PENDING. La requête est exécutée normalement. Dès finalisation, la réponse complète (statut code, corps JSON, en-têtes) est stockée dans le cache avec un TTL (ex: 24 heures).

- Si la clé est présente et terminée : L'exécution métier est interceptée. Le middleware renvoie immédiatement la réponse enregistrée initiale sans solliciter à nouveau le domaine métier.

- Adaptation selon l'architecture d'implémentation :

- Application locale mono-utilisateur (Desktop / PWA Local-First) : Le contrôle s'effectue via un verrouillage d'état en mémoire ou une transaction SQLite locale (aucun serveur Redis ni infrastructure externe requis).

- Application serveur multi-utilisateurs : Le suivi s'appuie sur un cache distribué (Redis ou table SQL dédiée idempotency_keys avec TTL 24h) afin de garantir l'unicité des traitements lors de requêtes concurrentes réparties sur plusieurs instances backend.

- Si la clé est présente mais dans l'état PENDING : Renvoi d'un code de statut 409 Conflict ou 429 Too Many Requests pour bloquer les requêtes concurrentes simultanées.

### Concurrence Optimiste (ETag / version)

La concurrence optimiste évite les écrasements aveugles de données (Lost Update Problem) lors de modifications concurrentes par plusieurs utilisateurs.

```
PATCH /api/v1/orders/ord_12345 HTTP/1.1
Host: api.domaine.fr
If-Match: "v3-7f8a9b"
Content-Type: application/json
{
  "status": "APPROVED"
}
```

- Mécanisme de Contrôle :

- Chaque ressource exposée renvoie son état de version dans l'en-tête ETag (ou via un attribut version / updated_at dans le document JSON). L'ETag doit être recalculé à chaque mutation via un numéro de version incrémenté ou un hash d'empreinte du contenu.

- Lors d'une mise à jour (PATCH ou PUT), le client transmet la version en sa possession via l'en-tête HTTP If-Match.

- Le backend compare la valeur If-Match transmise avec la version courante persistant en base de données :

- Égalité : La modification est appliquée, la version de la ressource est incrémentée (v4), et le nouvel ETag est renvoyé dans la réponse 200 OK.

- Divergence : L'accès est rejeté immédiatement avec un statut 409 Conflict ou 412 Precondition Failed.

### 4.2. Sécurité Transverse des API (CORS, CSRF, Rate Limiting & Versioning)

- CORS (Cross-Origin Resource Sharing) : Utilisation d'une liste blanche stricte d'origines autorisées. Il est strictement interdit d'utiliser la directive Access-Control-Allow-Origin: * conjointement avec des requêtes nécessitant des identifiants (credentials).

- Protection Anti-CSRF : Obligatoire dès que l'authentification repose sur des cookies de session. Mise en place d'attributs de cookie SameSite=Strict ou Lax et vérification systématique d'un jeton anti-CSRF dédié.

- Rate Limiting : Limitation globale et ciblée du débit de requêtes par adresse IP et/ou compte utilisateur. En cas de dépassement, l'API renvoie un statut HTTP 429 Too Many Requests accompagné d'un en-tête Retry-After.

- Versioning des Contrats : Gestion des versions majeures via un préfixe d'URI explicite (ex: /api/v1/) garantissant la rétrocompatibilité des contrats et l'évolution maîtrisée des endpoints sans altérer les clients en production.

## 5. Grille de Validation QA (7 points de contrôle)

Toute modification apportée aux contrats d'API REST/JSON doit valider l'ensemble des 7 critères de la grille ci-dessous avant son déploiement en environnement de production :

ID

Point de Contrôle

Méthode de Test / Validation

Critère d'Acceptation Exigé

Statut

QA-01

Strict Boundary Validation

Injection d'un payload JSON comportant des champs non documentés et des types altérés (ex: string au lieu de number).

HTTP 422 Unprocessable Entity. Rejet immédiat par le parseur sans appel à la couche métier.

QA-02

Conformité RFC 9457

Provoquer intentionnellement une erreur métier et une erreur d'authentification.

Content-Type application/problem+json présent. Validation de la présence des champs type, title, status, detail, instance.

QA-03

Absence de Fuite d'Information

Envoi d'une requête HTTP corrompue pour déclencher un échec système inattendu.

Strictement aucune fuite de stack trace, de requête SQL brute ou d'identifiant d'infrastructure interne dans le corps de réponse.

QA-04

Pagination Bornée Explicite

Envoi d'une requête GET sur une collection sans spécifier limit, puis avec limit=500.

Sans paramètre : renvoie 25 éléments par défaut. Avec limit=500 : renvoie un maximum de 100 éléments.

QA-05

Sécurité du Tri (Sort Whitelisting)

Envoi d'une requête avec injection de paramètre non autorisé (ex: sort=password_hash:asc ou injection SQL).

HTTP 422 Unprocessable Entity. Interception directe par le validateur de liste blanche.

QA-06

Idempotence des Recommandations

Exécution répétée de deux requêtes identiques POST successives comportant la même Idempotency-Key.

La seconde requête renvoie exactement le même statut HTTP et le même payload que la première, sans double création en BDD.

QA-07

Concurrence Optimiste (ETag)

Modification simultanée d'une ressource avec un en-tête If-Match désynchronisé ou périmé.

Rejet de la seconde tentative de modification concurrentielle avec un code de statut 409 Conflict ou 412 Precondition Failed.
