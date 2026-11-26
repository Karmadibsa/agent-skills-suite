# 02 — Sécurité Applicative OWASP Top 10 / ASVS & Gestion des Secrets (Version 2.0)

Statut : Référentiel Code Propre, Sécurité & Git V1.0 · Skill : clean-code-security.

## 1. Gestion Stricte des Secrets & Configuration [N1 / N3]

La divulgation involontaire de secrets dans le contrôle de source constitue l'une des causes majeures d'incidents de sécurité critiques. Ce chapitre établit les directives obligatoires pour la gestion des variables d'environnement et l'isolation des secrets applicatifs.

### Règles impératives (DO)

- Stockage sécurisé des secrets : Tous les secrets (clés API, secrets de signature JWT, identifiants et mots de passe BDD, clés de chiffrement symétriques/dissymétriques) doivent impérativement être injectés via des variables d'environnement (.env pour les environnements de développement local) ou extraits du trousseau sécurisé de l'OS / d'un service dédié en production (ex. AWS Secrets Manager, HashiCorp Vault, Azure Key Vault).

- Fichier modèle systématique : Fournir obligatoirement un fichier .env.example dûment maintenu et versionné. Ce fichier doit lister l'intégralité des variables d'environnement requises par l'application, accompagnées exclusivement de valeurs fictives ou d'instructions de configuration explicites.

- Vérification pré-commit & filtrage : Contrôler systématiquement avant chaque commit que .env, *.pem, *.key, *.sqlite (données réelles), *.p12 et tout fichier contenant des identifiants locaux sont formellement déclarés dans le fichier .gitignore.

### Interdictions (DON'T)

- Déclarations en dur (Hardcoding) : Interdiction absolue d'inscrire en dur une clé API, un jeton d'accès, un mot de passe ou un secret d'environnement au sein du code source, des scripts de migration, des fichiers de test ou des configurations de déploiement.

- Exposition côté client : Aucun secret ou clé privée ne doit transiter par le bundle compilé du frontend (SPA, Mobile, Client lourd). Toute donnée compilée et distribuée au client est considérée comme publique et intégralement compromise par nature.

## 2. Validation des Entrées & Protection Contre les Injections (OWASP A03) [N3]

Les injections représentent une menace directe contre l'intégrité et la confidentialité du système d'information. La stratégie de défense repose sur la mise en œuvre rigoureuse du concept de validation stricte au niveau de la frontière applicative.

### Zero Trust sur les entrées externes

Toute donnée provenant d'une source externe à la mémoire d'exécution directe de l'application est considérée comme malveillante par défaut jusqu'à validation formelle. Cela inclut :

- Les formulaires HTML et requêtes HTTP (headers, query parameters, body).

- Les fichiers importés (CSV, JSON, XML, OFX, images).

- Les webhooks et messages provenant d'un bus événementiel.

- Les données lues depuis le stockage local (cookies, localStorage, bases de données locales).

### Injection SQL (CWE-89)

L'injection SQL survient lorsque des données non fiables sont interprétées par le moteur de base de données comme des instructions exécutables.

- Obligation : Utiliser exclusivement des requêtes préparées / paramétrées (?, $1, :param) ou un ORM/Query Builder abstrayant et sécurisant la construction des requêtes SQL.

- Interdiction absolue : Concaténer ou interpoler des chaînes issues d'entrées utilisateur directement dans des requêtes SQL :

```
// INTERDIT
"SELECT * FROM users WHERE id = " + input_id
```

### Cross-Site Scripting — XSS (CWE-79)

Le XSS permet l'exécution de scripts malveillants dans le contexte de navigateur de l'utilisateur.

- Échappement contextuel : S'appuyer en priorité sur les mécanismes d'échappement automatique des frameworks UI modernes (React, Angular, Vue, Svelte).

- Assainissement strict : Interdiction d'accéder directement au DOM via innerHTML, outerHTML ou d'utiliser dangerouslySetInnerHTML sur du contenu d'origine externe sans un assainissement rigoureux préalable au moyen d'une bibliothèque éprouvée (ex. DOMPurify).

- Bannissement de l'évaluation dynamique : L'usage des fonctions d'évaluation dynamique eval(), new Function(), ou setTimeout/setInterval avec transmission de chaînes est proscrit.

### Path Traversal (CWE-22)

Le traversement de répertoire permet à un attaquant d'accéder à des fichiers système arbitraires situés en dehors du répertoire racine de l'application.

- Normalisation et confinement : Lors du traitement d'accès aux fichiers (téléchargements, imports, génération de rapports), il convient de normaliser systématiquement les chemins (ex. path.resolve) et d'effectuer une vérification explicite s'assurant que le chemin résultant se situe stricto sensu dans le dossier autorisé :

