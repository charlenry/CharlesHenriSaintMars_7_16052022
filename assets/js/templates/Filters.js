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

    this.$wrapper = document.createElement('div');
    this.$tagsWrapper = document.querySelector('.tags-wrapper');
    this.$filtersWrapper = document.querySelector('.filters-wrapper');
    this.$recipesWrapper = document.querySelector(".recipes-wrapper");
  }


  render() {
    const filterBody = `
      <div class="dropdown-wrapper">
        <button onclick="onClickBtn()" class="btn dropbtn">
          <span class="btn-title">Ingrédients</span>
          <span><i class="fas fa-angle-down"></i></span>
        </button>      
        <button onclick="onClickBtn2()" class="btn dropbtn2">
          <span class="btn-title">Appareils</span>
          <span><i class="fas fa-angle-down"></i></span></button>
        <button onclick="onClickBtn3()" class="btn dropbtn3">
          <span class="btn-title">Ustensils</span>
          <span><i class="fas fa-angle-down"></i></span>
        </button>
        <ul id="dropdownContent" class="dropdown-content">
          <input class="form-control" id="myInput" type="text" placeholder="Search..." onkeyup="filterFunction()">
          <span><i class="fas fa-angle-up" onclick="onClickArrowUp()"></i></span>
          <div class="li-grid">
            <li><a href="#">HTML</a></li>
            <li><a href="#">CSS</a></li>
            <li><a href="#">JavaScript</a></li>
            <li><a href="#">jQuery</a></li>
            <li><a href="#">Bootstrap</a></li>
            <li><a href="#">Angular</a></li>
            <li><a href="#">Vue.js</a></li>
            <li><a href="#">React.js</a></li>
            <li><a href="#">Redux</a></li>
          </div>
        </ul>
      </div>
    `;

    this.$wrapper.innerHTML = filterBody;
    this.$filtersWrapper.appendChild(this.$wrapper);
  }

}