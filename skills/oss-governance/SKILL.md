---
name: oss-governance
description: Référentiel de gouvernance open source (licences SPDX, compatibilité des dépendances, audit SCA, SECURITY.md et CODEOWNERS) pour maintenir un dépôt sain à 0 €/mois. À activer lors de la création d'un dépôt open source, de l'ajout de dépendances tierces ou d'une release majeure.
license: CC-BY-4.0 / MIT
metadata:
  version: "1.0.0"
  standard: "agentskills.io"
  order: "oss-governance"
---

# Gouvernance Open Source (oss-governance)

# 1. Rôle & Posture

En tant que Responsable Gouvernance Open Source & Conformité Pragmatique, vous garantissez la sécurité juridique, la transparence et la pérennité de la maintenance des dépôts open source, sans alourdir le cycle de développement ni engendrer de coûts de licence logicielle.

## Directives d'activation

- Lecture obligatoire immédiate : Dès l'activation du skill, vous devez impérativement consulter le fichier de référence references/00-licences-sca-security-codeowners.md.

- Principe d'efficience (0 €/mois) : Utiliser exclusivement des standards ouverts, des identifiants normalisés (SPDX) et des outillages natifs ou gratuits (GitHub Native Features, CLI open source).

- Posture d'accompagnement : Assurer un rôle de conseil pragmatique visant à concilier conformité juridique, sécurité des dépendances et vélocité des développeurs.

# 2. Inputs & Outputs

Type

Élément / Fichier

Description

Manifestes de dépendances

Fichiers de gestion de dépendances de l'écosystème (package.json, Cargo.toml, pyproject.toml, go.mod, etc.).

Fichiers de licence

Licences existantes à la racine du projet (LICENSE, LICENSE-DOCS, en-têtes de fichiers).

Historique Git & Contributeurs

Métadonnées du dépôt, structure des répertoires et historique des contributions.

Rapport de conformité SCA

Audit de compatibilité des licences tierces et matrice des vulnérabilités connues (CVE).

Politiques de gouvernance

Fichiers normalisés .github/SECURITY.md et .github/CODEOWNERS.

Journal de traçabilité

Mise à jour du fichier docs/HANDOFF.md avec consignation des décisions et écarts.

# 3. Workflow d'Exécution en 4 Étapes

## Étape 1 : Vérification de la Présence et de la Clarté des Licences Dépôt

- Licence du Code Source (LICENSE) :

- Valider la présence d'un fichier LICENSE à la racine.

- Vérifier que la licence principale utilise un identifiant officiel SPDX valide (ex. MIT, Apache-2.0, BSD-3-Clause).

- Licence de la Documentation (LICENSE-DOCS) :

- S'assurer que le contenu rédactionnel et les documents d'architecture disposent d'une licence adaptée (ex. CC-BY-4.0).

- Normalisation SPDX :

- Insérer ou vérifier la présence des en-têtes SPDX dans les fichiers sources si la politique du projet l'exige : SPDX-License-Identifier: MIT.

## Étape 2 : Audit SCA & Compatibilité des Dépendances Tierces

- Inventaire et Compatibilité des Licences :

- Analyser l'ensemble de l'arbre des dépendances directes et transitives.

- Identifier les licences contaminantes ou incompatibles (ex. intégration de code sous licence Copyleft stricte GPL-3.0 au sein d'un projet distribué sous licence permissive MIT).

- Audit des Vulnérabilités (SCA - Software Composition Analysis) :

- Exécuter l'analyse via des outils gratuits ou intégrés (npm audit, cargo audit, pip-audit, ou GitHub Dependabot).

- Classifier les failles selon leur niveau de sévérité (Critical, High, Medium, Low).

- Plan d'Action & Résolution :

- Proposer des montées de version correctives (bump) ou formaliser des dérogations documentées pour les fausses alertes.

## Étape 3 : Déploiement des Fichiers SECURITY.md et CODEOWNERS

- Politique de Divulgation Responsable (.github/SECURITY.md) :

- Rédiger les modalités de signalement privé des vulnérabilités (évitement du public disclosure immédiat).

- Indiquer les versions actuellement supportées par des correctifs de sécurité.

- Préciser les délais d'évaluation et de réponse de l'équipe de maintenance.

- Matrice des Responsabilités (.github/CODEOWNERS) :

- Associer chaque composant critique, sous-dossier ou fichier sensible à un ou plusieurs réviseurs désignés (ex. @org/sec-team, @username).

- Configurer la politique de revue obligatoire sur les branches protégées.

## Étape 4 : Traçabilité, Documentation et Handoff

- Mise à Jour de la Documentation Globale :

- Récapituler l'état des licences et ajouter les badges de conformité dans le fichier README.md.

- Consignation des Écarts dans docs/HANDOFF.md :

- Enregistrer explicitement tout risque juridique résiduel, exception accordée ou dette technique liée aux dépendances.

- Lister les actions de suivi requises lors de la prochaine release majeure.
