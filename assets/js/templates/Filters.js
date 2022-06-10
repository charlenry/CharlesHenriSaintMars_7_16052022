/**
 * Nom du fichier : assets\js\templates\Filters.js
 * Fonction : Template d'affichage des filtres
 * Auteur(s) : Charles-Henri Saint-Mars
**/

class Filters {
  /**
   * @param {object} recipes
   * @param {object} tags
  **/
  
  constructor(recipes, tags) {
    this._recipes = recipes;
    this._tags = tags;
    this._tags.filters = this;  /* Permet à l'objet tag d'accéder aux methodes de l'objet courant */
    this._searchByNID = null;
    this.resourcesFromInitialData = new RecourcesDataModel(this._recipes);
    this.resourcesFromKeywords = new RecourcesDataModel(this._recipes);
    
    this.searchByIngredient = new SearchByIngredient(this._recipes);
    this.searchByAppliance = new SearchByAppliance(this._recipes);
    this.searchByUstensil = new SearchByUstensil(this._recipes);
    
    this.$wrapper = document.createElement('div');
    this.$tagsWrapper = document.querySelector('.tags-wrapper');
    this.$filtersWrapper = document.querySelector('.filters-wrapper');
    this.$recipesWrapper = document.querySelector(".recipes-wrapper");
  }

  set searchByNID(searchBar) {
    this._searchByNID = searchBar;
  }


  onClickBtn() {
    const that = this;

    this.$wrapper
      .querySelector('.dropbtn-ingredients')
      .addEventListener('click', function() {
        that.handleClickBtn('.dropbtn-ingredients', '#dropdownContentIngredients');
        that.handleClickArrowUp('.dropbtn-appareils', '#dropdownContentAppareils');
        that.handleClickArrowUp('.dropbtn-ustensiles', '#dropdownContentUstensiles');
      });

      this.$wrapper
      .querySelector('.dropbtn-appareils')
      .addEventListener('click', function() {
        that.handleClickBtn('.dropbtn-appareils', '#dropdownContentAppareils');
        that.handleClickArrowUp('.dropbtn-ingredients', '#dropdownContentIngredients');
        that.handleClickArrowUp('.dropbtn-ustensiles', '#dropdownContentUstensiles');
      });

      this.$wrapper
      .querySelector('.dropbtn-ustensiles')
      .addEventListener('click', function() {
        that.handleClickBtn('.dropbtn-ustensiles', '#dropdownContentUstensiles');
        that.handleClickArrowUp('.dropbtn-ingredients', '#dropdownContentIngredients');
        that.handleClickArrowUp('.dropbtn-appareils', '#dropdownContentAppareils');
      });

  }


  onClickArrowUp() {
    const that = this;

    this.$wrapper
      .querySelector('.arrow-up-ingredients')
      .addEventListener('click', function() {
        that.handleClickArrowUp('.btn.dropbtn-ingredients', '#dropdownContentIngredients');
      });

      this.$wrapper
      .querySelector('.arrow-up-appareils')
      .addEventListener('click', function() {
        that.handleClickArrowUp('.btn.dropbtn-appareils', '#dropdownContentAppareils');
      });

      this.$wrapper
      .querySelector('.arrow-up-ustensiles')
      .addEventListener('click', function() {
        that.handleClickArrowUp('.btn.dropbtn-ustensiles', '#dropdownContentUstensiles');
      });

  }


  onKeyUpAdvancedFilter() {
    const that = this;

    this.$wrapper
      .querySelector('#myInputIngredients')
      .addEventListener('keyup', e => {
        const query = e.target.value.toLowerCase();

        that.handleAdvancedFilter(query, '.li-ingredients');
    });

    this.$wrapper
      .querySelector('#myInputAppareils')
      .addEventListener('keyup', e => {
        const query = e.target.value.toLowerCase();

        that.handleAdvancedFilter(query, '.li-appareils');
    });

    this.$wrapper
      .querySelector('#myInputUstensiles')
      .addEventListener('keyup', e => {
        const query = e.target.value.toLowerCase();

        that.handleAdvancedFilter(query, '.li-ustensiles');
    });

  }


