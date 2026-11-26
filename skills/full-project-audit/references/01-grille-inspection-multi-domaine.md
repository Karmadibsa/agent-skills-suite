# 01 — Grille d'Inspection Multi-Domaine (Audit 360°)

Statut : Référentiel Audit Global V2.2 · Skill : full-project-audit

### 0. Profilage Conditionnel (Adapter l'Audit au Projet)

- Noyau Minimal (toujours actif) : CHK-GOV-01, CHK-GOV-03, CHK-SEC-01, CHK-SEC-02, CHK-ARC-01, CHK-ARC-02, CHK-QA-01.

- Profil Web / SaaS : Noyau Minimal + contrôle d'accès/IDOR, CORS/CSRF, pagination/erreurs API, accessibilité (CHK-UX-03), performance (CHK-QA-02) et logs (CHK-QA-03).

- Profil Desktop / CLI Local-First : Noyau Minimal + intégrité/sauvegarde locale (CHK-DAT-01/02), ergonomie (CHK-UX-01/02/03) et logs sans données personnelles (CHK-QA-03).

## Bloc A — Gouvernance, Documentation & Hygiène Git

| ID | Contrôle | Ce qu'il faut inspecter | Alerte / Écart |
| --- | --- | --- | --- |
| CHK-GOV-01 | Exactitude du README.md et démarrage local | README.md, start.bat, start.sh, Makefile, package.json | Commandes ou promesses fausses / non vérifiées |
| CHK-GOV-02 | Mémoire projet & synchronisation | 00 — LIRE EN PREMIER, CHANGELOG.md, docs/adr/, docs/HANDOFF.md | Documentation contredisant le code ou absente |
| CHK-GOV-03 | Propreté du dépôt & dépendances | Fichiers *_old, *_backup, *_v2, code mort, .gitignore, lockfiles | Fichiers morts conservés, .env suivi, lockfile absent |
| CHK-GOV-04 | Cohérence du vocabulaire métier | Noms d'entités dans la doc, l'UI, la base et le code | Synonymes contradictoires pour un même concept |

## Bloc B — Architecture Propre (KISS) & Sécurité (OWASP)

| ID | Contrôle | Ce qu'il faut inspecter | Alerte / Écart |
| --- | --- | --- | --- |
| CHK-SEC-01 | Zéro secret en dur | Code source, configurations, .env.example, historique Git | Clé API, mot de passe ou jeton en clair |
| CHK-SEC-02 | Validation stricte aux frontières | Formulaires, API/IPC, imports de fichiers (CSV, JSON, OFX) | Données externes utilisées sans validation ni bornes |
| CHK-SEC-03 | Injections, accès & dépendances | Requêtes SQL, rendu HTML (innerHTML/XSS), droits d'accès (IDOR), audit dépendances | Concaténation SQL, XSS, accès non vérifié, failles critiques |
| CHK-ARC-01 | Découplage métier / UI | Séparation entre logique métier testable et composants d'affichage | Calculs ou règles métier mélangés dans la vue |
| CHK-ARC-02 | Principe KISS (anti-sur-ingénierie) | Complexité des couches, abstractions, dépendances tierces | Sur-ingénierie inutile ou packages lourds pour un besoin simple |

## Bloc C — Données, Persistance & Contrats API

| ID | Contrôle | Ce qu'il faut inspecter | Alerte / Écart |
| --- | --- | --- | --- |
| CHK-DAT-01 | Typage exact & base locale | Montants financiers, dates UTC, paramètres SQLite (WAL, clés étrangères) | FLOAT/DOUBLE sur l'argent, dates ambiguës, FK désactivées |
| CHK-DAT-02 | Migrations & sauvegardes | Scripts de migration, sauvegarde préalable, export/import | Perte de données possible lors d'une mise à jour |
| CHK-DAT-03 | Contrats d'échange & RGPD | Pagination, format d'erreur structuré, minimisation/effacement des données | Listes non bornées, traces internes exposées, non-conformité RGPD |

## Bloc D — Ergonomie UX/UI, Accessibilité (WCAG 2.2 AA) & Anti-Slop

| ID | Contrôle | Ce qu'il faut inspecter | Alerte / Écart |
| --- | --- | --- | --- |
| CHK-UX-01 | Clarté de l'action & sobriété | Parcours principal, hiérarchie visuelle, absence de slop ou jargon inutile | Écran confus, décoration envahissante, libellés obscurs |
| CHK-UX-02 | États d'interface complets | États vide (empty state), chargement, erreur claire (sans perte de saisie) | Écran blanc, liste vide sans action, formulaire vidé après erreur |
| CHK-UX-03 | Accessibilité clavier & contrastes | Balises sémantiques, navigation Tab/Esc, focus visible, contrastes, statuts | Clic sur `<div>` non clavier, focus invisible, contraste faible |
| CHK-UX-04 | Responsive & tactile | Affichage mobile/étroit sans défilement horizontal, cibles tactiles | Débordement horizontal ou boutons difficiles à toucher |

## Bloc E — Tests, Performance & Observabilité

| ID | Contrôle | Ce qu'il faut inspecter | Alerte / Écart |
| --- | --- | --- | --- |
| CHK-QA-01 | Exécution réelle des tests | Tests unitaires, intégration, E2E ; résultats effectivement obtenus | Tests absents, en échec ou faux positifs / tests instables |
| CHK-QA-02 | Performance & sobriété | Requêtes N+1, grandes listes, stabilité visuelle, traitements inutiles en veille | Lenteurs évitables, sauts de mise en page, boucles inutiles |
| CHK-QA-03 | Logs structurés sans données perso | Format des journaux, gestion des erreurs globales, masquage ([REDACTED]) | Mots de passe, jetons ou données perso écrites dans les logs |

## Bloc F — Alignement Produit

| ID | Contrôle | Ce qu'il faut inspecter | Alerte / Écart |
| --- | --- | --- | --- |
| CHK-PRD-01 | Utilité réelle des fonctionnalités | Cohérence avec le besoin utilisateur et le périmètre validé | Fonctionnalité gadget ou hors périmètre ajoutant de la dette |
