/**
 * Nom du fichier : assets\js\index.js
 * Fonction : Objet principal qui gère la page d'accueil et qui ordonnance d'autres objets tel un contrôleur dans une architecture MVC.
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";
//import { recipes } from "../data/recipes.js";


class Main {
  constructor() {
    this.$recipesWrapper = document.querySelector(".recipes_wrapper");
  }

  async init() {
    /* Création d'un tableau contenant la mise en forme des données des recettes */
    const recipesDataModel = recipes.map(data => new RecipeDataModel(data));

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