  handleClickBtn(boutonCl, listeId) {
    this.$wrapper.querySelector(listeId).style.display = "block";;
    this.$wrapper.querySelector(boutonCl).style.display = "none";
  }
  
  
  handleClickArrowUp(boutonCl, listeId) {
    this.$wrapper.querySelector(listeId).style.display = "none";;
    this.$wrapper.querySelector(boutonCl).style.display = "flex";
  }
  
  
  handleAdvancedFilter(inputValue, liGridCl) {
    let liArray, $liGrid, i, liValue;

    $liGrid = this.$wrapper.querySelector(liGridCl);
    liArray = $liGrid.getElementsByTagName("li");
    for (i = 0; i < liArray.length; i++) {
      liValue = liArray[i].textContent ;
      if (liValue.toLowerCase().indexOf(inputValue) > -1) {
        liArray[i].style.display = "block";  /* Afficher l'élément */
      } else {
        liArray[i].style.display = "none";  /* Ne plus afficher l'élément */
      }
    }
  }


  displayMenusLists(resources = this.resourcesFromInitialData) {
    const $liIngredients = this.$wrapper.querySelector('.li-ingredients');
    const $liAppareils = this.$wrapper.querySelector('.li-appareils');
    const $liUstensiles = this.$wrapper.querySelector('.li-ustensiles');

    $liIngredients.innerHTML = "";
    $liIngredients.innerHTML = resources.ingredientsAsList;

    $liAppareils.innerHTML = "";
    $liAppareils.innerHTML = resources.appliancesAsList;

    $liUstensiles.innerHTML = "";
    $liUstensiles.innerHTML = resources.ustensilsAsList;
  }


  displayRecipes(recipes) {
    this.$recipesWrapper.innerHTML = "";

    recipes.forEach(recipe => {
        const templateCard = new RecipeCard(recipe);
        this.$recipesWrapper.appendChild(templateCard.createRecipeCard());
    });
  }



  handleClickOnTagCloseBtn() {
    let recipesFound = null;
    let liArray = null;
    
    if (g_query.length >= 3 && g_tags.length == 0) {  /* après  avoir supprimé le tag **/
      this._searchByNID.handleQueryBar(g_query);

    } else if (g_query.length < 3 && g_tags.length == 0) {  /* après  avoir supprimé le tag **/
      this.displayRecipes(this._recipes);
      this.resourcesFromKeywords.recipes = this._recipes;
      this.displayMenusLists(this.resourcesFromKeywords);

    } else if (g_query.length >= 3 && g_tags.length >= 1) {  /* après  avoir supprimé le tag **/
      recipesFound = this._searchByNID.searchByNIDFromInitialData.search(g_query);
      
      liArray = this.$tagsWrapper.getElementsByTagName("li");
      for (let li of liArray) {
        if (li.className === 'ingredient') {
          this.searchByIngredient.recipes = recipesFound;
          recipesFound = this.searchByIngredient.search(li.textContent);
        } else if (li.className === 'appliance') {
          this.searchByAppliance.recipes = recipesFound;
          recipesFound = this.searchByAppliance.search(li.textContent);
        } else if (li.className === 'ustensil') {
          this.searchByUstensil.recipes = recipesFound;
          recipesFound = this.searchByUstensil.search(li.textContent);
        }
      }
      this.displayRecipes(recipesFound);
      this.resourcesFromKeywords.recipes = recipesFound;
      this.displayMenusLists(this.resourcesFromKeywords);

    } else if (g_query.length < 3 && g_tags.length >= 1) {    /* après  avoir supprimé le tag **/
      recipesFound = this._recipes;

      liArray = this.$tagsWrapper.getElementsByTagName("li");
      for (let li of liArray) {
        if (li.className === 'ingredient') {
          this.searchByIngredient.recipes = recipesFound;
          recipesFound = this.searchByIngredient.search(li.textContent);
        } else if (li.className === 'appliance') {
          this.searchByAppliance.recipes = recipesFound;
          recipesFound = this.searchByAppliance.search(li.textContent);
        } else if (li.className === 'ustensil') {
          this.searchByUstensil.recipes = recipesFound;
          recipesFound = this.searchByUstensil.search(li.textContent);
        }
      }
      this.displayRecipes(recipesFound);
      this.resourcesFromKeywords.recipes = recipesFound;
      this.displayMenusLists(this.resourcesFromKeywords);
    }

    g_previousSearchResult = recipesFound;
    this.removeSelectedIngedientFomList();
    this.removeSelectedApplianceFomList();
    this.removeSelectedUstensilFomList();
     
    /* console */
    console.log('g_previousSearchResult:', g_previousSearchResult);
    console.log('g_query:', g_query);
    console.log('g_tags:', g_tags);

  }


  removeSelectedIngedientFomList() {
    let liArray = null;

    liArray = this.$wrapper.querySelector('.li-ingredients').getElementsByTagName("li");
    for (let tag of g_tags) {
      for (let li of liArray) {
        if(li.textContent === tag) {
          li.remove();
        }
      }
    }
  }


