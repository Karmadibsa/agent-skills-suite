# Spécification Technique & Fonctionnelle : Système de Retour Utilisateur Contextuel (« Bug ou idée ? »)

### Avertissement de modularité & Domaines sensibles

Module optionnel et indépendant (contextual-feedback) : Ce composant doit être activé de manière conditionnelle selon la typologie et le niveau de sensibilité du projet. Son déploiement est déconseillé ou strictement encadré sur les applications traitant des données médicales, bancaires, financières ou hautement confidentielles, en raison des risques inhérents d'exposition contextuelle et de capture d'écran.

## 1. Validation Scientifique & Principes d'Ingénierie

### 1.1 Situated / In-Context Feedback (Études HCI & NN/g)

Les recherches en Human-Computer Interaction (HCI) et les travaux du Nielsen Norman Group (NN/g) démontrent que le signalement visuel contextuel (in-context feedback) réduit la friction cognitive et élimine l'ambiguïté sémantique. Dans un modèle traditionnel, l'utilisateur tente de décrire un composant via le langage naturel (« le deuxième bouton bleu sous le menu de gauche »), créant des erreurs d'interprétation chez le développeur.

La sélection directe du nœud du DOM associe de manière univoque l'intention de l'utilisateur à l'arbre d'accessibilité et aux coordonnées structurelles exactes de l'application.

Conformément à la Loi de Tesler (Loi de conservation de la complexité), tout système possède une quantité irréductible de complexité. Le module de retour contextuel déplace cette charge de l'utilisateur vers la machine : au lieu de demander à l'utilisateur d'identifier sa résolution d'écran, son système d'exploitation, son navigateur, sa pile d'appels ou la hiérarchie CSS, le système capture silencieusement et automatiquement cet environnement technique au moment de l'interaction.

### 1.2 Privacy-by-Design & Minimisation des Données (RGPD Art. 5 & OWASP)

Le système applique un principe d'étanchéité stricte pour respecter l'article 5 du RGPD (minimisation des données) et prévenir les fuites accidentelles d'informations sensibles (PII, jetons de session, données bancaires ou médicales) vers les bases de retours ou les captures d'écran :

- Filtrage à la source : Aucune donnée saisie dans les champs de formulaires (input, textarea, select) n'est enregistrée dans l'arbre contextuel. Les valeurs sont purgées avant l'export.

- Anonymisation contextuelle : Le contenu textuel extraie uniquement les structures sémantiques. Les tokens de sécurité, jetons d'authentification, cookies de session et en-têtes d'autorisation sont strictement exclus de la capture d'état.

- Sanitization HTML/CSS : Reconstruction du sous-arbre DOM avec une liste blanche stricte d'attributs HTML autorisés et masquage du texte non-libellé.

### 1.3 Architecture Modale Native (<dialog> Top Layer)

Les interfaces modernes exploitent les modales natives HTML5 <dialog>. Ces éléments sont projetés par le moteur du navigateur dans la Top Layer (couche supérieure du viewport), un contexte de rendu indépendant qui passe outre la hiérarchie standard d'empilement CSS et ignore tout z-index (même z-index: 999999).

Pour maintenir l'accessibilité du système de retour en toute circonstance :

- Le module s'injecte dynamiquement à la racine du document (<body>) en état normal.

- Un observateur de mutation (MutationObserver) détecte l'ouverture de tout composant dialog[open].

- Le composant d'overlay du système de retour s'auto-déplace à l'intérieur du <dialog> actif pour être promu dans la même Top Layer, garantissant une visibilité et une interactivité totales sans casser le focus-trap de la modale hôte.

## 2. Spécification Technique et Fonctionnelle

### 2.1 Machine à États

Le cycle de vie du module repose sur une machine à états déterministe à 5 états principaux :

```
[ REPOS ] ──(Clic "Bug ou idée ?")──> [ SÉLECTION ] ──(Clic élément)──> [ FORMULAIRE ]
    ▲                                       │                                │
    │                                 (Touche Échap)                         │
    │                                       │                                ▼
[ CONFIRMATION ] <──(Envoi réussi)── [ VÉRIFICATION ] <──(Clic Continuer) ───┘
```

