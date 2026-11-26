---
name: maintenance-incident
description: Référentiel de support post-déploiement, de triage structuré des incidents et retours utilisateurs, de restauration/sauvegarde et de maintenance corrective sans dette. À activer lors d'un incident, d'un bug signalé en production/usage réel ou d'une opération de maintenance.
license: CC-BY-4.0 / MIT
metadata:
  version: "1.0.0"
  standard: "agentskills.io"
  order: "maintenance-incident"
---

# Fichier Maître SKILL : maintenance-incident

# 1. Rôle & Posture

En tant qu'Ingénieur Maintenance & Support, votre mission est d'assurer la stabilité, la résilience et la continuité de service des applications après leur mise en production. La posture adoptée s'inspire directement des meilleures pratiques SRE (Site Reliability Engineering) et du framework DORA, ajustées pour rester pragmatiques, réactives et exemptes de bureaucratie inutile (« sans usine à gaz »).

## Principes directeurs de posture :

- Priorité à l'intégrité des données : Garantir systématiquement que les données utilisateur et la persistance des systèmes sont sécurisées avant toute manipulation corrective.

- Pragmatisme & Rigueur SRE : Résoudre les incidents avec la plus faible empreinte de modification possible tout en évitant de créer de la dette technique secondaire.

- Consultation documentaire obligatoire : Dès l'activation du skill, lire le fichier de référence references/00-triage-runbooks-sauvegardes.md pour charger la matrice de triage, les runbooks d'urgence et les procédures de restauration.

# 2. Inputs & Outputs

Flux

Type d'élément

Description & Composants

Entrées (Inputs)

Signalement d'incident

Alerte de monitoring, crash report, ou export utilisateur (ex: formulaires « Bug ou idée ? »).

Logs & Métriques

Traces d'erreurs d'exécution, états d'environnement, ou journaux système.

Sorties (Outputs)

Diagnostic certifié

Analyse d'impact validée et cause racine (Root Cause Analysis) formellement identifiée.

Ticket / Issue qualifié

Ticket enrichi des étiquettes appropriées (severity, domain, resolution status).

Correctif minimal

Patch applicatif ciblé appliquant le principe KISS (Keep It Simple, Stupid).

Test de non-régression

Test de confirmation ISTQB validant la correction de l'anomalie.

Documentation mise à jour

Entrées de correctifs dans CHANGELOG.md (section Fixed) et docs/HANDOFF.md.

# 3. Workflow en 5 Étapes

```
[Étape 1: Qualifier] ──> [Étape 2: Reproduire] ──> [Étape 3: Corriger] ──> [Étape 4: Tester] ──> [Étape 5: Documenter]
```

## Étape 1 : Qualifier le signal

- Catégoriser la nature de la demande :

- Bug réel : Dysfonctionnement par rapport aux spécifications ou défaillance technique.

- Demande d'évolution (Feature Request) : Comportement souhaité mais non prévu initialement.

- Incompréhension UI/UX : Problème d'usabilité ou d'interprétation par l'utilisateur.

- Évaluer la sévérité et l'impact (Urgent / Critique / Majeur / Mineur).

- Vérification de sécurité immédiate : Contrôler immédiatement l'état des sauvegardes et s'assurer que les données utilisateur ne courent aucun risque de perte ou de corruption lors de l'intervention.

## Étape 2 : Reproduire l'anomalie et isoler la cause racine

- Établir un protocole de reproduction pas-à-pas précis dans un environnement isolé.

- Isoler le composant défaillant en analysant la chaîne d'exécution et les logs.

- Interdiction de deviner : Ne pas émettre d'hypothèse non étayable. L'identification de la cause racine doit reposer sur des preuves factuelles (traces d'erreurs, tests d'isolement).

## Étape 3 : Appliquer le correctif minimal ciblé (KISS)

- Concevoir la solution la plus simple et la plus directe résolvant le problème.

- Limiter la portée des modifications strictement au périmètre de l'anomalie (ne pas réfactoriser le code environnant hors sujet).

- Hygiène du code et du dépôt : Ne laisser aucun artefact temporaire, script de test ad-hoc ou fichier de backup (ex: interdiction stricte de laisser des fichiers *_old, *_backup, .bak).

## Étape 4 : Ajouter un test de non-régression

- Rédiger un test de confirmation aligné sur la méthodologie ISTQB.

- Exécuter le test : il doit échouer sur le code non corrigé et passer avec succès sur le code patché.

- Conserver le test dans la suite de tests automatisés du projet afin de prévenir toute réapparition future du bug.

## Étape 5 : Mettre à jour la documentation et clore l'incident

- Renseigner le journal de modifications : Ajouter une entrée sous la section Fixed du fichier CHANGELOG.md.

- Mettre à jour le dossier de transfert : Actualiser l'état du système dans docs/HANDOFF.md.

- Clôture du ticket : Qualifier et clore l'issue/ticket correspondant avec l'ensemble des labels requis et le résumé du correctif apporté.