  removeSelectedApplianceFomList() {
    let liArray = null;

    liArray = this.$wrapper.querySelector('.li-appareils').getElementsByTagName("li");
    for (let tag of g_tags) {
      for (let li of liArray) {
        if(li.textContent === tag) {
          li.remove();
        }
      }
    }
  }


  removeSelectedUstensilFomList() {
    let liArray = null;

    liArray = this.$wrapper.querySelector('.li-ustensiles').getElementsByTagName("li");
    for (let tag of g_tags) {
      for (let li of liArray) {
        if(li.textContent === tag) {
          li.remove();
        }
      }
    }
  }



  handleClickOnKeywords(keywords, tagType) {
    let recipesFound = null;
    
    if (tagType === 'ingredient') {
      if (g_query.length >= 3 && g_tags.length == 0) {
        this.searchByIngredient.recipes = g_previousSearchResult;
        recipesFound = this.searchByIngredient.search(keywords);
        this.displayRecipes(recipesFound);
        this.resourcesFromKeywords.recipes = recipesFound;
        this.displayMenusLists(this.resourcesFromKeywords);
        this._tags.addTag(keywords, 'ingredient');

      } else if (g_query.length < 3 && g_tags.length == 0) {
        this.searchByIngredient.recipes = this._recipes;
        recipesFound = this.searchByIngredient.search(keywords);
        this.displayRecipes(recipesFound);
        this.resourcesFromKeywords.recipes = recipesFound;
        this.displayMenusLists(this.resourcesFromKeywords);
        this._tags.addTag(keywords, 'ingredient');

      } else if (g_query.length >= 3 && g_tags.length >= 1) {
        this.searchByIngredient.recipes = g_previousSearchResult;
      
        recipesFound = this.searchByIngredient.search(keywords);
        this.displayRecipes(recipesFound);
        this.resourcesFromKeywords.recipes = recipesFound;
        this.displayMenusLists(this.resourcesFromKeywords);
        this._tags.addTag(keywords, 'ingredient');

      } else if (g_query.length < 3 && g_tags.length >= 1) {         
        this.searchByIngredient.recipes = g_previousSearchResult;
      
        recipesFound = this.searchByIngredient.search(keywords);
        this.displayRecipes(recipesFound);
        this.resourcesFromKeywords.recipes = recipesFound;
        this.displayMenusLists(this.resourcesFromKeywords);
        this._tags.addTag(keywords, 'ingredient');
      }
    }


    if (tagType === 'appliance') {
      if (g_query.length >= 3 && g_tags.length == 0) {
        this.searchByAppliance.recipes = g_previousSearchResult;
        recipesFound = this.searchByAppliance.search(keywords);
        this.displayRecipes(recipesFound);
        this.resourcesFromKeywords.recipes = recipesFound;
        this.displayMenusLists(this.resourcesFromKeywords);
        this._tags.addTag(keywords, 'appliance');

      } else if (g_query.length < 3 && g_tags.length == 0) {
        this.searchByAppliance.recipes = this._recipes;
        recipesFound = this.searchByAppliance.search(keywords);
        this.displayRecipes(recipesFound);
        this.resourcesFromKeywords.recipes = recipesFound;
        this.displayMenusLists(this.resourcesFromKeywords);
        this._tags.addTag(keywords, 'appliance');
        
      } else if (g_query.length >= 3 && g_tags.length >= 1) {
        this.searchByAppliance.recipes = g_previousSearchResult;

        recipesFound = this.searchByAppliance.search(keywords);
        this.displayRecipes(recipesFound);
        this.resourcesFromKeywords.recipes = recipesFound;
        this.displayMenusLists(this.resourcesFromKeywords);
        this._tags.addTag(keywords, 'appliance');

      } else if (g_query.length < 3 && g_tags.length >= 1) {         
        this.searchByAppliance.recipes = g_previousSearchResult;
      
        recipesFound = this.searchByAppliance.search(keywords);
        this.displayRecipes(recipesFound);
        this.resourcesFromKeywords.recipes = recipesFound;
        this.displayMenusLists(this.resourcesFromKeywords);
        this._tags.addTag(keywords, 'appliance');
      }
    }


    if (tagType === 'ustensil') {
      if (g_query.length >= 3 && g_tags.length == 0) {
        this.searchByUstensil.recipes = g_previousSearchResult;

        recipesFound = this.searchByUstensil.search(keywords);
        this.displayRecipes(recipesFound);
        this.resourcesFromKeywords.recipes = recipesFound;
        this._tags.addTag(keywords, 'ustensil');

      } else if (g_query.length < 3 && g_tags.length == 0) {
        this.searchByUstensil.recipes = this._recipes;

        recipesFound = this.searchByUstensil.search(keywords);
        this.displayRecipes(recipesFound);
        this.resourcesFromKeywords.recipes = recipesFound;
        this.displayMenusLists(this.resourcesFromKeywords);
        this._tags.addTag(keywords, 'ustensil');

      } else if (g_query.length >= 3 && g_tags.length >= 1) {
        this.searchByUstensil.recipes = g_previousSearchResult;
      
        recipesFound = this.searchByUstensil.search(keywords);
        this.displayRecipes(recipesFound);
        this.resourcesFromKeywords.recipes = recipesFound;
        this.displayMenusLists(this.resourcesFromKeywords);
        this._tags.addTag(keywords, 'ustensil');

      } else if (g_query.length < 3 && g_tags.length >= 1) {         
        this.searchByUstensil.recipes = g_previousSearchResult;
      
        recipesFound = this.searchByUstensil.search(keywords);
        this.displayRecipes(recipesFound);
        this.resourcesFromKeywords.recipes = recipesFound;
        this.displayMenusLists(this.resourcesFromKeywords);
        this._tags.addTag(keywords, 'ustensil');
      }
    }

    g_tags.push(keywords);
    g_previousSearchResult = recipesFound;
    if (tagType === 'ingredient') {
      this.removeSelectedIngedientFomList();
    } else if (tagType === 'appliance') {
      this.removeSelectedApplianceFomList();
    } else if (tagType === 'ustensil') {
      this.removeSelectedUstensilFomList();
    }

    /* console */
    // console.log('g_previousSearchResult:', g_previousSearchResult);
    // console.log('recipesFound:', recipesFound);
    // console.log('g_query:', g_query);
    // console.log('g_tags:', g_tags);

  }