- REPOS : Le module est passif. Seuls les points d'entrée de la barre supérieure sont interactifs.

- SÉLECTION : Le mode capture d'élément est actif. Le survol met en surbrillance les éléments du DOM. Les événements de l'application sont interceptés.

- FORMULAIRE : L'élément est sélectionné. Le panneau d'édition s'ouvre (ancré en bas à droite sur desktop, Bottom Sheet sur mobile). L'élément cible reste mis en évidence.

- VÉRIFICATION : L'utilisateur révise le contenu synthétisé, les détails techniques collectés et la capture d'écran générée avant soumission.

- CONFIRMATION : Message de succès avec action de copie rapide du rapport au format Markdown. Retour automatique à l'état REPOS.

Cas alternatif : Si l'utilisateur clique sur « Signaler sans élément » depuis le bandeau d'instruction de l'état SÉLECTION, le système bascule directement à l'état FORMULAIRE avec target: null.

### 2.2 Points d'Entrée & Injection Dynamique

- Barre supérieure : Deux déclencheurs sont positionnés de manière permanente dans la barre d'outils de l'application :

- Bouton principal : « Bug ou idée ? » (déclenche le mode SÉLECTION).

- Bouton secondaire : « Mes retours » accompagné d'un badge indiquant le nombre de retours enregistrés dans la session/stockage local.

- Gestion du Top Layer (MutationObserver) :

```
const dialogObserver = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'open') {
      const targetDialog = mutation.target;
      if (targetDialog.matches('dialog[open]')) {
        targetDialog.appendChild(getFeedbackOverlayContainer());
      } else if (!document.querySelector('dialog[open]')) {
        document.body.appendChild(getFeedbackOverlayContainer());
      }
    }
  }
});
dialogObserver.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] });
```

### 2.3 Sélection d'Élément & Interception d'Événements

- Rendu Visuel :

- Modificateur de curseur global : cursor: crosshair !important.

- Bandeau d'instruction fixe en haut de l'écran avec bouton d'annulation (Échap) et bouton « Signaler sans sélectionner d'élément ».

- Rectangle de surbrillance : <div id="feedback-inspect-overlay"> positionné en position: fixed; pointer-events: none; z-index: 2147483647; outline: 2px solid #2563EB; background: rgba(37, 99, 235, 0.1); transition: all 50ms ease-out;.

- Infobulle liée au rectangle affichant le fil d'Ariane sémantique en temps réel : Écran › Section → Type « Libellé ».

- Interception des événements (Capture Phase) :
Pour empêcher toute exécution d'action métier lors de la sélection (ex: clic sur "Supprimer le compte" pour désigner ce bouton), des écouteurs sont enregistrés en phase de capture avec blocage strict :

