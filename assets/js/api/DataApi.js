/**
 * Nom du fichier : assets\js\api\DataApi.js
 * Fonction : Objet qui se connecte au fichier JSON passé en argument et retourne les données selon leur type.
 * Auteur(s) : Charles-Henri Saint-Mars
**/

"use strict";

class DataApi {
  /**
   * @param {string} url 
  **/
  constructor(url) {
      this._url = url;
  }

  async getRecipes() {
    return fetch(this._url)
      .then(response => {
        if(response.ok) return response.json();
        else throw new Error(response.statusText);
      })
      .then(data => {
        return (data.recipes);
      })
      .catch(error => {
        console.log(`HTTP Error: ${error.message}`);
      });
  }
}

//export default DataApi;
