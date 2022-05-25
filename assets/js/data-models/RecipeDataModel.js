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
    this._serving = recipe.serving;
    this._ingredients = recipe.ingredients;
    this._time = recipe.time;
    this._description = recipe.description;
    this._appliance = recipe.appliance;
    this._ustensils = recipe.ustensils;
  }


  get id() {
    return this._id;
  }


  get name() {
    return this._name;
  }


  get serving() {
    return this._serving;
  }


  get ingredientsForOneRecipe() {
    let ingredients = "";
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

      ingredients += `<b>${ingrediente}</b> ${quantity} ${unit} <br>`;
    }
    return ingredients;
  }


  get ingredientsForSearch() {
    let ingredients = "";
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

      ingredients += `${ingrediente} ${quantity} ${unit}, `;
    }
    return ingredients;
  }

  
  get time() {    
    return `${this._time} min`;
  }
  

  get description() {
    return this._description;
  }
  

  get appliance() {
    return this._appliance;
  }


  get ustensils() {
    return this._ustensils;
  }

}

//export default RecipeDataModel;