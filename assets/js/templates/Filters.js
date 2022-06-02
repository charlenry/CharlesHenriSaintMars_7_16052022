/**
 * Nom du fichier : assets\js\templates\Filters.js
 * Fonction : Template d'affichage des filtres
 * Auteur(s) : Charles-Henri Saint-Mars
**/

class Filters {
  /**
   * @param {object} recipes
  **/
  
  constructor(recipes) {
    this._recipes = recipes;
    this.resources = new RecourcesDataModel(this._recipes);
    this.searchByIngredient = new SearchByIngredient(this._recipes);
    this.searchByAppliance = new SearchByAppliance(this._recipes);
    this.searchByUstensil = new SearchByUstensil(this._recipes);
    
    this.$wrapper = document.createElement('div');
    this.$tagsWrapper = document.querySelector('.tags-wrapper');
    this.$filtersWrapper = document.querySelector('.filters-wrapper');
    this.$recipesWrapper = document.querySelector(".recipes-wrapper");
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


  onKeyUpFilter() {
    const that = this;

    this.$wrapper
      .querySelector('#myInputIngredients')
      .addEventListener('keyup', e => {
        const query = e.target.value.toLowerCase();

        that.handleFilter(query, '.li-ingredients');
    });

    this.$wrapper
      .querySelector('#myInputAppareils')
      .addEventListener('keyup', e => {
        const query = e.target.value.toLowerCase();

        that.handleFilter(query, '.li-appareils');
    });

    this.$wrapper
      .querySelector('#myInputUstensiles')
      .addEventListener('keyup', e => {
        const query = e.target.value.toLowerCase();

        that.handleFilter(query, '.li-ustensiles');
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
  
  
  handleFilter(inputValue, liGridCl) {
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


  displayRecipes(recipes) {
    this.$recipesWrapper.innerHTML = "";

    recipes.forEach(recipe => {
        const templateCard = new RecipeCard(recipe);
        this.$recipesWrapper.appendChild(templateCard.createRecipeCard());
    });
  }


  onClickMenu() {
    const that = this;
    let recipesFound = null;

    this.$wrapper
      .querySelector('.li-ingredients')
      .addEventListener('click', e => {
        const target = e.target.innerText;
        console.log(target);

        recipesFound = that.searchByIngredient.search(target);
        that.displayRecipes(recipesFound);
      });


      this.$wrapper
      .querySelector('.li-appareils')
      .addEventListener('click', e => {
        const target = e.target.innerText;
        console.log(target);

        recipesFound = that.searchByAppliance.search(target);
        that.displayRecipes(recipesFound);
      });
      

      this.$wrapper
      .querySelector('.li-ustensiles')
      .addEventListener('click', e => {
        const target = e.target.innerText;
        console.log(target);

        recipesFound = that.searchByUstensil.search(target);
        that.displayRecipes(recipesFound);
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
          <div class="li-ingredients">
            ${this.resources.ingredientsAsList}
          </div>
        </ul>
      
        <button class="btn dropbtn-appareils">
          <span>Appareils</span>
          <span><i class="fas fa-angle-down"></i></span>
        </button>
        <ul id="dropdownContentAppareils" class="dropdown-content dropdown-content-appareils">
          <input class="form-control" id="myInputAppareils" type="text" placeholder="Rechercher un appareil">
          <span><i class="fas fa-angle-up arrow-up-appareils"></i></span>
          <div class="li-appareils">
            ${this.resources.appliancesAsList}
          </div>
        </ul>
    
        <button class="btn dropbtn-ustensiles">
          <span>Ustensiles</span>
          <span><i class="fas fa-angle-down"></i></span>
        </button>
        <ul id="dropdownContentUstensiles" class="dropdown-content dropdown-content-ustensils">
          <input class="form-control" id="myInputUstensiles" type="text" placeholder="Rechercher un ustensile">
          <span><i class="fas fa-angle-up arrow-up-ustensiles"></i></span>
          <div class="li-ustensiles">
            ${this.resources.ustensilsAsList}
          </div>
        </ul>
      </div>
    `;

    this.$wrapper.innerHTML = filterBody;
    this.onClickBtn();
    this.onClickArrowUp();
    this.onKeyUpFilter();
    this.onClickMenu();
    this.$filtersWrapper.appendChild(this.$wrapper);
  }

}