# 02 — Règles Métier, Modèle de Données Conceptuel & Cas Limites (Edge Cases)

Statut : Référentiel Cahier des Charges & Documentation Dev V1.0 · Skill : product-spec-docs

## 1. Spécification des Règles Métier Déterministes (Business Rules)

Le présent chapitre définit l'ensemble des règles de calcul, d'éligibilité, d'arrondi, de priorité et de transition d'état qui régissent l'application. Chaque règle respecte le principe [N4] : elle est identifiée de manière unique, formalisée sans ambiguïté et appuyée par un exemple chiffré déterministe avec contre-exemple d'erreur.

### 1.1. Règles de Calcul Financier & Engagements (RM-FIN)

#### Règle RM-01 — Calcul du budget engagé

- Définition : Le total du budget engagé pour un événement ou un projet est la somme stricte des montants des sélections actives (status = ACTIVE) et des commandes validées (status = VALIDATED). Les options alternatives non retenues (status = DRAFT ou status = ALTERNATIVE) ainsi que les lignes annulées (status = CANCELLED) ne doivent sous aucun prétexte s'additionner au total engagé.

- Exemple vérifiable :

- Repère de référence : 25,00 €

- Sélection active A : 15,00 € (Parfum)

- Sélection active B : 12,00 € (Jeu de société)

- Alternative suggérée C : 25,00 € (Livre collector - non retenu)

