# 00 — Builds Reproductibles, SemVer, CI Gratuite (0 €) & Rollback

Statut : Référentiel Release & Déploiement V1.0 · Standards : SemVer 2.0.0, Keep a Changelog, NIST SSDF (Build).

## 1. Builds Reproductibles & Budget 0 €/mois [N4]

L'objectif principal est de garantir un processus de build rigoureusement déterministe, garantissant qu'un commit donné produise exactement le même artefact, indépendamment de l'environnement d'exécution ou du moment de compilation, tout en maintenant les coûts d'infrastructure de livraison à zéro.

### Fichiers de verrouillage et commandes déterministes

Pour éviter la dérive des dépendances transitive lors de l'installation, tout projet doit intégrer un fichier de verrouillage à son gestionnaire de paquets et employer exclusivement les commandes d'installation déterministes.

- Écosystème Node.js / JavaScript :

- Fichier de verrouillage : package-lock.json ou pnpm-lock.yaml.

- Commande d'installation CI : npm ci ou pnpm install --frozen-lockfile.

- Interdiction : Ne jamais exécuter npm install en pipeline de CI/CD.

- Écosystème Rust :

- Fichier de verrouillage : Cargo.lock.

- Commande de compilation CI : cargo build --locked ou cargo test --locked.

- Écosystème Python :

- Fichier de verrouillage : uv.lock ou poetry.lock.

- Commande d'installation CI : uv sync --locked ou poetry install --frozen-lockfile.

### Hébergement Edge & CI Frugale (0 €/mois)

Le déploiement des applications web statiques et Serverless doit s'appuyer sur les offres gratuites des hébergeurs Edge modernes, couplées à l'allocation gratuite de temps de calcul CI/CD pour les projets open-source et de petite taille.

- Plateformes d'hébergement statique / Edge :

- Netlify : Déploiements illimités via Git, rollbacks instantanés.

- Vercel : Optimisé pour les frameworks React/Next.js, environnements de prévisualisation automatiques.

- Cloudflare Pages : Bande passante illimitée, intégration native avec Workers.

- GitHub Pages : Hébergement direct depuis les dépôts GitHub pour la documentation et les applications statiques.

- Gestion des quotas CI/CD :

- Optimiser l'usage des GitHub Actions en utilisant la mise en cache des dépendances (actions/cache).

- Filtrer les déclenchements de workflow (paths-ignore pour les fichiers de documentation .md).

### Sécurisation des Actions GitHub CI

Conformément aux recommandations NIST SSDF (Software Supply Chain Security), la dépendance aux workflows tiers doit être strictement contrôlée pour parer aux attaques de la chaîne d'approvisionnement.

- Verrouillage par version majeure ou SHA :

- Préférer l'utilisation du SHA complet du commit pour une sécurité maximale : actions/checkout@a5ac7e51b41094c92402da3b243769ce517a27ce # v4.1.6.

- À défaut, fixer la version majeure : actions/checkout@v4.

- Interdiction : Ne jamais cibler une branche flottante comme @main ou @master.

## 2. Versioning SemVer 2.0.0 & Notes de Version [N4]

Le respect strict de la spécification Semantic Versioning 2.0.0 (X.Y.Z) est obligatoire pour toute communication technique et gestion de la compatibilité des API.

### Structure d'un numéro de version

Format : MAJEUR.MINEUR.CORRECTIF (ex. 2.4.1)

- MAJEUR (X) : Incrémenté lors d'un changement incompatible avec les versions précédentes (Breaking Change). Toute modification de signature d'API public, suppression de route ou changement de comportement bloquant nécessite une montée de version majeure.

- MINEUR (Y) : Incrémenté lors de l'ajout d'une nouvelle fonctionnalité apportée de manière rétrocompatible.

- CORRECTIF (Z) : Incrémenté lors d'une correction de bug rétrocompatible.

### Gestion du fichier CHANGELOG.md & Tagging Git

Le journal des modifications doit respecter le format Keep a Changelog.

- Section [Unreleased] : Toutes les modifications introduites au fil des Pull Requests sont documentées sous l'en-tête ## [Unreleased] en haut du fichier CHANGELOG.md.

- Processus de Release :

- Renommer l'en-tête [Unreleased] avec le numéro de version et la date du jour : ## [1.2.0] - 2024-10-24.

- Recréer un en-tête ## [Unreleased] vide au-dessus pour les développements futurs.

- Poser un tag Git annoté correspondant exactement au numéro de version : git tag -a v1.2.0 -m "Release v1.2.0".

- Pousser le tag vers le dépôt distant : git push origin v1.2.0.

## 3. Smoke Check Post-Déploiement & Plan de Rollback [N4]

Chaque livraison en environnement de production doit immédiatement être suivie d'une phase d'audit à chaud (Smoke Check) et s'appuyer sur une stratégie de retour en arrière prévisibles.

### Smoke Check Post-Déploiement

Le Smoke Check consiste à exécuter un jeu de vérifications rapides sur l'environnement de production immédiatement après l'exécution du pipeline de déploiement.

- Chargement global : Vérifier que l'application répond avec un code statut HTTP 200 OK et qu'aucune erreur critique n'est levée dans la console du navigateur (Console Errors).

- Parcours critiques :

- Authentification / Session (accès au tableau de bord).

- Navigation sur les routes primaires.

- Validation des formulaires clés et export de données.

- Intégrité des appels API d'arrière-plan (réponses réseau sans erreur 5xx).

### Plan de Rollback

En cas d'échec du Smoke Check ou d'anomalie critique détectée post-livraison, l'équipe doit appliquer immédiatement l'une des deux stratégies de rollback suivantes :

- Rollback d'Infrastructure (Hébergement Edge / PaaS) :

- Sur Netlify / Vercel / Cloudflare Pages : Activer le ré-aiguillage du trafic vers le déploiement précédent (Previous Deployment) via l'interface ou la CLI en 1 clic. Temps d'exécution : < 30 secondes.

- Rollback Git (Dépôt / Code Source) :

- Si l'infrastructure ne supporte pas le rollback instantané ou si des migrations légères sont impliquées, annuler les commits de la release via un commit d'annulation : git revert HEAD.

- Redéployer immédiatement via le pipeline CI/CD standard.

## 4. Grille de Validation QA de Release

La grille ci-dessous récapitule les 6 points de contrôle obligatoires à valider avant de considérer une version comme officiellement publiée et stable.

| ID | Point de contrôle | Description & Critère de succès |
| --- | --- | --- |
| CK-01 | Build & Tests CI | L'ensemble de la suite de tests automatisés (unitaires, intégration) passe au vert (npm test, cargo test) sur le commit cible de release. |
| CK-02 | Lockfile & Déterministe | Les dépendances sont scellées via un fichier de verrouillage à jour (package-lock.json, etc.) et la commande de build CI utilise le mode strict. |
| CK-03 | Conformité SemVer | Le numéro de version choisi (X.Y.Z) reflète exactement l'impact des changements (Breaking, Minor, Patch). |
| CK-04 | Changelog Mises à jour | Le fichier CHANGELOG.md a été mis à jour : les entrées de [Unreleased] ont été transférées sous la version [X.Y.Z] - AAAA-MM-JJ. |
| CK-05 | Tagging Repository | Un tag Git annoté au format vX.Y.Z a été créé et poussé sur le dépôt distant (git push origin vX.Y.Z). |
| CK-06 | Smoke Check & Rollback Ready | Les parcours critiques post-déploiement sont validés en production, et le mécanisme de rollback instantané est opérationnel en cas d'alerte. |
