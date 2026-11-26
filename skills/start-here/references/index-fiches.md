# Index des fiches de la suite

<!-- Généré par scripts/check_skills.py --fix à partir des tables de routage des SKILL.md. Ne pas modifier à la main. -->

Utilisation : repérer la ligne qui correspond à la tâche, charger le SKILL.md du skill indiqué, puis seulement la fiche citée. Les chemins sont relatifs au dossier où les skills sont installés. Si le skill n'est pas installé, le signaler à l'utilisateur.

## api-data-architecture

Référentiel d'ingénierie des données, modélisation relationnelle/locale (SQLite/PostgreSQL), migrations sans perte, contrats d'API REST/JSON (OpenAPI 3.1, RFC 9457) et conformité RGPD Privacy-by-Design. À activer dès qu'on conçoit ou modifie un schéma de base…

| Fiche | Contenu | Quand la charger |
| --- | --- | --- |
| `api-data-architecture/references/00-index-persistance-preuves.md` | Taxonomie des preuves [N1] à [N6] · Principes ACID & fondements Local-First · Règles de cohérence stricte avec le cahier des charges | Toujours obligatoire dès l'activation du skill |
| `api-data-architecture/references/01-modelisation-indexation-migrations.md` | Normalisation relationnelle (3NF mesurée) · Typage strict (UUIDv7/v4, décimaux exacts, UTC ISO 8601) · Contraintes (FOREIGN KEY, UNIQUE, CHECK) & indexation · Protocole de migrati… | Dès qu'on crée ou modifie un schéma SQLite / PostgreSQL / IndexedDB |
| `api-data-architecture/references/02-contrats-api-erreurs-pagination.md` | Conception d'API REST/JSON claire · En-têtes d'idempotence (Idempotency-Key) · Pagination par curseur ou pages bornées · Codes HTTP sémantiques et format d'erreur RFC 9457 | Dès qu'on conçoit ou documente des endpoints ou échanges front/back |
| `api-data-architecture/references/03-privacy-chiffrement-sauvegardes-rgpd.md` | Privacy by Design (RGPD Art. 5 & 25) & minimisation · Chiffrement au repos et en transit · Anonymisation / Soft-Delete et conservation légale · Sauvegardes, restauration et export… | Dès que l'application stocke des données utilisateurs ou sensibles |

## clean-code-security

Référentiel d'architecture logicielle propre (KISS, SOLID mesuré, séparation domaine/UI), de sécurité applicative (OWASP Top 10 / ASVS, gestion des secrets), d'hygiène Git (zéro fichier mort) et d'automatisation locale (scripts de lancement racine). À activer…

| Fiche | Contenu | Quand la charger |
| --- | --- | --- |
| `clean-code-security/references/00-index-clean-code-preuves.md` | Taxonomie des niveaux de preuve [N1] à [N6], primauté du principe KISS sur la sur-abstraction, et règles de qualité logicielle ISO/IEC 25010. | Obligatoire (Toujours actif) |
| `clean-code-security/references/01-architecture-modulaire-kiss-decouplage.md` | Séparation stricte Domaine Métier / Persistance / Interface UI, application pragmatique des principes SOLID, gestion explicite des erreurs typées, nommage expressif et limitation… | Structure, écriture ou refactoring de code métier ou UI |
| `clean-code-security/references/02-securite-applicative-owasp-secrets.md` | Application des contrôles OWASP Top 10 et OWASP ASVS : validation stricte aux frontières, requêtes paramétrées anti-SQLi, échappement anti-XSS, protection CSRF, contrôle d'accès B… | Manipulation d'entrées utilisateur, auth, fichiers ou réseau |
| `clean-code-security/references/03-hygiene-git-nettoyage-scripts-locaux.md` | Propreté du dépôt (absence de fichiers *_old, *_backup, *_v2 ou de code commenté), configuration strict du .gitignore, commits atomiques (Conventional Commits), versionnement SemV… | Création de dépôt, fin de lot ou phase de nettoyage |

## full-project-audit

Audit 360° d'un dépôt logiciel en lecture seule (gouvernance, sécurité, architecture KISS, données/API, UX/WCAG, tests/performance) avec gravité P0–P3, preuves vérifiées et plan de remédiation par lots.

