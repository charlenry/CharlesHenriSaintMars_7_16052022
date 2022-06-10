/**
 * Nom du fichier : assets\js\data-models\ResourcesDataModel.js
 * Fonction : Objet qui met en forme les données (modèle de données) avant la présentation à un objet template.
 * Design Pattern : Constructor Pattern
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

class RecourcesDataModel {
  /**
   * @param {object} recipes
  **/
 
  constructor(recipes) {
    this._recipes = recipes;
  }


  set recipes(recipes) {
    this._recipes = recipes;
  }


  /* mettre en majuscule la première lettre d'une chaine */
  upperCaseFirstChar(str){
    return (str+'').charAt(0).toUpperCase()+str.substr(1);
  }


  /* Liste des ingrédients */
  get ingredientsAsList() {
    let ingredients = [];
    let resultIntermed = [];
    let result = "";
    
    /* Récupérer des ingrédients */
    for (let recipe of this._recipes) {
      for (let ingredientItem of recipe._ingredients) {
        ingredients.push(ingredientItem.ingredient); 
      }
    }

    /* Mettre en minuscule les noms d'ingrédients */
    ingredients.forEach(element => {
      resultIntermed.push(element.toLowerCase());
    })

    /* Eliminer les doublons */
    ingredients = [...new Set(resultIntermed)];
    

    /* Trier par ordre alphabétique */
    ingredients.sort((a, b) => {
      return a.localeCompare(b);
    });

    /*Formater la liste */
    for (let ingredient of ingredients) {
      result += `<li>${this.upperCaseFirstChar(ingredient)}</li>`;
    }

    return result;
  }


  /* Liste des appareils */
  get appliancesAsList() {
    let appliances = [];
    let result = "";

    /* Récupérer la liste des appareils */
    for (let recipe of this._recipes) {
      appliances.push(recipe.appliance);
    }

    /* Eliminer les doublons */
    appliances = [...new Set(appliances)];

    /* Trier par ordre alphabétique */
    appliances.sort((a, b) => {
      return a.localeCompare(b);
    });

    /*Formater la liste */
    for (let appliance of appliances) {
      result += `<li>${appliance}</li>`;
    }

    return result;
  }


  /* Liste des ustensiles */
  get ustensilsAsList() {
    let ustensils = [];
    let resultIntermed = [];
    let result = "";

    /* Récupérer les ustensiles */
    for (let recipe of this._recipes) {
      for (let ustensil of recipe.ustensils) {
       ustensils.push(ustensil);
      }
    }

    /* Mettre en minuscule les noms d'ingrédients */
    ustensils.forEach(element => {
      resultIntermed.push(element.toLowerCase());
    })

     /* Eliminer les doublons */
    ustensils = [...new Set(resultIntermed)];

    /* Trier par ordre alphabétique */
    ustensils.sort((a, b) => {
      return a.localeCompare(b);
    });

    /*Formater la liste */
    for (let ustensil of ustensils) {
      result += `<li>${this.upperCaseFirstChar(ustensil)}</li>`;
    }

    return result;
  }

}

//export default AllRecipesDataModel;