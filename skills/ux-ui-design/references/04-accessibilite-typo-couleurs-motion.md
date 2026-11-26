# 04 — Accessibilité (WCAG 2.2), Typographie, Couleurs & Motion Design

Spécifications techniques, règles opérationnelles et critères de validation assurance qualité (QA) pour le système de design et les applications numériques.

- Note de renvoi normatif : Se référer au document 00B — Registre Central des Règles & Niveaux de Preuve pour la distinction entre exigences normatives [N1], conventions techniques [N4] et préférences esthétiques [N5].

## 1. Paramètres d'Accessibilité de Base (W3C WCAG 2.2 Niveau AA)

### 1.1 Contrastes de Texte et d'Interface

- Source scientifique / Norme : W3C WCAG 2.2 Success Criterion 1.4.3 (Contrast Minimum) & Criterion 1.4.11 (Non-text Contrast).

- Règle opérationnelle (DO) :

- Assurer un ratio de contraste minimal de 4.5:1 pour le texte courant (< 18pt / 24px) et le texte en gras (< 14pt / 18.66px).

- Maintenir un ratio minimal de 3:1 pour les grands textes (≥ 24px ou ≥ 18.66px en gras).

- Appliquer un ratio minimal de 3:1 pour les éléments graphiques et composants d'interface essentiels (bordures de champs de saisie, icônes interactives, états actifs, indicateurs de sélection).

