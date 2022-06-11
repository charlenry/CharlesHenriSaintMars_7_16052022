/**
 * Nom du fichier : assets\js\templates\Tag.js
 * Fonction : Template d'affichage des tags
 * Auteur(s) : Charles-Henri Saint-Mars
**/

class Tag { 
  constructor() {
    this._filters = null;
    this.ingredientColor = '#3282F7';
    this.applianceColor = '#68D9A4';
    this.ustensilColor = '#ED6454';
    
    this.$wrapper = document.createElement('ul');
    this.$tagsWrapper = document.querySelector('.tags-wrapper');
    this.$filtersWrapper = document.querySelector('.filters-wrapper');
    this.$recipesWrapper = document.querySelector(".recipes-wrapper");
  }

  set filters(filters) {
    this._filters = filters;
  }


  addTag(tag, tagType) {
    // Création de l'élément li avec le tag à l'intérieur
    const $li = document.createElement("li");
    $li.className = `${tagType}`;
    const $spanTag = document.createElement("SPAN");
    const textNode = document.createTextNode(tag);
    $spanTag.appendChild(textNode);
    $li.appendChild($spanTag);
    if (tagType === 'ingredient') {
      $li.style.backgroundColor = this.ingredientColor;
    } else if (tagType === 'appliance') {
      $li.style.backgroundColor = this.applianceColor;
    } else if (tagType === 'ustensil') {
      $li.style.backgroundColor = this.ustensilColor;
    }
    
  //  Insertion du bouton de fermeture du tag
    const $iconClose = document.createElement("I");
    $iconClose.className = "far fa-times-circle";
    $li.appendChild($iconClose);
    this.$wrapper.appendChild($li);  // on met le li dans le ul
    this.$tagsWrapper.appendChild(this.$wrapper);
    this.addEventListenerTag();
  }


  addEventListenerTag() {
    const that = this;

    // Click on a close button to hide the current list item
    const close = this.$wrapper.getElementsByClassName("fa-times-circle");
    let i, li;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        li = this.parentElement;
        li.remove();

        g_tags =  g_tags.filter(tag => tag !== li.textContent);
        if(g_tags.length == 0) {
          that.$wrapper.remove();  
        }
         /* console */
        // console.log('g_previousSearchResult:', g_previousSearchResult);
        // console.log('g_query:', g_query);
        // console.log('g_tags:', g_tags);
        that._filters.handleClickOnTagCloseBtn();

      }
    }
  }
}