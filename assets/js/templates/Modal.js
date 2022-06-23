/**
 * Nom du fichier : assets\js\templates\Modal.js
 * Fonction : Template d'une modale affichant une recette choisie avec sa description complète
 * Auteur(s) : Charles-Henri Saint-Mars
**/

class Modal {
 
  constructor(recipe) {
    this.$wrapper = document.createElement('div');
    this.$modalWrapper = document.querySelector('.modal-wrapper');
  }


  onCloseButton() {
    const that = this;

    this.$wrapper
      .querySelector('.close')
      .addEventListener('click', function() {
        that.$modalWrapper.style.display = "none";
        that.$wrapper.remove();
      });
  }


  displayModal(recipe) {
    let minWindow = window.matchMedia("(min-width: 1024px)")
    let recipeItem;
    
    recipeItem = `
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close">&times;</span>
        <div class="modal-content-data">
          <div class="recipe-photo"></div>
          <div class="recipe-name">${recipe.name}</div>
          <div class="recipe-time"><b><span><i class="far fa-regular fa-clock"></i></span>${recipe.time}</b></div>
          <div class="recipe-appliance"><b>Appareil: </b>${recipe.appliance}</div>
          <div class="recipe-servings"><b>Nombre de personnes: </b>${recipe.servings}</div>
          <div class="recipe-ustensils"><b>Ustensiles: </b>${recipe.ustensilsForModal}</div>
          <div class="recipe-ingredients">${recipe.ingredientsForOneRecipe}</div>
          <div class="recipe-description">${recipe.description}</div>
        </div>
      </div>
    `;

    if (minWindow.matches) {
      this.$wrapper.innerHTML = recipeItem;
      this.$modalWrapper.appendChild(this.$wrapper);
      this.$modalWrapper.style.display = "block";
    }
    
  }


  render(recipe) {
    this.displayModal(recipe);
    this.onCloseButton();
  }
  
}