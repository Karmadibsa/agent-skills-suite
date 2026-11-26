# Prompt d'audit complet d'un projet (site public + administration)

À coller dans l'assistant (Claude Code, Codex, Antigravity…) ouvert à la racine du projet à auditer. Deux versions : avec la suite installée dans le projet, ou sans installation (l'assistant lit les skills sur GitHub).

Avant de lancer :

- Si l'administration demande une connexion, connectez-vous vous-même dans le navigateur de l'assistant, ou indiquez un compte de test présent dans les fichiers de seed du projet. Ne collez jamais un vrai mot de passe dans le prompt.
- Lancez l'audit sur une branche à jour, sans modifications en cours.

## Version A — la suite est installée dans le projet

```text
Fais un audit complet et approfondi de ce projet, en LECTURE SEULE : ne modifie aucun fichier sauf le rapport final, ne fais ni commit ni push, n'installe rien sans me demander.

Méthode : utilise le skill full-project-audit comme cadre (gravité P0 à P3, preuves, plan de remédiation). Pour chaque domaine, charge aussi le skill spécialisé et ses fiches utiles :
- interface publique et administration : ux-ui-design (registre 00B, fiches 01 à 04, 07 anti-slop), ux-forms-navigation (formulaires, navigation, listes, mobile et desktop), ux-dataviz-admin (tableaux de bord, tableaux, back-office), ux-art-direction (cohérence visuelle et section 5 « signature propre ») ;
- code et sécurité : clean-code-security ;
- données et API : api-data-architecture ;
- tests, performance, logs : qa-perf-observability ;
- conformité juridique (mentions légales, RGPD, cookies, CGU, CGV) : legal-compliance.

Déroulé :
1. Lis le README, la configuration et l'arborescence ; lance le projet en local avec ses scripts (sans rien modifier) et dis-moi si tu n'y arrives pas.
2. Parcours le site public ET l'administration dans le navigateur, écran par écran, en desktop 1440 px et mobile 375 px, thème clair et sombre s'ils existent : hiérarchie, lisibilité, états vides, chargement et erreurs, formulaires, navigation, cohérence visuelle, aspect « généré par IA » ou interchangeable. Prends des captures des problèmes.
3. Teste au clavier seul, le contraste, le zoom 200 %, « réduire les animations » ; relève les erreurs de la console et les requêtes en échec.
4. Inspecte le code : sécurité (OWASP, secrets, contrôle d'accès de l'admin), données et API, tests existants (lance-les), performance, dette technique, fichiers morts.
5. Vérifie les obligations juridiques : mentions légales, politique de confidentialité, cookies déposés avant consentement, CGU ou CGV si applicables.

Rapport :
- un tableau des constats triés de P0 à P3, chacun avec : où (URL et écran, ou fichier:ligne), constat, preuve (capture, mesure, commande exécutée), correction proposée ;
- chaque constat marqué [VÉRIFIÉ PAR EXÉCUTION], [VÉRIFIÉ DANS LE NAVIGATEUR], [CONSTATÉ DANS LE CODE] ou [NON VÉRIFIÉ] ;
- une section dédiée à l'interface publique et une à l'administration ;
- les 5 changements qui amélioreraient le plus le produit pour ses utilisateurs ;
- un plan de remédiation en lots (petits lots livrables un par un) ;
- la liste de ce que tu n'as pas pu vérifier et pourquoi.
Écris le rapport dans docs/audit/AAAA-MM-JJ-audit-complet.md et résume-le dans ta réponse.
```

## Version B — sans installation (lecture des skills sur GitHub)

Même prompt, en remplaçant le paragraphe « Méthode » par :

```text
Méthode : lis d'abord https://github.com/Karmadibsa/agent-skills-suite/blob/main/skills/full-project-audit/SKILL.md et applique-le comme cadre (gravité P0 à P3, preuves, plan de remédiation), en lisant les fiches de son dossier references/ quand il le demande. Pour chaque domaine, lis aussi le SKILL.md correspondant dans https://github.com/Karmadibsa/agent-skills-suite/tree/main/skills et les fiches utiles :
- interface publique et administration : ux-ui-design, ux-forms-navigation, ux-dataviz-admin, ux-art-direction ;
- code et sécurité : clean-code-security ;
- données et API : api-data-architecture ;
- tests, performance, logs : qa-perf-observability ;
- conformité juridique : legal-compliance.
Si tu ne peux pas accéder à GitHub, dis-le et arrête-toi plutôt que d'inventer le contenu des skills.
```

## Après l'audit

Collez le rapport dans la session qui corrigera le projet. Chaque constat doit être vérifié dans le code avant d'être corrigé : un constat d'audit est une piste, pas une preuve.
