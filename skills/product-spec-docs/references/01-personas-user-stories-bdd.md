# 01 — Personas, User Stories & Parcours Utilisateurs (BDD / Gherkin)

Statut : Référentiel Cahier des Charges & Documentation Dev V1.0 · Skill : product-spec-docs.

Ce document constitue le cadre opérationnel pour la définition de l'expérience utilisateur, l'ingénierie des exigences et la spécification exécutable du projet. Il formalise la transition des besoins métiers vers des spécifications techniques de haute précision directrices pour le développement et la recette QA.

## 1. Création de Personas Réalistes et Utiles (Cooper & NN/g)

### 1.1 Cadre Méthodologique

Conformément aux travaux d'Alan Cooper (The Inmates Are Running the Asylum) et du Nielsen Norman Group (NN/g), les personas définis ici ne sont pas des fiches marketing fictives ou démographiques. Ce sont des archétypes comportementaux directement issus de contraintes réelles d'usage, de charge cognitive, d'environnement matériel et d'objectifs opérationnels.

Afin de maintenir une sobriété conceptuelle et d'éviter la dispersion des efforts d'ingénierie, le projet se limite strict à 3 Personas maximum (1 Principal, 2 Secondaires).

### 1.2 Grille des Personas du Projet

Champ d'Analyse

Persona Principal : Thomas (Gestionnaire Opérationnel)

Persona Secondaire 1 : Élodie (Usagère Nomade)

Persona Secondaire 2 : Marc (Administrateur Sévère)

1. Provenance Terrain

Basé sur : entretiens terrain / observations Skill 0

Basé sur : entretiens terrain / observations Skill 0

Basé sur : entretiens terrain / observations Skill 0

2. Rôle & Contexte

Gestionnaire de stock et planification logistique sur site industriel.

Reprenante d'activité terrain, consultations sur le pouce.

Responsable conformité et gouvernance des données SI.

3. Job-to-be-Done (JTBD)

Traiter et valider les flux d'entrées/sorties quotidiennes sans erreur de saisie.

Consulter l'état des demandes en cours et valider les urgences à distance.

Auditer l'ensemble des transactions et gérer les accès de manière stricte.

4. Matériel & Aisance

PC bureau double écran, navigateur Chrome à jour. Aisance technique moyenne.

Smartphone sous réseau 4G instable, usage à une main. Aisance élevée.

Station de travail sécurisée, OS verrouillé, navigateur d'entreprise. Expert.

5. Frustrations & Freins

Temps d'attente lors de la saisie, formulaires complexes à rallonge.

Interfaces non-responsives, déconnexions intempestives sans sauvegarde local.

Dépassement de droits non tracé, incertitude sur l'horodatage des actions.

6. Fréquence d'Usage

Quotidienne continue (8h/jour). Réflexes guidés par l'habitude.

Occasionnelle (2-3 fois/jour par sessions de 90 secondes).

Hebdomadaire ou sur alerte ponctuelle de sécurité.

7. Critère de Réussite

Traitement du lot quotidien terminé en moins de 30 minutes sans blocage.

Validation d'un dossier effectuée en 3 clics maximum depuis le terrain.

Exportabilité intégrale des logs de traçabilité sans aucune altération.

## 2. Rédaction des User Stories (Format Mike Cohn & Critères INVEST)

Les User Stories traduisent les intentions fonctionnelles dans le formalisme défini par Mike Cohn (User Stories Applied). Chaque story doit répondre strictement au modèle standard et satisfaire l'intégralité du contrôle de qualité INVEST.

### 2.1 Modèle Canonique

En tant que [Persona / Rôle],
Je veux [action précise et observable],
Afin de [bénéfice mesurable / valeur métier créée].

### 2.2 Grille de Contrôle INVEST

- I — Indépendante : La story peut être planifiée et développée sans dépendance bloquante envers une autre story du même sprint.

- N — Négociable : Elle exprime une intention et un besoin métier, pas une solution d'implémentation technique rigide.

- V — Valorisable : Elle produit un résultat apportant une valeur directe à l'utilisateur final ou à l'organisation.

- E — Estimable : L'équipe technique dispose de suffisamment de clarté pour en évaluer la complexité et l'effort.

