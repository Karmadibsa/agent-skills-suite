# 01 — Tests Automatisés E2E Accessibles, Non-Régression & Recette QA

Statut : Référentiel QA, Performance & Sobriété V2.0 · Skill : qa-perf-observability

## 1. Principe Fondamental : Tester Comme un Utilisateur (Testing Library & WAI-ARIA) [N3]

Règle d'or : « Plus vos tests ressemblent à la façon dont votre logiciel est utilisé, plus ils vous donnent confiance. » — Kent C. Dodds

L'objectif premier d'une suite de tests End-to-End (E2E) est de valider le comportement de l'application du point de vue de l'utilisateur final. Les tests ne doivent jamais s'appuyer sur les détails d'implémentation interne (noms de fonctions, structures DOM internes, styles CSS).

### Hiérarchie stricte des sélecteurs E2E (Playwright / Testing Library)

Pour garantir des tests résilients au refactoring et alignés sur l'accessibilité web, l'adoption de la hiérarchie de sélecteurs suivante est obligatoire :

- Priorité 1 — Rôles accessibles & libellés visibles (Obligatoire par défaut)

- Utilisation prioritaire des requêtes basées sur l'arbre d'accessibilité.

- Exemples : getByRole('button', { name: 'Enregistrer le budget' }), getByLabel('Montant'), getByText('Aucune transaction').

