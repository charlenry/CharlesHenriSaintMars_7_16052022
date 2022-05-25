/**
 * Nom du fichier : assets\js\search\Search.js
 * Fonction :  Objet qui implémente différents types de recherche
 * Auteur(s) : Charles-Henri Saint-Mars
**/

class Search {
  constructor(recipes) {
    this._recipes = recipes;
  }

  search(query) {
    return this.selectRecipes(query);
  }
}


class SearchByNameIngredientsDescription extends Search {
  constructor(recipes) {
    super(recipes);
  }

  selectRecipes(query) {
    let resultsByName = this._recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );

    let resultsByIngredients = this._recipes.filter(recipe =>
      recipe.ingredientsForSearch.toLowerCase().includes(query.toLowerCase())
    );
    
    let resultsByDescription = this._recipes.filter(recipe =>
      recipe.description.toLowerCase().includes(query.toLowerCase())
    );

    let intermedResult = resultsByName.concat(resultsByDescription);
    let finalResult = [...new Set(intermedResult)];
    return finalResult;
  }
}
