# 01 — Fondamentaux Cognitifs & Lois Empiriques UX

Spécifications théoriques et directives opérationnelles pour la conception d'interfaces utilisateur.

## 1. Loi de Fitts

### Source scientifique

Paul Fitts (1954), « The information capacity of the human motor system in controlling the amplitude of movement », Journal of Experimental Psychology.

### Principe

Le temps nécessaire pour atteindre une cible est une fonction directe de la distance qui la sépare de la position d'origine et une fonction inverse de sa taille. La difficulté de l'indexation est modélisée par l'équation :

$$MT = a + b \log_2 \left( \frac{2D}{W} \right)$$

Où $MT$ est le temps du mouvement, $D$ est la distance à la cible et $W$ est la largeur de la cible le long de l'axe du mouvement.

### Application & Règles d'implémentation

- Règle opérationnelle (DO) : Dimensionner les cibles tactiles à un minimum de $48 \times 48\text{ dp}$ (ou $9\text{ mm}$ physiques) et étendre les zones cliquables au-delà du visuel effectif du composant. Placer les boutons d'action principale (CTA) au plus près de la zone d'attention du curseur ou de la zone de balayage naturel du pouce sur mobile (bottom sheet, floating action button).

- Interdit (DON'T) : Ne jamais placer des liens d'action critique ou des déclencheurs textuels d'une hauteur inférieure à $24\text{px}$ sans padding compensatoire. Ne pas disperser les actions successives d'un flux aux quatre coins opposés de l'écran.

- Critère de vérification (QA) : 100% des cibles interactives respectent l'aire minimale de $48 \times 48\text{ px}$. Les actions destructives sont séparées de l'action principale par un espacement d'au moins $16\text{px}$ pour éviter le cliquage accidentel.

## 2. Loi de Hick-Hyman

### Source scientifique

William Edmund Hick (1952), « On the rate of gain of information », Quarterly Journal of Experimental Psychology ; Ray Hyman (1953), « Stimulus information and reaction time », Journal of Experimental Psychology.

### Principe

Le temps nécessaire pour prendre une décision augmente de façon logarithmique en fonction du nombre d'alternatives présentées et de leur degré de complexité.

$$T = b \cdot \log_2(n + 1)$$

Où $T$ représente le temps de réaction et $n$ le nombre d'options équiprobables.

### Application & Règles d'implémentation

- Règle opérationnelle (DO) : Réduire la charge décisionnelle en décomposant les choix complexes en sous-étapes séquentielles (progressive disclosure, sélection guidée). Proposer des choix par défaut intelligents fondés sur les données d'usage prédominantes (70%+ des cas d'usage).

