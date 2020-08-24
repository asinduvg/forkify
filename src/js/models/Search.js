import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const res = await axios({
        method: "GET",
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${this.query}`,
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key": "fb9be2ae45mshad585024fdbf315p16e68bjsnfd3f83107e12"
        },
        params: {
          // "diet":"vegetarian",
          // "excludeIngredients":"coconut",
          // "intolerances":"egg%2C gluten",
          number: "50",
          offset: "0",
          type: "main course"
          // query: "burger"
        }
      });
      this.result = res.data.results;
      // console.log(res);

      // console.log(this.result);
    } catch (error) {
      alert(error);
    }
  }
}