| Fiche | Contenu | Quand la charger |
| --- | --- | --- |
| `full-project-audit/references/00-methodologie-audit-gravite.md` | Gravité P0–P3, règles d'honnêteté, lecture seule, KISS / Table Rase | Toujours (dès l'activation) |
| `full-project-audit/references/01-grille-inspection-multi-domaine.md` | Profils d'audit et contrôles Blocs A à F (dont CHK-UX-01 à 04) | Toujours (lors de l'inspection) |
| `full-project-audit/references/02-template-rapport-remediation.md` | Format du rapport, correctifs P0/P1, Table Rase et lots de remédiation | Pour rédiger le rapport final |

## legal-compliance

Conformité juridique d'un site ou d'une application en France et dans l'UE — mentions légales (LCEN), politique de confidentialité et registre RGPD, bandeau et gestion des cookies (lignes directrices CNIL), CGU, CGV B2C et B2B (Code de la consommation, Code d…

| Fiche | Contenu | Quand la charger |
| --- | --- | --- |
| `legal-compliance/references/00-cadre-qualification-sources.md` | Qualification du projet (éditeur, public, données, vente), matrice des obligations, sources officielles, niveaux de preuve | Toujours, avant toute rédaction |
| `legal-compliance/references/01-mentions-legales.md` | Contenu obligatoire des mentions légales selon le type d'éditeur, hébergeur, cas du particulier, modèle | Tout site ou application publiée |
| `legal-compliance/references/02-rgpd-confidentialite-cookies.md` | Politique de confidentialité, bases légales, durées, droits, registre, sous-traitants, transferts, violations, cookies et traceurs | Dès qu'une donnée personnelle est collectée ou qu'un traceur non exempté est déposé |
| `legal-compliance/references/03-cgu-cgv.md` | CGU, CGV B2C (information précontractuelle, rétractation, garanties, médiation) et B2B (paiement, pénalités), modèles de plan | Compte utilisateur, contenu publié par des utilisateurs, vente ou abonnement |
| `legal-compliance/references/04-mise-en-oeuvre-verification.md` | Intégration dans le produit (pages, liens, bandeau cookies sans dark pattern, formulaires, tunnel de commande), checklist QA, accessibilité | Au moment d'intégrer les documents et avant la mise en ligne |

## maintenance-incident

Référentiel de support post-déploiement, de triage structuré des incidents et retours utilisateurs, de restauration/sauvegarde et de maintenance corrective sans dette. À activer lors d'un incident, d'un bug signalé en production/usage réel ou d'une opération…

Pas de fiche listée dans la table de routage : lire le SKILL.md.

## oss-governance

Référentiel de gouvernance open source (licences SPDX, compatibilité des dépendances, audit SCA, SECURITY.md et CODEOWNERS) pour maintenir un dépôt sain à 0 €/mois. À activer lors de la création d'un dépôt open source, de l'ajout de dépendances tierces ou d'u…

Pas de fiche listée dans la table de routage : lire le SKILL.md.

## product-spec-docs

Référentiel d'ingénierie des exigences (ISO/IEC/IEEE 29148), de rédaction de cahier des charges exécutable par IA (00 — LIRE EN PREMIER, statuts verrouillés, BDD/Gherkin, ADR, Changelog) et de structuration GitHub (README, Issues, PR, lots atomiques). À activ…

