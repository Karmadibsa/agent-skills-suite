# 05 — Arbitrage Technique, Stack, Coûts & Build vs Buy

Statut : Référentiel Discovery & Roadmap V2.0 · Skill : project-discovery-validation

## 1. Principe : La Technologie Sert le Problème (Jamais l'Inverse)

L'architecture d'un projet doit découler exclusivement des contraintes métiers, de la valeur délivrée à l'utilisateur et des réalités d'exploitation. L'adoption premature de stacks complexes génère une dette organisationnelle et financière démesurée avant même la validation du Product-Market Fit.

### Principes Fondateurs

- Boring Technology First : Prioriser des technologies éprouvées, stables et maîtrisées. Le risque technique doit être réservé exclusivement au cœur de valeur métier. (Source : Dan McKinley, Choose Boring Technology).

- Local-First Architecture : Favoriser le traitement et la rétention des données au plus près de l'utilisateur (client-side, stockage local). La synchronisation cloud ne doit être qu'une option d'extension et non un prérequis de fonctionnement. (Source : Kleppmann et al., Local-First Software, 2019).

- Loi de Tesler (Conservation de la Complexité) : Toute application possède une quantité inhérente de complexité qui ne peut être réduite. Le choix d'ingénierie détermine uniquement qui la supporte : le développeur, le système ou l'utilisateur. L'arbitrage technique doit transférer cette complexité vers l'infrastructure la plus simple à maintenir.

## 2. Grille d'Arbitrage d'Architecture (5 Questions Structurantes)

Avant de valider tout composant d'une stack technique, l'équipe produit et ingénierie doit formaliser les réponses aux 5 questions ci-dessous :

### Question 1 : Local-First vs Cloud / Sync

- Question : L'utilisateur a-t-il réellement besoin d'un serveur distant et d'une authentification centralisée dès le Jalon 1 ?

- Arbitrage : Si les données peuvent être traitées localement via SQLite (WASM), IndexedDB ou des fichiers locaux (.json, .csv, .md), le serveur distant doit être différé.

- Bénéfices immédiats : Latence zéro, zéro coût d'hébergement serveur, conformité RGPD native par absence de collecte centralisée.

### Question 2 : Coût Récurrent & TCO (Total Cost of Ownership)

- Question : Quel est le coût fixe mensuel (infrastructure, bases de données managées, API payantes, stockage) si le projet tourne pendant 3 ans avec une charge modérée ?

- Cible obligatoire : Viser 0 € de coût fixe infrastructure tant que le besoin d'un serveur central n'est pas techniquement prouvé.

- Stratégie : Exploiter les offres Serverless / Edge et plateformes d'hébergement statique / Jamstack gratuites à privilégier par défaut : Netlify, Vercel, Cloudflare Pages et GitHub Pages (déploiement continu automatique à chaque git push, certificat HTTPS inclus, 0 €/mois pour les sites vitrines, prototypes HTML, PWA et frontends statiques).

- Bonnes pratiques : Vérifier systématiquement les limites de bande passante et d'exécution des fonctions serverless des offres gratuites avant de dépendre d'un backend lourd.

### Question 3 : Dépendances Externes & Risque de Panne

- Question : Quelle est la résilience du système face à la panne, au changement de tarif ou à l'arrêt d'une API tierce ?

- Arbitrage : Tout service externe constitue un point de défaillance unique (SPOF) et un risque financier.

- Règle : Isoler les API tierces derrière des interfaces d'abstraction et prévoir un mode dégradé ou un repli local (fallback).

### Question 4 : Portabilité des Données & Anti-Lock-in

- Question : L'utilisateur peut-il récupérer l'intégralité de ses données en un clic sans perte d'information ?

- Règle : L'application doit supporter l'export immédiat dans un format standard ouvert (JSON, CSV, Markdown, dump SQLite). Aucun format propriétaire non documenté ne doit être utilisé pour le stockage principal.

### Question 5 : Compatibilité avec les Compétences de Maintenance

- Question : La stack choisie permet-elle une maintenance rapide par un développeur isolé ou un assistant IA ?

- Arbitrage : Bannir les frameworks exotiques ou trop récents. Sélectionner des écosystèmes largement documentés avec un support communautaire massif (TypeScript, React/Next.js, Python, Tailwind, SQLite).

## 3. Matrice Build vs Buy / Open Source (Coder vs Réutiliser)

| Catégorie de Fonctionnalité | Type de Solution / Exemples | Condition d'Arbitrage |
| --- | --- | --- |
| Composants UI / Accessibilité | Radix UI, Shadcn/UI, TailwindCSS | Ne jamais recoder la gestion du focus, des ARIA attributes ou du rendu de base. |
| Visualisation & Graphiques | Recharts, Chart.js, Tremor | Utiliser des bibliothèques clés en main pour l'affichage de métriques. |
| Édition de Texte / WYSIWYG | Tiptap, Lexical, CodeMirror | L'écriture d'un moteur d'édition de texte à la main est strictement interdite. |
| Traitement & Parsing Fichiers | PapaParse (CSV), JSZip, PDF-lib | Exploiter les parsers open-source testés par la communauté. |
| Logique Métier Spécifique | Algorithmes propriétaires, règles métiers | Coder sur mesure uniquement la brique apportant la valeur différenciante. |

### Règles Opérationnelles (DO)

- DO : Vérifier la licence logicielle des dépendances (MIT, Apache 2.0, BSD prioritaires ; GPL/AGPL soumises à validation).

- DO : Évaluer l'activité des dépôts Open Source (dernier commit < 6 mois, nombre d'issues ouvertes contrôlé, communauté active).

- DO : Maintenir un inventaire strict des packages installés et auditer régulièrement les vulnérabilités (npm audit, Snyk).

### Interdits Stricts (DON'T)

- DON'T : Ne pas développer un moteur de rendu ou un parser complexe sur mesure si une solution robuste existe sur le marché.

- DON'T : Ne pas déployer une architecture microservices ou multi-serveurs pour un produit en phase d'exploration ou de validation.

- DON'T : Ne pas lier l'application à un service Cloud propriétaire empêchant l'exécution en environnement local.

## 4. Grille de Validation QA (Checklist de Contrôle Technique)

Avant tout passage en phase de développement ou de déploiement d'un jalon, la stack et les choix d'ingénierie doivent valider l'intégralité de la grille ci-dessous.

| N° | Point de Contrôle | Critère d'Acceptation |
| --- | --- | --- |
| 1 | Justification Stack | La stack s'appuie exclusivement sur des technologies éprouvées et maîtrisées (Boring Stack). |
| 2 | TCO Infrastructure | Le coût fixe récurrent mensuel pour le Jalon 1 est égal à 0 €. |
| 3 | Architecture Données | Le modèle favorise le Local-First ; l'application reste fonctionnelle sans connexion serveur si applicable. |
| 4 | Reversibilité & Export | Une fonction d'export complet des données (format .json ou .csv) est opérationnelle. |
| 5 | Conformité Licences | 100 % des dépendances Open Source réutilisées disposent d'une licence permissive (MIT, Apache, BSD). |
| 6 | Absence de Sur-Ingénierie | Aucun composant générique (authentification, UI complexe, parsers) n'a été codé sur mesure sans justification. |
| 7 | Abstraction Services | Toutes les API tierces payantes ou instables sont isolées derrière une couche d'interface d'inversion de dépendance. |

## 5. Signatures et Validation d'Arbitrage


Lead Architect / Lead Developer


Product Manager / Owner

Date de validation :
