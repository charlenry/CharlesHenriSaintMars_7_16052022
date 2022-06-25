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

    this.$wrapper = document.createElement( 'article' );
    this.$wrapper.classList.add('hover-shadow');
    this.$wrapper.classList.add('cursor');
  }


  OpenModal() {
    const that = this;

    this.$wrapper.addEventListener('click', function() {
      const modal = new Modal();
      modal.render(that._recipe);     
    });    
  }
  

  createRecipeCard() {
    const recipeCard = `
      <div class="recipe-photo"></div>
      <div class="recipe-name">${this._recipe.name}</div>
      <div class="recipe-time"><b><span><i class="far fa-regular fa-clock"></i></span>${this._recipe.time}</b></div>
      <div class="recipe-ingredients"><ul>${this._recipe.ingredientsForOneRecipe}</ul></div>
      <div class="recipe-description">${this._recipe.description}</div>
    `;

    this.$wrapper.innerHTML = recipeCard;
    this.OpenModal();
    return this.$wrapper;
  }
}

//export default RecipeCard;