  onClickMenuItem() {
    const that = this;

    this.$wrapper
      .querySelector('.li-ingredients')
      .addEventListener('click', e => {
        const keywords = e.target.innerText;

        that.handleClickOnKeywords(keywords, 'ingredient')
      });


      this.$wrapper
      .querySelector('.li-appareils')
      .addEventListener('click', e => {
        const keywords = e.target.innerText;

        that.handleClickOnKeywords(keywords, 'appliance')
      });


      this.$wrapper
      .querySelector('.li-ustensiles')
      .addEventListener('click', e => {
        const keywords = e.target.innerText;

        that.handleClickOnKeywords(keywords, 'ustensil')
      });

  }


  render() {
    const filterBody = `
      <div class="dropdown-wrapper">
        <button class="btn  dropbtn-ingredients">
          <span>Ingrédients</span>
          <span><i class="fas fa-angle-down"></i></span>
        </button>
        <ul id="dropdownContentIngredients" class="dropdown-content dropdown-content-ingredients">
        <input class="form-control" id="myInputIngredients" type="text" placeholder="Rechercher un ingrédient">
          <span><i class="fas fa-angle-up arrow-up-ingredients"></i></span>
          <div class="li-ingredients"></div>
        </ul>
      
        <button class="btn dropbtn-appareils">
          <span>Appareils</span>
          <span><i class="fas fa-angle-down"></i></span>
        </button>
        <ul id="dropdownContentAppareils" class="dropdown-content dropdown-content-appareils">
          <input class="form-control" id="myInputAppareils" type="text" placeholder="Rechercher un appareil">
          <span><i class="fas fa-angle-up arrow-up-appareils"></i></span>
          <div class="li-appareils"></div>
        </ul>
    
        <button class="btn dropbtn-ustensiles">
          <span>Ustensiles</span>
          <span><i class="fas fa-angle-down"></i></span>
        </button>
        <ul id="dropdownContentUstensiles" class="dropdown-content dropdown-content-ustensils">
          <input class="form-control" id="myInputUstensiles" type="text" placeholder="Rechercher un ustensile">
          <span><i class="fas fa-angle-up arrow-up-ustensiles"></i></span>
          <div class="li-ustensiles"></div>
        </ul>
      </div>
    `;

    this.$wrapper.innerHTML = filterBody;
    this.displayMenusLists();
    this.onClickBtn();
    this.onClickArrowUp();
    this.onKeyUpAdvancedFilter();
    this.onClickMenuItem();
    this.$filtersWrapper.appendChild(this.$wrapper);
    
  }

}