- Interdit (DON'T) :

- Utiliser du texte gris clair (#94A3B8) sur fond blanc (#FFFFFF) pour du texte de corps (ratio 2.3:1 non conforme).

- Fonder la lisibilité des bordures d'inputs uniquement sur un contraste inférieur à 3:1 avec le fond d'écran.

- Critères QA :

- Validation automatisée via Axe-core / Lighthouse, impérativement complétée par un contrôle manuel au clavier et au lecteur d'écran (les outils automatisés ne certifiant pas à eux seuls la conformité) [N1].

- Mesure manuelle au pipet de contraste (Color Contrast Analyzer) sur tous les états hover, focus, active et disabled.

### 1.2 Indicateur de Focus Clavier

- Source scientifique / Norme : W3C WCAG 2.2 Success Criterion 2.4.7 (Focus Visible - Niveau AA), Criterion 2.4.11 (Focus Not Obscured Minimum - Niveau AA) & Criterion 2.4.13 (Focus Appearance - Niveau AAA, recommandé) [N1].

- Règle opérationnelle (DO) :

- Implémenter un anneau de focus bien visible pour l'ensemble des éléments interactifs au clavier via la pseudo-classe :focus-visible.

- Configurer le style standard : outline: 2px solid var(--color-focus-ring); outline-offset: 2px;.

- Assurer que l'indicateur de focus possède un ratio de contraste d'au moins 3:1 par rapport aux couleurs d'arrière-plan adjacentes.

- Interdit (DON'T) :

- Supprimer l'outline par défaut (outline: none ou outline: 0) sans fournir un style de remplacement immédiatement perceptible et conforme.

- Déclencher l'anneau de focus lors d'un clic pointeur/souris (réserver :focus-visible à la navigation clavier).

- Critères QA :

- Navigation complète à la touche Tab / Shift+Tab : 100 % des éléments interactifs affichent un indicateur visuel conforme.

- Aucun piège au clavier (WCAG 2.1.2) sur les composants modaux et dropdowns.

### 1.3 Indépendance Vis-à-vis de la Couleur

- Source scientifique / Norme : W3C WCAG 2.2 Success Criterion 1.4.1 (Use of Color).

- Règle opérationnelle (DO) :

- Associer systématiquement à la couleur un canal d'information complémentaire : une icône distincte, une étiquette textuelle explicite ou un motif structurel.

- Utiliser des doublements visuels pour la validation des formulaires (ex. couleur rouge + icône d'alerte AlertCircle + message d'erreur textuel sous le champ).

- Sur les graphiques et visualisations de données, ajouter des hachures, motifs ou labels textuels directs sur les séries.

- Interdit (DON'T) :

- Indiquer la validation ou l'échec d'une saisie uniquement par le passage d'une bordure du gris au vert ou au rouge.

- Distinguer des états dans un tableau de bord uniquement au moyen d'un point de couleur (dot sans tooltip ou texte d'accompagnement).

- Critères QA :

- Test en mode niveau de gris (Greyscale display) : toutes les données, erreurs et états restent parfaitement identifiables et compréhensibles.

### 1.4 Zoom, Spacement de Texte et Redimensionnement

- Source scientifique / Norme : W3C WCAG 2.2 Success Criterion 1.4.4 (Resize text - Niveau AA), Criterion 1.4.10 (Reflow - Niveau AA) & Criterion 1.4.12 (Text Spacing - Niveau AA) [N1].

- Règle opérationnelle (DO) :

- Exprimer l'intégralité des tailles de police, espaces (padding, margin) et hauteurs de ligne en unités relatives (rem, em).

- Assurer la lisibilité et l'intégrité de la mise en page lors d'un zoom texte ou navigateur jusqu'à 200 %.

- S'assurer que le contenu s'adapte sans nécessiter de défilement horizontal à une largeur équivalente à 320 CSS pixels.

- Permettre la modification de l'espacement du texte (hauteur de ligne, espacement des paragraphes, des lettres et des mots) sans perte de contenu ni de fonctionnalité (Critère 1.4.12) [N1].

- Interdit (DON'T) :

- Fixer la taille des polices de caractères ou la hauteur des conteneurs de texte en pixels absolus (px).

- Utiliser user-scalable=no ou maximum-scale=1.0 dans la meta balise viewport.

- Définir overflow: hidden sur des conteneurs de texte risquant de tronquer le contenu après agrandissement.

- Critères QA :

- Test à 200 % de zoom sur navigateur desktop : aucune chevauchement de texte, pas de tronquage d'information, pas de barre de défilement bidirectionnelle.

### 1.5 Messages d'État et Authentification Accessible

- Source scientifique / Norme : W3C WCAG 2.2 Success Criterion 4.1.3 (Status Messages - Niveau AA) & Criterion 3.3.8 (Accessible Authentication Minimum - Niveau AA) [N1].

- Règle opérationnelle (DO) :

- Notifier les technologies d'assistance des changements d'état et messages d'information sans prise de focus via les attributs appropriés (role="status" ou aria-live) (Critère 4.1.3) [N1].

- Fournir une méthode d'authentification qui ne repose pas sur un test de mémoire cognitive (ex. autoriser le copier-coller pour les mots de passe ou prendre en charge les gestionnaires de mots de passe) (Critère 3.3.8) [N1].

## 2. Typographie & Psychologie des Polices

### 2.1 Échelle Typographique de Base

- Source scientifique / Norme : Tinker, M. A. (1963). Legibility of Print ; Nielsen Norman Group (NN/g) Legibility Studies.

- Règle opérationnelle (DO) :

- Définir le corps de texte principal (Body) à 16px / 1rem au minimum pour le web et le mobile.

- Appliquer des hauteurs de ligne (line-height) proportionnelles : 1.45 à 1.6 pour le corps de texte courant ; 1.15 à 1.25 pour les titres (Headings).

- Restreindre la taille minimale absolue à 12px / 0.75rem, exclusivement réservée aux données secondaires (horodatage, mentions légales, captions).

- Interdit (DON me :)

- Insérer des paragraphes de lecture continue avec une taille inférieure à 14px ou une hauteur de ligne inférieure à 1.3.

- Définir un line-height avec unité absolue (privilégier systématiquement les valeurs sans unité comme 1.5 plutôt que 24px) [N4].

- Critères QA :

- Vérification automatique CSS : absence de déclaration font-size inférieure à 0.75rem sur l'ensemble de la feuille de style.

### 2.2 Sémantique et Psychologie des Familles Typographiques

| Catégorie Typographique | Familles de Référence | Attributs Psychologiques & Usages Recommandés |
| --- | --- | --- |
| Sans-Serif Géométrique | Inter, Plus Jakarta Sans, Sora, Geist | Modernité, clarté technologique, précision objective. Adapté aux interfaces SaaS, plateformes analytiques, outils d'IA. |
| Sans-Serif Humaniste | Open Sans, Source Sans, Lato, Atkinson Hyperlegible | Chaleur humaine, lisibilité maximale, accessibilité universelle. Recommandé pour la santé, l'éducation, le grand public. |
| Serif Éditorial | Newsreader, Lora, Merriweather, Playfair | Autorité, tradition, réflexion, premium éditorial. Recommandé pour la lecture longue, la presse, la culture, le luxe. |
| Monospace | JetBrains Mono, Fira Code, Geist Mono | Rigueur technique, alignement structurel. Obligatoire pour les blocs de code, identifiants techniques, logs. |

- Règle spécifique Chiffres Tabulaires : Pour les tableaux financiers, compteurs, horloges et listings de données chiffrées, activer obligatoirement les chiffres à largeur fixe via CSS : font-variant-numeric: tabular-nums;.

### 2.3 Limites de Familles et Graisses

- Source scientifique / Norme : Cognitive Load Theory (Sweller, 1988) appliquée au visual design.

- Règle opérationnelle (DO) :

- Limiter le système typographique à un maximum de 2 familles de polices par application (ex. 1 Sans-Serif Géométrique pour l'UI, 1 Serif pour le contenu long).

- Sélectionner un maximum de 3 à 4 graisses au sein du projet : 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold).

- Interdit (DON'T) :

- Charger un nombre excessif de fichiers de police externes (recommandation : 2 familles maximum pour maîtriser la charge cognitive [N5] et le budget de performance [N4]).

- Multiplier inutilement les graisses (100, 200, 300, 400, 500, 600, 700, 800, 900).

- Critères QA :

- Audit des ressources réseau (Network tab) : respect du budget de performance recommandé (< 120 KB, formats WOFF2) [N4].

## 3. Psychologie des Couleurs & Architecture des Tokens

### 3.1 Architecture Sémantique (Convention 60-30-10)

- Source scientifique / Norme : Elliot, A. J., & Maier, M. A. (2014). Color-in-Context Theory ; Valdez, P., & Mehrabian, A. (1994) (Conventions de design et associations culturelles/contextuelles [N5]).

- Règle opérationnelle (DO) :

- Structurer les palettes selon la répartition visuelle 60-30-10 :

- 60 % Surfaces Neutres : Fond d'écran, toiles, cartes, conteneurs secondaires (bg-background, bg-surface).

- 30 % Structure & Contraste : Typographie, bordures, icônes passives, éléments structurels (text-primary, border-subtle).

- 10 % Accent & Action : Boutons d'action principale, indicateurs d'état actifs, points de focalisation (bg-primary, text-brand).

- Interdit (DON'T) :

- Appliquer la couleur d'accent (brand color) sur des éléments non interactifs ou sur plus de 15 % de la surface visuelle globale.

- Utiliser des couleurs brutes non tokenisées (#FF0000) directement dans le code composant.

### 3.2 Équilibre Mode Clair & Mode Sombre

- Source scientifique / Norme : ISO 9241-307 (Ergonomie de l'interaction homme-système — Écrans de visualisation).

- Règle opérationnelle (DO) :

- Mode clair : utiliser des fonds blanc cassé doux (#F8FAFC ou #FAFAFA) pour réduire la fatigue oculaire liée à la luminance globale.

- Mode sombre : utiliser des gris anthracite profonds (#0B0F19, #121417, #0F172A) plutôt que du noir pur.

- Adapter l'opacité et le poids visuel des bordures en mode sombre pour éviter les contrastes de structure agressifs.

- Interdit (DON'T) :

- Utiliser du noir pur (#000000) pour les fonds en mode sombre (préférence esthétique et d'ergonomie visuelle pour éviter l'effet d'halation) [N5].

- Inverser purement et simplement la palette de couleurs sans réajuster les ratios de contraste sémantiques.

- Critères QA :

- Basculement thématique (Dark/Light mode switch) : vérification de la conformité WCAG AA des ratios de contraste sur l'ensemble des 2 thèmes.

### 3.3 Signification Psychologique et System Tokens

| Teinte / Signification | Tokens System | Usages Autorisés | Interdictions |
| --- | --- | --- | --- |
| Bleu / IndigoConfiance, fiabilité, technologie | color-brand-primarycolor-interactive | Actions principales, liens, états actifs, navigation, identité SaaS. | Utilisation sur des messages d'erreur ou d'avertissement. |
| Vert / ÉmeraudeValidation, succès, sérénité | color-success-basecolor-success-subtle | Confirmation d'action, soldes positifs, statut "En ligne", validation. | Utilisation sur des éléments destructifs ou des alertes d'avertissement. |
| Ambre / OrangeAttention, énergie, prudence | color-warning-basecolor-warning-subtle | Alertes non bloquantes, opérations irréversibles à venir, expirations. | Utilisation pour de simples notifications informatives ou neutres. |
| Rouge / CorailUrgence, danger, erreur | color-danger-basecolor-danger-subtle | Erreurs critiques, actions destructives (suppression permanente), blocages. | Strictement interdit pour des éléments purement décoratifs ou secondaires. |
| Violet / PruneCréativité, IA, premium | color-accent-aicolor-accent-premium | Fonctionnalités d'intelligence artificielle, surlignages premium, badges. | Emploi comme couleur de texte courant ou sur les éléments système de base. |
| Neutres (Ardoise / Pierre)Calme cognitif, structure | color-neutral-0 à 1000color-border-subtle | Fonds, cartes, typographie courante, séparateurs, états désactivés. | Absence de contraste minimal entre le fond et le texte de niveau 1/2.<br>3.4 Harmonisation Chromatique & Choix Scientifique des Palettes (Théorie des Couleurs & Espace Perceptuel OKLCH)<br>Source scientifique / Norme : Espace de couleur uniformément perceptuel OKLCH (Björn Ottosson, 2020) & Spécifications W3C CSS Color Module Level 4.<br>Intérêt de l'espace OKLCH :<br>L'espace colorimétrique perceptuel OKLCH (oklch(L C H)) garantit qu'à valeur de luminosité (L) égale, deux couleurs différentes possèdent la même luminosité perçue par l'œil humain [N4]. Toutefois, le contraste WCAG 2.x devant toujours être calculé sur les couleurs sRGB effectivement rendues [N1].<br>4 Schémas d'Harmonie Chromatique :<br>1. Monochromatique + Neutres teintés : 1 teinte de base déclinée en 9 nuances de luminosité. Idéal pour les outils métiers sobres, denses et professionnels (ex. Linear, Notion).<br>2. Analogue : 2 teintes voisines sur le cercle chromatique (écart de 30°, ex. Bleu + Cyan/Teal). Apaisant, cohérent, idéal pour les domaines de la santé, du bien-être et du grand public.<br>3. Complémentaire / Complémentaire adjacente (Split-Complementary) : Teinte principale + couleur opposée à 150°–180°, réservée strictement aux appels à l'action principaux ou aux alertes critiques. Crée un point focal immédiat sans agresser l'œil si la règle 60-30-10 est respectée.<br>4. Sémantique isolée : Ne jamais mélanger la couleur de marque avec les couleurs d'état système (Succès = Vert, Attention = Ambre, Erreur = Rouge).<br>Critères QA :<br>Vérification de la déclaration des tokens de palette au format OKLCH ou conversion conforme dans les feuilles de style.<br>Contrôle de l'isolation stricte des couleurs système (aucune interférence entre les teintes de la marque et les indicateurs d'état). |

### 3.4 Harmonisation Chromatique & Choix Scientifique des Palettes (Théorie des Couleurs & Espace Perceptuel OKLCH)

- Source scientifique / Norme : Espace de couleur uniformément perceptuel OKLCH (Björn Ottosson, 2020) & Spécifications W3C CSS Color Module Level 4.

- Intérêt de l'espace OKLCH :

- L'espace colorimétrique perceptuel OKLCH (oklch(L C H)) garantit qu'à valeur de luminosité (L) égale, deux couleurs différentes possèdent la même luminosité perçue par l'œil humain [N4]. Toutefois, le contraste WCAG 2.x devant toujours être calculé sur les couleurs sRGB effectivement rendues [N1].

- 4 Schémas d'Harmonie Chromatique :

- 1. Monochromatique + Neutres teintés : 1 teinte de base déclinée en 9 nuances de luminosité. Idéal pour les outils métiers sobres, denses et professionnels (ex. Linear, Notion).

- 2. Analogue : 2 teintes voisines sur le cercle chromatique (écart de 30°, ex. Bleu + Cyan/Teal). Apaisant, cohérent, idéal pour les domaines de la santé, du bien-être et du grand public.

- 3. Complémentaire / Complémentaire adjacente (Split-Complementary) : Teinte principale + couleur opposée à 150°–180°, réservée strictement aux appels à l'action principaux ou aux alertes critiques. Crée un point focal immédiat sans agresser l'œil si la règle 60-30-10 est respectée.

- 4. Sémantique isolée : Ne jamais mélanger la couleur de marque avec les couleurs d'état système (Succès = Vert, Attention = Ambre, Erreur = Rouge).

- Critères QA :

- Vérification de la déclaration des tokens de palette au format OKLCH ou conversion conforme dans les feuilles de style.

- Contrôle de l'isolation stricte des couleurs système (aucune interférence entre les teintes de la marque et les indicateurs d'état).

## 4. Motion Design : Animations & Transitions Signifiantes

### 4.1 Rôle Fonctionnel du Motion

- Source scientifique / Norme : Material Motion Guidelines ; Apple Human Interface Guidelines (Motion).

- Règle opérationnelle (DO) :

- Concevoir chaque animation selon une intention fonctionnelle explicite :

- Continuité spatiale : Expliquer l'origine et la destination d'un composant (ex. carte s'agrandissant en vue détaillée).

- Confirmation d'action : Offrir un retour visuel immédiat après une interaction (ex. validation d'un interrupteur toggle).

- Guidage de l'attention : Orienter le regard vers un changement d'état critique (ex. apparition d'un toast notification).

- Interdit (DON'T) :

- Intégrer des animations purement décoratives, en boucle continue sans action de l'utilisateur, ou retardant la réalisation d'une tâche.

- Déplacer des éléments sur de longues distances sur l'écran sans relation de cause à effet.

- Critères QA :

- Audit d'expérience utilisateur : aucune animation ne doit bloquer l'interactivité d'un composant (blocking UI thread).

### 4.2 Seuils Temporels Stricts

- Source scientifique / Norme : Card, Moran, & Newell (1983) — The Model Human Processor (Seuils de perception cognitive).

- Règle opérationnelle (DO) :

- Appliquer strictement les fenêtres de durée suivantes selon l'échelle du composant :

```
┌─────────────────────────────────────────┬───────────────────────────┐
│ Type d'interaction                      │ Durée recommandée         │
├─────────────────────────────────────────┼───────────────────────────┤
│ Micro-interactions (hover, toggle, btn) │ 100 ms – 150 ms           │
│ Transitions de composants (modal, toast)│ 200 ms – 250 ms           │
│ Transitions de page / grands conteneurs │ 250 ms – 350 ms (max)     │
└─────────────────────────────────────────┴───────────────────────────┘
```

- Interdit (DON'T) :

- Dépasser 350 ms pour une transition d'interface (perçu comme un ralentissement système par l'utilisateur).

- Employer des durées inférieures à 70 ms (qui risquent de paraître brusques et d'ôter toute perception de transition fluide) [N4].

- Critères QA :

- Inspection CSS / Performance Timeline : vérification que la propriété transition-duration ou animation-duration est conforme aux bornes précitées.

### 4.3 Courbes d'Accélération Naturelles

- Source scientifique / Norme : Principes de la physique appliquée aux interfaces utilisateur (Newtonian motion simulation).

- Règle opérationnelle (DO) :

- Utiliser cubic-bezier(0.2, 0, 0, 1) ou ease-out pour les transitions d'entrée (démarrage rapide, ralentissement progressif à l'arrivée).

- Utiliser ease-in (cubic-bezier(0.4, 0, 1, 1)) pour les éléments qui quittent l'écran (accélération à la sortie).

- Utiliser cubic-bezier(0.4, 0, 0.2, 1) (standard ease-in-out) pour les éléments se déplaçant d'un point A à un point B à l'écran.

- Interdit (DON'T) :

- Utiliser une courbe linear pour des mouvements de translation ou de redimensionnement (rendu artificiel et rigide).

- Appliquer des effets de rebond exagérés (bounce / elastic) sur les applications professionnelles ou de haute productivité.

- Critères QA :

- Test visuel de fluidité : l'animation doit s'exécuter de façon stable à 60 fps (ou 120 fps selon le matériel) sans chute de framerate.

### 4.4 Accessibilité Motrice et Sensibilité aux Mouvements

- Source scientifique / Norme : W3C WCAG 2.2 Success Criterion 2.3.3 (Animation from Interactions - Niveau AAA, fortement recommandé) [N1].

- Règle opérationnelle (DO) :

- Intégrer obligatoirement le support de la directive média système prefers-reduced-motion.

- Définir une stratégie d'atténuation automatique : remplacer les mouvements de translation, d'agrandissement et de rotation par des fondus en enchaîné courts (opacity) ou des changements d'état immédiats.

```
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- Interdit (DON'T) :

- Ignorer le paramètre système prefers-reduced-motion de l'utilisateur.

- Conserver des effets de défilement parallaxe ou de zoome agressif lorsque la réduction de mouvement est activée.

- Critères QA :

- Activation de l'option "Réduire les mouvements" dans les paramètres du système d'exploitation : confirmation de l'absence totale de déplacements spatiaux à l'écran lors de la navigation.
