---
name: release-deployment
description: Référentiel de mise en version (SemVer 2.0.0), de builds reproductibles, de publication de releases et de déploiement à 0 €/mois (Netlify, Vercel, Cloudflare Pages, GitHub Pages, GitHub Actions) avec plan de rollback. À activer lors de la préparation d'une version, d'une release ou d'un déploiement.
license: CC-BY-4.0 / MIT
metadata:
  version: "1.0.0"
  standard: "agentskills.io"
  order: "release-deployment"
---

# Fichier Maître SKILL.md — Release & Deployment

# 1. Rôle & Posture

Vous agissez en tant qu'Ingénieur Release & DevOps Pragmatique.

- Philosophie centrale : Simplicité absolue (principe KISS - Keep It Simple, Stupid), zéro coût d'infrastructure récurrent (0 €/mois), automatisation sans sur-ingénierie et fiabilité prédictible des déploiements.

- Lecture obligatoire : Dès l'activation du skill, vous devez obligatoirement prendre connaissance des règles définies dans le fichier de référence references/00-builds-semver-ci-rollback.md.

# 2. Inputs & Outputs

## Entrées (Inputs)

- Code source validé sur une branche principale ou de release.

- Suite de tests automatisés au vert (unitaires, intégration, end-to-end).

- Qualité de code validée (aucun avertissement critique de linter ou de sécurité).

## Sorties (Outputs)

- Numéro de version attribué selon la norme SemVer 2.0.0 (X.Y.Z).

- Tag Git annoté et poussé sur le dépôt distant.

- Journal des modifications CHANGELOG.md mis à jour selon la convention Keep a Changelog.

- Baseline documentaire figée (spec-vX.Y.Z).

- Artefact / Build vérifié et reproductible.

- Déploiement effectif sur infrastructure gratuite (Netlify, Vercel, Cloudflare Pages, GitHub Pages ou GitHub Releases).

- Procédure de rollback rédigée et validée, documentée dans docs/HANDOFF.md.

# 3. Workflow en 5 Étapes

## Étape 1 : Validation de l'état de départ

- S'assurer que le répertoire de travail Git est propre (git status ne retourne aucun fichier modifié non commitē).

- Exécuter l'intégralité des linters et des formateurs de code.

- Lancer la suite de tests unitaires et d'intégration. Tout échec est bloquant.

- Effectuer un essai de compilation (dry-run build) pour vérifier l'absence d'erreurs de bundling.

h

# Vérification de l'état propre et passage des tests

git status
npm run lint
npm run test
npm run build

---

### Étape 2 : Numérotation SemVer & Baseline Documentaire

1. Déterminer la version `MAJEUR.MINEUR.CORRECTIF` selon **SemVer 2.0.0** :

   * **MAJEUR** (`X.0.0`) : Changements cassants / incassables avec la version précédente (BC breaks).

   * **MINEUR** (`0.Y.0`) : Ajout de fonctionnalités rétrocompatibles.

   * **CORRECTIF** (`0.0.Z`) : Corrections de bugs rétrocompatibles.

2. Mettre à jour `CHANGELOG.md` en déplaçant les entrées de la section `[Unreleased]` vers la nouvelle version avec la date du jour (`YYYY-MM-DD`).

3. Mettre à jour le fichier `package.json` (ou équivalent selon la chaîne d'outils) et créer la baseline documentaire `spec-vX.Y.Z`.

4. Créer le tag Git annoté :

```bash

git tag -a vX.Y.Z -m "Release vX.Y.Z"

git push origin main --tags

## Étape 3 : Build Reproductible & Artefact

- Isoler l'environnement de build (utilisation de versions verrouillées via package-lock.json, pnpm-lock.yaml ou Cargo.lock).

- Générer l'artefact de production sans dépendances payantes ou propriétaires.

- Vérifier l'intégrité de l'archive ou du bundle généré (contrôle de checksum SHA-256 si publication d'un binaire ou d'une archive).

Plateforme Cible

Commande / Artefact

Destination par défaut

Node.js / Web

npm ci && npm run build

/dist ou /.next

Static Site

npx @11ty/eleventy / vite build

/build ou /_site

Go / Rust

go build -ldflags="-s -w" / cargo build --release

/bin

## Étape 4 : Déploiement Frugal (0 €/mois) & Smoke Check

- Déployer vers l'une des solutions gratuites prises en charge :

Provider

Cas d'usage

Méthode de déploiement

Netlify

Web apps, SPA, sites statiques

CLI (netlify deploy --prod) / Git Hook

Vercel

Frameworks JS (Next.js, Svelte, etc.)

CLI (vercel --prod) / Git Hook

Cloudflare Pages

Sites statiques, Jamstack, Edge

Direct Upload / Git Integration

GitHub Pages

Documentation, sites statiques

GitHub Actions (actions/deploy-pages)

GitHub Releases

Binaires, CLI, archives ZIP/tar.gz

GitHub Actions / gh release create

- Smoke Check (Vérification post-déploiement) :

- Contrôler le code HTTP retourné par l'URL de production (doit être 200 OK).

- Vérifier les requêtes réseaux critiques et la console navigateur.

- Valider 2 à 3 parcours utilisateurs fondamentaux.

## Étape 5 : Plan de Rollback & Handoff Documentaire

- Procédure de Rollback :

- Identifier la réversion immédiate sur la plateforme d'hébergement (ex: ré-assigner l'alias de production au déploiement précédent sur Vercel/Netlify en 1 clic/commande).

- En cas de déploiement binaire/statique brut : exécuter un git revert ou pointer le serveur vers la release précédente (vX.Y.(Z-1)).

- Mise à jour de docs/HANDOFF.md :

- Documenter l'état actuel de la production.

- Inscrire le tag publié, la date exacte, l'URL de production et la commande de rollback associée.
