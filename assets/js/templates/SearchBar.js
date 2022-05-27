/**
 * Nom du fichier : assets\js\templates\SearchBar.js
 * Fonction : Template d'affichage des cartes des recettes
 * Auteur(s) : Charles-Henri Saint-Mars
**/

class SearchBar {
  /**
   * @param {object} recipes
  **/
  
  constructor(recipes) {
    this._recipes = recipes;
    this.searchByNameIngredientsDescription = new SearchByNameIngredientsDescription(this._recipes);

    this.$wrapper = document.createElement('div');
    this.$searchWrapper = document.querySelector('.search-wrapper');
    this.$recipesWrapper = document.querySelector(".recipes-wrapper");
  }


  displayRecipes(recipes) {
    this.$recipesWrapper.innerHTML = "";

    recipes.forEach(recipe => {
        const templateCard = new RecipeCard(recipe);
        this.$recipesWrapper.appendChild(templateCard.createRecipeCard());
    });
  }


  onSearch() {
    let recipesFound = null;

    this.$wrapper
      .querySelector('.search-input')
      .addEventListener('keyup', e => {
        const query = e.target.value;

        if (query.length >= 3) {
          recipesFound = this.searchByNameIngredientsDescription.search(query);
          this.displayRecipes(recipesFound);
        } else if (query.length < 3) {
          this.displayRecipes(this._recipes);
        }
    })
  }


  render() {
    const searchForm = `
      <form action="#" method="POST">
        <div class="search-input"> 
          <input id="search-bar" type="text" placeholder="Rechercher une recette">
        </div>
      </form>
    `;

    this.$wrapper.innerHTML = searchForm;
    this.onSearch();
    this.$searchWrapper.appendChild(this.$wrapper);
  }

}