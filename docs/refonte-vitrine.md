# Refonte de la vitrine — novembre 2026

Site : https://agent-skills-suite.am-creative.fr/ · Aperçu local : `start.bat` à la racine (Windows), ou `python -m http.server 8080 --directory website`.

## Démarche

Refonte menée avec le skill `ux-ui-design` : registre 00B, fiches 01 (cognition), 02 (divulgation progressive), 04 (accessibilité, couleurs), 06 (direction artistique, archétype « SaaS / Tooling ») et 07 (anti-slop).

## Décisions

- **Message** : une promesse en deux lignes, puis la preuve. La pièce centrale est une démo « même demande, deux assistants » sur trois cas réels (nouvelle fonctionnalité, formulaire, bug en production), annoncée comme illustrative.
- **Structure** : démo → fonctionnement (chargement progressif + profil projet) → parcours des skills → niveaux de preuve → installation. Chaque skill a un prompt de départ copiable et un lien vers son `SKILL.md`.
- **Direction artistique** : surfaces neutres, une seule couleur d'accent, bordures 1 px, aucune ombre décorative, aucun dégradé, aucune grille de cartes à icônes. Polices système, aucune dépendance externe.
- **Accessibilité** : HTML sémantique, onglets et groupe radio au clavier (motifs WAI-ARIA APG), focus visible, cibles d'au moins 40 px, `prefers-reduced-motion`, thème clair/sombre suivant le système avec bascule manuelle.
- **Sans JavaScript** : tout le contenu reste lisible (scénarios et méthodes d'installation listés les uns sous les autres) ; les boutons de copie et les onglets n'apparaissent qu'une fois le script chargé.
- **Retours** : le module local « Bug ou idée ? » est retiré de la vitrine (site public, pas un prototype en test, conformément au réglage par défaut du profil). Le lien « Signaler un bug ou une idée » ouvre une issue GitHub.

## Version 2 — effets et prompts

- **Deux moments forts, pas plus** (principe repris de Taste Skill) : la pile de fichiers du hero, qui se déploie au scroll et s'incline avec la souris (elle montre le chargement par couches), et la démo épinglée, où la réponse complaisante se fait barrer avant que la bonne arrive. Le reste se contente de révélations discrètes.
- **Chiffres réels** : la fenêtre de contexte montre les vrais volumes du dépôt (98 337 mots au total ; 512 + 1 824 + 3 251 mots pour une tâche de formulaire).
- **Un prompt complet par skill**, avec des crochets à remplacer et un bouton de copie.
- **Sources de style consultées** : Emil Kowalski (courbe `cubic-bezier(0.23, 1, 0.32, 1)`, survols réservés à la souris, pression à 0,97), Vercel Web Interface Guidelines (transform/opacity uniquement, `touch-action`, chiffres tabulaires, `translate="no"` sur les noms), Taste Skill (un ou deux moments par page, version statique sur mobile et en mouvement réduit).
- **Mobile et mouvement réduit** : pas d'épinglage, contenu dans son état final.

## Version 3 — corrections après audits Codex et Antigravity

- **Démo toujours lisible** : les deux réponses sont entièrement visibles à toute position ; la progression ne pilote que la rature, un repère latéral, le contour et la couleur des étiquettes. Barre d'étapes cliquable (1. réponse sans skill, 2. défauts relevés, 3. réponse avec skill). Panneaux d'onglets focusables.
- **Mobile** : pas de parallaxe sous 960 px, code de la démo qui passe à la ligne, cibles de 44 px au toucher.
- **Contrastes non textuels** relevés au-dessus de 3:1 (bordures fortes, boutons fantômes).
- **Mouvement** : transitions de 350 ms au plus, changement de « réduire les animations » pris en compte sans recharger, classe `.js` posée par `app.js` (si le script échoue, la page reste lisible).
- **Performances** : éléments animés mis en cache, seul l'onglet visible est mis à jour, aucune écriture de variable CSS si la valeur ne change pas.
- **Chiffres** : périmètre documenté sur la page ; la tâche de formulaire inclut le registre obligatoire (environ 7 % au lieu de 5 %).
- **Divers** : icône soleil/lune selon le thème, libellés explicites des boutons de copie, favicon vide (plus de 404), rayons 8/12 px, `start.bat` qui attend le serveur avant d'ouvrir le navigateur.

## Vérifications

Effectuées dans le navigateur intégré : rendu desktop 1440 px et mobile 375 px, étapes de la démo épinglée, thèmes clair et sombre, changement d'onglet, aucune erreur console, aucun débordement horizontal à 375 px.

Non effectuées : audit axe-core, lecteur d'écran, zoom 200 %, test sur le déploiement Netlify réel.
