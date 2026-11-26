# Refonte de la vitrine — décisions et vérifications

## Constat
L'ancien app.js appelait moveElement() sans définition dans le fichier. Les modules interactifs pouvaient donc s'arrêter au démarrage. Les sections masquées pour une animation au scroll aggravaient cet échec. Le site proposait également des commandes npx agent-skills-suite alors qu'aucun paquet de ce nom n'était fourni par le dépôt.

## Décisions
- Skill UX/UI, références 00B, 01, 02, 04, 06, 07, 08 : hiérarchie, divulgation progressive, contraste, direction artistique sobre, pas de dégradés ni KPI décoratifs, retour contextualisé et explicite.
- Démonstration : mêmes six tâches fictives, mêmes fonctions métier, ordre et présentation différents. Les deux versions ont des états indépendants. Les actions sont réversibles et les tâches bloquées ne sont pas modifiables. Aucun benchmark ni résultat scientifique inventé.
- HTML lisible sans JavaScript, aucun CDN, police système, aucun stockage persistant ou envoi automatique de retours. Les commandes interactives ne sont exposées qu'après initialisation.
- Installation : commande Git réelle, chemins indicatifs selon assistant.
- Le site suit la préférence claire/sombre du système.

## Recette à réaliser sur le déploiement
1. Ouvrir la vitrine, vérifier la console et les trois fichiers statiques.
2. Tester le parcours Export CSV dans chaque version et la réouverture. Vérifier l'indépendance des états, recherche, filtre, cas vide, réinitialisation et changement de vue.
3. Tester une tâche bloquée : aucune action de clôture. Vérifier le recalcul de la prochaine action, des compteurs et du résumé.
4. Tester le formulaire vide, espaces seuls, aperçu, modification après aperçu, copie autorisée/refusée et lien vers la création de ticket.
5. Naviguer au clavier et à 320 px, 200 % de zoom, mode sombre et réduction des animations. Vérifier contraste, axe-core et lecteur d'écran.
6. Désactiver JavaScript : le contenu, les deux exemples, les références et le lien de signalement restent accessibles.

Statut : validation statique et syntaxe JS effectuées lors de la préparation du commit. Recette navigateur, WCAG et déploiement réel : NOT RUN.
