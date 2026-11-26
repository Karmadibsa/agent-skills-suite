# Identité visuelle

Construite avec le skill `ux-art-direction` (fiche 06). Planche de travail visible en local : `website/brand/index.html` (lancer `start.bat`, puis ouvrir http://localhost:8080/brand/).

## Idée

La suite étiquette chaque règle entre crochets, de `[N1]` à `[N6]`. Le symbole reprend ces crochets autour d'un carré plein : une affirmation encadrée, donc vérifiée. Le même motif sert de système dans le site : repères de section `[01]`, chiffres du bandeau `[15]`, mot clé du titre `[réfléchir]`, grands crochets autour de la pile de fichiers.

## Symbole

- Grille 24 × 24, deux primitives : deux crochets (trait de 2,5 unités, extrémités carrées) et un carré de 6,5 unités au centre, rayon 1.
- Le carré porte la couleur de marque ; les crochets prennent la couleur du texte (encre sur fond clair, presque blanc sur fond sombre).
- Version monochrome : tout en une couleur (`brand/logomark-mono.svg`).
- Zone de protection : une hauteur de symbole tout autour du lockup.

| Fichier | Usage |
| --- | --- |
| `website/brand/logomark.svg` | Symbole couleur sur fond clair |
| `website/brand/logomark-mono.svg` | Symbole une couleur (`currentColor`) |
| `website/brand/lockup-horizontal.svg` | Symbole + wordmark, en-têtes et documents |
| `website/brand/favicon.svg` | Favicon qui s'adapte au thème clair ou sombre |

## Direction : éditoriale claire

Choisie avec la section 5 de `ux-art-direction` (signature propre) pour sortir du gabarit « outil sombre + accent néon ». Fond papier chaud, encre, titres en serif système (italique pour la nuance), filets fins à la place des cartes, crochets et orange réservés à ce qui est étiqueté ou vérifié. Le thème sombre reste disponible sur demande, le clair est l'identité par défaut.

## Typographie

| Usage | Police | Licence | Pourquoi |
| --- | --- | --- | --- |
| Titres | Fraunces (variable, droit et italique) | SIL OFL 1.1 | Serif éditoriale avec du caractère, italique pour la nuance |
| Texte | Atkinson Hyperlegible (400, 400 italique, 700) | SIL OFL 1.1 | Conçue par le Braille Institute pour la lisibilité : cohérente avec une suite qui défend l'accessibilité |
| Marque, code, étiquettes | Chasse fixe du système | — | Rien à télécharger de plus |

Fichiers woff2 (sous-ensemble latin, accents français compris) dans `website/assets/fonts/`, avec les licences `OFL-*.txt`. Source : paquets npm Fontsource 5.3.0. Hébergement sur le site, sans appel à Google Fonts (pas de transfert d'adresse IP à un tiers). Poids total : environ 135 Ko, les deux fichiers principaux sont préchargés.

## Wordmark

`agent-skills/suite` en chasse fixe, graisse 600, `/suite` en neutre. Pas de police téléchargée : la chasse fixe du système (Cascadia Code, SF Mono, Menlo, Consolas).

## Palette

| Nom | Valeur | Usage | Contraste mesuré |
| --- | --- | --- | --- |
| Orange signal | `#F07A2E` | Symbole, aplat du manifeste, accents sur fond sombre | 7,0:1 sur Nuit, 6,4:1 avec l'encre en texte |
| Orange texte | `#A8441A` | Liens et accents sur papier | 5,3:1 sur Papier |
| Encre | `#14171C` | Texte, crochets sur fond clair | 15,9:1 sur Papier |
| Nuit | `#0B0C0E` | Fond sombre de référence | |
| Papier | `#F5F1E8` | Fond par défaut (identité claire) | |
| Neutres | gris chauds (`#4A4740`, `#6B665C`, `#8E8778`, `#D9D2C3`) | Texte secondaire, bordures | Texte secondaire 5,1:1, bordures fortes 3,2:1 |

## Tests de la fiche 06

| Test | Statut |
| --- | --- |
| Lisible à 16, 24, 32 et 64 px | Visible sur la planche, à valider à l'œil |
| Monochrome pur | Visible sur la planche, à valider à l'œil |
| Flou gaussien 5 px | Visible sur la planche, à valider à l'œil |
| Inversion clair / sombre | Visible sur la planche, à valider à l'œil |
| Mémorisation (5 secondes puis dessin) | Non fait : test humain |

## Règles d'usage

- Ne pas déformer, pivoter ni recolorer les crochets dans une autre couleur que le texte.
- Ne pas ajouter d'ombre, de dégradé ni de contour au symbole.
- Le motif des crochets ne sert qu'à étiqueter quelque chose de réel (un niveau, une section, un chiffre vérifié), jamais en décoration pure.
