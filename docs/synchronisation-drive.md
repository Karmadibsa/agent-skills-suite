# Synchronisation Drive → GitHub — 26 novembre 2026

Les documents de la suite avaient déjà été importés dans le monorepo. Cette synchronisation met à jour le Skill full-project-audit en v2.2.0 (fichier maître, grille et template de rapport), ainsi que les trois sources de la vitrine modifiées dans le Drive après la précédente refonte. Les anciennes versions restent disponibles dans l'historique Git.

Adaptations d'import :
- removed unverified GitHub Pages canonical URL from Netlify target
- safe initial theme
- content visible without JS
- safe theme storage read
- guard feedback JSON
- guard localStorage access
- guard saving feedback
- guard saving theme
- system theme
- honest clipboard result
- warn on storage failure
- Réorganisation de la grille d'audit en tableaux Markdown ; suppression des marqueurs de blocs de code Google Docs.
- README aligné sur les dix Skills, chemins d'installation du dépôt et arborescence réelle ; ajout des licences MIT (code) et CC BY 4.0 (documentation) conformément au README initial, .gitignore et .gitattributes.
- Le texte MIT utilise la mention « 2026 Agent Skills Suite contributors » ; le mainteneur peut préciser les titulaires de droits si nécessaire.

Vérifications effectuées : analyse syntaxique de app.js, présence et unicité des IDs HTML, cibles des sélecteurs JS et des ancres locales, frontmatter de l'audit. Aucun test navigateur, contrôle WCAG complet, audit de toutes les références ou déploiement Netlify n'a été exécuté. La démonstration actuelle est illustrative, pas un benchmark. Les nouvelles sources du Drive remplacent la précédente refonte ; leur qualité graphique n'a pas été validée.
