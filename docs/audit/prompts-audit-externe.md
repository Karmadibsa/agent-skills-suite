# Prompts d'audit externe (Codex, Antigravity)

Deux audits indépendants du dépôt, lancés en local avec d'autres assistants que celui qui a écrit le code. Les deux utilisent les skills de la suite par leur chemin : ça teste aussi que les skills fonctionnent hors de Claude Code.

Ouvrir chaque outil à la racine du dépôt cloné, sur la branche `dev` à jour (`git switch dev && git pull`). Ne pas leur donner d'accès en écriture au dépôt distant.

## Codex (CLI ou app, en local)

```text
Tu audites le dépôt courant « agent-skills-suite », en LECTURE SEULE : ne modifie aucun fichier, ne fais ni commit ni push, n'installe rien.

Méthode : lis d'abord skills/full-project-audit/SKILL.md et applique son workflow, en chargeant ses fiches references/ comme il l'indique. Pour la partie interface, lis aussi skills/ux-ui-design/SKILL.md puis references/00B-registre-central-regles.md et references/07-anti-patterns-et-anti-slop.md.

Périmètre :
1. Les skills (skills/*/SKILL.md et references/) : un skill installé seul est-il complet et utilisable sur un autre projet ? Le frontmatter suit-il le format agentskills.io ? Les tables de routage pointent-elles vers des fichiers existants ? Y a-t-il des contradictions entre skills, des règles sans niveau de preuve, des affirmations scientifiques douteuses ou non sourcées ? Les SKILL.md sont-ils trop longs pour leur rôle ?
2. Le bloc commun (shared/skill-preamble.md) et le skill d'aiguillage skills/start-here : l'aiguillage est-il clair, le profil projet utile ?
3. L'outillage : lance `python scripts/check_skills.py` et dis si le contrôle est suffisant. Vérifie .github/workflows/check-skills.yml.
4. Le site (website/index.html, styles.css, app.js) : accessibilité WCAG 2.2 AA, comportement sans JavaScript et avec prefers-reduced-motion, performance, sécurité (aucune ressource externe, pas d'injection), honnêteté du contenu (aucune preuve inventée).
5. Le README et start.bat.

Format de sortie :
- un tableau des constats, triés de P0 à P3, avec pour chacun : fichier:ligne, constat, preuve, correction proposée ;
- marque [VÉRIFIÉ PAR EXÉCUTION], [CONSTATÉ DANS LE CODE] ou [NON VÉRIFIÉ] pour chaque constat ;
- les 5 améliorations qui rendraient les skills les plus utiles sur un projet réel ;
- ce que tu n'as pas pu vérifier.
Écris le rapport dans ta réponse, pas dans un fichier.
```

## Antigravity (agent avec navigateur, en local)

```text
Tu audites le dépôt courant « agent-skills-suite » en deux temps. LECTURE SEULE sur le code : ne modifie aucun fichier, ne fais ni commit ni push.

Partie 1 — Le site vitrine, dans le navigateur.
Lance un serveur local : `python -m http.server 8080 --directory website` (ou start.bat sous Windows), puis ouvre http://localhost:8080.
Lis d’abord skills/ux-ui-design/SKILL.md, puis ses fiches references/00B-registre-central-regles.md, 04-accessibilite-typo-couleurs-motion.md et 07-anti-patterns-et-anti-slop.md, ainsi que skills/ux-art-direction/SKILL.md et sa fiche 06-direction-artistique-logos-refs.md. Juge le site avec ces règles :
- première impression : le message est-il compris en 5 secondes ? Le site est-il mémorable sans tomber dans le « slop IA » (dégradés gratuits, cartes à icônes, faux chiffres) ?
- parcours complet au scroll sur desktop (1440 px) et mobile (375 px) : la pile de fichiers du hero, la démo épinglée « Même demande, deux assistants » et ses trois onglets, la fenêtre de contexte, les prompts copiables de chaque skill ;
- clavier seul (Tab, flèches dans les onglets), focus visible, contraste en thème clair et sombre, zoom 200 %, préférence « réduire les animations » ;
- console du navigateur : erreurs ou avertissements ;
- fluidité du scroll et des animations (images par seconde si tu peux la mesurer).
Prends des captures d'écran des problèmes.

Partie 2 — Les skills.
Lis skills/start-here/SKILL.md puis simule son usage sur un projet fictif : « une appli web de suivi de budget, en développement, avec des données personnelles ». Indique le profil qu'il produirait, le skill qu'il recommanderait, et si le prompt suggéré est directement utilisable. Fais de même avec le prompt du skill ux-ui-design affiché sur le site.

Format de sortie :
- constats triés de P0 à P3, chacun avec : où (URL et section, ou fichier:ligne), constat, preuve (capture ou mesure), correction proposée ;
- [VÉRIFIÉ DANS LE NAVIGATEUR], [CONSTATÉ DANS LE CODE] ou [NON VÉRIFIÉ] pour chaque constat ;
- 3 idées concrètes pour rendre le site plus impressionnant sans perdre en accessibilité ni en honnêteté ;
- ce que tu n'as pas pu vérifier.
```

## Après les audits

Coller les deux rapports dans la session Claude Code. Chaque constat sera vérifié dans le code avant d'être corrigé : un constat d'audit est une piste, pas une preuve.
