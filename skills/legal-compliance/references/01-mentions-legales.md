# 01 — Mentions légales

Source principale : loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), article 6 III [N1]. La loi n° 2024-449 (SREN) a modifié la LCEN : vérifier la numérotation exacte sur Légifrance avant de la citer dans la page.

## 1. Contenu selon le type d'éditeur

| Éditeur | Informations à publier |
| --- | --- |
| Personne physique exerçant une activité professionnelle (entrepreneur individuel, micro-entrepreneur, profession libérale) | Nom, prénom, adresse, téléphone, adresse électronique ; numéro d'immatriculation (RCS, RNE ou répertoire des métiers) s'il existe ; numéro de TVA intracommunautaire s'il existe ; pour une profession réglementée, ordre ou organisme professionnel, titre et État d'obtention, règles professionnelles applicables |
| Personne morale (société, association) | Dénomination ou raison sociale, forme juridique, adresse du siège, téléphone, adresse électronique ; capital social pour une société ; numéro RCS ou RNA ; numéro de TVA intracommunautaire s'il existe |
| Particulier publiant à titre non professionnel | Peut ne pas publier son identité, à condition de publier celle de l'hébergeur et de lui avoir communiqué ses propres coordonnées (LCEN, article 6 III-2, numérotation à vérifier) |
| Tous | Nom du directeur ou de la directrice de la publication (et du responsable de la rédaction le cas échéant) ; nom, dénomination ou raison sociale, adresse et téléphone de l'hébergeur |

Les activités commerciales doivent aussi indiquer les informations exigées par le Code de commerce et le Code de la consommation (voir fiche `03`).

## 2. Hébergeur

Relever l'identité de l'hébergeur réellement utilisé dans la configuration de déploiement (par exemple `netlify.toml`, `vercel.json`, configuration Cloudflare, contrat d'hébergement). Recopier ses coordonnées depuis sa propre page légale ; ne jamais les écrire de mémoire.

## 3. Modèle

```markdown
# Mentions légales

Dernière mise à jour : [DATE]

## Éditeur du site
[NOM ET PRÉNOM, ou DÉNOMINATION SOCIALE ET FORME JURIDIQUE]
[ADRESSE]
Téléphone : [À COMPLÉTER] · Courriel : [À COMPLÉTER]
[Capital social : À COMPLÉTER — sociétés uniquement]
[Immatriculation : RCS / RNE / RM n° À COMPLÉTER — si applicable]
[TVA intracommunautaire : À COMPLÉTER — si applicable]

## Directeur ou directrice de la publication
[NOM ET PRÉNOM]

## Hébergement
[NOM OU RAISON SOCIALE DE L'HÉBERGEUR]
[ADRESSE] · Téléphone : [À COMPLÉTER]

## Propriété intellectuelle
[Préciser les licences des contenus et du code, par exemple : code sous licence MIT, contenus sous CC BY 4.0, marques et logos réservés.]

## Données personnelles
Le traitement des données personnelles est décrit dans la [politique de confidentialité](/confidentialite).
```

## 4. Points de contrôle

- La page est accessible depuis toutes les pages (lien en pied de page) et lisible sans JavaScript.
- Aucune donnée inventée : chaque champ inconnu reste `[À COMPLÉTER]` et figure dans la liste remise à l'utilisateur.
- L'hébergeur indiqué correspond à la configuration réelle du déploiement.
- Les licences annoncées correspondent aux fichiers `LICENSE` du dépôt.