- S — Petite (Small) : Sa dimension permet sa réalisation au sein d'une seule itération/micro-session.

- T — Testable : Ses critères d'acceptation permettent une validation objective par Vrai/Faux.

Note : L'évaluation de l'effort est exprimée en points d'effort / story points.

### 2.3 Backlog Priorisé de Référence

```
[US-01] Validation d'urgence terrain (Priorité : Élevée / Effort : 3 points d'effort / Règle métier : [RM-01] / Lot : [LOT-01])
En tant qu'Usagère Nomade (Élodie),
Je veux valider une demande critique depuis mon interface mobile en un clic,
Afin d'éviter le blocage de la chaîne logistique lors de mes déplacements.
[US-02] Saisie groupée d'inventaire (Priorité : Élevée / Effort : 5 points d'effort / Règle métier : [RM-02] / Lot : [LOT-01])
En tant que Gestionnaire Opérationnel (Thomas),
Je veux importer un lot d'articles via un formulaire pré-rempli,
Afin de réduire le temps de saisie quotidienne de moitié.
[US-03] Audit d'accès aux données (Priorité : Moyenne / Effort : 2 points d'effort / Règle métier : [RM-03] / Lot : [LOT-02])
En tant qu'Administrateur (Marc),
Je veux exporter l'historique complet des modifications au format CSV,
Afin de répondre aux exigences de conformité réglementaire lors des audits.
```

## 3. Spécifications Exécutables en BDD / Gherkin (Dan North)

Le Behavior-Driven Development (BDD) élimine toute ambiguïté d'interprétation en convertissant les exigences métier en contrats de test exécutables. Chaque User Story est accompagnée d'au moins 3 scénarios obligatoires : Nominal, Alternatif et Erreur/Protection.

### 3.1 Spécification [US-01] — Validation d'Urgence Terrain

```
# language: fr
Fonctionnalité: Validation d'une demande d'urgence sur mobile
  En tant qu'Usagère Nomade
  Je veux valider rapidement une demande en attente
  Afin de débloquer l'opération terrain sans délai
  Contexte:
    Étant donné que l'utilisatrice "Élodie" est connectée sur l'application mobile
    Et qu'une demande d'urgence id "REQ-890" est en attente d'approbation
  Scénario: Validation nominale d'une demande prioritaire
    Étant donné que la demande "REQ-890" a le statut "En Attente"
    Quand l'utilisatrice appuie sur le bouton "Approuver"
    Et qu'elle confirme la décision dans la modale
    Alors le statut de la demande "REQ-890" passe à "Approuvée"
    Et un horodatage précis est enregistré dans l'historique de la demande
    Et une notification de succès "Demande REQ-890 validée" s'affiche
  Scénario: Validation avec saisie d'un commentaire optionnel
    Étant donné que la demande "REQ-890" a le statut "En Attente"
    Quand l'utilisatrice saisit "Validation sous réserve de réception du bon" dans le champ remarque
    Et qu'elle appuie sur le bouton "Approuver"
    Alors le statut de la demande "REQ-890" passe à "Approuvée"
    Et la remarque "Validation sous réserve de réception du bon" est attachée au dossier
  Scénario: Échec de validation en raison d'une perte de connexion
    Étant donné que le terminal mobile d'Élodie perd la connexion réseau
    Quand l'utilisatrice appuie sur le bouton "Approuver"
    Alors l'action est suspendue et conservée dans la file d'attente locale
    Et un message d'avertissement "Connexion interrompue - Action mise en attente de synchronisation" s'affiche
    Et le statut distant de la demande reste "En Attente"
```

### 3.2 Spécification [US-02] — Saisie Groupée d'Inventaire

n

# language: fr

Fonctionnalité: Saisie et importation groupée d'articles
En tant que Gestionnaire Opérationnel
Je veux intégrer une liste d'articles d'un seul coup
Afin de ne pas effectuer de saisie unitaire répétitive

Contexte:
Étant donné que le gestionnaire "Thomas" est sur la page d'inventaire
Et que le formulaire d'importation est ouvert

Scénario: Importation réussie d'un fichier conforme
Étant donné un fichier CSV "inventaire_conforme.csv" contenant 50 lignes valide
Quand "Thomas" télécharge le fichier "inventaire_conforme.csv"
Et qu'il clique sur "Lancer l'importation"
Alors 50 nouveaux articles sont ajoutés à la base d'inventaire
Et le système affiche un récapitulatif "50 articles importés avec succès"

