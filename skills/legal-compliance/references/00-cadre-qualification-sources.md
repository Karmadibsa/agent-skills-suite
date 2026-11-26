# 00 — Cadre, qualification du projet et sources

Statut : référentiel de conformité juridique · Skill : legal-compliance · Textes consultés : novembre 2026. Vérifier la version en vigueur avant toute publication.

## 1. Avertissement à reprendre dans chaque livrable

> Ce document est un projet préparé avec l'aide d'un assistant IA à partir des textes officiels cités. Il ne constitue pas un conseil juridique. Les champs `[À COMPLÉTER]` doivent être renseignés par l'éditeur, et le document doit être relu par un professionnel du droit si l'activité présente des enjeux particuliers.

## 2. Qualifier le projet (questions à trancher)

| Question | Pourquoi elle compte |
| --- | --- |
| Qui édite le site : particulier sans activité professionnelle, entrepreneur individuel, société, association, administration ? | Détermine le contenu des mentions légales et la possibilité de rester anonyme vis-à-vis du public |
| Le site a-t-il une activité économique (vente, prestation, publicité, abonnement) ? | Déclenche les obligations du Code de la consommation ou du Code de commerce |
| Clients particuliers (B2C), professionnels (B2B), ou les deux ? | Les règles de protection du consommateur ne s'appliquent qu'en B2C |
| Quelles données personnelles sont collectées (formulaire, compte, commande, journaux, analytics) ? | Déclenche le RGPD : information, base légale, durée, droits, registre |
| Données sensibles (santé, opinions, biométrie), données de mineurs, traitement à grande échelle ? | Obligations renforcées, analyse d'impact possible, DPO possible : recommander un professionnel |
| Quels traceurs sont déposés (cookies, stockage local, pixels, SDK) et par qui ? | Consentement préalable sauf exemption |
| Des utilisateurs publient-ils du contenu (avis, commentaires, messages) ? | CGU recommandées, obligations d'hébergeur et règlement sur les services numériques (DSA) à examiner |
| Où sont hébergées les données et quels prestataires y accèdent ? | Contrats de sous-traitance, transferts hors de l'UE |

## 3. Matrice des obligations courantes

| Situation | Obligation | Source principale | Niveau |
| --- | --- | --- | --- |
| Tout site publié | Identifier l'éditeur et l'hébergeur | LCEN (loi n° 2004-575), article 6 III ; numérotation à vérifier, la loi SREN de 2024 a restructuré la LCEN | [N1] |
| Données personnelles collectées | Informer les personnes au moment de la collecte | RGPD, articles 12 à 14 | [N1] |
| Données personnelles collectées | Disposer d'une base légale pour chaque finalité | RGPD, article 6 | [N1] |
| Données personnelles collectées | Tenir un registre des traitements (dérogation limitée pour moins de 250 salariés, rarement applicable en pratique) | RGPD, article 30 | [N1] |
| Prestataire qui traite des données pour vous | Contrat de sous-traitance | RGPD, article 28 | [N1] |
| Violation de données | Notifier la CNIL sous 72 heures si risque, informer les personnes si risque élevé | RGPD, articles 33 et 34 | [N1] |
| Traceurs non strictement nécessaires | Consentement préalable, libre, éclairé, refus aussi simple que l'acceptation | Loi Informatique et Libertés, article 82 ; lignes directrices et recommandation CNIL d'octobre 2020 | [N1] / [N3] |
| Vente à des consommateurs | Information précontractuelle, prix TTC, rétractation, garanties légales, médiation | Code de la consommation, articles L111-1, L221-5, L221-18, L217-3, L612-1 | [N1] |
| Vente à des professionnels | Communiquer ses CGV sur demande, mentionner les pénalités de retard et l'indemnité forfaitaire de recouvrement | Code de commerce, articles L441-1 et L441-10 | [N1] |
| Commande en ligne | Bouton de commande explicite (« commande avec obligation de paiement » ou formule équivalente) | Code de la consommation, article L221-14 | [N1] |
| Certains services de commerce en ligne | Accessibilité des services et déclaration d'accessibilité (acte européen sur l'accessibilité, transposé par la loi n° 2023-171, applicable depuis juin 2025, microentreprises de services exemptées) | Directive (UE) 2019/882 ; loi n° 2005-102, article 47 | [N1], champ d'application à vérifier |
| Comptes ou contenus d'utilisateurs | CGU : non obligatoires en soi, fortement recommandées | Bonne pratique contractuelle | [N4] |

## 4. Sources officielles à consulter

| Source | Pour quoi |
| --- | --- |
| Légifrance (legifrance.gouv.fr) | Codes et lois français dans leur version en vigueur |
| EUR-Lex (eur-lex.europa.eu) | RGPD (règlement 2016/679), directives et règlements européens |
| CNIL (cnil.fr) | Lignes directrices cookies, modèles de registre, guides RGPD, sanctions |
| DGCCRF (economie.gouv.fr/dgccrf) | Fiches pratiques sur la vente à distance, la rétractation, les garanties |
| Service-public.fr, entreprendre.service-public.fr | Fiches de synthèse pour les entreprises et les particuliers |

## 5. Règles de rédaction

- Citer l'article pour chaque obligation ; si la numérotation n'a pas pu être vérifiée, l'écrire.
- Distinguer clairement ce qui est obligatoire [N1], recommandé par une autorité [N3] et simplement conseillé [N4]/[N5].
- Écrire pour l'utilisateur final : phrases courtes, pas de jargon inutile, titres explicites.
- Un document juridique décrit ce que fait réellement le produit : si le code dépose un cookie non mentionné, c'est le code ou le document qu'il faut corriger, jamais l'ignorer.
