# 00 — Index, Hiérarchie des Sources & Statuts de Décision (Skill 1 : product-spec-docs)

Statut : Référentiel Cahier des Charges & Documentation Dev V1.0 · Norme de référence : ISO/IEC/IEEE 29148.

## 1. Mission du Skill 1

Ce référentiel transforme les décisions validées en phase de Discovery (Skill 0) en un cahier des charges exécutable, non ambigu et maintenable sur le long terme. Conformément aux exigences de la norme ISO/IEC/IEEE 29148 (Ingénierie des exigences), il établit une formalisation rigoureuse des intentions produit pour guider le développement sans équivoque.

Il empêche deux dérives majeures au sein des projets d'ingénierie logicielle :

- La dérive silencieuse des IA : Une IA (ou un intervenant humain) qui modifie une règle métier ou une architecture en cours de route parce qu'elle n'a pas consulté la décision précédente.

- La confusion entre fait verrouillé et idée en l'air : Traiter une simple piste exploratoire comme une contrainte définitive (ou inversement, ignorer une décision structurante).

## 2. Règle d'Or n°1 : Le Point d'Entrée Unique (00 — LIRE EN PREMIER)

Tout dossier de spécification d'un projet doit obligatoirement s'ouvrir par un document maître intitulé 00 — LIRE EN PREMIER. Ce document constitue l'ancre conceptuelle de tout le projet et doit impérativement contenir :

- La vision du projet en 3 phrases maximum : Définition ultra-synthétique du produit, précisant explicitement ce qu'il est, et de manière tout aussi explicite ce qu'il n'est pas (périmètre négatif).

- L'ordre de lecture obligatoire : Séquence d'assimilation immuable pour toute IA ou tout développeur rejoignant le projet.

- La hiérarchie stricte des sources de vérité : Règle d'arbitrage automatisée en cas de contradiction entre deux fichiers.

- L'état courant du projet : Le jalon actif (articulé aux Gates 0 à 4 du Skill 0 pour le passage en phase Discovery/Développement), les dernières décisions verrouillées, et les sections/composants qu'il est strictly interdit de modifier sans protocole spécifique.

## 3. Hiérarchie Stricte des Sources de Vérité (Résolution des Conflits)

En cas de divergence, d'ambiguïté ou de contradiction formelle entre plusieurs documents du projet, l'ordre décroissant d'autorité suivant s'applique de manière stricte et inconditionnelle :

Articulation entre Hiérarchie des Sources et Statuts de Décision : Les statuts de décision (Section 4) s'appliquent de manière transversale sur toute la hiérarchie. Un élément portant le statut [VERROUILLÉ] prime systématiquement sur tout élément [PROPOSÉ], [À TESTER] ou [OUVERT], quel que soit le rang du document source. En outre, un carnet de décisions d'architecture (ADR) tagué [VERROUILLÉ] encadre strictement la conception technique et les choix technologiques, mais ne peut en aucun cas contredire ou altérer une règle métier elle-même taguée [VERROUILLÉ] dans le cahier des charges fonctionnel.

- Cahier des charges fonctionnel & Règles métier verrouillées : Source de vérité produit absolue (spécifie strictement ce que le système doit faire et ne doit pas faire).

- Carnet de Décisions d'Architecture (ADR - Architecture Decision Records) : Source de vérité sur les choix techniques, les choix technologiques et les structures d'infrastructure actés.

- Modèle de données & Contrats d'API : Source de vérité sur la structure des entités, la persistance, le typage et les schémas de circulation des données.

- Critères d'acceptation (BDD / QA) & Sécurité/RGPD : Source de vérité valider la conformité d'un livrable (définition de "Done") et le respect des normes légales/sécurité.

- Spécifications UX/UI & Maquettes : Source de vérité d'interface graphique et de parcours utilisateur (strictement subordonnée aux règles métier et aux normes d'accessibilité).

- Synthèses, notes de travail et brouillons : Simples aides à la compréhension ; si une synthèse ou un compte-rendu contredit un document détaillé de rang supérieur, le document de rang supérieur prime systématiquement.

## 4. Taxonomie Officielle des Statuts de Décision (Gouvernance)

Pour assurer la traçabilité et l'intégrité des exigences selon ISO/IEC/IEEE 29148, chaque section, règle métier, composant ou choix technique au sein de la documentation doit obligatoirement porter l'un des 4 statuts explicites suivants :

