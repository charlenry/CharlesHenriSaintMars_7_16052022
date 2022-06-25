/**
 * Nom du fichier : assets\js\data-models\RecipeDataModel.js
 * Fonction : Objet qui met en forme les données (modèle de données) avant la présentation à un objet template.
 * Design Pattern : Constructor Pattern
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

class RecipeDataModel {
  /**
   * @param {object} recipe
  **/
  constructor(recipe) {
    this._id = recipe.id;
    this._name = recipe.name;
    this._servings = recipe.servings
    this._ingredients = recipe.ingredients;
    this._ingredientsForSearch = "";
    this._time = recipe.time;
    this._description = recipe.description;
    this._appliance = recipe.appliance;
    this._ustensils = recipe.ustensils;
  }


  get id() {
    /* Retourne un nombre */
    return this._id;
  }


  get name() {
    return this._name;
  }


  get servings() {
    /* Retourne un nombre */
    return this._servings;
  }


  get ingredientsForOneRecipe() {
    let ingredientsForRender = "";
    let quantity ="";
    let unit = "";
    let ingrediente = "";
    let colon = ':';

    for (let ingredient of this._ingredients) {
      if(ingredient.unit === undefined) {
        unit = "";
      } else {
        unit = ingredient.unit;
      }

      if(ingredient.quantity === undefined) {
        quantity = "";
        ingrediente = ingredient.ingredient;
      } else {
        ingrediente = ingredient.ingredient + colon;
        quantity = ingredient.quantity;
      }

      /* Liste des ingrédients sous forme de chaine non balisée destinée à la recherche */
      this._ingredientsForSearch += `${ingrediente} ${quantity} ${unit}, `;
      /* Liste des ingrédients sous forme de chaine balisée */
      ingredientsForRender += `<li><b>${ingrediente}</b> ${quantity}&nbsp;${unit}</li>`;
    }

    /* Retourne la liste des ingrédients sous forme de chaine balisée pour affichage */
    return ingredientsForRender;
  }


  get ingredientsForSearch() {
    /* Retourne la liste des ingrédients sous forme de chaine non balisée destinée à la recherche */
    return this._ingredientsForSearch;
  }

  
  get time() {
    return `${this._time} min`;
  }
  

  get description() {
    return this._description;
  }
  

  get appliance() {
    /* Retourne une chaine */
    return this._appliance;
  }

  get ustensils() {
    /* Retourne un tableau */
    return this._ustensils;
  }


  get ustensilsForModal() {
    let ustensiles = '';
    let i;

    /* Retourne une chaine */
    for (i = 0; i < this._ustensils.length; i++) {
      if (i <= this._ustensils.length-2) {
        ustensiles += `${this._ustensils[i]}, `;
      } else {
        ustensiles += `${this._ustensils[i]}`;
      }
    }
    return ustensiles;
  }

}

//export default RecipeDataModel;