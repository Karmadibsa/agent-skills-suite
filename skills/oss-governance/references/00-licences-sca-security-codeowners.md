# 00 — Licences SPDX, Audit des Dépendances (SCA), SECURITY.md & CODEOWNERS

Statut : Référentiel Gouvernance Open Source V1.0 · Standards : SPDX, OpenSSF Best Practices, NIST SSDF

Ce document définit les exigences minimales et les bonnes pratiques opérationnelles de gouvernance Open Source pour le skill oss-governance. Il s'adresse aux équipes de développement et aux auditeurs de sécurité souhaitant garantir la conformité juridique, la robustesse de la chaîne d'approvisionnement logicielle et la gestion responsable des vulnérabilités.

## 1. Licences & Compatibilité des Dépendances (SPDX) [N1 / N3]

L'identification précise et l'analyse de compatibilité des licences logicielles constituent le premier palier de conformité juridique de tout projet Open Source.

### Standardisation avec les identifiants SPDX

- Normalisation des en-têtes et métadonnées : Chaque fichier source ou manifeste de projet doit référencer sa licence via un identifiant canonique du registre SPDX (Software Package Data Exchange).

- Format des en-têtes de fichier :

```
// SPDX-License-Identifier: MIT
// Copyright (c) 2024 Enterprise OSS Team
```

- Exemples courants d'identifiants SPDX :

- Permissives : MIT, Apache-2.0, BSD-3-Clause

- Copyleft faible : MPL-2.0, LGPL-3.0-only

- Copyleft fort : GPL-3.0-only, AGPL-3.0-only

- Documentation & Contenu : CC-BY-4.0, CC0-1.0

### Matrice de compatibilité et risques des licences

L'intégration de bibliothèques tierces requiert une vérification stricte de compatibilité selon le mode de distribution du projet.

| Licence du projet principal | Licence de la dépendance | Niveau de risque | Recommandation opérationnelle |
| --- | --- | --- | --- |
| MIT / Apache-2.0 | MIT / Apache-2.0 / BSD-3-Clause | Faible | Conformité directe. Conserver les avis de copyright. |
| MIT / Apache-2.0 | LGPL-3.0-only | Moyen | Autorisée uniquement en liaison dynamique (dynamic linking). Aucun changement direct dans la bibliothèque tierce. |
| MIT / Apache-2.0 | GPL-3.0-only | Élevé | Incompatibilité de distribution. Le projet principal bascule sous GPL ou la dépendance doit être retirée. |
| Tout type (SaaS / Web) | AGPL-3.0-only | Critique | Risque de contamination du code source en cas d'exposition via un service réseau. Soumettre à validation juridique formelle. |

### Procédure de validation

- Générer une nomenclature des composants logiciels (SBOM) au format SPDX ou CycloneDX lors du build.

- Interdire l'usage de dépendances sans licence explicite ou portant la mention UNLICENSED / UNKNOWN.

## 2. Audit des Dépendances & Vulnérabilités (SCA) [N3]

La sécurité de la chaîne d'approvisionnement (Software Supply Chain Security) repose sur l'immutabilité des builds et le suivi continu des vulnérabilités (Software Composition Analysis).

### Gestion rigoureuse des fichiers de verrouillage (Lockfiles)

- Obligation d'immutabilité : Les fichiers de verrouillage de version (package-lock.json, Cargo.lock, uv.lock, yarn.lock, poetry.lock) doivent impérativement être versionnés dans le dépôt Git.

- Reproductibilité des builds : Les pipelines de CI/CD doivent exécuter l'installation en mode strict (ex. npm ci, cargo check --locked, uv sync --locked) pour garantir qu'aucune mise à jour implicite n'ait lieu sur le serveur de build.

### Intégration de l'audit automatique en CI/CD

L'analyse SCA doit être automatisée et bloquante en cas de vulnérabilités critiques non atténuées.

```
# Node.js
npm audit --audit-level=high
# Rust
cargo audit
# Python (uv / pip)
uv run pip-audit --strict
```

### Stratégie de remédiation

- Automated Dependency Updates : Configurer Dependabot, Renovate ou un outil équivalent pour générer des Pull Requests automatiques dès la parution d'un patch de sécurité.

- Seuils de sévérité :

- Critical / High (CVSS >= 7.0) : Correction sous 48 heures ou application d'une mesure d'atténuation temporaire démontrable.

- Medium / Low (CVSS < 7.0) : Correction planifiée dans le cycle de sprint standard.

