/**
 * Nom du fichier : assets\js\search\Search.js
 * Fonction :  Objet qui implémente différents types de recherche
 * Auteur(s) : Charles-Henri Saint-Mars
**/

class Search {
  constructor(recipes) {
    /* recipes est l'assiette de recherche */
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
    console.time('Timing recherche principale');
    let result= [];
    let i = 0;

    /*** Sélectionner les recettes en fonction leur nom, leurs ingrédients et leur description ***/
    // Implémentation à l'aide de la boucle For
    for (i = 0; i < this._recipes.length; i++) {
      if (this._recipes[i].name.toLowerCase().includes(query.toLowerCase()) === true) {
        result.push(this._recipes[i]);
      }

      if (this._recipes[i].ingredientsForSearch.toLowerCase().includes(query.toLowerCase()) === true) {
        result.push(this._recipes[i]);
      }

      if (this._recipes[i].description.toLowerCase().includes(query.toLowerCase()) === true) {
        result.push(this._recipes[i]);
      }
    }

    /******** Eliminer les doublons ********/
    result = [...new Set(result)];

    console.timeEnd('Timing recherche principale');

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