- Interdit (DON'T) : Ne pas afficher des menus déroulants non catégorisés contenant plus de 8 choix au même niveau hiérarchique. Éviter d'exposer l'intégralité des fonctionnalités d'un tableau de bord sur une seule vue sans regroupement logique.

- Critère de vérification (QA) : Les formulaires et configurations complexes comportent au maximum 5 à 7 choix visibles immédiatement par étape de décision.

## 3. Loi de Miller & Empan de Cowan

### Source scientifique

George A. Miller (1956), « The Magical Number Seven, Plus or Minus Two », Psychological Review ; Nelson Cowan (2001), « The magical number 4 in short-term memory », Behavioral and Brain Sciences.

### Principe

La mémoire de travail humaine a une capacité de traitement limitée. Si Miller évaluait initialement cette limite à $7 \pm 2$ éléments, les recherches modernes de Cowan démontrent que la capacité réelle du stockage à court terme, sans répétition mentale, est limitée à $4 \pm 1$ blocs (chunks) d'information distincts.

### Application & Règles d'implémentation

- Règle opérationnelle (DO) : Structurer l'information visuelle en regroupements logiques (chunking), de préférence de 3 à 5 éléments. Ce repère est une heuristique d'interface [N3] inspirée de Cowan (2001), dont la mesure porte sur la mémoire de travail en conditions de laboratoire : ce n'est pas une limite universelle, l'adapter à la familiarité et à la fréquence d'usage. Appliquer ce principe au formatage des numéros (cartes bancaires, téléphones), à la segmentation des étapes d'un formulaire et au regroupement d'options dans les barres de navigation.

- Interdit (DON'T) : Ne pas présenter de suites ininterrompues de données alphanumériques (ex: 16 chiffres consécutifs). Ne pas forcer l'utilisateur à retenir une information de l'écran A pour la ressaisir à l'écran B.

- Critère de vérification (QA) : Les listes longues sont découpées en groupes visuels (espacement, séparateur ou sous-titre) ; tout écart au repère de 3 à 5 éléments est justifié par l'usage.

## 4. Loi de Jakob

### Source scientifique

Jakob Nielsen (2000), Nielsen Norman Group (NN/g), « Jakob's Law of Internet User Experience ».

### Principe

Les utilisateurs passent la majeure partie de leur temps sur d'autres applications. Par conséquent, ils préfèrent que votre système fonctionne de la même manière que tous les autres systèmes qu'ils connaissent déjà. Leurs modèles mentaux sont ancrés par les conventions établies du web et des applications leaders.

### Application & Règles d'implémentation

- Règle opérationnelle (DO) : Utiliser les conventions d'interface standard : icône de loupe pour la recherche (en haut à droite ou au centre supérieur), panier/profil en haut à droite, logo ramenant à l'accueil en haut à gauche, icône de croix pour la fermeture des modales en haut à droite.

- Interdit (DON me DON'T) : Ne pas réinventer les mécanismes de navigation de base (ex: remplacer le défilement vertical classique par des gestes exotiques non signalés) ni détourner la sémiotique des icônes universelles.

- Critère de vérification (QA) : L'emplacement et le comportement des 5 composants fondamentaux (Navigation, Recherche, Compte/Profil, Actions de fermetures, Notifications) correspondent aux standards topographiques des lignes directrices iOS / Android / Web.

## 5. Loi de Tesler (Conservation de la Complexité)

### Source scientifique

Larry Tesler (1984), Xerox PARC, formalisé dans les travaux d'architecture d'information.

### Principe

Tout système ou processus informatique possède une quantité minimale de complexité fondamentale qui ne peut pas être éliminée. Elle peut seulement être déplacée : soit prise en charge par le système (développement, automatisation), soit répercutée sur l'utilisateur (charge cognitive, saisie manuelle).

### Application & Règles d'implémentation

- Règle opérationnelle (DO) : Absorber la complexité technique via l'ingénierie : auto-complétion, géolocalisation automatique, déduction du type de carte bancaire via le BIN, calcul automatique des taxes et frais de livraison selon le code postal saisie.

- Interdit (DON'T) : Ne pas demander à l'utilisateur de fournir des données que le système possède déjà ou peut inférer de manière déterministe (ex: demander le pays et la ville après la saisie du code postal).

- Critère de vérification (QA) : Le nombre de champs à saisie manuelle dans les formulaires transactionnels est réduit au strict minimum nécessaire, l'automatisation prenant en charge toute valeur déductible.

## 6. Principes de la Gestalt

### Source scientifique

Max Wertheimer, Kurt Koffka, Wolfgang Köhler (1912-1923), École de la Gestalt (Gestaltpsychologie).

### Principe

Le cerveau humain organise spontanément les éléments visuels isolés en ensembles cohérents selon des règles perceptives innées.

| Principe Gestalt | Mécanisme Perceptif |
| --- | --- |
| Proximité | Les objets proches les uns des autres sont perçus comme appartenant à un même groupe. |
| Similitude | Les objets partageant des caractéristiques visuelles (couleur, forme, taille) sont perçus comme liés. |
| Région Commune | Les éléments situés dans une même zone délimitée visuellement sont perçus comme un groupe. |
| Figure-Fond | Le cerveau sépare le plan d'intérêt (figure) du plan d'arrière-plan (fond). |

### Application & Règles d'implémentation

- Règle opérationnelle (DO) :

- Proximité : Appliquer une échelle d'espacement rigoureuse où l'espace entre un titre et son paragraphe associé est inférieur à l'espace séparant ce paragraphe du bloc suivant.

- Région commune : Englober les cartes (cards) avec des conteneurs sobres (arrière-plan légèrement contrasté ou bordure fine).

- Figure-Fond : Utiliser un assombrissement (overlay) sous les fenêtres modales pour isoler le contexte d'action.

- Interdit (DON'T) : Ne pas utiliser des marges égales au-dessus et en dessous d'un titre de section (rupture de la proximité). Éviter la multiplication des bordures épaisses ou des ombres trop portées qui surchargent la perception du fond.

- Critère de vérification (QA) : L'espacement supérieur d'un titre est au moins 2 fois supérieur à son espacement inférieur. Les conteneurs distincts utilisent des arrière-plans différenciés avec un contraste de luminance respectant les normes d'accessibilité.

## 7. Seuil de Doherty

### Source scientifique

Walter J. Doherty & Ahrvind Thadani (1982), « The Economic Value of Rapid Response Time », IBM Systems Journal.

### Principe

Doherty et Thadani ont observé, sur des postes de travail IBM, une hausse nette de productivité quand le temps de réponse du système descend sous environ 400 millisecondes ; au-delà, le fil de pensée de l'utilisateur tend à s'interrompre. Ce résultat porte sur le temps de réponse du système, pas sur la durée des animations, et ne justifie pas une forme de courbe précise : l'utiliser comme repère [N3] à valider par la mesure.

### Application & Règles d'implémentation

- Règle opérationnelle (DO) : Rendre un retour visuel immédiat ($< 100\text{ ms}$) pour chaque action (état :active, micro-animations, retour haptique). Si le traitement serveur prend entre $400\text{ ms}$ et $2000\text{ ms}$, afficher un skeleton screen (structure squelette animée) plutôt qu'un indicateur de chargement global (spinner).

- Interdit (DON'T) : Ne pas laisser une interface figée sans retour visuel instantané après un clic. Ne pas utiliser de page blanche de chargement.

- Critère de vérification (QA) :

- Latence du retour visuel d'interaction d'un élément cliquable : $< 100\text{ ms}$.

- Temps d'affichage de la structure de la page (First Contentful Paint) : $< 400\text{ ms}$.

## 8. Effet Esthétique-Utilisabilité

### Source scientifique

Masaaki Kurosu & Kaori Kashimura (1995), « Apparent Usability vs. Inherent Usability », CHI '95 ; Noam Tractinsky (1997), « What is beautiful is usable », Visual Communication.

### Principe

Les utilisateurs perçoivent les interfaces esthétiquement attrayantes comme étant plus faciles à utiliser. L'esthétique visuelle induit un état d'esprit positif qui augmente la tolérance aux micro-frictions d'utilisation et aux erreurs mineures d'interface.

### Application & Règles d'implémentation

- Règle opérationnelle (DO) : Maintenir une rigueur typographique, des alignements millimétrés et une palette de couleurs harmonieuse et mesurée sur l'ensemble de l'interface. Utiliser le design visuel pour hiérarchiser clairement l'information sans altérer la lisibilité.

- Interdit (DON'T) : Ne jamais sacrifier l'utilisabilité, l'accessibilité (contraste des textes $< 4.5:1$) ou l'ergonomie au profit d'effets visuels purement décoratifs qui compliquent la navigation.

- Critère de vérification (QA) : L'interface obtient un score minimum de 4.5:1 en contraste de texte selon la norme WCAG 2.1 AA, tout en conservant une cohérence visuelle conforme au design system.
