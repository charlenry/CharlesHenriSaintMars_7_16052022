/**
 * Nom du fichier : assets\js\data-models\AllRecipesDataModel.js
 * Fonction : Objet qui met en forme les données (modèle de données) avant la présentation à un objet template.
 * Design Pattern : Constructor Pattern
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

class AllRecipesDataModel {
  /**
   * @param {object} recipes
  **/
 
  constructor(recipes) {
    this._recipes = recipes;
  }

  
  get ingredientsAsList() {
    let ingredients = "";

    for (let recipe of this._recipes) {
      ingredients += `<li>${recipe.ingredients.ingredient}</li>`;
    }
    return ingredients;
  }

  get ingredientsAsArray() {
    let ingredients = [];

    for (let recipe of this._recipes) {
      ingredients.push(recipe.ingredients.ingredient);
    }
    return ingredients;
  }

  get appliancesAsList() {
    let appliances = "";

    for (let recipe of this._recipes) {
      appliances += `<li>${recipe.appliance}</li>`;
    }
    return appliances;
  }

  get appliancesAsArray() {
    let appliances = [];

    for (let recipe of this._recipes) {
      appliances.push(recipe.appliance);
    }
    return appliances;
  }

  get ustensilsAsList() {
    let ustensils = "";

    for (let recipe of this._recipes) {
      for (let ustensil of recipe.ustensils) {
        ustensils += `<li>${ustensil}</li>`;
      }
    }
    return ustensils;
  }

  get ustensilsAsArray() {
    let ustensils = [];

    for (let recipe of this._recipes) {
      for (let ustensil of recipe.ustensils) {
        ustensils.push(ustensil);
      }
    }
    return ustensils;
  }

}

//export default AllRecipesDataModel;