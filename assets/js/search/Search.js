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
    let resultsByName = [];
    let resultsByIngredients = [];
    let resultsByDescription = [];
    let i = 0;

    /******** Sélectionner les recettes en fonction leur nom ********/
    // Implémentation à l'aide de la méthode filter des tableaux
    // resultsByName = this._recipes.filter(recipe =>
    //   recipe.name.toLowerCase().includes(query.toLowerCase())
    // );

    // Implémentation à l'aide de la boucle for of
    // for (let recipe of this._recipes) {
    //   if (recipe.name.toLowerCase().includes(query.toLowerCase()) === true) {
    //     resultsByName.push(recipe);
    //   }
    // }

    // Implémentation à l'aide de la boucle for
    for (i = 0; i < this._recipes.length; i++) {
      if (this._recipes[i].name.toLowerCase().includes(query.toLowerCase()) === true) {
        resultsByName.push(this._recipes[i]);
      }
    }

    

    /******** Sélectionner les recettes en fonction des noms des ingrédients ********/
    // Implémentation à l'aide de la méthode filter des tableaux
    // resultsByIngredients = this._recipes.filter(recipe =>
    //   recipe.ingredientsForSearch.toLowerCase().includes(query.toLowerCase())
    // );

    // Implémentation à l'aide de la boucle for of 
    // for (let recipe of this._recipes) {
    //   if (recipe.ingredientsForSearch.toLowerCase().includes(query.toLowerCase()) === true) {
    //     resultsByIngredients.push(recipe);
    //   }
    // }

    // Implémentation à l'aide de la boucle for
    for (i = 0; i < this._recipes.length; i++) {
      if (this._recipes[i].ingredientsForSearch.toLowerCase().includes(query.toLowerCase()) === true) {
        resultsByIngredients.push(this._recipes[i]);
      }
    }

    
    
    /******** Sélectionner les recettes en fonction de la description ********/
    // Implémentation à l'aide de la méthode filter des tableaux
    // resultsByDescription = this._recipes.filter(recipe =>
    //   recipe.description.toLowerCase().includes(query.toLowerCase())
    // );

    // Implémentation à l'aide de la boucle for of
    // for (let recipe of this._recipes) {
    //   if (recipe.description.toLowerCase().includes(query.toLowerCase()) === true) {
    //     resultsByDescription.push(recipe);
    //   }
    // }

    // Implémentation à l'aide de la boucle for
    for (i = 0; i < this._recipes.length; i++) {
      if (this._recipes[i].description.toLowerCase().includes(query.toLowerCase()) === true) {
        resultsByDescription.push(this._recipes[i]);
      }
    }


    /******** Concaténer les précédents résultats et éliminer les doublons ********/
    let result = resultsByName.concat(resultsByIngredients, resultsByDescription);
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


