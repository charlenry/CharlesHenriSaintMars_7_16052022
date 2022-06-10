/**
 * Nom du fichier : assets\js\index.js
 * Fonction : Objet principal qui gère la page d'accueil et qui ordonnance d'autres objets tel un contrôleur dans une architecture MVC.
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";
//import { recipes } from "../data/recipes.js";

/* Variables globales */
let g_previousSearchResult = [];
let g_query ="";
let g_tags = [];

class Main {
  constructor() {
    this.$recipesWrapper = document.querySelector(".recipes-wrapper");
  }

  async init() {
    /* Création d'un tableau contenant la mise en forme des données des recettes */
    const recipesDataModel = recipes.map(data => new RecipeDataModel(data));

    /* Ajout de la gestion des tags */
    const tags = new Tag();

     /* Ajout des filtres */
     const filters = new Filters(recipesDataModel, tags);
     filters.render();

    /* Ajout de la barre de recherche par titre, ingrédients et description */
    const searchByNameIngredientsDescription = new SearchBar(recipesDataModel, filters);
    searchByNameIngredientsDescription.render();

   

    /* Pour chaque recette */
    recipesDataModel.forEach(recipe => {
      /* Créer un objet template */
      const templateCard = new RecipeCard(recipe);

      /* Intégrer l'objet template dans la page d'accueil */
      this.$recipesWrapper.appendChild(templateCard.createRecipeCard());
    });
  }
}

const main = new Main();
main.init();
