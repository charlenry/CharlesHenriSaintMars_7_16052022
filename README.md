# Projet "Les Petits Plats"
Ce projet consiste à réaliser un site Web pour l'entreprise "Les Petits Plats". C'est un site de recettes de cuisine à l’instar de Marmiton ou 750g. Le site doit être doté d'un moteur de recherche avancé et performant, avec un temps de réponse presque instantané. Je dois réaliser la partie front-end à l'aide d'un fichier JSON contenant 50 recettes. Je dispose également de maquettes Figma et d'un cas d'utilisation détaillé avec plusieurs scénarios. Le livrable doit passer le validateur W3C avec succès.

Remarque : J'ai réalisé une fiche d'investigation pour le champ de recherche principal pour déterminer la solution à retenir pour obtenir un moteur de recherche le plus rapide que possible. J'ai dû choisir entre soit la méthode filter de l'objet Array soit la boucle For/Of soit la boucle For. J'ai élaboré un algorigramme pour chacune de ces possibilités. Après l'étude réalisée à l'aide de JSBench.me, j'ai retenu la méthode filter. J'ai créé une branche git pour chaque cas.

Dans cette branche, le moteur de recherche principal est implémenté avec la boucle For.

MODE D'EMPLOI :
Pour effectuer une recherche, veuillez saisir au moins 3 caractères dans la barre de recherche principale sans taper sur la touche Entrée. Vous pouvez par la suite affiner votre recherche via les filtres. Il est aussi possible de commencer votre recherche directement via les filtres.

Lorsque vous êtes dans la barre de recherche principale, vous pouvez utiliser la touche Entrée pour réinitialiser la recherche.