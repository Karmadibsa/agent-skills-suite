# 00 — Index, Principes KISS/Clean Code & Niveaux de Preuve — V2.0 (Skill 4 : clean-code-security)

Statut : Référentiel Code Propre, Sécurité & Git V2.0 · Standards : ISO/IEC 25010:2023 (modèle de qualité logicielle — maintenabilité, fiabilité, sécurité ; caractéristiques qualitatives et non seuils chiffrés de lignes), OWASP Top 10 (2021) / OWASP API Security Top 10 (2023) / OWASP ASVS (v4.0.3 / v5.0) (distinguant risques Top 10 [A01 Contrôle d'accès/BOLA, A03 Injections, A07 Authentification/Sessions, A10 SSRF] et faiblesses CWE [CWE-798, CWE-89, CWE-79, CWE-22]), NIST SSDF SP 800-218 v1.1 & OpenSSF Scorecard (sécurité de la chaîne logistique logicielle).

## 1. Mission du Skill 4

Une application bien pensée (Skill 0), bien spécifiée (Skill 1), ergonomique (Skill 2) et bien modélisée (Skill 3) peut tout de même échouer si son code devient un plat de spaghettis impossible à maintenir, s'il expose une faille de sécurité ou si personne n'arrive à le lancer en local.

Ce référentiel garantit :

- La simplicité et la lisibilité du code (Principe KISS) : Un code simple est plus facile à relire, à tester et à sécuriser qu'une architecture sur-abstraite. Les abstractions prématurées et la complexité inutile sont bannies au profit d'une clarté immédiate.

- La sécurité par défaut (OWASP / NIST SSDF) : Aucune confiance aveugle dans les données entrantes, aucune exposition de secrets dans les sources, et une application systématique des principes de moindre privilège et de défense en profondeur (en s'appuyant sur NIST SSDF SP 800-218 v1.1 et OpenSSF Scorecard pour sécuriser la chaîne logistique logicielle).

- La propreté permanente du dépôt Git : Zéro fichier mort accumulé (*_old, *_backup, temporaires), un historique de commits structuré et explicite, et un démarrage du projet local garanti en une seule commande via des scripts automatisés (ex. start.sh / start.bat ou dev.sh / setup.sh).

## 2. Taxonomie des Niveaux de Preuve

Chaque exigence, choix technique ou recommandation au sein de ce référentiel s'appuie sur une hiérarchie stricte de niveaux de preuve afin de justifier scientifiquement et méthodologiquement la qualité du logiciel :

- [N1] Exigence réglementaire / légale vérifiée : Conformité obligatoire aux textes juridiques applicables (RGPD Art. 32 sur la sécurité des traitements, directives européennes sur la protection des données personnelles, obligations légales de traçabilité).

- [N2] Principe fondamental d'informatique / sécurité : Théories et fondements établis de la science informatique (moindre privilège de Saltzer & Schroeder, défense en profondeur, séparation des préoccupations de Dijkstra, principe de minimisation).

- [N3] Standard ou référentiel de sécurité reconnu : Normes industrielles et bases de connaissances globales (OWASP Top 10 2021, OWASP API Security Top 10 2023, OWASP ASVS v4.0.3/v5.0 — avec distinction explicite entre risques Top 10 comme A01/BOLA, A03, A07, A10 et faiblesses CWE comme CWE-798, CWE-89, CWE-79, CWE-22 —, NIST SSDF SP 800-218 v1.1, OpenSSF Scorecard).

- [N4] Convention d'ingénierie logicielle éprouvée : Normes de qualité et pratiques validées par l'industrie (ISO/IEC 25010:2023 pour les caractéristiques qualitatives de maintenabilité/sécurité, principes KISS & DRY mesuré, seuils empiriques de Clean Code / Code Complete comme recommandations de revue, Conventional Commits, Semantic Versioning 2.0.0).

- [N5] Convention de style propre au langage ou framework : Règles idiomatiques officielles et configurations d'outils d'analyse statique de code (ESLint/Prettier pour JavaScript/TypeScript, Ruff/Black pour Python, Rustfmt/Clippy pour Rust).

- [N6] Optimisation structurelle ou refactoring à valider : Décision basée sur des éléments empiriques nécessitant une validation par benchmark, profilage mémoire ou mesure réelle de performance.

## 3. Carte des Documents du Référentiel (references/)

Code

Document

Contenu & Couverture

Condition de Chargement

00

00-index-clean-code-preuves.md

Vision globale, taxonomie des preuves N1–N6, principes directeurs KISS/Clean Code et grille QA générale.

Toujours chargé (point d'entrée de référence).

01

01-architecture-clean-code.md

Principes KISS/DRY, découplage UI/métier, gestion explicite des erreurs, nommage et refactoring.

Lors de la rédaction, du refactoring ou de la revue de code applicatif.

02

02-securite-applicative-secrets.md

Validation des entrées (Zod/Pydantic), zéro secret en dur, gestion des sessions/tokens et règles OWASP/ASVS.

Lors de l'implémentation d'API, de formulaires, d'authentification ou de variables d'environnement.

03

03-hygiene-git-nettoyage-scripts-locaux.md

Structure .gitignore, nettoyage des fichiers morts, Conventional Commits, scripts start.sh / start.bat et dev.sh / setup.sh.

Lors de la configuration du dépôt, du commit de code ou du déploiement local.

## 4. Grille de Validation QA Globale

Toute contribution au projet doit être évaluée au travers de cette grille de contrôle avant d'être validée et fusionnée :

- 1. Découplage métier / UI ([N2], [N4]) : La logique métier est-elle strictement isolée des composants d'affichage et des contrôleurs ?

- 2. Respect du principe KISS ([N4]) : Le code évite-t-il les sur-abstractions, la métaprogrammation inutile et la complexité prématurée ? Les seuils de longueur et d'imbrication sont appliqués en tant que recommandations de revue [N4] (issues de Clean Code et Code Complete) et non comme des exigences ISO.

- 3. Absence totale de secrets en dur ([N1], [N3]) : Aucun mot de passe, clé API, jeton d'accès ou certificat (ex. CWE-798) n'est présent dans le code source ou l'historique Git.

- 4. Validation systématique des entrées ([N3]) : Toutes les données provenant des utilisateurs, API externes ou fichiers sont-elles validées et assainies aux frontières du système ?

- 5. Absences de fichiers morts et résidus ([N4]) : Le dépôt est-il exempt de répertoires d'abandon, de fichiers nommés *_old, *_backup, temp ou de blocs de code commenté ?

- 6. Démarrage local garanti ([N4]) : Le projet peut-il être initialisé et exécuté sans erreur par un nouveau développeur via une commande unique documentée dans le README.md (ex. ./start.sh / start.bat ou ./scripts/dev.sh) s'appuyant sur des installations déterministes (ex. npm ci / lockfiles) ?

- 7. Éxécution verte de la suite de tests ([N4]) : L'ensemble des tests unitaires et d'intégration passe-t-il avec succès sans warning bloquant ?