- Événements interceptés : pointerover, pointerdown, mousedown, mouseup, click, dblclick, contextmenu, auxclick, submit, focusin, keydown (uniquement pendant le mode inspection actif ; la navigation clavier globale de l'application hôte reste intacte en dehors de la sélection).

- Traitement systématique : event.preventDefault(), event.stopImmediatePropagation().

- Navigation Clavier & Tactile :

- Navigation au clavier via Tab / Shift+Tab pour faire défiler les éléments sélectionnables avec mise à jour du rectangle d'inspection. Validation par Entrée ou Espace. Annulation par Échap.

- Support tactile : Écouteur sur pointerdown et touchend pour sélectionner l'élément sous le point de contact (document.elementFromPoint).

- Suivi de positionment :

- Sélection Chirurgicale & Traversal DOM (Granularité fine) :

- Zoom structurel à la molette & Clavier : Ajustement dynamique du niveau de sélection sans déplacer le pointeur via la molette de la souris (Wheel) ou la combinaison de touches Alt + Flèche Haut (remonter vers le composant parent : bouton, ligne de tableau, carte) / Alt + Flèche Bas (descendre vers l'enfant exact : icône SVG, cellule, badge, libellé).

- Support du Shadow DOM & Portails flottants : Inspection en profondeur à travers les Web Components via shadowRoot.elementFromPoint et détection transparente des éléments positionnés dans des portails (tooltips, menus déroulants, popovers ouverts).

- Écouteurs sur window.addEventListener('scroll', updateOverlay, true) et window.addEventListener('resize', updateOverlay) pour recalculer instantanément le getBoundingClientRect() de la cible.

### 2.4 Formulaire de Saisie & Ergonomie

- Structure du composant : Panneau ancré en bas à droite sur bureau (largeur 400px), transformé en Bottom Sheet (glissant depuis le bas, hauteur max 85vh) sur mobile (@media (max-width: 640px)).

- Boutons de recentrage d'élément :

- Bouton « Élargir la zone » : Remonte d'un niveau dans le DOM (targetElement = targetElement.parentElement), met à jour l'overlay et le fil d'Ariane.

- Bouton « Changer d'élément » : Repasse temporairement en état SÉLECTION sans vider les champs déjà saisis dans le formulaire.

- Champs du formulaire :

- Type (Obligatoire) : Boutons radio stylisés ou Segments Toggle : [ 🐛 Bug ] ou [ 💡 Idée ].

- Titre (Facultatif) : Champ texte simple (max 90 caractères).

- Description (Obligatoire) : Zone de texte multi-lignes.

- Bloc dépliable « Préciser » (Optionnel) :

- Si Bug : Champ Étapes de reproduction + Champ Gravité (Bloquant, Majeur, Mineur, Suggéré).

- Si Idée : Champ Problème résolu / Valeur ajoutée.

- Capture d'écran (Facultatif) : Case à cocher [ ] Joindre une capture d'écran (désactivée par défaut, checked: false). L'utilisateur doit cocher explicitement l'option et reçoit un avertissement préalable précisant que la surface sélectionnée dans getDisplayMedia() dépend de son navigateur et n'est pas masquée automatiquement.

- Sécurité de fermeture : Si l'utilisateur tente de fermer le formulaire (bouton croix ou touche Échap) alors que la description contient du texte, une confirmation est demandée : « Abandonner la saisie en cours ? ».

### 2.5 Capture d'Écran Sécurisée via Web API

- Déclenchement : La capture s'effectue uniquement au moment où l'utilisateur clique sur le bouton « Enregistrer » ou « Vérifier », et uniquement si l'option capture est cochée.

- Processus technique :

- Masquer temporairement le panneau de formulaire (visibility: hidden) tout en conservant le contour d'inspection autour de l'élément cible.

- Attendre un délai d'un frame de rendu (await new Promise(r => setTimeout(r, 400));) pour garantir la disparition visuelle du formulaire.

- Appeler l'API Screen Capture :

```
const stream = await navigator.mediaDevices.getDisplayMedia({
  video: { displaySurface: 'browser' },
  audio: false,
  preferCurrentTab: true,
  selfBrowserSurface: 'include'
});
```

- Injecter le flux vidéo dans un élément <video> hors-champ, attendre l'événement loadedmetadata, puis dessiner l'image dans un <canvas>.

- Calculer le ratio d'échelle entre la résolution native de la capture vidéo et les dimensions du viewport CSS : const scale = videoElement.videoWidth / window.innerWidth;.

- Découper deux images PNG :

- Vue Zone (zone) : Calcul du rectangle de l'élément cible étendu d'une marge de 160 px de chaque côté, borné aux limites de la fenêtre.

- Vue Écran complet (full) : Capture intégrale du viewport.

- Libération stricte des ressources : Dans un bloc finally, interrompre l'ensemble des pistes du flux vidéo pour éteindre immédiatement l'indicateur d'enregistrement du navigateur :

```
finally {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
}
```

- Gestion des environnements sous iframe et communications inter-fenêtres :
L'iframe hôte doit déclarer la politique de sécurité : <iframe src="..." allow="display-capture; clipboard-write"></iframe>.
En cas de communication inter-domaines via postMessage, le récepteur doit impérativement vérifier event.origin et valider la structure du payload avant d'exécuter la moindre action. Si le parent ne répond pas dans un délai de 500 ms, le système bascule en fallback de capture Canvas natif.

- Gestion des erreurs et blocages :

- Si l'utilisateur refuse la permission ou annule le dialogue (NotAllowedError), le rapport est conservé et finalisé sans capture d'écran, avec une notification d'avertissement.

- Si l'API est bloquée par le navigateur ou la politique système (SecurityError ou rejet < 600 ms), afficher le composant de secours : « Capture automatique indisponible. Vous pouvez coller une capture manuelle (Win + Maj + S ou Cmd + Maj + 4). »

### 2.6 Schéma du JSON de Données Remontées

- Limites techniques du traversal DOM :
L'inspection d'éléments ne peut pas traverser les Shadow DOM fermés (mode: 'closed') ni accéder à la structure interne des iframes cross-origin. Dans ces contextes, la sélection se limite au conteneur hôte de l'iframe ou au composant Web encapsulé.

```
{
  "id": "FBK-20260330-8F3A",
  "at": "2026-03-30T14:22:10.452Z",
  "kind": "bug",
  "title": "Le bouton de validation reste grisé après saisie",
  "body": "J'ai rempli tous les champs obligatoires mais l'action reste impossible.",
  "repro": "1. Ouvrir la modale\n2. Saisir le nom\n3. Observer le bouton",
  "severity": "majeur",
  "problem": null,
  "target": {
    "xpath": "/html/body/div[2]/dialog/form/div[3]/button[2]",
    "selector": "dialog[open] > form > div.actions > button.btn-primary",
    "tag": "BUTTON",
    "id": "btn-submit-order",
    "classes": ["btn", "btn-primary", "disabled"],
    "text": "Valider la commande",
    "componentPath": "App > ModalOrder > Form > SubmitButton",
    "rect": {
      "top": 450,
      "left": 620,
      "width": 140,
      "height": 40
    },
    "aria": {
      "role": "button",
      "label": "Valider la commande",
      "disabled": "true",
      "expanded": null,
      "selected": null,
      "invalid": "false"
    }
  },
  "tech": {
    "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...",
    "screen": "1920x1080",
    "viewport": "1440x900",
    "dpr": 2,
    "lang": "fr-FR",
    "online": true,
    "url": "https://app.domaine.fr/commandes/nouvelle",
    "route": "/commandes/nouvelle"
  },
  "details": {
    "style": {
      "display": "inline-flex",
      "visibility": "visible",
      "opacity": "0.5",
      "pointerEvents": "none",
      "position": "static",
      "zIndex": "auto",
      "overflow": "visible",
      "color": "rgb(255, 255, 255)",
      "backgroundColor": "rgb(37, 99, 235)",
      "fontSize": "14px"
    },
    "kids": 1,
    "html": "<button class=\"btn btn-primary disabled\" id=\"btn-submit-order\" disabled=\"\">Valider la commande</button>"
  },
  "diagnostics": {
    "errors": [
      { "at": "2026-03-30T14:21:55.120Z", "message": "TypeError: Cannot read properties of undefined (reading 'id')", "file": "app.js", "line": 412 }
    ],
    "networkFailures": [
      { "at": "2026-03-30T14:21:58.300Z", "method": "POST", "url": "/api/v1/orders/validate", "status": 422, "durationMs": 145 }
    ],
    "userBreadcrumbs": [
      "Clic sur Onglet \"Commandes\"",
      "Clic sur Bouton \"Nouvelle commande\"",
      "Saisir dans Champ \"Nom de la société\"",
      "Clic sur Bouton \"Valider la commande\""
    ]
  },
  "context": {
    "breadcrumbs": ["Accueil", "Commandes", "Nouvelle commande [Modale]"],
    "activeElement": "INPUT#input-customer-name"
  },
  "shot": {
    "zone": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "full": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  }
}
```

### 2.7 Règles Strictes de Confidentialité & Sanitization

- Masquage Formulaires & Identifiants :

- Les valeurs des éléments HTML <input>, <textarea>, <select> sont systématiquement ignorées. Seul le type et les attributs de structure sont conservés (<input type="text" placeholder="Ex: Jean">).

- Les jetons d'authentification (Bearer ...), clés d'API, cookies de session et en-têtes sensibles sont supprimés des métadonnées contextuelles.

- Nettoyage du Texte DOM :

- Les chaînes de texte présentes dans le nœud HTML capturé qui ne sont pas des libellés d'interface standard (ex: contenus générés par l'utilisateur, paragraphes de texte métier) sont remplacées par des points de suspension ….

- Liste Blanche d'Attributs HTML :

- Seuls les attributs suivants sont conservés lors du nettoyage du HTML extrait : id, class, type, role, aria-*, disabled, readonly, placeholder, title, data-testid, data-component. Tout autre attribut (notamment style en ligne avec valeurs dynamiques, href contenant des tokens, src de médias sensibles) est purgé.

- Anonymisation Regex Globale & Limites du RGPD :
Toutes les chaînes textuelles (titre, description, fil d'Ariane, HTML nettoyé) passent par un filtre d'anonymisation avant stockage. Avertissement RGPD : Les expressions régulières réduisent les risques de fuites mais ne garantissent pas une anonymisation complète au sens du RGPD. En environnement de production sensible, la collecte automatique des piles d'erreurs JS et des URLs complètes doit être désactivée par défaut ou restreinte aux seuls codes d'erreur et nom de routes génériques.

- Noms propres détectés / Entités : [personne]

- Adresses e-mail ([a-zA-R0-9._%+-]+@[a-zA-R0-9.-]+\.[a-zA-R]{2,}) : [adresse]

- Nombres > 4 chiffres consécutifs (cartes, téléphones, identifiants) : [nombre]

- Échappement XSS : Tout contenu texte restitué dans l'interface de vérification ou dans les exports Markdown est nettoyé contre l'injection de scripts HTML/JS (& → &amp;, < → &lt;, > → &gt;, " → &quot;).

- Gouvernance des Données & Droits RGPD :

- Durée de conservation : Purge automatique locale du localStorage et d'IndexedDB sous 7 jours ou immédiatement après la génération d'un export ZIP / envoi API réussis.

- Contrôle d'accès & Effacement (Mode B) : Le serveur doit restreindre l'accès aux retours stockés aux seuls utilisateurs autorisés et fournir un point d'accès conforme au droit à l'effacement (droit à l'oubli).

### 2.8 Format de Restitution Textuel (Bouton Copier)

Lors du clic sur le bouton « Copier le rapport », le texte exactement formaté ci-dessous est placé dans le presse-papier :

```
### [BUG] Le bouton de validation reste grisé après saisie
**ID :** `FBK-20260330-8F3A` | **Date :** 30/03/2026 16:22:10
#### 1. Description
J'ai rempli tous les champs obligatoires mais l'action reste impossible.
#### 2. Étapes de reproduction & Gravité
- **Gravité :** Majeur
- **Étapes :**
  1. Ouvrir la modale
  2. Saisir le nom
  3. Observer le bouton
#### 3. Cible Sémantique
- **Composant :** `BUTTON#btn-submit-order.btn.btn-primary.disabled`
- **Composants (Dev) :** `App > ModalOrder > Form > SubmitButton`
- **Fil d'Ariane :** Accueil › Commandes › Nouvelle commande [Modale]
- **XPath :** `/html/body/div[2]/dialog/form/div[3]/button[2]`
- **Dimensions :** 140x40px (Top: 450px, Left: 620px)
- **Styles clés :** display: inline-flex | opacity: 0.5 | pointer-events: none | zIndex: auto
- **Attributs ARIA :** role="button" | aria-disabled="true" | aria-invalid="false"
#### 4. Environnement Technique & Diagnostics
- **URL :** `https://app.domaine.fr/commandes/nouvelle`
- **Navigateur :** Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...
- **Écran / Viewport :** 1920x1080 (DPR 2) | Viewport 1440x900
- **Dernières erreurs JS (60s) :** `TypeError: Cannot read properties of undefined (reading 'id')` (app.js:412)
- **Requêtes en échec (60s) :** `POST /api/v1/orders/validate` → HTTP 422 (145 ms)
- **Dernières interactions :** Clic "Commandes" → Clic "Nouvelle commande" → Saisie "Nom" → Clic "Valider la commande"
```

### 2.9 Modes de Transmission & Stockage

#### Mode A : Stockage Local & Export ZIP (Sans Dépendance Serveur)

- Stockage :

- Métadonnées et contenus textes stockés dans localStorage sous la clé app_feedback_items.

- Captures d'écran au format Data URL (Base64) stockées dans une base de données IndexedDB (FeedbackDB, objectStore screenshots) pour éviter d'atteindre la limite de 5 Mo du localStorage.

- Interface « Mes retours » :

- Accessible via le bouton dédié de la barre supérieure.

- Liste l'ensemble des retours de la session / stockage local avec filtres par type (Bug/Idée) et statut.

- Possibilité de visualiser la fiche détaillée, de supprimer un retour, d'exporter à l'unité ou en masse.

- Bouton « Démarrer une nouvelle session » : Purge l'intégralité du localStorage et d'IndexedDB associés aux retours après confirmation.

- Génération de l'archive ZIP :
Au clic sur « Exporter l'archive (.zip) », le module utilise la librairie JSZip (ou un compresseur STORE/DEFLATE natif en micro-librairie) pour assembler l'arborescence suivante :

```
retours-[nom-projet]-2026-03-30-16h22.zip
├── retours.md
└── images/
    ├── 01-FBK-20260330-8F3A-zone.png
    ├── 01-FBK-20260330-8F3A-ecran.png
    ├── 02-FBK-20260330-9B2C-zone.png
    └── 02-FBK-20260330-9B2C-ecran.png
```

Le fichier retours.md agrège l'ensemble des retours compilés au format Markdown (tel que défini en 2.8) avec des liens relatifs vers les images du dossier images/.

#### Mode B : Transmission par API REST (Backend Intégré)

- Requête HTTP : Envoi au format multipart/form-data à l'endpoint configuré (ex: POST /api/v1/feedback).

- Sécurité & Contrôle :

- Authentification via le jeton de session existant (Header Authorization: Bearer ...).

- Protection CSRF : Inclusion du jeton anti-CSRF courant dans l'en-tête X-CSRF-Token.

- Rate-Limiting applicatif : Maximum 5 soumissions par minute par utilisateur/IP.

- Validation backend : Le serveur vérifie le schéma JSON, ré-assainit les chaînes HTML/Markdown et valide le type MIME et la taille des fichiers images (max 5 Mo par image).

## 3. Matrice de Validation QA (14 Tests Obligatoires)

| ID | Scénario de Test | Procédure de Validation | Résultat Attendu |
| --- | --- | --- | --- |
| QA-01 | Clic sur un bouton d'action critique en mode Sélection | Activer le mode Sélection et cliquer sur un bouton déclenchant une action (ex: Supprimer, Payer). | L'action métier n'est pas exécutée. L'élément est sélectionné et le formulaire s'ouvre. |
| QA-02 | Fonctionnement sur modale native <dialog open> | Ouvrir une modale native HTML5 <dialog>, puis cliquer sur « Bug ou idée ? ». | L'overlay et le formulaire s'affichent au-dessus de la modale native sans être masqués. |
| QA-03 | Suppression dynamique de l'élément sélectionné | Sélectionner un élément animé ou temporaire qui disparaît immédiatement du DOM. | Le système conserve le snapshot du nœud, ses coordonnées calculées et ne plante pas (crash/null pointer). |
| QA-04 | Élargissement de la zone sans perte de saisie | Saisir du texte dans la description, puis cliquer sur « Élargir la zone ». | Le composant cible remonte d'un niveau dans le DOM, la description saisie est intégralement conservée. |
| QA-05 | Changement d'élément sans perte de saisie | Saisir un texte, cliquer sur « Changer d'élément », puis choisir un nouvel élément. | Le nouveau composant est associé au formulaire et le texte précédemment saisi est conservé. |
| QA-06 | Annulation et fermeture via touche Échap | 1. Presser Échap en mode Sélection.2. Presser Échap en mode Formulaire (avec du texte). | 1. Quitte le mode Sélection.2. Affiche la confirmation d'abandon de saisie. |
| QA-07 | Capture d'écran acceptée par l'utilisateur | Soumettre un retour avec l'option capture d'écran cochée et accepter le dialogue navigateur. | La capture de la zone et du viewport complet est générée et visible dans la phase de vérification. |
| QA-08 | Refus explicite de la capture d'écran | Refuser le dialogue getDisplayMedia du navigateur lors de la soumission. | Le système affiche un avertissement non-bloquant et permet de valider le retour sans image. |
| QA-09 | Blocage API / Environnement restreint | Simuler un rejet immédiat de getDisplayMedia (SecurityError). | Proposition de fallback manuel (Win + Maj + S) sans crash du module. |
| QA-10 | Étanchéité et masquage des données sensibles | Sélectionner un formulaire contenant des données (input.value, e-mails, tokens). | Le JSON et le HTML extrait contiennent [adresse], [personne], [nombre] et aucune valeur brute de champ. |
| QA-11 | Protection XSS dans la restitution | Injecter des balises <script>alert(1)</script> dans le titre et la description. | Les caractères sont strictement échappés dans l'interface, le texte copié et l'export Markdown. |
| QA-12 | Gestion de l'erreur QuotaExceededError | Remplir le localStorage jusqu'à saturation avant la création d'un retour. | Le système bascule proprement sur IndexedDB ou signale une erreur propre sans perdre la saisie utilisateur. |
| QA-13 | Validité et intégrité de l'archive .zip | Générer et télécharger l'archive .zip depuis la page « Mes retours ». | L'archive contient retours.md lisible et le dossier images/ avec des PNG valides non corrompus. |
| QA-14 | Action « Démarrer une nouvelle session » | Exécuter la commande de purge depuis l'interface « Mes retours ». | Le localStorage et la base IndexedDB du module sont réinitialisés, le compteur repasse à 0. |
| QA-15 | Capture anonymisée des erreurs console, réseau et fil comportemental | Provoquer une erreur JS, un échec HTTP (ex: 422) et effectuer des clics avant de soumettre un retour. | Les 5 dernières erreurs JS, requêtes HTTP en échec et actions sont enregistrées dans le JSON et le Markdown, totalement anonymisées sans données personnelles. |

### 2.10 Diagnostic Technique Auto-Collecté (Erreurs, Réseau & Interactions)

- Dernières erreurs runtime JS : Capture automatique des 5 dernières erreurs JavaScript (window.onerror, unhandledrejection, console.error) survenues durant les 60 secondes précédant l'ouverture de la saisie. Les messages et piles d'erreurs sont purgés de toute donnée utilisateur avant intégration.

- Dernières requêtes réseau en échec : Enregistrement des 5 derniers appels réseau (fetch / XMLHttpRequest) s'étant conclus par un code HTTP >= 400 ou un délai dépassé (timeout) au cours des 60 dernières secondes (méthode, chemin d'accès épuré de tout paramètre d'URL sensible, statut et durée en ms).

- État exhaustif de l'élément cible : Enregistrement des dimensions précises (getBoundingClientRect), des styles calculés fondamentaux (display, position, overflow, zIndex, opacity, pointerEvents, color, backgroundColor, fontSize), des attributs d'accessibilité (aria-expanded, aria-selected, aria-invalid, aria-disabled), du sélecteur CSS unique et de la hiérarchie des composantes (arborescence des éléments React/Vue si disponible).

- Fil d'Ariane comportemental : Reconstitution anonymisée des 5 dernières actions de l'utilisateur (clics, ouvertures de menu, soumissions) excluant toute donnée saisie.

## 4. Prompt Maître pour Implémentation IA (Claude Code / Cursor)

Ce prompt est prêt à être copié-collé dans un assistant de génération de code (Claude Code, Cursor, Copilot) pour implémenter l'intégralité du module dans n'importe quel projet web frontend (React, Vue, Vanilla JS, Svelte).

```
Tu es un ingénieur Frontend Senior expert en HCI et en sécurité Web. Tu dois implémenter le module complet « Document 08 — Système de Retour Utilisateur Contextuel ("Bug ou idée ?") » dans l'application web courante.
Voici la spécification stricte que tu dois appliquer à la lettre :
1. ARCHITECTURE ET INJECTION TOP LAYER :
   - Crée un composant autonome `FeedbackModule` (Vanilla JS, React ou Vue selon la pile du projet).
   - Intègre deux points d'entrée dans la barre supérieure : "Bug ou idée ?" et "Mes retours" (avec compteur dynamiquement mis à jour).
   - Utilise un `MutationObserver` sur document.body pour détecter les éléments `dialog[open]`. Lorsqu'une modale native HTML5 est ouverte, déplace le conteneur du FeedbackModule à l'intérieur du `<dialog>` pour qu'il reste fonctionnel dans la Top Layer native du navigateur.
2. SELECTION ET INTERCEPTION D'ÉVÉNEMENTS :
   - En mode SÉLECTION, applique `cursor: crosshair !important` sur tout le document.
   - Affiche un bandeau fixe en haut avec : instructions, bouton Échap pour annuler, et bouton "Signaler sans sélectionner d'élément".
   - Injecte un overlay d'inspection fixe (`position: fixed; pointer-events: none; outline: 2px solid #2563EB; z-index: 2147483647;`).
   - Affiche un tooltip fil d'Ariane en direct : "Écran › Section → Type « Libellé »".
   - Attache des écouteurs en phase de capture (useCapture = true) sur : `pointerover`, `pointerdown`, `mousedown`, `mouseup`, `click`, `dblclick`, `contextmenu`, `auxclick`, `submit`, `focusin`, `keydown`.
   - Applique systématiquement `event.preventDefault()` et `event.stopImmediatePropagation()` sur l'élément survolé/cliqué pour empêcher TOUTE action métier de l'application pendant la sélection.
   - Gère le déplacement de l'overlay au scroll et au resize.
3. FORMULAIRE ET ERGONOMIE :
   - Panneau ancré en bas à droite sur desktop, Bottom Sheet glissante sur mobile (`@media (max-width: 640px)`).
   - Boutons "Élargir la zone" (remonte au parent DOM) et "Changer d'élément" (ré-inspecte sans perdre la saisie).
   - Champs : Toggle Bug/Idée (obligatoire), Titre (optionnel, max 90 car.), Description (obligatoire).
   - Accordéon "Préciser" : si Bug -> Étapes de repro + Gravité ; si Idée -> Problème résolu.
   - Checkbox "Joindre une capture d'écran" (cochée par défaut).
   - Si fermeture alors que la description n'est pas vide -> Confirmation d'abandon.
4. CAPTURE D'ÉCRAN NATIVE (WEB API) :
   - Utilise `navigator.mediaDevices.getDisplayMedia({ video: { displaySurface: 'browser' }, preferCurrentTab: true, selfBrowserSurface: 'include' })`.
   - Masque temporairement le panneau de formulaire pendant la capture, garde le rectangle de surbrillance, attend 400ms.
   - Calcule le ratio `videoWidth / innerWidth`.
   - Génère deux PNG en Canvas : vue "zone" (élément + marge 160px bornée au viewport) et vue "full" (viewport complet).
   - Dans le bloc `finally`, stoppe impérativement toutes les pistes (`track.stop()`) du flux vidéo.
   - Si refus ou SecurityError, gère l'erreur élégamment et propose le fallback manuel ("Win + Maj + S").
5. CONFIDENTIALITÉ ET SANITIZATION :
   - Ne capture AUCUNE valeur de champ (`input.value`, `textarea.value`, `select.value`).
   - Supprime les tokens, cookies et en-têtes d'authentification des métadonnées.
   - Remplace les textes non-libellés du DOM par "…".
   - Applique une regex d'anonymisation sur tous les textes : e-mails -> `[adresse]`, noms -> `[personne]`, nombres > 4 chiffres -> `[nombre]`.
   - Échappe tout le HTML/Markdown contre les injections XSS.
6. STOCKAGE ET EXPORT (MODES A ET B) :
   - Mode A (Par défaut) : Enregistre les métadonnées dans `localStorage` et les images Base64 dans `IndexedDB`.
   - Page "Mes retours" : Liste des retours, consultation, suppression, et bouton "Démarrer une nouvelle session" (purge les retours).
   - Génération d'archive ZIP avec la librairie `JSZip` : génère un fichier `retours-[projet]-AAAA-MM-JJ-HHhMM.zip` contenant `retours.md` et le dossier `images/` (`NN-id-zone.png`, `NN-id-ecran.png`).
   - Fournis le bouton "Copier le rapport" qui place le texte formaté en Markdown épuré dans le presse-papier.
Génère un code propre, modulaire, entièrement typé ou commenté, prêt à être exécuté sans bug.
```