Scénario: Importation partielle avec lignes ignorées
Étant donné un fichier CSV "inventaire_partiel.csv" contenant 40 lignes valides et 2 lignes invalides
Quand "Thomas" télécharge le fichier "inventaire_partiel.csv"
Et qu'il clique sur "Lancer l'importation"
Alors 40 articles sont intégrés en base
Et les lignes 12 et 28 sont rejetées
Et le système affiche "40 articles importés. 2 erreurs détectées" avec le détail des lignes rejetées

Scénario: Rejet global pour format de fichier invalide
Étant donné un fichier au format non supporté "inventaire.pdf"
Quand "Thomas" tente de charger le fichier "inventaire.pdf"
Alors le bouton "Lancer l'importation" demeure inactif
Et une alerte de validation "Format de fichier non accepté. Veuillez utiliser un fichier .CSV ou .XLSX" apparaît

### 3.3 Spécification [US-03] — Audit d'Accès aux Données

# language: fr

Fonctionnalité: Export de l'historique d'audit des accès aux données

  En tant qu'Administrateur

  Je veux exporter les logs d'audit

  Afin de garantir la conformité réglementaire du système

  Contexte:

    Étant donné que le système enregistre l'ensemble des transactions et modifications

  Scénario: Export CSV complet de l'historique d'audit

    Étant donné que l'utilisateur "Marc" est connecté avec le rôle "Administrateur"

    Et qu'il se trouve sur la page de gouvernance et conformité

    Quand il clique sur le bouton "Exporter l'historique complet (CSV)"

    Alors le système génère un fichier CSV contenant l'intégralité des événements d'audit

    Et le téléchargement du fichier "audit_logs_complet.csv" démarre automatiquement

    Et l'action d'export est elle-même consignée dans le registre d'audit

  Scénario: Export filtré de l'historique sur une plage de dates

    Étant donné que l'utilisateur "Marc" est connecté avec le rôle "Administrateur"

    Et qu'il saisit la date de début "2025-01-01" et la date de fin "2025-01-31" dans les filtres

    Quand il clique sur le bouton "Exporter la sélection (CSV)"

    Alors le système génère un fichier CSV incluant uniquement les événements compris entre le "2025-01-01" et le "2025-01-31"

    Et le fichier téléchargé contient exactement le nombre d'enregistrements correspondant à la période

  Scénario: Refus d'accès à l'export d'audit pour un utilisateur non administrateur

    Étant donné que l'utilisatrice "Élodie" est connectée avec le rôle "Usagère Nomade"

    Quand elle tente d'accéder directement à l'URL d'export de l'audit "/api/v1/audit/export"

    Alors le système refuse la requête et renvoie un code d'erreur HTTP 403 Forbidden

    Et un message d'erreur "Accès refusé : privilèges d'administrateur requis" s'affiche

    Et une alerte de sécurité est enregistrée pour tentative d'accès non autorisé

---

## 4. Cartographie des Parcours Utilisateurs (User Flows)

Les parcours décrivent la séquence logique des interactions à travers le système. Ils exposent les points d'entrée, les nœuds de décision, ainsi que la gestion des dégradations ou interruptions.

### 4.1 Parcours Critical-Path : Validation d'Urgence Terrain (Nomade)