- Double avantage : Si le test parvient à cibler un élément via son rôle sémantique et son nom accessible, cela valide simultanément que l'élément est lisible et utilisable par les technologies d'assistance (lecteurs d'écran).

- Priorité 2 — Attributs sémantiques / placeholders / alt

- À utiliser lorsque les rôles sémantiques primaires ne suffisent pas à différencier l'élément.

- Exemples : getByPlaceholder('Ex: 50.00'), getByAltText('Logo entreprise').

- Priorité 3 — Identifiant de test explicite (data-testid)

- Usage d'exception : À réserver uniquement en dernier recours, lorsqu'un élément ne possède aucun rôle accessible, texte visible ou libellé exploitable (ex. une zone de dessin canvas, un composant graphique complexe ou une cellule spécifique de tableau dynamique).

- Exemple : getByTestId('budget-chart-canvas').

### Interdictions Absolues (DON'T)

- Sélecteurs CSS fragiles : Interdiction de cibler par classes CSS (ex. locator('.btn-primary-v2') ou locator('.active-tab')). Ces classes évoluent lors des refactorings graphiques et provoquent des échecs de tests injustifiés.

- Structures DOM rigides : Interdiction des requêtes dépendant de la hiérarchie HTML (ex. locator('div > div:nth-child(3) > span')).

- XPath absolus : Interdiction totale des sélecteurs XPath basés sur la structure du document (ex. /html/body/div[2]/form/button).

## 2. Intégration de l'Audit d'Accessibilité Automatisé (axe-core) [N1 / N3]

L'accessibilité numérique (a11y) fait partie intégrante de la qualité logicielle. Tout parcours utilisateur E2E doit inclure une vérification automatisée des règles fondamentales d'accessibilité WAI-ARIA.

### Mise en œuvre automatisée

- Intégrer le package @axe-core/playwright au sein de la suite E2E.

- Assurer une exécution systématique de l'analyseur sur l'ensemble des pages et états critiques du parcours utilisateur (ex. ouverture d'un dialogue, soumission d'un formulaire, affichage des messages d'erreur).

- L'audit automatisé doit lever une erreur et faire échouer le build en cas de violation des critères fondamentaux :

- Contrastes de couleurs insuffisants.

- Libellés et labels manquants sur les champs de saisie.

- Rôles et attributs ARIA invalides ou mal imbriqués.

- Absence d'attribut lang sur le document HTML.

### Nuance Opérationnelle Obligatoire [N1]

Les outils de détection automatisés basés sur axe-core permettent d'identifier environ ~50–57 % des problèmes courants d'accessibilité (étude Deque Systems). Cependant, un rapport axe-core sans erreur critique/sérieuse (impact: critical | serious) ne garantit pas la conformité complète WCAG 2.2 AA.

Obligation complémentaire : Les audits automatisés doivent obligatoirement être complétés par une vérification clavier (Tab, Shift+Tab, Enter, Space, Esc) et un lecteur d'écran (NVDA / VoiceOver) afin de valider :

- La visibilité permanente de l'indicateur de focus (focus-visible).

- L'ordre logique de prise de focus au travers des formulaires et structures de navigation.

- Le piège à focus (focus trap) à l'intérieur des modales et fenêtres superposées, ainsi que sa fermeture via la touche Esc.

## 3. Prévention des Tests Instables (Flaky Tests) [N4]

Les tests instables sapent la confiance dans la suite de recette et ralentissent le cycle de livraison. Leur éradication constitue une priorité absolue de l'équipe QA.

### Anti-patterns à proscrire (DON'T)

- Attentes temporelles arbitraires : Utilisation stricte interdite de page.waitForTimeout(3000), sleep(2) ou équivalents. Ces attentes arbitraires ralentissent inutilement l'exécution en CI et échouent inévitablement lorsque l'agent d'exécution est sous forte charge.

### Règles d'or opérationnelles (DO)

- Assertions auto-attendantes (Auto-waiting) :
Utiliser exclusivement les assertions natives de Playwright qui réessayent automatiquement jusqu'à ce que la condition soit remplie ou que le timeout global soit atteint.

- Exemple 1 : await expect(page.getByRole('button', { name: 'Valider' })).toBeVisible();

- Exemple 2 : await expect(page.getByRole('alert')).toHaveText('Enregistrement réussi');

- Isolation totale des données de test :
Chaque scénario E2E doit être rigoureusement indépendant et autonome.

- Aucun test ne doit dépendre du résultat ou de l'état laissé par un test précédent.

- Chaque test doit initialiser et nettoyer son propre état via un nettoyage systématique après chaque test (afterEach / base SQLite en mémoire isolée + seed déterministe, transactions isolées ou fixtures dédiées).

- Les tests doivent pouvoir être exécutés en parallèle ou dans un ordre aléatoire sans générer d'échec.

## 4. Plan de Recette & Non-Régression Avant Livraison (ISTQB) [N4]

Le plan de recette s'appuie sur la méthodologie ISTQB pour structurer la validation fonctionnelle et technique avant le passage en production.

### Périmètre des Tests de Non-Régression Obligatoires

- Parcours nominal de bout en bout (Happy Path)

- Séquence complète d'opérations métiers : Création, Lecture, Modification, Suppression avec possibilité d'annulation (CRUD + Undo).

- Validation de la persistance effective et de la cohérence des états affichés.

- Tests négatifs et cas limites (Edge Cases)

- Saisies invalides : Validation des règles de gestion sur les formulaires (format d'email, valeurs hors bornes, caractères spéciaux).

- Fichiers hors gabarit : Tentative d'import de fichiers mal formatés ou dépassant la taille maximale autorisée.

- Robustesse de l'UI : Résistance aux doubles-clics rapides sur les boutons d'action (prévention des requêtes en double).

- Résilience réseau : Comportement de l'application en cas de déconnexion soudaine ou de latence réseau élevée (affichage de messages d'erreur gracieux).

- Validation Responsive & Multi-Écrans

- Pour les applications Web / UI adaptatives, exécution obligatoire de l'ensemble de la suite E2E critique multi-écrans et cross-browser (ex. Chromium + Firefox) sur au moins deux configurations d'affichage (s'adapte en tests CLI/WebView pour les apps natives/CLI) :

- Mobile Portrait : Viewport 375×812 (émulation d'appareil mobile).

- Desktop Standard : Viewport 1440×900.

- Vérification de l'absence de chevauchement de texte, d'éléments cliquables trop proches ou de perte d'accès aux fonctionnalités principales.

- Tests de contrats d'API

- Validation systématique des réponses JSON et des erreurs RFC 9457 par rapport au schéma OpenAPI.

- Tests de restauration de sauvegarde

- Vérification de la procédure d'importation d'un export JSON/SQLite et validation rigoureuse de l'intégrité des données restaurées.

## 5. Grille de Validation QA des Tests (7 points de contrôle)

Toute PR contenant des tests automatisés E2E doit être évaluée selon la grille de contrôle ci-dessous avant d'être validée.

| N° | Point de Contrôle | Critère de Validation | Conformité |
| --- | --- | --- | --- |
| 1 | Sélecteurs Accessibles | Utilisation prioritaire de getByRole, getByLabel ou getByText. Absence de sélecteurs par classe CSS ou XPath. | [ ] Validé |
| 2 | Absence de Délais Fixes | Aucun appel à waitForTimeout() ou d'attente passive sleep présent dans le code. | [ ] Validé |
| 3 | Assertions Robustes | Utilisation d'assertions auto-attendantes (expect(...).toBeVisible(), etc.). | [ ] Validé |
| 4 | Isolation des Données | Le test crée et nettoie ses propres données (état indépendant, exécutable en parallèle). | [ ] Validé |
| 5 | Couverture Accessibilité | Passage de l'audit @axe-core/playwright sans erreur bloquante sur le parcours. | [ ] Validé |
| 6 | Exécution Multi-Écrans | Test exécuté et validé sur les viewports Mobile (375×812) et Desktop (1440×900). | [ ] Validé |
| 7 | Gestion des Erreurs | Validation des cas d'erreur (saisies invalides, coupure réseau) et affichage des messages utilisateur. | [ ] Validé |
