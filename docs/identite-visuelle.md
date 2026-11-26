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

## Wordmark

`agent-skills/suite` en chasse fixe, graisse 600, `/suite` en neutre. Pas de police téléchargée : la chasse fixe du système (Cascadia Code, SF Mono, Menlo, Consolas).

## Palette

| Nom | Valeur | Usage | Contraste mesuré |
| --- | --- | --- | --- |
| Orange signal | `#F07A2E` | Symbole, aplat du manifeste, accents sur fond sombre | 7,0:1 sur Nuit, 6,4:1 avec l'encre en texte |
| Orange texte | `#C2470F` | Liens et accents sur fond clair | 4,7:1 sur Papier |
| Encre | `#14171C` | Texte, crochets sur fond clair | 16,9:1 sur Papier |
| Nuit | `#0B0C0E` | Fond sombre de référence | |
| Papier | `#F7F8FA` | Fond clair | |
| Neutres | gris teintés bleu froid | Surfaces, bordures, texte secondaire | Texte secondaire ≥ 4,5:1 |

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
