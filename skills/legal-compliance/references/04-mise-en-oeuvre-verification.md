# 04 — Mise en œuvre dans le produit et vérification

## 1. Pages et liens

- Pages dédiées, en HTML lisible sans JavaScript : `/mentions-legales`, `/confidentialite`, `/cookies` (ou section de la page confidentialité), `/cgu`, `/cgv` selon la matrice.
- Liens permanents en pied de page sur toutes les pages, plus un lien « Gérer les cookies » qui rouvre le choix à tout moment.
- Date de dernière mise à jour en tête de chaque document ; historique des versions dans Git (`CHANGELOG.md`).

## 2. Bandeau de consentement aux cookies

- Rien de soumis à consentement n'est chargé avant le choix : les scripts tiers sont injectés seulement après l'accord, catégorie par catégorie.
- Premier niveau : « Tout accepter », « Tout refuser » et « Personnaliser », avec le même poids visuel ; aucune fermeture par la croix valant acceptation [N3].
- Second niveau : une case par finalité, décochée par défaut, avec la liste des partenaires.
- Le choix est mémorisé (et sa preuve conservée si un serveur existe), puis redemandé à l'échéance recommandée par la CNIL.
- Accessible : focus géré, navigable au clavier, contraste conforme, ne masque pas le contenu de façon bloquante sans moyen de répondre (voir `ux-ui-design`).
- Sans traceur non exempté, pas de bandeau : ne pas en ajouter un « par principe ».

## 3. Formulaires

- Mention d'information courte sous chaque formulaire qui collecte des données : finalité, base légale, durée, lien vers la politique de confidentialité.
- Champs strictement nécessaires seulement ; les champs facultatifs sont signalés.
- Consentement à une lettre d'information : case distincte, décochée, jamais conditionnant le service.

## 4. Tunnel de commande (B2C)

- Récapitulatif complet (articles, prix TTC, frais, délais) avant validation.
- Case d'acceptation des CGV, décochée, avec lien vers la version en vigueur.
- Bouton final explicite (« Commander avec obligation de paiement » ou équivalent).
- E-mail de confirmation reprenant les informations précontractuelles et les CGV (ou un lien durable vers la version acceptée), avec le formulaire de rétractation.

## 5. Accessibilité

Si le service entre dans le champ de l'acte européen sur l'accessibilité ou de l'article 47 de la loi n° 2005-102 : publier une déclaration d'accessibilité (état de conformité, contenus non accessibles, contact, voies de recours). Vérifier le champ d'application selon l'activité et la taille de l'entreprise.

## 6. Checklist QA avant mise en ligne

| N° | Contrôle | Méthode |
| --- | --- | --- |
| 1 | Mentions légales complètes, aucun `[À COMPLÉTER]` restant | Recherche du texte dans le build |
| 2 | Lien vers chaque page juridique présent sur toutes les pages | Parcours des gabarits ou test E2E |
| 3 | Aucun cookie non exempté avant consentement | Navigation privée, outils de développement, onglet Application et Réseau |
| 4 | « Tout refuser » aussi accessible que « Tout accepter » | Inspection visuelle et clavier |
| 5 | Choix modifiable à tout moment | Lien « Gérer les cookies » testé |
| 6 | Politique de confidentialité cohérente avec l'inventaire technique | Comparaison inventaire / document |
| 7 | Durées de conservation appliquées dans le code | Lecture des tâches de purge (voir `api-data-architecture`) |
| 8 | Tunnel de commande : récapitulatif, case CGV décochée, bouton explicite, e-mail de confirmation | Test de bout en bout |
| 9 | Pages juridiques accessibles (titres, contraste, lisibles à 200 %) | Contrôle WCAG 2.2 AA |
| 10 | Date de vérification des textes indiquée et points à faire valider listés | Relecture du livrable |

## 7. Ce qui demande un professionnel du droit

Données de santé ou sensibles, mineurs, traitement à grande échelle ou profilage, transferts hors de l'UE complexes, place de marché ou plateforme d'intermédiation, vente internationale, abonnements avec reconduction, publicité ciblée, litige ou contrôle en cours.
