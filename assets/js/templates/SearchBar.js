/**
 * Nom du fichier : assets\js\templates\SearchBar.js
 * Fonction : Template d'affichage des cartes des recettes
 * Auteur(s) : Charles-Henri Saint-Mars
**/

class SearchBar {
  /**
   * @param {object} recipes
   * @param {object} filters
  **/
  
  constructor(recipes, filters) {
    this._recipes = recipes;
    this._filters = filters;
    this._filters.searchByNID = this;  /* Permet à l'objet filters d'accéder aux methodes de l'objet courant */
    
    this.searchByNIDFromInitialData = new SearchByNameIngredientsDescription(this._recipes);
    this.searchByNIDFromKeywords = new SearchByNameIngredientsDescription(this._recipes);
    
    this.resourcesFromInitialData = new RecourcesDataModel(this._recipes);
    this.resourcesFromKeywords = new RecourcesDataModel(this._recipes);

    this.$wrapper = document.createElement('div');
    this.$searchWrapper = document.querySelector('.search-wrapper');
    this.$recipesWrapper = document.querySelector(".recipes-wrapper");
  }


  displayRecipes(recipes) {
    this.$recipesWrapper.innerHTML = "";

    if (recipes.length == 0) {
      this.$recipesWrapper.innerHTML = `<span class="errorMessage">Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</span>`;
    } else {
      recipes.forEach(recipe => {
          const templateCard = new RecipeCard(recipe);
          this.$recipesWrapper.appendChild(templateCard.createRecipeCard());
      });
    }
  }


  handleSearchResult(recipesFound) {
    g_previousSearchResult = recipesFound;
    this.displayRecipes(recipesFound);
    this.resourcesFromKeywords.recipes = recipesFound;
    this._filters.displayMenusLists(this.resourcesFromKeywords);
  }


  /* Méthode déclenchée par la saisie dans la barre de recherche principale */ 
  handleQueryBar(query) {
    let recipesFound = null;
    
    if (query.length >= 3) {
      /* Recherche par nom des recettes, par ingrédients et par description depuis la liste complète */
      recipesFound = this.searchByNIDFromInitialData.search(query);
    } else if (query.length < 3) {
      /* recipesFound reçoit la liste complète des recettes */
      recipesFound = this._recipes;
    }
    
    if (g_tags.length >= 1) {
      /* Recherche par ingrédients ou par appareil ou par ustensiles selon le cas */
      recipesFound = this._filters.retrieveRecipesFromRemainingTagsList(recipesFound);
    } 

    this.handleSearchResult(recipesFound);

    /* console */
    // console.log('g_previousSearchResult:', g_previousSearchResult);
    // console.log('g_query:', g_query);
    // console.log('g_tags:', g_tags);
  }


  onSearch() {
    const that = this;

    this.$wrapper
      .querySelector('.search-input')
      .addEventListener('keyup', e => {
        const query = e.target.value;
        g_query = query;

        that.handleQueryBar(query);
    });
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