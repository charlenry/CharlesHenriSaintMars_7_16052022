/**
 * Nom du fichier : assets\js\templates\RecipeCard.js
 * Fonction : Template d'affichage des cartes des recettes
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

class RecipeCard {
  /**
   * @param {object} recipe
  **/
  constructor(recipe) {
      this._recipe = recipe;
  }

  createRecipeCard() {
    const $article = document.createElement( 'article' );

    const recipeCard = `
      <div class="recipe-photo">Photo</div>
      <div class="recipe-name">${this._recipe.name}</div>
      <div class="recipe-time">${this._recipe.time}</div>
      <div class="recipe-ingredients">${this._recipe.ingredientsForOneRecipe}</div>
      <div class="recipe-description">${this._recipe.description}</div>
    `;
    $article.innerHTML = recipeCard;
    return $article;
  }
}

//export default RecipeCard;