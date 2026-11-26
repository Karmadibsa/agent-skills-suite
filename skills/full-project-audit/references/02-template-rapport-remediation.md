# 02 — Template de Rapport d'Audit, Plan de Remédiation & Prompts d'Exécution

Statut : Référentiel Audit Global V2.2 · Skill : full-project-audit

## 1. Format du Rapport d'Audit 360°

```
# Rapport d'Audit 360° — [Nom du Projet]
- **Date :** AAAA-MM-JJ
- **Commit SHA / État Git :** [SHA ou non-git · clean / dirty]
- **Environnement :** [OS · versions outils]
- **Profil appliqué :** [Noyau minimal / Web-SaaS / Desktop-CLI Local-First]
- **Vérifications réellement exécutées :** [commandes lancées et résultat exact, ou "Aucune commande exécutée"]
- **Limites de l'audit (Non vérifié) :** [ce qui n'a pas été testé ou exécuté]
## 1. Synthèse
- **Points forts :** [2 à 3 constats factuels]
- **Priorités (`P0` / `P1`) :** [résumé court des blocages majeurs]
- **Comptage :** `P0 : X` · `P1 : Y` · `P2 : Z` · `P3 : W`
## 2. Constats
| ID | Domaine | Gravité | Preuve | Localisation | Constat |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `AUD-01` | Sécurité | `P0` | `[CONSTATÉ DANS LE CODE]` | `src/api/auth.ts:42` | Vérification de propriété absente (`IDOR`) |
| `AUD-02` | UX/UI | `P1` | `[CONSTATÉ DANS LE CODE]` | `src/components/List.tsx:88` | Action sur `<div>` non accessible au clavier |
## 3. Détail & Correctifs (`P0` et `P1`)
### `AUD-01` (`P0`) — [Titre]
- **Constat & impact :** [explication factuelle]
- **Avant / Après :**
  - Avant : [extrait court]
  - Après : [extrait corrigé]
## 4. Perspective « Table Rase » (`KISS`)
- **Complexités évitables :** [ce qui alourdit inutilement]
- **Conception simplifiée (feuille blanche) :** [version plus directe]
- **Coûts & risques (incrémental vs réécriture) :** [arbitrage honnête]
## 5. Plan de Remédiation par Lots Atomiques
- **Lot 1 (`P0`) :** [fichiers, correctif, test de validation, procédure de retour arrière]
- **Lot 2 (`P1`) :** [fichiers, correctif, test de non-régression, contrôle de clôture]
- **Lot 3 (`P2`/`P3`) :** [nettoyage fichiers morts, mise à jour doc/changelog]
```

## 2. Prompt d'Audit à Copier-Coller

```
Applique le skill full-project-audit (en commençant par references/00-methodologie-audit-gravite.md et references/01-grille-inspection-multi-domaine.md).
Règles strictes :
1. Mode lecture seule par défaut : ne modifie aucun fichier, ne lance pas git push et n'exécute pas de commande destructive ou réseau non sûre sans confirmation explicite.
2. Sépare clairement ce que tu as réellement exécuté, ce que tu as lu dans le code (avec fichier:ligne), et ce qui reste non vérifié.
3. N'invente aucun score CVSS ni résultat de test non lancé.
4. Vérifie la sécurité, la cohérence du README.md, l'accessibilité/UX, les données et le principe KISS, puis termine par une Perspective Table Rase (avec comparaison coûts/risques) et un plan de remédiation par lots.
```