```
resolvedPath.startsWith(allowedBaseDirectory)
```

### Server-Side Request Forgery — SSRF (OWASP A10:2021 / CWE-918)

Le SSRF survient lorsqu'une application web effectue une requête HTTP vers une ressource distante sans valider correctement l'URL fournie par l'utilisateur.

- Liste blanche de domaines & protocoles : Interdire les requêtes serveur (ex. fetch, curl, requests) vers une URL fournie par l'utilisateur sans validation préalable via une liste blanche stricte de domaines autorisés et restreinte au protocole https:// uniquement.

- Blocage des réseaux privés & métadonnées : Filtrer et bloquer systématiquement les adresses IP privées et locales (ex. 127.0.0.1, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) ainsi que l'accès aux services de métadonnées cloud (ex. 169.254.169.254).

### Injection de Commandes Système (CWE-78)

L'injection de commandes se produit lorsque des entrées non assainies sont transmises directement à un interpréteur de commandes du système d'exploitation.

- Proscription des exécutions shell dynamiques : Interdire l'usage de exec(), spawn() avec shell: true, ou os.system() sur des entrées dépendant des utilisateurs.

- Passage d'arguments sous forme de tableau : Utiliser exclusivement des API d'exécution transmettant les arguments sous forme de tableau d'arguments séparés sans invoquer de shell système.

### Sécurité des Uploads de Fichiers (OWASP File Upload)

L'acceptation de fichiers téléchargés nécessite des contrôles stricts afin de prévenir le téléversement de fichiers malveillants ou d'exécutables sur le serveur.

- Vérification du contenu réel (Magic Bytes) : Valider le type MIME réel du fichier en vérifiant ses octets magiques (magic bytes) et non en se fiant à l'extension de fichier ou au header HTTP Content-Type fourni par le client.

- Contraintes de stockage et renommage : Plafonner la taille maximale autorisée des fichiers, générer un nom aléatoire unique (UUID) pour chaque fichier importé, et stocker le contenu en dehors du répertoire web public.

## 3. Authentification, Sessions & Contrôle d'Accès (OWASP A01 & A07:2021) [N1 / N3]

Le contrôle d’accès définit si un utilisateur authentifié possède la légitimité requise pour exécuter une action spécifique sur une ressource donnée.

### Contrôle d'accès par défaut fermé (Fail-Safe Defaults)

- Principe du moindre privilège : Par défaut, toute route, endpoint d'API ou commande d'exécution sensible doit refuser l'accès. L'autorisation d'accès doit résulter d'une évaluation explicite des permissions accordées à l'identité demandeuse.

### Protection BOLA / IDOR (Broken Object Level Authorization)

L'absence ou le défaut de contrôle d'accès au niveau de l'objet (IDOR) permet à un utilisateur légitime d'accéder aux données d'un autre utilisateur en modifiant l'identifiant fourni dans la requête.

- Vérification d'appartenance : Valider de manière systématique que l'utilisateur authentifié est explicitement propriétaire ou dispose de droits suffisants sur l'objet métier demandé au moment de l'accès.

- Construction des requêtes :

```
SELECT * FROM documents WHERE id = $1 AND owner_id = $2
```

### Sécurité des jetons & cookies

- Gestion des sessions Web : Stocker préférentiellement les identifiants et jetons de session dans des cookies sécurisés configurés avec les attributs suivants :

- HttpOnly : Empêche la lecture du cookie par des scripts côté client (protection anti-XSS).

- Secure : Garantit la transmission du cookie exclusivement sur des canaux chiffrés (HTTPS).

- SameSite=Strict ou SameSite=Lax : Atténue l'exposition aux attaques de type Cross-Site Request Forgery (CSRF).

- Restriction du stockage local : Les jetons de session (JWT) ne doivent pas être conservés dans le localStorage ou le sessionStorage si l'application présente une surface d'exposition aux vulnérabilités XSS.

- Régulation du trafic : Appliquer une limitation de débit (Rate Limiting) et un mécanisme anti-brute-force sur l'ensemble des endpoints d'authentification et de réinitialisation de mot de passe.

### En-têtes HTTP de Sécurité & Politiques CORS (OWASP Secure Headers)

La configuration adéquate des en-têtes HTTP et de CORS restreint la capacité des attaquants à exploiter les faiblesses côté navigateur.

- En-têtes de sécurité obligatoires : Configurer systématiquement Content-Security-Policy (CSP), X-Content-Type-Options: nosniff, X-Frame-Options: DENY (ou frame-ancestors 'none'), et Strict-Transport-Security (HSTS).

- Configuration CORS restrictive : Utiliser des listes blanches d'origines explicites pour CORS ; l'usage de joker (*) combiné avec des requêtes authentifiées avec identifiants (credentials) est strictement proscrit.

