## Agent Skills Suite — Référentiel Scientifique & Opérationnel pour IA (0 €/mois)

Suite open source de 7 Agent Skills conformes à agentskills.io (Skills 0 à 5 + audit transverse 360°) pour guider les IA de développement (Claude Code, Cursor, Codex, ChatGPT) sans complaisance, sans slop et à 0 €/mois (hébergements gratuits Netlify / Vercel / Cloudflare Pages / GitHub Pages).

### 1. Vue d'Ensemble & Architecture Progressive

Le standard agentskills.io charge d'abord le frontmatter YAML (~100 tokens), puis le SKILL.md orchestrateur, et enfin uniquement les fiches de references/ nécessaires à la tâche en cours. Cela évite la saturation du contexte (Lost in the Middle) et maintient une rigueur constante.

| Ordre | Skill | Mission principale | Normes & Méthodes clés |
| --- | --- | --- | --- |
| 0 | project-discovery-validation | Cadrage produit, recherche terrain (GitHub, Reddit, concurrents), validation/infirmation scientifique, contre-argument & alternative 3× plus simple, prototypes HTML (+ « Bug ou idée ? »), Roadmap en 5 jalons & génération initiale d'AGENTS.md/CLAUDE.md. | JTBD (3 dimensions), Kano (5 catégories), RICE, Deci & Ryan, Sweller/Cowan, Popper, The Mom Test, Local-First. |
| 1 | product-spec-docs | Cahier des charges exécutable (00 — LIRE EN PREMIER, statuts verrouillés, documentation duale Utilisateur vs IA), personas, user stories INVEST, BDD/Gherkin, règles métier chiffrées + 8 cas limites, ADR, CHANGELOG & lots atomiques. | ISO/IEC/IEEE 29148, BDD/Gherkin, ADR (Nygard), Ubiquitous Language, Keep a Changelog, SemVer. |
| 2 | ux-ui-design | Ergonomie cognitive, accessibilité WCAG 2.2 AA, mobile à une main & desktop, filtrage intelligent, gestion claire des erreurs, data visualisation & chasse au slop IA + module « Bug ou idée ? ». | WCAG 2.2 AA, WAI-ARIA APG, ISO 9241, Fitts, Hick, Cowan, NN/g, Baymard. |
| 3 | api-data-architecture | Modélisation relationnelle/locale (3NF/BCNF, UUIDv7/v4, UTC RFC 3339, types financiers exacts), migrations sûres (Expand-Contract & SQLite WAL), imports dry-run, API REST / RFC 9457 & RGPD. | 3NF/BCNF, RFC 9562, RFC 9457, OpenAPI 3.1, RGPD Art. 5/6/17/20/25/28/32, Argon2id, AES-256-GCM. |
| 4 | clean-code-security | Architecture modulaire KISS (découplage domaine/UI, Rule of Three), sécurité OWASP Top 10 / ASVS & secrets, hygiène Git (zéro fichier *_old/*_backup, .gitignore/.gitattributes) & scripts 1-commande (start.bat / start.sh). | ISO/IEC 25010:2023, OWASP Top 10 / ASVS, CWE, NIST SSDF SP 800-218, Conventional Commits. |
| 5 | qa-perf-observability | Pyramide des tests ISTQB, tests E2E Playwright accessibles par rôles ARIA + axe-core, Core Web Vitals (p75), sobriété RGESN 2024, résilience offline & logs structurés JSON sans PII. | ISTQB, WAI-ARIA / Testing Library, Core Web Vitals (LCP, INP, CLS), RGESN 2024, RGPD logs. |
| Transverse | full-project-audit | Audit 360° en lecture seule (profils conditionnels, gravité P0–P3, CVSS v4.0, rigueur des preuves exécuté vs supposé, principe KISS & Perspective Table Rase, plan de remédiation par lots). | ISO/IEC 25010, OWASP ASVS, CVSS v4.0, NIST SSDF, WCAG 2.2. |

### 2. Taxonomie des Niveaux de Preuve ([N1]–[N6])

- [N1] : Exigence réglementaire, légale ou de sécurité vérifiée (RGPD, accessibilité légale).

- [N2] : Résultat scientifique publié ou principe fondamental vérifié.

- [N3] : Signal terrain vérifié, norme ou référentiel reconnu (OWASP, WCAG, RGESN, NN/g, Baymard).

- [N4] : Standard ou convention d'ingénierie logicielle éprouvée (RFC 9457, SemVer, KISS).

- [N5] : Hypothèse produit ou choix d'implémentation contextualisé.

- [N6] : Intuition brute ou piste à tester avant investissement.

### 3. Évolutions & Angles à Consolider (Synthèse Audit Global)

L'audit global met en évidence des fondations solides et propose des améliorations concrètes : harmoniser les index (00/00B), dédoublonner ou clarifier les fiches de formulaires/optimisation d'espace, formaliser les 3 extensions recommandées (release-deployment, maintenance-incident, oss-governance) et déployer un site vitrine interactif sur Netlify (démo Avant/Après + testeur « Bug ou idée ? »).
