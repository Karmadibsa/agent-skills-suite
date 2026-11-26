# Agent Skills Suite

Des skills au format ouvert [agentskills.io](https://agentskills.io) pour encadrer les assistants IA de développement (Claude Code, Cursor, Codex, Gemini CLI…) à chaque étape d'un projet : de l'idée à la production, sur un projet neuf comme sur un dépôt existant.

Open source : MIT pour le code, CC BY 4.0 pour les contenus. La suite elle-même est gratuite ; les assistants, hébergeurs et services tiers peuvent avoir leurs propres coûts.

## Pourquoi

Sans cadre, un assistant IA a tendance à :

- **valider toutes les idées** sans vérifier leur utilité ni leur coût ;
- **coder dans le désordre**, des écrans avant les règles métier et le modèle de données ;
- **produire du « slop »** : interfaces génériques, faux KPI, contrastes insuffisants ;
- **laisser de la dette** : fichiers morts, entrées non validées, tests absents, résultats annoncés mais jamais exécutés.

Chaque skill donne à l'assistant un workflow, des garde-fous et des références étiquetées par niveau de preuve, sans imposer de style graphique.

## Démarrer sur un projet en 2 minutes

1. Installer la suite dans le projet (voir [Installation](#installation)).
2. Ouvrir une session et écrire :

   > Utilise le skill start-here.

3. L'assistant diagnostique le projet, crée `.agents/profile.md` (au plus trois questions) et indique le skill à utiliser ensuite, avec un prompt prêt à copier.

Le profil projet règle la suite pour ce projet : rigueur (`légère`, `standard`, `stricte`), budget d'infrastructure, données sensibles, module de retours, conventions. Tous les skills le lisent au démarrage. Modèle : [skills/start-here/references/profile-template.md](skills/start-here/references/profile-template.md).

## Les 11 skills

| Skill | À utiliser pour |
| --- | --- |
| [start-here](skills/start-here/SKILL.md) | Point d'entrée : diagnostic du projet, profil, choix du skill suivant |
| [project-discovery-validation](skills/project-discovery-validation/SKILL.md) | Challenger une idée ou une fonctionnalité, analyser l'existant, construire la roadmap |
| [product-spec-docs](skills/product-spec-docs/SKILL.md) | Cahier des charges exécutable : règles métier, user stories, Gherkin, ADR, lots |
| [ux-ui-design](skills/ux-ui-design/SKILL.md) | Concevoir ou auditer des écrans : ergonomie, WCAG 2.2, mobile et desktop, anti-slop |
| [api-data-architecture](skills/api-data-architecture/SKILL.md) | Schéma de données, migrations, contrats d'API, RGPD |
| [clean-code-security](skills/clean-code-security/SKILL.md) | Écrire et sécuriser le code : architecture simple, OWASP, secrets, hygiène Git |
| [qa-perf-observability](skills/qa-perf-observability/SKILL.md) | Tests, Core Web Vitals, sobriété, logs sans données personnelles |
| [full-project-audit](skills/full-project-audit/SKILL.md) | État des lieux 360° d'un dépôt, en lecture seule, avec plan de remédiation |
| [release-deployment](skills/release-deployment/SKILL.md) | Versions SemVer, builds reproductibles, déploiement et rollback |
| [maintenance-incident](skills/maintenance-incident/SKILL.md) | Incidents, bugs en production, sauvegardes et restauration |
| [oss-governance](skills/oss-governance/SKILL.md) | Licences, dépendances, SECURITY.md, CODEOWNERS |

Parcours type d'un projet neuf : discovery → spec → UX/UI, données/API, code → QA → release. Rien n'est obligatoire : chaque skill fonctionne seul. Si un livrable amont manque (spécification, lots, règles), le skill le reconstitue depuis le code, le marque `[N6] À CONFIRMER` et continue.

## Comment ça marche

Le format Agent Skills charge le contexte par étapes pour ne pas saturer l'assistant :

1. **Découverte** : au démarrage, l'assistant ne lit que le `name` et la `description` de chaque skill.
2. **Activation** : quand la demande correspond, il charge le `SKILL.md` du skill concerné.
3. **Références à la demande** : la table de routage du `SKILL.md` lui indique quelle fiche de `references/` ouvrir pour la tâche en cours, et seulement celle-là.

Chaque `SKILL.md` commence par un bloc commun (profil projet, entrées facultatives, emplacements des livrables, niveaux de preuve, règles d'honnêteté). Sa source unique est [shared/skill-preamble.md](shared/skill-preamble.md) ; il est recopié dans chaque skill pour qu'un skill installé seul reste complet.

### Emplacements communs des livrables

| Livrable | Emplacement |
| --- | --- |
| Profil projet | `.agents/profile.md` |
| Cadrage et roadmap | `docs/discovery.md` |
| Spécification | `docs/spec/` |
| Décisions d'architecture | `docs/adr/` |
| Passation entre sessions | `docs/HANDOFF.md` |
| Historique | `CHANGELOG.md` |
| Rapports d'audit | `docs/audit/` |

### Niveaux de preuve

Chaque règle porte un niveau, pour ne pas présenter une préférence comme une vérité :

| Niveau | Signification | Exemples |
| --- | --- | --- |
| [N1] | Obligation légale ou norme officielle | RGPD, WCAG 2.2 AA |
| [N2] | Résultat scientifique ou principe fondamental établi | Fitts, Hick-Hyman, ACID |
| [N3] | Standard reconnu ou signal terrain vérifié | OWASP, NN/g, retours utilisateurs sourcés |
| [N4] | Convention d'ingénierie éprouvée | SemVer, RFC 9457, Core Web Vitals au p75 |
| [N5] | Choix contextuel argumenté | stack, arbitrage produit, direction artistique |
| [N6] | Hypothèse à tester | intuition, estimation non mesurée |

## Installation

### Avec la CLI `skills`

```bash
# Toute la suite
npx skills add Karmadibsa/agent-skills-suite

# Un seul skill
npx skills add Karmadibsa/agent-skills-suite --skill ux-ui-design

# Mettre à jour
npx skills update
```

### Avec Git

Copier le contenu de `skills/` dans le dossier de skills de l'outil :

| Outil | Dossier du projet | Pour tous les projets |
| --- | --- | --- |
| Claude Code | `.claude/skills/` | `~/.claude/skills/` |
| Cursor | `.cursor/skills/` | selon la version |
| Autres outils compatibles | `.agents/skills/` | selon l'outil |

```bash
git clone https://github.com/Karmadibsa/agent-skills-suite.git
cp -r agent-skills-suite/skills/* mon-projet/.claude/skills/
```

### Import manuel

Télécharger un dossier de skill et garder `SKILL.md` avec son dossier `references/`. Créer une archive ZIP si l'outil l'exige.

## Exemples de prompts

- « Utilise le skill start-here. »
- « Utilise project-discovery-validation. Mon idée : [description]. Challenge mes fonctionnalités et propose une roadmap jusqu'au MVP. »
- « Utilise product-spec-docs pour écrire les règles métier et les critères d'acceptation du MVP. »
- « Utilise ux-ui-design pour concevoir l'écran principal, mobile à une main et desktop. »
- « Utilise full-project-audit sur ce dépôt et donne-moi les 5 corrections prioritaires. »

## Structure du dépôt

```text
agent-skills-suite/
├── skills/<nom>/        # SKILL.md + references/*.md, un dossier par skill
├── shared/              # source du bloc commun recopié dans chaque SKILL.md
├── scripts/             # check_skills.py : vérification de la suite
├── evals/               # scénarios de test manuels
├── docs/                # architecture, synthèse, notes de refonte
├── website/             # vitrine statique publiée par Netlify
├── .github/workflows/   # vérification automatique à chaque push et PR
├── LICENSE              # MIT (code)
└── LICENSE-DOCS         # CC BY 4.0 (contenus)
```

## Contribuer

1. Modifier un skill, ou `shared/skill-preamble.md` pour le bloc commun.
2. Recopier le bloc commun et vérifier :

   ```bash
   python scripts/check_skills.py --fix
   python scripts/check_skills.py
   ```

   Le script contrôle le frontmatter, la taille des `SKILL.md`, les liens vers `references/`, la synchronisation du bloc commun et l'absence de tableaux cassés. La même vérification tourne sur GitHub à chaque push et pull request.
3. Jouer les scénarios concernés de [evals/scenarios.md](evals/scenarios.md) et noter le résultat dans la PR.

Les signalements d'erreurs scientifiques sont particulièrement bienvenus : indiquez la règle, la source et le niveau de preuve contesté.

## Licences

- Code, scripts, exemples et configurations : [MIT](LICENSE).
- Documentation, référentiels et contenus des skills : [CC BY 4.0](LICENSE-DOCS). Créditer Agent Skills Suite et ses contributeurs, lier la source et indiquer les modifications.