## 4. Sécurité de la Chaîne Logistique & Dépendances (OWASP A06 / NIST SSDF) [N3]

La sécurité de la chaîne d'approvisionnement logicielle garantit que l'ensemble des composants logiciels tiers intégrés dans l'application ne contiennent pas de vulnérabilités connues ou de code malveillant.

### Lockfiles et reproductibilité

- Immutabilité des versions : Imposer le versionnement rigoureux des fichiers de verrouillage (package-lock.json, Cargo.lock, uv.lock, poetry.lock, yarn.lock).

- Installations déterministes : Garantir la parfaite reproductibilité de l'arbre de dépendances entre les environnements de développement, de test et de production.

### Audit des dépendances

- Analyse automatisée : Intégrer un contrôle d'audit de sécurité dans la chaîne d'intégration continue (ex. npm audit, cargo audit, pip-audit, govulncheck).

- Remédiation impérative : Bloquer la livraison et procéder à la mise à jour ou au remplacement immédiat de toute dépendance présentant une vulnérabilité qualifiée de niveau Critique ou Élevé.

### Intégrité des ressources tierces (SRI)

- Intégrité sous-ressource (SRI) : Tout script, feuille de style ou ressource tierce exécutable importé depuis un réseau de distribution de contenu (CDN) doit comporter un attribut de contrôle d'intégrité valide (ex. integrity="sha384-..." et crossorigin="anonymous").

- Hébergement local : Privilégier l'hébergement local des dépendances statiques frontend pour éliminer les risques de compromission par un fournisseur tiers.

### Sécurité Opérationnelle des Agents IA & Pipelines CI/CD

L'intégration d'agents autonomes et de workflows d'intégration continue exige le strict respect de règles d'exécution et d'isolation.

- Bannissement des scripts distants non vérifiés : Interdiction d'exécuter dynamiquement des scripts distants via curl | bash ou équivalent sans vérification explicite de leur empreinte/somme de contrôle.

- Masquage des secrets dans les sorties : Interdiction stricte d'écrire des secrets, jetons d'accès ou clés d'API dans la sortie standard, les fichiers de logs ou les rapports d'erreurs.

- Verrouillage des actions CI/CD : Verrouiller formellement les actions des workflows CI/CD par leur empreinte SHA complète ou des versions majeures immutables (ex. actions/checkout@v4).

## 5. Grille de Validation QA Sécurité (8 points de contrôle)

La grille ci-dessous récapitule les points de contrôle obligatoires à exécuter lors des revues de code (Code Review) et des étapes de validation QA avant tout déploiement en production.

ID

Point de Contrôle

Domaine OWASP / CWE

Critère d'Acceptation

Statut

SEC-01

Absence de secrets en dur

CWE-798 / NIST SSDF PW.4

Aucun mot de passe, clé API ou secret n'est présent dans le code source, les tests ou la configuration versionnée.

SEC-02

Modèle de configuration

OWASP A05 / NIST SSDF

Présence à jour du fichier .env.example contenant les variables requises sans aucune donnée réelle.

SEC-03

Exclusion du versionnement

OWASP A05 / CWE-538

Le fichier .gitignore inclut formellement .env, les clés privées (*.pem, *.key) et les bases locales.

SEC-04

Requêtes SQL paramétrées

OWASP A03 / CWE-89

Absence totale de concaténation de chaînes dans les requêtes SQL. Emploi exclusif de paramètres liés ou d'un ORM.

SEC-05

Protection XSS & Échappement

OWASP A03 / CWE-79

Absence d'utilisation directe d'injection DOM non assainie (innerHTML, dangerouslySetInnerHTML) et bannissement d'eval().

SEC-06

Isolation Path Traversal

OWASP A01:2021 / CWE-22

Validation et normalisation des chemins de fichiers avec contrôle strict du dossier racine d'exécution.

SEC-07

Contrôle BOLA / IDOR

OWASP A01:2021 / CWE-639

Vérification explicite de la propriété de l'objet métier par rapport à l'identifiant de l'utilisateur connecté.

SEC-08

Audit des Dépendances & SRI

OWASP A06 / NIST SSDF

Absence de vulnérabilités critiques/élevées dans l'audit de sécurité des paquets et présence d'attributs SRI pour les CDN.

SEC-09

Cookies, Sessions & Anti-CSRF

OWASP A07:2021 / CWE-613

Paramétrage obligatoire d'HttpOnly, Secure et SameSite sur les cookies de session, et protection anti-brute-force effective.

SEC-10

SSRF, Uploads & Headers HTTP

OWASP A10:2021 / CWE-918

Blocage des adresses IP locales/SSRF, validation des magic bytes pour les uploads et présence des en-têtes CSP/CORS explicites.
