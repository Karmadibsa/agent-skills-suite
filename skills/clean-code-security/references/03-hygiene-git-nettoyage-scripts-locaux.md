# 03 — Hygiène Git, Nettoyage des Fichiers Morts & Scripts de Lancement Local (Version 2.0)

Statut : Référentiel Code Propre, Sécurité & Git V2.0 · Skill : clean-code-security.

## 1. Zéro Fichier Mort & Nettoyage Systématique du Dépôt [N4]

### Le problème courant des IA

Lorsqu'une IA refond un module, elle a tendance à renommer l'ancien fichier en app_old.js, component_backup.tsx, style_v2.css ou à laisser 200 lignes de code commenté « au cas où ». En quelques semaines, le dépôt devient illisible, la dette technique explose et les agents d'exécution ultérieurs finissent par lire, modifier ou importer les mauvais fichiers.

### Règles impératives (DO)

- Git est la seule archive : Supprimer immédiatement tout fichier remplacé (git rm) au lieu de le renommer avec des suffixes toxiques (*_old, *_backup, *_copy, *_v2). L'historique des commits permet de restaurer n'importe quelle version antérieure à tout moment.

- Zéro code mort commenté : Ne jamais laisser de blocs de code commentés dans les fichiers versionnés. Si une fonctionnalité est désactivée, elle doit être supprimée du code source.