- Ligne annulée D : 18,00 € (Frais d'emballage - annulé)

- Total affiché conforme = 27,00 € (15,00 + 12,00)

- Contre-exemple (Bug) = 52,00 € (inclusion de l'alternative C) ou 77,00 € (cumul de l'ensemble des lignes).

#### Règle RM-02 — Calcul des remises dégressives et plafonds

- Définition : Lorsqu'une remise en pourcentage est appliquée à un panier ou une commande, elle s'exécute sur le montant HT global de la ligne. Le résultat de la remise est arrondi au centime d'euro le plus proche (arrondi à 2 décimales selon la règle HALF_UP : .xx5 arrondit au centime supérieur). Si le montant de la remise calculé dépasse le plafond absolu fixé pour la promotion, le montant appliqué est strictement égal au plafond.

- Exemple vérifiable :

- Montant brut HT : 142,55 €

- Remise : 15 %

- Plafond de remise : 20,00 €

- Calcul théorique : 142,55 * 0,15 = 21,3825 € -> Arrondi HALF_UP = 21,38 €

- Application du plafond (20,00 € < 21,38 €)

- Montant de remise net appliqué = 20,00 €

- Montant final HT = 122,55 €

- Contre-exemple (Bug) = Remise de 21,38 € (dépassement du plafond) ou 21,39 € (erreur d'arrondi préalable).

#### Règle RM-03 — Calcul de la TVA multi-taux sur panier mixte

- Définition : La TVA est calculée ligne par ligne après application des remises proratisées sur chaque article. Le total de la TVA de la commande est la somme exacte de la TVA de chaque ligne (arrondie séparément au centime HALF_UP), et non l'application d'un taux moyen sur le total TTC.

- Exemple vérifiable :

- Ligne 1 (Livre) : 10,00 € HT, TVA 5,5 % -> 10,00 * 0,055 = 0,55 €

- Ligne 2 (Service) : 25,33 € HT, TVA 20,0 % -> 25,33 * 0,20 = 5,066 € -> Arrondi = 5,07 €

- Total HT = 35,33 €

- Total TVA conforme = 5,62 € (0,55 + 5,07) -> Total TTC = 40,95 €

- Contre-exemple (Bug) = 5,65 € (calculé en faisant 35,33 * 0,16 ou en arrondissant le global après somme).

### 1.2. Règles d'Éligibilité & Droits (RM-ELI)

#### Règle RM-04 — Éligibilité au statut d'acheteur prioritaire

- Définition : Un utilisateur obtient le statut "Acheteur Prioritaire" si et seulement si ses dépenses cumulées validées (status = VALIDATED) sur les 365 derniers jours glissants atteignent un seuil d'au moins 1 000,00 € HT ET qu'il ne présente aucun incident de paiement non résolu (incident_count = 0).

- Exemple vérifiable :

- Utilisateur X : Total 365j = 1 050,00 € HT, Incidents résolus = 1, Incidents ouverts = 0.

- Statut éligible = VRAI

- Utilisateur Y : Total 365j = 1 200,00 € HT, Incidents ouverts = 1.

- Statut éligible = FAUX

- Contre-exemple (Bug) = Valider l'utilisateur Y car son total est supérieur à 1 000 €, en ignorant le filtre d'incidents ouverts.

#### Règle RM-05 — Validation d'une allocation de ressources

- Définition : La réservation d'une ressource partagée (ex. salle, équipement) est autorisée si la durée demandée ne chevauche aucune autre réservation validée (status = CONFIRMED). Deux créneaux [A, B] et [C, D] se chevauchent si A < D et C < B.

- Exemple vérifiable :

- Réservation existante : 14h00 à 16h00.

- Nouvelle demande A : 16h00 à 17h00 -> 14:00 < 17:00 ET 16:00 < 16:00 (FAUX) -> Acceptée.

- Nouvelle demande B : 15h30 à 16h30 -> 14:00 < 16:30 (VRAI) ET 15:30 < 16:00 (VRAI) -> Refusée.

- Contre-exemple (Bug) = Refuser la demande A en considérant que 16h00 est inclus à la fois dans l'ancienne et la nouvelle réservation (borne inclusive mal gérée).

### 1.3. Exigences Non Fonctionnelles Mesurables (NFR — ISO/IEC 25010)

Cette section définit l'ensemble des exigences non fonctionnelles quantifiables, vérifiables et auditables, structurées selon la norme ISO/IEC 25010.

| Catégorie ISO 25010 | Exigence & Périmètre | Métrique / Seuil Cible (SLA) | Méthode de Vérification |
| --- | --- | --- | --- |
| Performance & Réactivité | Temps de réponse de l'API REST/GraphQL et rendu du UI (LCP/FID/CLS). | Temps de réponse API p95 < 200 ms pour les lectures, p99 < 500 ms pour les écritures. Core Web Vitals : LCP < 2.5s, FID < 100ms, CLS < 0.1. | Tests de charge K6 / Locust & Audits Lighthouse CI intégrés à la CI/CD. |
| Disponibilité & Résilience | Taux de disponibilité du service et tolérance aux pannes réseau. | Disponibilité mensuelle SLA >= 99.9% (hors maintenance planifiée). Support du mode dégradé avec synchronisation automatique lors du retour en ligne. | Monitoring Datadog / Prometheus & Chaos Engineering (Simulations de pannes réseau). |
| Sécurité & Chiffrement | Protection des données en transit et au repos, contrôle d'accès. | Chiffrement TLS 1.3 (en transit) et AES-256 (au repos). Authentification OAuth2 / OIDC avec JWT et RBAC/ABAC strict sur l'ensemble des endpoints. | Scans de vulnérabilités SAST/DAST (SonarQube/OWASP ZAP) & Audits de sécurité annuels. |
| Confidentialité & RGPD | Gestion des données personnelles (PII) et politique de conservation. | Masquage/Anonymisation des logs (Zero PII). purge automatique des comptes inactifs après 36 mois et traitement des demandes de suppression sous 30 jours. | Audit annuel de conformité RGPD & Registre des traitements de données. |
| Compatibilité & Accessibilité | Support multi-plateforme et accessibilité numérique. | Compatibilité 100% avec les 2 dernières versions majeures de Chrome, Safari, Firefox, Edge, iOS et Android. Conformité WCAG 2.2 niveau AA. | Tests d'accessibilité automatisés avec axe-core & Recette manuelle sur lecteurs d'écran (NVDA/VoiceOver). |

## 2. Modèle de Données Conceptuel (MDC)

Le Modèle de Données Conceptuel définit la structure et le sens des entités métier indépendamment de l'implémentation physique en base de données. Chaque entité sépare strictement son identifiant technique immuable (id UUIDv4) de ses noms d'affichage modifiables (label, display_name).

Note de conformité : Tous les identifiants uniques de type UUID au sein du système respectent rigoureusement la norme RFC 4122 / RFC 9562 (UUIDv4 générés aléatoirement ou UUIDv7 chronologiques pour les indexations BDD performantes).

```
erDiagram
    Utilisateur ||--o{ Commande : "passe" 
    Utilisateur ||--o{ Session : "ouvre"
    Commande ||--|{ LigneCommande : "contient"
    LigneCommande }|--|| Produit : "référence"
```

### 2.1. Entité : Utilisateur (User)

Description : Représente un compte utilisateur inscrit au sein du système, qu'il soit client, administrateur ou gestionnaire.

| Attribut | Contraintes de validation |
| --- | --- |
| id | Immuable, Clef primaire |
| email | Unique, format RFC 5322, minuscules |
| display_name | Min 2 car., Max 100 car., Trimmé |
| role | Valeurs : CUSTOMER, MANAGER, ADMIN |
| status | Valeurs : PENDING_VERIFICATION, ACTIVE, SUSPENDED, ARCHIVED |
| created_at | Immuable |
| deleted_at | Rempli uniquement lors du Soft-Delete |

- Relations :

- 1-à-N vers Commande : Un utilisateur peut passer plusieurs commandes. Suppression de l'utilisateur -> Interdiction si commandes actives, Soft-Delete du compte sinon.

- 1-à-N vers Session : Un utilisateur peut avoir plusieurs sessions ouvertes. Suppression de l'utilisateur -> Cascade (suppression des sessions).

- Automate d'états (Utilisateur.status) :

- PENDING_VERIFICATION → ACTIVE (Validation email réussie)

- ACTIVE → SUSPENDED (Verrouillage de sécurité ou impayé)

- SUSPENDED → ACTIVE (Résolution de l'incident)

- ACTIVE / SUSPENDED → ARCHIVED (Demande de suppression / Droit à l'oubli GDPR)

- Transitions interdites : ARCHIVED → tout autre statut (état final irréversible).

```
   [PENDING_VERIFICATION] ---> (Email validé) ---> [ACTIVE] <---> [SUSPENDED]
                                                     |
                                            (Demande RGPD)
                                                     v
                                                [ARCHIVED] (Final)
```

### 2.2. Entité : Commande (Order)

Description : Représente une transaction d'achat initiée par un utilisateur.

| Attribut | Valeur par défaut | Contraintes de validation |
| --- | --- | --- |
| id | Auto-généré | Immuable, Clef primaire |
| user_id | Aucun | Clef étrangère vers Utilisateur.id |
| reference_code | Auto-généré | Format CMD-YYYYMM-XXXXX, unique |
| total_ht | 0.00 | >= 0.00 |
| total_tva | 0.00 | >= 0.00 |
| total_ttc | 0.00 | Strictly = total_ht + total_tva |
| status | DRAFT | Valeurs : DRAFT, VALIDATED, PAID, SHIPPED, CANCELLED |
| created_at | NOW() UTC | Immuable |

- Relations :

- N-à-1 vers Utilisateur : Chaque commande appartient à un seul utilisateur.

- 1-à-N vers LigneCommande : Une commande contient une ou plusieurs lignes. Suppression de la commande -> Cascade sur les lignes.

- Automate d'états (Commande.status) :

- DRAFT → VALIDATED (Validation du panier par le client)

- VALIDATED → PAID (Confirmation du paiement webhook)

- VALIDATED → CANCELLED (Échec de paiement ou annulation manuelle)

- PAID → SHIPPED (Expédition du colis)

- PAID → CANCELLED (Remboursement client avant expédition)

- Transitions interdites : SHIPPED → CANCELLED (Nécessite une procédure de retour distincte).

```
   [DRAFT] ---> [VALIDATED] ---> [PAID] ---> [SHIPPED]
                     |             |
                     +------>------+---> [CANCELLED]
```

### 2.3. Entité : Produit (Product)

Description : Article disponible dans le catalogue d'achat.

| Attribut | Valeur par défaut | Contraintes de validation |
| --- | --- | --- |
| id | Auto-généré | Immuable, Clef primaire |
| sku | Aucun | Format SKU-XXXX-XXXX, unique, immuable |
| name | Aucun | Min 1 car., Max 255 car. |
| unit_price_ht | Aucun | > 0.00 |
| tva_rate | 20.00 | Taux en % (ex. 5.50, 20.00) |
| stock_quantity | 0 | >= 0 |
| is_active | true | Visibilité catalogue |

- Relations :

- 1-à-N vers LigneCommande : Un produit peut apparaître dans plusieurs lignes de commande. Suppression du produit -> Interdiction d'une suppression physique si présent dans au moins une commande (RESTRICT) ; passage de is_active à false (désactivation).

## 3. Matrice Exhaustive des Cas Limites (Edge Cases)

La présente section définit le comportement comportemental obligatoire du système face aux 8 catégories de situations d'exception.

| Catégorie | Situation Limite (Edge Case) | Comportement Attendu & Mécanisme Technique / Code HTTP |
| --- | --- | --- |
| 1. Zero Data | Chargement d'un tableau d'onglets ou de listes sans aucun enregistrement en base. | Ne jamais afficher de page blanche ou d'erreur technique 500 (API renvoie HTTP 200 OK avec tableau vide []). Afficher un composant visuel dédié (Empty State) incluant une illustration claire, un texte explicatif ("Aucune commande enregistrée pour le moment") et un bouton d'action primaire ("Créer une commande"). |
| 2. Stress Data | A. Libellé de produit contenant 250 caractères sans espace.B. Panier comportant 10 000 lignes de commande.C. Saisie d'un montant égal à 0,00 € ou négatif. | A. Application de règles CSS strictes (text-overflow: ellipsis, overflow-hidden, break-words) empêchant le cassage du layout UI.B. Pagination obligatoire côté serveur (limit = 50 par appel API) et scroll virtuel (virtual scrolling) sur la vue UI.C. Validation DTO front/back (@Min(0.01)) et rejet immédiat via HTTP 422 Unprocessable Entity avec payload d'erreur détaillé. |
| 3. Données Partielles / Corrompues | A. Import d'un CSV d'utilisateurs avec encodage ISO-8859-1 au lieu de UTF-8.B. Champ optionnel telephone rempli avec des espaces vides uniquement ("   "). | A. Auto-détection du jeu de caractères et conversion UTF-8 en pipeline de traitement, ou rejet propre avec le code HTTP 400 Bad Request ("Le fichier doit être encodé en UTF-8").B. Nettoyage systématique (Sanitize / Trim) au niveau des DTO en entrée d'API pour convertir les chaînes vides ou composées d'espaces en la valeur NULL avant écriture SQL. |
| 4. Conflits & Doublons | A. Deux utilisateurs créent exactement au même instant un compte avec le même email.B. Double-clic frénétique de l'utilisateur sur le bouton "Valider le paiement". | A. Index d'unicité strict BDD (UNIQUE INDEX (email)). Le second appel est bloqué en BDD et renvoie une réponse HTTP 409 Conflict.B. Front-end : Désactivation immédiate du bouton (disabled) dès le 1er clic. Back-end : Header d'idempotence obligatoire (Idempotency-Key: <UUID>) avec verrou distribué Redis. |
| 5. Suppression & Dépendances | Demande de suppression d'un utilisateur ayant 15 commandes associées dans l'historique comptable. | Interdiction de suppression physique SQL (rejet HTTP 400 Bad Request si tentative d'effacement direct). Exécution obligatoire du workflow de Soft-Delete & Anonymisation RGPD (deleted_at = NOW(), emails/noms obfusqués, conservation du user_id pour intégrité comptable). |
| 6. Interruption & Reprise | Perte de connexion réseau (micro-coupure Wi-Fi) ou fermeture accidentelle du navigateur pendant la saisie d'un formulaire de 20 champs. | A. Mise en file d'attente locale (IndexedDB / localStorage) et sauvegarde automatique (Auto-save draft) toutes les 3 secondes.B. Mécanisme de reconnexion avec rejeu des requêtes en attente et bannière de restauration de brouillon UI. |
| 7. Dates, Fuseaux & Arrondis | A. Validation d'une souscription le 29 février d'une année bissextile (ex. 2024) pour une durée de 1 an.B. Opération bancaire effectuée entre deux fuseaux horaires différents (Paris vs UTC-5 Tokyo). | A. Normalisation des calculs d'échéance ramenée au dernier jour valide du mois cible (28/02/2025).B. Échanges API et stockage BDD obligatoirement normalisés en UTC ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ). Arrondis monétaires exécutés via HALF_UP à 2 décimales (BigDecimal). |
| 8. Permissions & Confidentialité | A. Un utilisateur modifie l'URL pour accéder à la commande d'un autre client (/orders/550e8400-e29b-41d4-a716-446655440000).B. Journalisation des logs système lors d'un échec d'authentification. | A. Contrôle d'accès basé sur la propriété de ressource (Resource-Based Authorization). Renvoi immédiat de HTTP 403 Forbidden (ou HTTP 404 Not Found pour éviter le balayage d'IDs).B. Obfuscation / PII Redaction dans les logs système (zéro mot de passe ou token en clair, renvoi de HTTP 401 Unauthorized). |

## 4. Grille de Validation QA (7 Points de Contrôle)

Cette grille d'audit doit être validée à 100 % par l'équipe QA/Product Manager avant d'autoriser le passage en phase d'implémentation logicielle.

```
+-----------------------------------------------------------------------------------+
|                            CHECKLIST DE VALIDATION QA                             |
+---+-------------------------------------------------------------------+---------------+
| # | Point de Contrôle                                                 | Statut (OK/KO)|
+---+-------------------------------------------------------------------+---------------+
| 1 | Identification des Règles Métier (RM)                             |     [  ]      |
|   | Chaque règle possède un ID unique (RM-XX) et une formule univoque. |               |
+---+-------------------------------------------------------------------+---------------+
| 2 | Exemples Chiffrés Déterministes & Contre-exemples                 |     [  ]      |
|   | Chaque RM possède un cas d'école chiffré et un bug type identifié.|               |
+---+-------------------------------------------------------------------+---------------+
| 3 | Découplage ID Technique / Nom d'Affichage                         |     [  ]      |
|   | Toutes les entités MDC possèdent un UUID immuable distinct du nom.|               |
+---+-------------------------------------------------------------------+---------------+
| 4 | Exhaustivité des Automates d'États (Lifecycle)                    |     [  ]      |
|   | Les statuts de chaque entité et les transitions sont explicités.  |               |
+---+-------------------------------------------------------------------+---------------+
| 5 | Couverture des 8 Catégories d'Edge Cases                          |     [  ]      |
|   | Les 8 situations limites sont documentées avec action corrective. |               |
+---+-------------------------------------------------------------------+---------------+
| 6 | Gestion des Arrondis et Isolement Monétaire                       |     [  ]      |
|   | Les règles de précision (HALF_UP, 2 décimales) sont formalisées.  |               |
+---+-------------------------------------------------------------------+---------------+
| 7 | Gestion des Dates ISO 8601 & UTC                                  |     [  ]      |
|   | Le stockage BDD et les contrats d'API sont strictement en UTC Z.  |               |
+---+-------------------------------------------------------------------+---------------+
```

### Directives d'Exécution pour le QA Tester

- Étape 1 : Créer les jeux de tests unitaires automatiques sur les règles RM-01 à RM-05 en utilisant exactement les valeurs chiffrées stipulées dans la section 1.

- Étape 2 : Injecter le contre-exemple dans la suite de tests pour vérifier que le test échoue bien en présence du bug identifié.

- Étape 3 : Exécuter la matrice des Edge Cases (section 3) lors des tests d'intégration et de recette bout-en-bout (E2E).
