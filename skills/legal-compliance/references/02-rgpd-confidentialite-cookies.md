# 02 — RGPD : politique de confidentialité, registre, cookies

Sources : règlement (UE) 2016/679 (RGPD) [N1] ; loi n° 78-17 du 6 janvier 1978 dite « Informatique et Libertés », notamment l'article 82 sur les traceurs [N1] ; lignes directrices et recommandation de la CNIL sur les cookies et autres traceurs (octobre 2020) [N3].

## 1. Inventaire préalable (dans le code, pas de mémoire)

Pour chaque traitement, relever : la finalité, les données, les personnes concernées, la base légale, les destinataires et sous-traitants, la durée de conservation, les transferts hors de l'UE, les mesures de sécurité.

À chercher dans le dépôt : formulaires et champs, schéma de base de données, journaux applicatifs, services tiers (analytics, polices, cartes, vidéos, chat, paiement, e-mail, CDN), SDK mobiles, variables d'environnement révélant des fournisseurs, cookies et `localStorage` écrits par le code ou par les scripts tiers.

## 2. Bases légales (RGPD, article 6)

| Base légale | Exemples typiques |
| --- | --- |
| Exécution d'un contrat ou mesures précontractuelles | Gestion d'un compte, d'une commande, d'une livraison |
| Obligation légale | Conservation des factures, réponse à une réquisition |
| Intérêt légitime (avec mise en balance documentée) | Sécurité du service, prévention de la fraude, mesure d'audience exemptée |
| Consentement (libre, spécifique, éclairé, univoque, retirable aussi facilement qu'il a été donné) | Lettre d'information, traceurs publicitaires, partage avec des partenaires |

Ne pas cumuler les bases pour une même finalité ni recourir au consentement quand une autre base s'applique.

## 3. Contenu de la politique de confidentialité (articles 13 et 14)

- Identité et coordonnées du responsable du traitement, et du délégué à la protection des données s'il en existe un.
- Pour chaque finalité : données traitées, base légale, durée de conservation ou critère, destinataires.
- Transferts hors de l'UE et garanties utilisées (décision d'adéquation, clauses contractuelles types).
- Droits : accès, rectification, effacement, limitation, opposition, portabilité, retrait du consentement, directives post mortem (droit français) ; comment les exercer ; droit d'introduire une réclamation auprès de la CNIL.
- Caractère obligatoire ou facultatif des données demandées et conséquences d'un refus.
- Existence d'une décision automatisée ou d'un profilage, le cas échéant.

Modèle de plan :

```markdown
# Politique de confidentialité
Dernière mise à jour : [DATE]
1. Qui est responsable de vos données ? [IDENTITÉ, CONTACT]
2. Quelles données, pourquoi, sur quelle base, combien de temps ? [TABLEAU PAR FINALITÉ]
3. Qui y a accès ? [DESTINATAIRES, SOUS-TRAITANTS]
4. Vos données quittent-elles l'Union européenne ? [OUI/NON, GARANTIES]
5. Vos droits et comment les exercer [CONTACT, DÉLAI DE RÉPONSE D'UN MOIS]
6. Cookies et traceurs [LIEN VERS LA PAGE COOKIES OU SECTION]
7. Réclamation auprès de la CNIL [www.cnil.fr]
```

## 4. Registre des traitements (article 30)

Un fichier `docs/legal/registre-traitements.md` avec une ligne par traitement : finalité, catégories de personnes et de données, destinataires, transferts, durée, mesures de sécurité. La CNIL propose un modèle de registre simplifié sur son site.

## 5. Sous-traitants, transferts, violations

- Chaque prestataire qui traite des données pour le compte de l'éditeur (hébergeur, envoi d'e-mails, support) doit être lié par un contrat conforme à l'article 28 ; la plupart proposent un « DPA » à accepter.
- Transferts hors de l'UE : vérifier l'existence d'une décision d'adéquation ou de clauses contractuelles types.
- Violation de données : documenter toute violation ; notifier la CNIL dans les 72 heures si elle présente un risque ; informer les personnes si le risque est élevé (articles 33 et 34).

## 6. Cookies et traceurs

| Règle | Source | Niveau |
| --- | --- | --- |
| Consentement préalable pour tout traceur non strictement nécessaire | Loi Informatique et Libertés, article 82 | [N1] |
| Exemptés : traceurs strictement nécessaires au service demandé (panier, session, préférence d'accessibilité, équilibrage de charge, certaines mesures d'audience strictement limitées) | Article 82 ; lignes directrices CNIL | [N1] / [N3] |
| Refuser doit être aussi simple qu'accepter (bouton « Tout refuser » au même niveau que « Tout accepter ») | Recommandation CNIL ; sanctions CNIL publiées | [N3] |
| Information claire sur les finalités et la liste des responsables avant le choix | Lignes directrices CNIL | [N3] |
| Conserver la preuve du consentement ; permettre de modifier son choix à tout moment (lien permanent) | RGPD article 7 ; recommandation CNIL | [N1] / [N3] |
| Durée : la CNIL recommande de conserver le choix environ 6 mois et, pour la mesure d'audience exemptée, une durée de vie des traceurs limitée à 13 mois | Recommandation CNIL (à vérifier sur cnil.fr) | [N3] |

Choix technique recommandé : ne charger aucun script tiers soumis à consentement avant l'accord (pas seulement masquer le résultat). Préférer une mesure d'audience exemptée ou sans cookie quand c'est possible : aucun bandeau n'est alors nécessaire pour elle.

## 7. Points de contrôle

- Chaque traitement de l'inventaire figure dans la politique et dans le registre.
- Aucun cookie non exempté n'apparaît dans les outils de développement du navigateur avant le consentement.
- Les durées annoncées sont appliquées dans le code (purge, rotation des journaux) — voir `api-data-architecture`.
- Un contact pour exercer ses droits est fourni et fonctionne.