| Fiche | Contenu | Quand la charger |
| --- | --- | --- |
| `product-spec-docs/references/00-index-hierarchie-sources.md` | Règle du 00 — LIRE EN PREMIER, périmètre négatif, hiérarchie des 6 sources de vérité, statuts de décision et lien avec les Gates du Skill 0. | Toujours obligatoire à l'activation. |
| `product-spec-docs/references/01-personas-user-stories-bdd.md` | Personas ancrés sur des faits terrain (Cooper / NN/g), User Stories (INVEST), parcours utilisateurs et critères d'acceptation Gherkin (nominal, alternatif, erreur). | Lors de la définition des besoins et scénarios utilisateurs. |
| `product-spec-docs/references/02-regles-metier-donnees-edge-cases.md` | Règles métier déterministes (RM-XX avec exemple chiffré + contre-exemple), exigences non fonctionnelles (NFR), Modèle Conceptuel de Données (MCD Mermaid + automates d'états) et ma… | Lors du verrouillage de la logique métier, des données et des cas limites. |
| `product-spec-docs/references/03-adr-changelog-memoire-projet.md` | Carnet de décisions (ADR immuables), Glossaire Métier Unique (Ubiquitous Language), gestion des baselines documentaires, CHANGELOG.md (Keep a Changelog + SemVer) et protocole docs… | Pour la gouvernance long terme et la continuité inter-sessions IA. |
| `product-spec-docs/references/04-lots-atomiques-git-readme.md` | Découpage en Lots Atomiques (1 lot = 1 micro-session IA), Definition of Ready / Done, matrice de traçabilité (US ↔ RM ↔ BDD ↔ LOT ↔ Test), README.md 1-command, labels GitHub et te… | Lors de la préparation du dépôt Git et du plan d'exécution développeur. |

## project-discovery-validation

Référentiel scientifique et méthodologique de cadrage produit, d'analyse de l'existant (GitHub, Reddit, concurrents), de validation/infirmation des fonctionnalités par la science et de construction de Roadmap (Jalon 0 → Jalon 1 → Jalon 2 → Jalon 3 → Jalon 4+)…

| Fiche | Contenu | Quand la charger |
| --- | --- | --- |
| `project-discovery-validation/references/00-index-anti-complaisance.md` | Taxonomie des preuves [N1] à [N6], règles anti-complaisance proportionnelles et index maître. | Toujours obligatoire à l'activation du Skill. |
| `project-discovery-validation/references/01-analyse-existant-terrain.md` | Méthodologie d'exploration GitHub (dépôts, issues), Reddit, forums spécialisés, bricolages utilisateurs et matrice concurrentielle. | Dès le démarrage d'un projet ou l'évaluation d'une fonctionnalité majeure. |
| `project-discovery-validation/references/02-sens-features-validation-scientifique.md` | JTBD (3 dimensions), modèle de Kano (5 catégories), SDT, Sweller/Cowan, Popper, score RICE, registre des risques/RGPD, North Star Metric et Lean Business Case. | Pour chaque fonctionnalité ou sous-ensemble fonctionnel proposé. |
| `project-discovery-validation/references/03-construction-roadmap.md` | Découpage en 5 jalons (Jalon 0 → Jalon 4+), portes de passage (Gates 0 à 4), découverte continue (Continuous Discovery) et articulation Kano + RICE + MoSCoW. | Dès la structuration globale d'un projet ou la planification de versions. |
| `project-discovery-validation/references/04-protocole-recherche-scientifique.md` | Hiérarchie de fiabilité des sources, protocole en 4 étapes inspiré de PRISMA, bases gratuites (Google Scholar, PubMed, Semantic Scholar) et règles anti-hallucination. | Dès qu'on évalue la validité psychologique, ergonomique ou comportementale d'une idée. |
| `project-discovery-validation/references/05-arbitrage-technique-stack-couts.md` | Local-First vs Cloud, coût total (TCO à 0 €/mois), dépendances externes, portabilité des données, hébergements statiques/edge gratuits (Netlify, Vercel, Cloudflare Pages, GitHub P… | Lors du choix de la stack ou de l'évaluation de faisabilité technique. |
| `project-discovery-validation/references/06-validation-terrain-prototypes-html.md` | Protocole de maquettes HTML interactives réalistes avec module « Bug ou idée ? » embarqué et tests utilisateurs (Nielsen segmenté + The Mom Test). | Avant de passer au développement complet (Gate 2). |
| `project-discovery-validation/references/07-anti-patterns-produit-et-cas.md` | Catalogue des 8 anti-patterns produit, 3 études de cas Avant/Après, prompt maître et protocole de benchmark (Avec vs Sans Skill 0). | Lors de tout arbitrage de périmètre MVP ou revue d'idées. |

## qa-perf-observability

Référentiel d'assurance qualité logicielle (Pyramide des tests, tests E2E Playwright accessibles par rôles ARIA, non-régression), d'optimisation des performances (Core Web Vitals p75), de sobriété numérique (RGESN) et d'observabilité sans PII. À activer pour…

| Fiche | Contenu | Quand la charger |
| --- | --- | --- |
| `qa-perf-observability/references/00-index-pyramide-tests-preuves.md` | Taxonomie des preuves [N1]–[N6], Pyramide des tests (Mike Cohn) et stratégie de validation proportionnelle | Toujours obligatoire dès l'activation du skill |
| `qa-perf-observability/references/01-tests-e2e-accessibles-recette.md` | Rédaction de tests E2E résilients (Playwright / Testing Library : ciblage par rôles ARIA getByRole / getByLabel plutôt que sélecteurs CSS/XPath fragiles), tests automatisés d'acce… | Dès qu'on écrit ou exécute des tests fonctionnels ou E2E |
| `qa-perf-observability/references/02-performance-cwv-sobriete-rgesn.md` | Optimisation Core Web Vitals (LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 au 75e percentile), budgets JS/CSS/images (WebP/AVIF, WOFF2), élimination des requêtes N+1, résilience offline… | Dès qu'on optimise les temps de chargement, la consommation mémoire/réseau ou l'éco-conception |
| `qa-perf-observability/references/03-observabilite-logs-sans-pii.md` | Journalisation structurée JSON, niveaux de logs (INFO, WARN, ERROR), masquage strict des données personnelles (Zero PII RGPD), identifiant de corrélation (request_id) et indicateu… | Dès qu'on instrumente une application ou qu'on prépare la mise en production |

## release-deployment

Référentiel de mise en version (SemVer 2.0.0), de builds reproductibles, de publication de releases et de déploiement à 0 €/mois (Netlify, Vercel, Cloudflare Pages, GitHub Pages, GitHub Actions) avec plan de rollback. À activer lors de la préparation d'une ve…

Pas de fiche listée dans la table de routage : lire le SKILL.md.

## ux-art-direction

Direction artistique d'une interface sans slop — modèle de lumière et élévation cohérents, typographie et couleurs de marque, bordures et ombres, règles d'un bon logo, archétypes produits (outil SaaS, finance, mobile grand public, productivité, agent IA) avec…

| Fiche | Contenu | Quand la charger |
| --- | --- | --- |
| `ux-art-direction/references/06-direction-artistique-logos-refs.md` | Ce qui fait une DA premium, lumière et élévation, bordures, ombres, typographie, logos, archétypes produits et matrice de brief | Identité visuelle, charte graphique, refonte esthétique, brief visuel |

## ux-dataviz-admin

Règles pour les graphiques, dashboards et interfaces d'administration — choix du graphique selon l'intention analytique (tendance, comparaison, répartition, distribution), différence entre dashboard opérationnel et analytique, tableaux denses, maîtrise du déf…

| Fiche | Contenu | Quand la charger |
| --- | --- | --- |
| `ux-dataviz-admin/references/09-admin-dataviz-performance-scroll.md` | Grammaire des graphiques (Cleveland & McGill), back-office et dashboards, limitation du scroll, Core Web Vitals, chargement progressif | Graphique, dashboard, tableau de données, back-office, performance perçue |

## ux-feedback-module

Spécification et implémentation du module de retour contextuel « Bug ou idée ? » — sélection d'un élément de la page, description, capture optionnelle, diagnostic technique anonymisé, stockage local et export ZIP ou API, avec blocage des captures sur les donn…

| Fiche | Contenu | Quand la charger |
| --- | --- | --- |
| `ux-feedback-module/references/08-bug-ou-idee-feedback-contextuel.md` | Fondements, spécification technique et fonctionnelle, matrice de 15 tests QA, prompt d'implémentation | À chaque ajout, modification ou audit du module |

## ux-forms-navigation

Règles d'ergonomie pour les formulaires, modales, navigation, listes, kanban, statuts et l'adaptation mobile à une main / desktop clavier. Choix du bon champ selon le nombre d'options, validation inline, modales stables, sidebar ou topbar, densité et optimisa…

| Fiche | Contenu | Quand la charger |
| --- | --- | --- |
| `ux-forms-navigation/references/05-desktop-et-mobile-une-main.md` | Zone du pouce, cibles tactiles, navigation basse sur mobile ; densité, raccourcis clavier et focus sur desktop | Dès que l'écran doit fonctionner sur mobile, desktop ou les deux |
| `ux-forms-navigation/references/10-navigation-listes-kanban-statuts.md` | Sidebar ou topbar, éviter les écrans dans les écrans, listes et kanban accessibles, statuts triple-codés, interfaces pour non-informaticiens | Navigation d'application, vues de gestion, listes, tableaux, statuts |
| `ux-forms-navigation/references/11-formulaires-modales-espace.md` | Modales stables, matrice de choix des champs, validation « tôt pour récompenser, tard pour punir », navigations hybrides, zone utile | Formulaire, assistant multi-étapes, modale, tiroir, écran dense |

## ux-ui-design

Socle de conception, d'implémentation et d'audit d'interfaces (Web, SaaS, mobile, desktop) — workflow en 10 étapes, registre des règles et niveaux de preuve, lois cognitives, architecture de l'information, feedback et états vides, accessibilité WCAG 2.2, anti…

| Fiche | Contenu | Quand la charger |
| --- | --- | --- |
| `ux-ui-design/references/00B-registre-central-regles.md` | Source unique de vérité, matrice des 6 niveaux de preuve ([N1] à [N6]), mécanismes d'arbitrage et résolution formelle des contradictions. | Toujours obligatoire (Lecture initiale systématique) |
| `ux-ui-design/references/01-fondamentaux-cognitifs.md` | Psychologie cognitive appliquée : Lois de Fitts, Hick-Hyman, Cowan (4±1), Jakob, Tesler, Gestalt, Effet Doherty. | Toujours (Socle conceptuel d'ergonomie) |
| `ux-ui-design/references/02-architecture-info-divulgation.md` | Divulgation progressive (3 niveaux), patterns de balayage visuel (F, Z, Layer-cake), microcopy fonctionnelle, hiérarchie par le vide (Spacers 8pt). | Toujours (Structure et lisibilité de page) |
| `ux-ui-design/references/03-onboarding-icones-feedback.md` | Minimisation du Time-to-First-Value (TTFV), Empty States constructifs, grammaire d'icônes, pattern Toast avec Undo, états de chargement (Skeleton UI vs Spinners). | Dès qu'il y a un parcours utilisateur, des formulaires ou des actions CRUD |
| `ux-ui-design/references/04-accessibilite-typo-couleurs-motion.md` | Conformité WCAG 2.2 (AA/AAA), échelles typographiques fluides, palettes perceptuelles OKLCH, animations à valeur informative & gestion de prefers-reduced-motion. | Dès qu'on définit ou audite le Design System, les variables CSS ou l'accessibilité |
| `ux-ui-design/references/07-anti-patterns-et-anti-slop.md` | Liste noire des anti-patterns d'interfaces IA, règles strictes d'éradication du slop visuel/structurel/textuel/code, grille et prompt d'audit pré-livraison. | Avant toute génération de code frontend ou revue de conception |
| `ux-ui-design/references/12-coga-humain-ia-ethique-i18n.md` | Recommandations cognitives W3C COGA, guidage des interactions Humain-IA, prévention des Dark Patterns, internationalisation (LTR/RTL) & gestion de l'état déconnecté. | Interfaces intégrant de l'IA, applications internationales ou public spécifique |

## Compléments externes (facultatifs)

Skills tiers qui complètent la suite sur des points précis. Ils ne font pas partie de la suite, ne sont pas vérifiés par elle et peuvent changer : les proposer seulement si la tâche le justifie, et laisser l'utilisateur décider de les installer.

| Complément | Apport | Quand le proposer | Installation |
| --- | --- | --- | --- |
| [emilkowalski/skills](https://github.com/emilkowalski/skills) | Animation d'interface : courbes, durées, entrées et sorties, revue des animations | Travail fin sur le mouvement, en plus de `ux-ui-design` et `ux-art-direction` | `npx skills add emilkowalski/skills` |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | Goût visuel pour les pages marketing : mises en page de hero, un ou deux moments forts par page | Site vitrine ou landing page, en plus de `ux-art-direction` | `npx skills add https://github.com/Leonxlnx/taste-skill --skill design-taste-frontend` |
| [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines) | Liste de contrôle d'interface web : interactions, animation, mise en page, contenu | Revue finale d'une interface web | Lire le README du dépôt |