[Étape 01 : Point d'Entrée]
│  Utilisateur reçoit notification Push "Demande Urgent REQ-890"
▼
[Étape 02 : Consultation]
│  Ouverture de l'écran de détail du dossier
▼
[Décision 01 : État du réseau disponible ?]
├── NON ──► [Branchement Hor-Ligne]
│              │ Sauvegarde de la consultation en cache local
│              ▼
│           [Résultat] Affichage en mode dégradé (Lecture seule)
│
└── OUI ──► [Étape 03 : Choix d'action]
│ Sélection de l'action : [Approuver] ou [Rejeter]
▼
[Décision 02 : Motification obligatoire en cas de rejet ?]
├── REJET ──► Saisie obligatoire du motif ──► [Soumission]
│                                                   │
└── APPROBATION ──► Validation directe ─────────────┤
▼
[Étape 04 : Exécution API]
│
[Décision 03 : Succès serveur ?]
├── OUI ──► [Résultat Final] Confirmation visuelle + MàJ Statut
└── NON ──► [Point de Reprise] Message d'erreur + Option Nouvel Essai

### 4.2 Parcours Secondaire : Traitement et Correction d'Importation

[Étape 01 : Sélection Fichier] ──► [Étape 02 : Saisie / Upload] ──► [Étape 03 : Analyse Formelle]
│
[Décision 01 : Fichier conforme ?]
├── NON ──► Block-User + Message explicatif
└── OUI ──► [Étape 04 : Traitement des données]
│
[Décision 02 : Erreurs de lignes ?]
├── AUCUNE ──► Validation 100% ──► [Fin Succès]
└── ERREURS ─► Génération du rapport d'anomalie
│
▼
[Étape 05 : Interface de correction]
│
[Point de sortie : Annulation ou Re-try]

---

## 5. Grille de Validation QA (7 Points de Contrôle)

Cette checklist doit être validée formellement par le Responsable QA et le Product Owner avant tout passage en phase de développement.

```document

{

  "title": "Grille de Validation QA",

  "styles": {

    "DocumentHeadingsStyle": {

      "NORMAL_TEXT": { "WEIGHTED_FONT_FAMILY": "Inter", "FONT_SIZE": 10, "BOLD": false, "ITALIC": false, "FOREGROUND_COLOR": "#334155", "LINE_SPACING": 1.2, "SPACE_ABOVE": 0, "SPACE_BELOW": 4 }

    },

    "TableStyle": {

      "CELL_FORMAT_WHOLE_TABLE": {

        "CELL_GROUP": {

          "BORDER_TOP": { "WIDTH": 1, "COLOR": "#E2E8F0" },

          "BORDER_BOTTOM": { "WIDTH": 1, "COLOR": "#E2E8F0" },

          "BORDER_LEFT": { "WIDTH": 0, "COLOR": "#FFFFFF" },

          "BORDER_RIGHT": { "WIDTH": 0, "COLOR": "#FFFFFF" },

          "BORDER_INNER_HORIZONTAL": { "WIDTH": 1, "COLOR": "#F1F5F9" },

          "BORDER_INNER_VERTICAL": { "WIDTH": 0, "COLOR": "#FFFFFF" },

          "BACKGROUND_COLOR": "#FFFFFF",

          "PADDING_TOP": 6,

          "PADDING_BOTTOM": 6,

          "PADDING_LEFT": 8,

          "PADDING_RIGHT": 8,

          "VERTICAL_ALIGN": "CENTER"

        }

      },

      "CELL_FORMAT_FIRST_ROW": {

        "CELL_GROUP": {

          "BACKGROUND_COLOR": "#F8FAFC",

          "VERTICAL_ALIGN": "CENTER"

        },

        "TEXT_STYLE": {

          "WEIGHTED_FONT_FAMILY": "Inter",

          "FONT_SIZE": 9.5,

          "BOLD": true,

          "ITALIC": false,

          "FOREGROUND_COLOR": "#1E293B"

        }

      }

    }

  }

}

N°

Critère de Contrôle

Description & Exigence de Conformité

Statut Validé

01

Ancrage Personas

Tous les personas reposent sur des contraintes réelles (matériel, contexte, frustrations) et excluent les détails marketing superflus.

02

Respect INVEST

Chaque User Story est indépendante, estimable, testable et apporte une valeur métier explicite.

03

Exhaustivité BDD

Chaque User Story comporte au minimum 3 scénarios Gherkin (Nominal, Alternatif, Erreur).

04

Invariance Gherkin

Les termes Étant donné, Quand, Alors expriment des comportements observables, sans mentionner l'implémentation code.

05

Complétude des Flows

Les parcours utilisateur couvrent le cas nominal ainsi que les points de déconnexion, d'erreur et de reprise d'état.

06

Traçabilité Exigences

Chaque scénario BDD s'attache directement à un identifiant unique de User Story ([US-XX]).

07

Non-Ambiguïté QA

Aucune formule vague (ex: "l'interface doit être rapide", "traiter correctement") n'est présente sans seuil chiffré.