- Dépendances abandonnées : Tout composant n'ayant reçu aucune mise à jour depuis plus de 18 mois ou déclaré non maintenu (unmaintained) doit faire l'objet d'un plan d'évaluation pour remplacement.

## 3. Fichiers Essentiels de Gouvernance GitHub (SECURITY.md & CODEOWNERS) [N4]

Les fichiers institutionnels déposés à la racine du projet ou dans le dossier .github/ régissent les interactions humaines et les responsabilités sur le dépôt.

### SECURITY.md : Politique de divulgation responsable

Ce fichier fournit un canal confidentiel permettant aux chercheurs en sécurité de remonter des vulnérabilités sans exposer l'ensemble des utilisateurs du projet.

Exemple de structure standard pour SECURITY.md :

```
# Politique de Sécurité
## Versions prises en charge
Seules les versions listées ci-dessous reçoivent actuellement des correctifs de sécurité.
| Version | Prise en charge |
| :--- | :--- |
| 2.x.x | Yes |
| 1.x.x | No |
## Signalement d'une vulnérabilité
Ne créez **pas** d'issue publique pour une vulnérabilité de sécurité.
Pour signaler une faille :
1. Envoyez un courrier électronique à `security@example.com` ou utilisez notre formulaire privé sur <span type="placeholder" placeholder-type="person"></span>.
2. Incluez une description détaillée de la vulnérabilité, des étapes de reproduction et un PoC si disponible.
### Délais de réponse
* **Accusé de réception** : Sous 24 heures ouvrées.
* **Évaluation initiale** : Sous 72 heures.
* **Publication du correctif** : En fonction de la sévérité (objectif < 14 jours pour les failles critiques).
```

### CODEOWNERS : Cartographie des responsabilités

Le fichier .github/CODEOWNERS force l'assignation automatique de revues de code obligatoires sur les modifications apportées aux sections critiques de l'application.

Exemple d'implémentation opérationnelle :t

# Règle par défaut pour l'ensemble du dépôt

- @org/core-maintainers

# Sécurité & Infrastructures d'authentification

/src/auth/                  @org/security-team
/src/crypto/                @org/security-team
SECURITY.md                 @org/security-team

# CI/CD & Déploiement

/.github/workflows/         @org/devops-team
Dockerfile                  @org/devops-team

# Fichiers de dépendances et verrouillage

package-lock.json           @org/lead-devs
Cargo.lock                  @org/lead-devs
uv.lock                     @org/lead-devs

# Documentation officielle

/docs/                      @org/tech-writers

## 4. Grille de Validation QA Gouvernance OSS (6 points de contrôle)

Cette grille d'évaluation constitue la checklist de recette minimale requise pour valider le statut de conformité d'un dépôt du skill `oss-governance`.

| N° | Point de contrôle | Description & Critère de succès | Méthode de vérification | Statut |

| :---: | :--- | :--- | :--- | :---: |

| **01** | Présence de la Licence | Prescriptions légales : Présence d'un fichier `LICENSE` ou `LICENSE.md` valide à la racine du dépôt. | Verification de l'arborescence racine. | `[ ] PASS` |

| **02** | Identifiants SPDX | En-têtes conformes : Présence des tags `SPDX-License-Identifier` dans le fichier `README.md` et les fichiers sources majeurs. | Audit statique ou outil `reuse lint`. | `[ ] PASS` |

| **03** | Compatibilité des Dépendances | Absence d'incompatibilité de licence entre le projet et ses dépendances directes/transitives (pas de contamination non souhaitée). | Rapport SBOM / analyseur de licence. | `[ ] PASS` |

| **04** | Intégrité des Lockfiles | Immutabilité des builds : Presence et synchronisation des fichiers de verrouillage (`package-lock.json`, `Cargo.lock`, `uv.lock`). | `git status` après exécution de l'outil de build. | `[ ] PASS` |

| **05** | Audit SCA sans Faille Critique | Sécurité des dépendances : Exécution des outils d'audit (`npm audit`, `cargo audit`, `pip-audit`) sans aucune vulnérabilité Critical/High non traitée. | Rapport d'exécution CI/CD. | `[ ] PASS` |

| **06** | Fichiers de Gouvernance GitHub | Gouvernance opérationnelle : Présence de `SECURITY.md` (avec canal privé explicite) et `.github/CODEOWNERS` valide. | Contrôle de présence et syntaxe des fichiers. | `[ ] PASS` |
