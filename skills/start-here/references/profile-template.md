# Modèle de profil projet (`.agents/profile.md`)

Le profil est un fichier court que tous les skills de la suite lisent au démarrage. Il évite de reposer les mêmes questions à chaque session et permet d'adapter les règles par défaut à un projet précis.

Règles :

- Rester sous 60 lignes. Pas de prose : des valeurs.
- Une valeur inconnue s'écrit `à confirmer`, jamais une supposition présentée comme un fait.
- Le profil est versionné avec le projet. Il ne contient aucun secret.

## Modèle à copier

```markdown
# Profil projet

<!-- Lu par les skills de la suite Agent Skills. Mis à jour : AAAA-MM-JJ. -->

## Identité
- Nom : <nom>
- But en une phrase : <ce que le produit permet de faire, pour qui>
- Stade : idée | cadrage | spécifié | développement | production | reprise
- Type : application web | SaaS | mobile | desktop | CLI | API | bibliothèque | site vitrine | autre
- Public : grand public | métier | interne | développeurs
- Langue des livrables : fr | en

## Technique
- Stack : <langages, frameworks, base de données>
- Hébergement : <local | Netlify | Vercel | serveur | à confirmer>
- Commandes : dev `<cmd>` · test `<cmd>` · build `<cmd>`

## Réglages de la suite
- Rigueur : légère | standard | stricte
- Budget d'infrastructure : 0 €/mois | limité (<montant>) | non contraint
- Données sensibles : aucune | personnelles | santé | finance | mineurs
- Module « Bug ou idée ? » : prototypes | toujours | jamais
- Cible d'affichage : mobile d'abord | desktop d'abord | les deux
- Niveau d'accessibilité visé : WCAG 2.2 AA | AAA sur les parcours critiques | à confirmer

## Conventions du projet
- Emplacements des livrables : défauts de la suite | <écarts éventuels>
- Branche principale : <main>
- Style de commit : Conventional Commits | <autre>

## Décisions déjà prises
- <décision courte> — voir docs/adr/ADR-NNN si disponible

## Points ouverts
- <question en attente de réponse>
```

## Choisir le niveau de rigueur

Le niveau suit le risque du projet, pas l'envie de bien faire : chaque vérification coûte du temps et des questions. Proposer le niveau à l'utilisateur à partir de ces critères, puis le laisser trancher.

| Niveau | Quand le proposer | Ce que ça change |
| --- | --- | --- |
| `stricte` | Utilisateurs réels en production, données de santé, de paiement ou de mineurs, obligations légales fortes, équipe nombreuse | Checklists complètes, chaque règle sourcée, tests et preuves exigés, revue sécurité et conformité |
| `standard` | Projet suivi destiné à être utilisé, sans données sensibles, petite équipe | Workflow complet, preuves sur les points critiques |
| `légère` | Prototype jetable, démo, outil personnel, exploration | Seulement les points bloquants, aucune documentation en plus |

Règle de départage : au moindre critère « stricte », proposer `stricte` ; en cas de doute entre `légère` et `standard`, proposer `standard`.

## Valeurs par défaut

Quand une valeur n'est pas connue et que l'utilisateur ne répond pas :

| Champ | Défaut | Pourquoi |
| --- | --- | --- |
| Rigueur | proposée selon le tableau ci-dessus, `standard` si rien n'est connu | Équilibre entre vitesse et preuves |
| Budget | `0 €/mois` | Défaut historique de la suite, modifiable |
| Données sensibles | `à confirmer` | Ne jamais supposer qu'il n'y en a pas |
| Module « Bug ou idée ? » | `prototypes` | Utile en phase de test, superflu en production si un autre canal existe |
| Accessibilité | `WCAG 2.2 AA` | Niveau de référence légal le plus courant [N1] |
| Langue | langue de l'utilisateur | |

## Effet des réglages sur les skills

| Réglage | Effet |
| --- | --- |
| Rigueur `légère` | Checklists réduites aux points bloquants ; pas d'ADR ni de spécification formelle sauf demande |
| Rigueur `stricte` | Checklists complètes, preuves exigées, revue sécurité systématique |
| Données `santé` ou `finance` | Captures d'écran interdites dans le module de retours, chiffrement et journalisation renforcés |
| Budget non contraint | Les skills peuvent proposer des services payants, en indiquant le coût |
| Stade `reprise` | Les skills reconstituent les règles depuis le code au lieu d'exiger une spécification |
