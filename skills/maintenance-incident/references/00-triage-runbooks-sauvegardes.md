# 00 — Triage des Incidents, Runbooks, Sauvegardes & Mises à Jour Sûres

Statut : Référentiel Maintenance & Incidents V1.0 · Standards : SRE / DORA pragmatique, RGPD Art. 32.

## 1. Triage Rapide & Priorisation des Incidents [N4]

L'objectif du triage est d'évaluer immédiatement la gravité de chaque événement afin de déclencher le niveau de réponse approprié et d'éviter toute sur-réaction ou sous-estimation des risques.

Niveau de Priorité

Critères d'Impact & Exemples

Temps de Réponse & Actions Exigées

Priorité 1 (Urgent)

Perte ou risque de perte de données, faille de sécurité critique, blocage total du parcours principal sans contournement possible.

Intervention immédiate. Isolation du périmètre, restauration des sauvegardes si nécessaire, communication de crise.

Priorité 2 (Important)

Fonctionnalité clé dégradée mais avec solution de contournement temporaire, ou erreur de calcul sur un cas d'usage concret.

Prise en charge prioritaire. Correction planifiée dans le sprint courant ou sous 24-48h selon le SLA.

Priorité 3 (Courant / Évolution)

Bug mineur, anomalie d'affichage, imprécision cosmétique ou idée d'amélioration UI/UX.

Évaluation via le Skill 0 avant d'ajouter de la complexité. Inscription au backlog pour arbitrage ultérieur.

## 2. Protection des Données & Sauvegardes Avant Intervention [N1 / N4]

Toute opération corrective ou de maintenance comporte un risque d'altération involontaire. La préservation de l'intégrité des systèmes et du respect du RGPD constitue une précondition absolue à toute modification.

### Règles Obligatoires

- Sauvegarde Préalable Systématique : Avant toute opération de réparation sur une base de données, un schéma, un script de migration ou des fichiers utilisateurs, sauvegarder d'abord une copie de secours isolée et vérifiée.

- Principe du Zero PII dans les Logs : Vérifier scrupuleusement que les messages d'erreur, traces d'exécution (stacktraces) et journaux d'incident ne contiennent aucune donnée personnelle identifiable (PII - Personally Identifiable Information) ni aucun secret (clés d'API, jetons d'accès, mots de passe).

- Conformité RGPD Art. 32 : Garantir la confidentialité, l'intégrité et la disponibilité des systèmes de traitement en appliquant le chiffrement au repos des backups et la purge stricte des données de test.

## 3. Runbook Minimal d'Intervention & Non-Régression [N4]

Chaque intervention corrective doit suivre un protocole strict et reproductible composé de quatre étapes séquentielles :

- Isoler

- Reproduire l'anomalie dans un environnement contrôlé à l'aide d'un jeu de données de test minimal.

- Identifier avec précision le composant défaillant et réduire la surface du problème.

- Corriger

- Modifier uniquement le périmètre strict nécessaire à la résolution du bug.

- Interdiction d'effectuer une refonte massive ou une réécriture d'architecture non demandée au cours d'un correctif d'urgence.

- Vérifier

- Écrire un test automatisé ciblé qui échoue sans la correction et réussit avec elle.

- Relancer l'ensemble de la suite de tests automatisés existants pour garantir l'absence totale de régression.

- Tracer

- Consigner explicitement la cause racine, la portée de la correction et l'impact dans le fichier CHANGELOG.md sous la section Fixed.

- Mettre à jour la documentation opérationnelle dans docs/HANDOFF.md pour assurer la continuité des connaissances d'équipe.

## 4. Grille de Validation QA de Maintenance (6 points de contrôle)

Avant toute mise en production ou clôture d'un ticket de maintenance, le responsable d'intervention doit valider intégralement la grille de contrôle ci-dessous :

N°

Point de Contrôle

Description & Critère d'Acceptation

État

1

Sauvegarde Préalable

Une copie de sauvegarde complète de la base/des fichiers a été réalisée et vérifiée avant le début des travaux.

2

Reproduction Avérée

L'incident a été reproduit avec succès à l'aide d'un jeu de données de test minimal et documenté.

3

Correction Ciblée

La modification se limite au code strictement nécessaire, sans refactorisation hors périmètre ni résidu d'expérimentation.

4

Nettoyage Code & Fichiers

Absence totale de code mort, de commentaires temporaires, de fichiers orphelins ou de logs de debug résiduels.

5

Test de Non-Régression

Un test ciblé couvrant le cas corrigé a été ajouté et l'ensemble de la suite de tests passe avec succès.

6

Traçabilité & Changelog

Les entrées ont été renseignées dans CHANGELOG.md (Fixed) et l'état final documenté dans docs/HANDOFF.md.
