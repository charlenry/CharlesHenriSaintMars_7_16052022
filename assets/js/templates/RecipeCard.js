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
    $article.classList.add('hover-shadow');
    $article.classList.add('cursor');

    const recipeCard = `
      <div class="recipe-photo"></div>
      <div class="recipe-name">${this._recipe.name}</div>
      <div class="recipe-time"><b><span><i class="far fa-regular fa-clock"></i></span>${this._recipe.time}</b></div>
      <div class="recipe-ingredients">${this._recipe.ingredientsForOneRecipe}</div>
      <div class="recipe-description">${this._recipe.description}</div>
    `;
    $article.innerHTML = recipeCard;
    return $article;
  }
}

//export default RecipeCard;