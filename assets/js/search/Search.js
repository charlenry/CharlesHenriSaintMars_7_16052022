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

  set recipes(recipes) {
    this._recipes = recipes;
  }

  selectRecipes(query) {
    /* Sélectionner les recettes en fonction leur nom */
    let resultsByName = this._recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );

    /* Sélectionner les recettes en fonction des noms des ingrédients */
    let resultsByIngredients = this._recipes.filter(recipe =>
      recipe.ingredientsForSearch.toLowerCase().includes(query.toLowerCase())
    );
    
    /* Sélectionner les recettes en fonction de la description */
    let resultsByDescription = this._recipes.filter(recipe =>
      recipe.description.toLowerCase().includes(query.toLowerCase())
    );

    /* Concaténer les précédents résultats et éliminer les doublons */
    let result = resultsByName.concat(resultsByIngredients, resultsByDescription);
    result = [...new Set(result)];
    
    return result;
  }

}

class SearchByIngredient extends Search {
  constructor(recipes) {
    super(recipes);
  }

  set recipes(recipes) {
    this._recipes = recipes;
  }

  selectRecipes(query) {
    /* Sélectionner les recettes en fonction d'un ingrédient */
    let resultsByIngredient = this._recipes.filter(recipe =>
      recipe.ingredientsForSearch.toLowerCase().includes(query.toLowerCase())
    );
    
    return resultsByIngredient;
  }

}

class SearchByAppliance extends Search {
  constructor(recipes) {
    super(recipes);
  }

  set recipes(recipes) {
    this._recipes = recipes;
  }

  selectRecipes(query) {
    /* Sélectionner les recettes en fonction d'un appareil */
    let resultsByAppliance = this._recipes.filter(recipe =>
      recipe.appliance.toLowerCase().includes(query.toLowerCase())
    );
    
    return resultsByAppliance;
  }

}


class SearchByUstensil extends Search {
  constructor(recipes) {
    super(recipes);
  }

  set recipes(recipes) {
    this._recipes = recipes;
  }

  selectRecipes(query) {
    let resultsByUstensil;
    /* Sélectionner les recettes en fonction d'un ustensile */

    resultsByUstensil = this._recipes.filter(recipe => {
      for (let ustensil of recipe.ustensils) {
        if (ustensil.toLowerCase().includes(query.toLowerCase())) return true;
      }
    });
    
    return resultsByUstensil;
  }

}


