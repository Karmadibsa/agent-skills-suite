# 02 — Architecture de l'Information, Divulgation Progressive & Clarté

Spécifications d'ingénierie UX et directives de conception de l'interface utilisateur.

## 1. Divulgation Progressive (Progressive Disclosure)

### Source Scientifique

- Référence : Jakob Nielsen, Nielsen Norman Group (1995 / 2006).

- Fondement : Montrer uniquement l'information nécessaire à l'étape en cours afin de réduire drastiquement la charge cognitive et de limiter le taux d'erreur de saisie ou d'interprétation.

### Architecture à 3 Niveaux

- Niveau 1 (Visible par défaut) : Action principale du contexte + 3 à 4 informations de santé critiques.

- Niveau 2 (Accessible en 1 clic / tap) : Détails secondaires, filtres avancés, tiroirs contextuels (drawers) et accordéons.

- Niveau 3 (Niveau Expert) : Paramètres d'administration avancés, journaux d'audit (logs), payloads JSON et exports bruts.

### Directives d'Implémentation

| A faire (DO) | A ne pas faire (DON'T) |
| --- | --- |
| Structurer les formulaires complexes en étapes logiques ou via des tiroirs latéraux secondaires. | Imbriquer des accordéons sur plus de 2 niveaux de profondeur. |
| Conserver l'accès permanent aux actions principales (ex: enregistrer, valider) au niveau 1. | Masquer une action indispensable ou critique dans un menu contextuel caché ou un survol. |
| Afficher les métadonnées avancées dans un panneau repliable au clic. | Surcharger l'écran principal avec toutes les données techniques dès le chargement initial. |

### Critères QA

- QA-1.1 : L'écran principal ne contient pas plus de 4 indicateurs de niveau 1 simultanés sans interaction utilisateur.

- QA-1.2 : Aucun composant d'accordéon ne dépasse 2 niveaux d'imbrication dans le DOM rendu.

- QA-1.3 : L'action principale de la page est visible immédiatement sans action de défilement ou de survol.

## 2. Modèles de Lecture Oculaire & Ergonometrie Typographique

### Source Scientifique

- Référence : Eye-Tracking Studies, Nielsen Norman Group (Pernice et al.) & Baymard Institute.

- Fondement : Structurer la disposition spatiale et le texte pour s'adapter aux mouvements balistiques des yeux lors de la balayage visuel.

### Patrons de Balayage Visuel

- Pattern en F (Listes, Articles, Tables de données) : Les utilisateurs balayent horizontalement le haut, puis descendent verticalement le long du bord gauche.

- Règle : Placer systématiquement les mots-clés porteurs de sens dans les 2 premiers mots des titres, sous-titres et puces.

- Pattern en Z (Écrans d'accueil, Landing Pages, Modales simples) : Le regard traverse le haut de gauche à droite, descend en diagonale, puis traverse la partie inférieure.

- Règle : Aligner le logo ou le titre d'ancrage en haut à gauche, l'action secondaire en haut à droite, le message central au milieu, et le bouton d'action principal (CTA) en bas à droite.

### Lisibilité Typographique

- Longueur de ligne optimale : Limiter le corps de texte à une plage de 50 à 75 caractères par ligne (max-width: 65ch) afin de prévenir la fatigue oculaire et de faciliter le saut de ligne rétinien.

### Directives d'Implémentation

| A faire (DO) | A ne pas faire (DON'T) |
| --- | --- |
| Démarrer les puces et les labels par le mot-clé d'action (ex: « Exporter le rapport »). | Commencer les titres par des mots vides ou passifs (ex: « Note concernant la possibilité de... »). |
| Appliquer un max-width: 65ch strict sur les blocs d'instructions et de texte éditorial. | Laisser des paragraphes de texte s'étendre sur toute la largeur d'un écran desktop 1080p+. |
| Positionner le bouton de confirmation d'une modale au coin inférieur droit du conteneur. | Disperser les actions principales de manière aléatoire hors du chemin visuel naturel en Z. |

### Critères QA

- QA-2.1 : 100% des éléments de liste à puces contiennent leur mot-clé principal dans les deux premiers mots.

- QA-2.2 : Le conteneur de texte éditorial ne dépasse pas 65 caractères de largeur effective.

- QA-2.3 : Les modales de confirmation respectent la séquence visuelle : Titre (Haut-Gauche) -> Description (Centre) -> Action finale (Bas-Droite).

## 3. Clarté de l'Information & Microcopy

### Source Scientifique

- Référence : UX Writing, Torrey Podmajersky / Nielsen Norman Group.

- Fondement : Éliminer l'ambiguïté pour réduire l'hésitation de l'utilisateur et maximiser l'efficience de l'interaction.

### Règle du Test des 5 Secondes

En moins de 5 secondes d'exposition à n'importe quel écran, un utilisateur doit pouvoir répondre sans hésitation à trois questions :

- Où suis-je ? (Contexte clair via le titre et le fil d'Ariane)

- Que puis-je faire ici ? (Actions et options évidentes)

- Quelle est la prochaine étape ? (Bouton d'action principal clairement identifiable)

### Principes de Microcopy

- Libellés orientés action : Utiliser la formule [Verbe d'action] + [Objet direct].

- Élimination du jargon technique : Remplacer l'exposition des erreurs système brutes par des instructions explicites et constructives.

### Directives d'Implémentation

| A faire (DO) | A ne pas faire (DON'T) |
| --- | --- |
| Utiliser des boutons explicites comme « Enregistrer le budget » ou « Supprimer le compte ». | Utiliser des libellés vagues ou génériques tels que « OK », « Valider » ou « Soumettre ». |
| Traduire les erreurs API : « Vérifiez le format de la date (JJ/MM/AAAA) ». | Exposer des erreurs système brutes : « Erreur 422 : Unprocessable Entity / Payload invalide ». |
| Rédiger des messages d'état concis indiquant la résolution au problème rencontré. | Afficher des codes d'erreur HTTP isolés sans explication sur la marche à suivre. |

### Critères QA

- QA-3.1 : Aucun bouton d'action ne porte le libellé unique « OK » ou « Soumettre ».

- QA-3.2 : Aucune chaîne de caractères correspondant à un code d'erreur HTTP ou une stack trace n'est visible dans l'interface utilisateur.

- QA-3.3 : L'en-tête de la page permet d'identifier le contexte applicatif complet en un coup d'œil.

## 4. Hiérarchie Visuelle par l'Espace Négatif (Whitespace)

### Source Scientifique

- Référence : Lois de la Gestalt (Proximité & Clôture) / Refactoring UI (Wathan & Schoger).

- Fondement : La structuration de l'information doit être guidée par les espacements naturels pour réduire la surcharge visuelle causée par les bordures et conteneurs superflus.

### Échelle d'Espacement Stricte (Système à base 8px)

Toutes les marges internes (padding) et externes (margin) doivent utiliser exclusivement la grille géométrique suivante :
4px · 8px · 12px · 16px · 24px · 32px · 48px · 64px

### Principes d'Agrégation et de Séparation

- Séparation par le vide : Séparer les groupes fonctionnels par de l'espace négatif avant de recourir à des lignes de séparation ou des fonds de couleur.

- Contraste Typographique : La hiérarchie visuelle s'établit prioritairement par les variations de taille, de graisse (font-weight) et de couleur de texte (contrast ratio).

### Directives d'Implémentation

| A faire (DO) | A ne pas faire (DON'T) |
| --- | --- |
| Diminuer l'espace entre le titre et son sous-texte (ex: 4px) et augmenter l'espace avec le bloc suivant (ex: 24px). | Appliquer des espacements identiques au-dessus et en dessous d'un titre. |
| Utiliser les variations de poids (Bold / Regular) et de gris pour différencier les niveaux d'information. | Entourer chaque élément ou carte d'une bordure visible et d'une ombre portée accentuée. |
| Respecter strictement les valeurs d'espacement définies par l'échelle systématique. | Utiliser des valeurs d'espacement arbitraires dans le CSS (ex: margin-top: 13px). |

### Critères QA

- QA-4.1 : Toutes les valeurs de margin et padding inspectées dans le CSS sont des multiples de 4 ou 8 issus de l'échelle.

- QA-4.2 : L'espacement supérieur d'un titre de section est au moins deux fois supérieur à son espacement inférieur.

- QA-4.3 : Les conteneurs adjacents n'utilisent pas de bordures visibles si un espacement supérieur à 24px les sépare.