- Nettoyage sécurisé du dépôt (Sécurité Git) : Ne jamais utiliser la commande git clean -fdx aveuglément (risque majeur de suppression définitive de vos fichiers .env contenant vos clés d'API locales ou une base de données locale SQLite non suivie). Privilégier des commandes ciblées de suppression d'artefacts (ex. rimraf ou scripts de nettoyage explicites dans package.json / Makefile).

- Suppression des imports et fichiers orphelins : Vérifier après chaque refactorisation qu'aucun composant, utilitaire, type ou feuille de style inutilisé ne persiste dans l'arborescence src/.

- .gitignore complet dès l'initialisation : Configurer une exclusion stricte dès le premier commit pour éviter la pollution du dépôt.

### Modèle de .gitignore standardisé

```
# Dépendances
node_modules/
.pnpm-store/
vendor/
# Builds et artefacts
dist/
build/
out/
target/
*.exe
*.dll
*.so
# Variables d'environnement & Secrets
.env
.env.local
.env.*.local
*.pem
*.key
# Logs & Caches
*.log
npm-debug.log*
yarn-debug.log*
.eslintcache
.vite/
.next/
__pycache__/
*.pyc
# Fichiers système & Éditeurs
.DS_Store
Thumbs.db
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
.idea/
# Captures & Rapports de test
coverage/
cypress/videos/
cypress/screenshots/
.playwright/
```

### Modèle de .gitattributes minimal (Normalisation multi-OS)

Afin de garantir des fins de ligne cohérentes quel que soit le système d'exploitation et d'éviter que start.sh ne devienne inexécutable sous Linux/macOS après une modification effectuée sous Windows (erreurs de caractères \r\n), inclure obligatoirement un fichier .gitattributes à la racine :

```
# Normalisation automatique des fins de ligne
* text=auto eol=lf
# Scripts Shell POSIX (forcing LF strict)
*.sh text eol=lf
# Batch Windows (forcing CRLF strict)
*.bat text eol=crlf
*.cmd text eol=crlf
```

## 2. Scripts de Lancement Local Propres à la Racine (1-Command Start) [N4]

### Principe d'accessibilité

N'importe quel développeur, auditeur ou testeur qui clone le projet doit pouvoir lancer l'application complète en local en une seule commande ou un simple double-clic, sans avoir à lire trois pages de documentation de configuration.

### Livrables obligatoires à la racine du dépôt

#### 1. Environnement Windows (start.bat)

Script d'automatisation vérifiant les prérequis, gérant les dépendances et exécutant l'application :

```
@echo off
SETLOCAL EnableDelayedExpansion
echo =========================================
echo   Verification de l'environnement local
echo =========================================
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Node.js n'est pas installe. Veuillez l'installer avant de continuer.
    if "%CI%"=="" pause
    exit /b 1
)
for /f "tokens=*" %%v in ('node -v') do set NODE_VER=%%v
for /f "tokens=*" %%v in ('npm -v') do set NPM_VER=%%v
echo [INFO] Node.js: %NODE_VER% | npm: %NPM_VER%
if not exist "node_modules\" (
    echo [INFO] Premier lancement detecte.
    if exist "package-lock.json" (
        echo [INFO] Installation deterministe via npm ci...
        call npm ci
    ) else (
        echo [INFO] Installation des dependances via npm install...
        call npm install
    )
)
echo.
echo =========================================
echo   Demarrage de l'application (Dev)
echo =========================================
echo   URL Locale : http://localhost:5173
echo =========================================
echo.
call npm run dev
exit /b 0
```

#### 2. Environnement Linux / macOS (start.sh)

Script Shell rigoureux (chmod +x start.sh) sécurisé par set -euo pipefail :

```
#!/usr/bin/env bash
set -euo pipefail
echo "========================================="
echo "  Vérification de l'environnement local"
echo "========================================="
if ! command -v node &> /dev/null; then
    echo "[ERREUR] Node.js n'est pas installé." >&2
    exit 1
fi
echo "[INFO] Node.js: $(node -v) | npm: $(npm -v)"
if [ ! -d "node_modules" ]; then
    echo "[INFO] Premier lancement détecté."
    if [ -f "package-lock.json" ]; then
        echo "[INFO] Installation déterministe via npm ci..."
        npm ci
    else
        echo "[INFO] Installation des dépendances via npm install..."
        npm install
    fi
fi
echo ""
echo "========================================="
echo "  Démarrage de l'application (Dev)"
echo "========================================="
echo "  URL Locale : http://localhost:5173"
echo "========================================="
echo ""
exec npm run dev
```

#### 4. Commandes standardisées (package.json / Makefile)

Exposer systématiquement les quatre commandes canoniques suivantes :

| Commande | Rôle & Action | Exécuté en arrière-plan |
| --- | --- | --- |
| dev | Démarrer l'environnement local de développement avec rechargement à chaud (HMR). | Serveur de dev (ex. Vite, Next, Express) |
| test | Lancer l'ensemble de la suite de tests automatisés (unitaires et intégration). | Test runner (ex. Vitest, Jest, PyTest) |
| build | Compiler la version de production, vérifier le typage et générer les bundles. | Compilateur (ex. tsc, build scripts) |
| clean | Purger intégralement les caches, dossiers de build temporaires et artefacts générés. | Scripts de nettoyage système |

Exemple d'implémentation dans package.json :

```
{
  "scripts": {
    "dev": "vite",
    "test": "vitest run",
    "build": "tsc -b && vite build",
    "clean": "rimraf dist build .vite .eslintcache node_modules/.cache"
  }
}
```

## 3. Discipline Git : Commits Atomiques & Versioning SemVer [N4]

### Commits atomiques

Un commit doit représenter une seule modification logique cohérente. Il convient de bannir les commits monolithiques regroupant des dizaines de fichiers modifiés aux fins de refactoring, de nouvelles fonctionnalités et de corrections de bugs simultanées.

### Convention de messages (Conventional Commits 1.0.0)

La rédaction des commits doit suivre strictement la structure <type>(<périmètre>): <description> avec l'ensemble des types standards définis par la spécification Conventional Commits 1.0.0 (feat, fix, refactor, perf, test, docs, build, ci, chore, style) :

- feat(budget): ajout de l'import CSV avec prévisualisation

- fix(auth): vérification du propriétaire avant lecture du dossier

- refactor(core): extraction du calcul de TVA dans le domaine

- docs(readme): ajout de la commande de démarrage start.bat

- chore(clean): suppression des fichiers obsolètes post-migration

- perf(db): indexation des requêtes de recherche utilisateur

- test(auth): ajout des tests d'intégration du flux OAuth2

- ci(github): ajout du workflow de vérification automatisée des PRs

### Protection de la branche principale

- Interdiction de commiter directement sur main ou master.

- Création de branches thématiques normées (feat/nom-feature, fix/nom-bug).

- Validation obligatoire des tests unitaires et du linter avant l'acceptation de toute Pull Request ou Fusion.

## 4. Grille de Validation QA Propreté & Lancement

Contrôle de conformité obligatoire avant chaque jalon de livraison (7 points clés) :

#

| # | Point de contrôle | Critère d'acceptation | Validé |
| --- | --- | --- | --- |
| 1 | Absence de fichiers morts | Aucun fichier comportant les suffixes _old, _backup, _copy ou _v2 dans le dépôt. | [ ] |
| 2 | Nettoyage du code | Absences de blocs de code commenté et d'imports inutilisés dans l'arborescence src/. | [ ] |
| 3 | Étanchéité du .gitignore | Aucun artefact (node_modules/, dist/, .env, .DS_Store) n'est suivi par Git. | [ ] |
| 4 | Script Windows (start.bat) | Lancement à froid fonctionnel sur environnement Windows sans intervention manuelle. | [ ] |
| 5 | Script POSIX (start.sh) | Exécutable (+x), configuré avec set -euo pipefail et fonctionnel sous Linux / macOS. | [ ] |
| 6 | Interface à 4 commandes | Présence et fonctionnement effectif des scripts dev, test, build et clean. | [ ] |
| 7 | Discipline des Commits | Historique conforme à la spécification Conventional Commits 1.0.0 avec commits atomiques. | [ ] |