- [VERROUILLÉ] : Décision formellement validée par le décideur du projet. Une IA ou un développeur a l'interdiction formelle de la remettre en cause ou de la modifier silencieusement. Si une IA détecte une faille critique ou une incohérence majeure, elle doit la signaler de manière explicite via un alerte formelle avant d'envisager toute modification.

- [PROPOSÉ] : Recommandation structurée et étayée, rédigée et prête à être appliquée, mais demeurant en attente de validation explicite par le responsable du projet.

- [À TESTER] : Hypothèse de travail ou choix technique dont la validité dépend d'un résultat d'expérimentation (prototype, benchmark technique, test d'utilisabilité). Ce statut doit obligatoirement être associé à un critère de décision mesurable et une date de fin d'évaluation.

- [OUVERT] : Question structurante non encore tranchée. Ce point bloque une décision ultérieure et doit être obligatoirement arbitré avant de lancer le codage du module concerné.

## 5. Carte des Documents du Référentiel (references/)

Le tableau ci-dessous détaille l'organisation des fichiers de référence constituant le standard de documentation du Skill 1.

Fichier

Nom du Document

Description & Contenu Principal

Condition de Chargement

00

00 — Index, Hiérarchie des Sources & Statuts de Décision

Vision synthétique, périmètre négatif, hiérarchie des sources, statuts de décision, règles d'arbitrage.

Obligatoire dès l'initialisation de toute session ou lecture.

01

01 — Personas, User Stories & Parcours Utilisateurs (BDD / Gherkin)

Archétypes comportementaux, User Stories INVEST, scénarios Gherkin nominaux/alternatifs/erreur et parcours utilisateurs.

Chargé pour l'écriture ou la validation des Use Cases et user stories.

02

02 — Règles Métier, Modèle de Données Conceptuel & Cas Limites (Edge Cases)

Règles métier déterministes chiffrées, exigences non fonctionnelles NFR, modèle de données conceptuel, automates d'états et matrice des 8 cas limites.

Chargé pour la modélisation métier, la conception de la base de données et la gestion des cas limites.

03

03 — Carnet de Décisions (ADR), Changelog & Mémoire Long Terme du Projet

Journal d'ADR immuable, Glossaire Métier unique Ubiquitous Language, CHANGELOG.md SemVer/Keep a Changelog et protocole de passation HANDOFF.md.

Chargé lors des arbitrages d'architecture, de la mise à jour des définitions métier ou du versionnage des versions.

04

04 — Découpage en Lots Atomiques, Issues, Pull Requests & Documentation Projet (README)

Découpage vertical en lots atomiques, README.md 1-command, taxonomie des labels GitHub, templates Issues/PR et Definition of Done.

Chargé pour la planfication des sprints, la création d'issues/PR et la préparation des déploiements.

## 6. Grille de Validation QA de l'Architecture Documentaire

Avant toute transmission d'une documentation aux équipes de développement ou à une IA d'exécution, le dossier doit valider les 6 points de contrôle suivants :

- Présence du point d'entrée unique : Le fichier 00 — LIRE EN PREMIER est présent à la racine de la documentation et contient l'ordre de lecture immuable.

- Périmètre négatif explicite : Le document définit clairement au moins 3 éléments majeurs que le produit ne fera pas dans la version visée.

- Hiérarchie d'autorité déclarée : La règle de résolution des conflits est explicitement stipulée et acceptée par l'équipe.

- Étiquetage exhaustif des statuts : 100 % des règles métier, choix techniques et sections stratégiques portent un tag parmi [VERROUILLÉ], [PROPOSÉ], [À TESTER] ou [OUVERT].

- Absence de décision critique flottante : Aucun élément tagué [OUVERT] ne subsiste dans le périmètre du jalon actif (Jalon Actif).

- Qualité des exigences (ISO/IEC/IEEE 29148) : unicité, clarté et vérifiabilité : Chaque exigence est unique, non ambiguë, vérifiable et rattachée à une source identifiée.

- Traçabilité bidirectionnelle & Versionnage : Traçabilité complète garantie de bout en bout (User Story [US-XX] ↔ Scénario BDD ↔ Lot Atomique ↔ Test automatisé) et baselines documentaires scellées par version.
