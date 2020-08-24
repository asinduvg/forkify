import axios from "axios";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios({
        method: "GET",
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${this.id}/information`,
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key": "fb9be2ae45mshad585024fdbf315p16e68bjsnfd3f83107e12"
        }
      });

      this.title = res.data.title;
      this.author = "Spoonacular";
      this.img = res.data.image;
      this.url = res.data.sourceUrl;
      this.ingredients = res.data.extendedIngredients;
      this.time = res.data.readyInMinutes;
      this.servings = res.data.servings;

      //   console.log(this);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  }

  //   calcTime() {
  //     const numIng = this.ingredients.length;
  //     const periods = Math.ceil(numIng / 3);
  //     // this.time = periods * 15;
  //   }

  //   calcServings() {
  //     // this.servings = 4;
  //   }

  parseIngredients() {
    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounce",
      "ounces",
      "teaspoon",
      "teaspoons",
      "cups",
      "pounds",
      "leaves"
    ];
    const unitsShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound",
      "leave"
    ];

    const newIngredients = this.ingredients.map(el => {
      // 1) Uniform units
      el.unit = el.unit.toLowerCase();
      unitsLong.forEach((unit, i) => {
        // el.unit = el.unit.replace(unit, unitsShort[i]);
        el.unit = el.unit.replace(unit, unitsShort[i]);
        el.originalString = el.originalString.replace("-", " ");
        el.amount = Math.round(el.amount * 100) / 100;
      });

      //   2) Remove parentheses
      el.originalString = el.originalString.replace(/[()]/g, "");

      // 3) Parse ingredients into count, unit and ingredient
      //   const arrIng = el.originalString.split(' ');
      //   const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

      //   let objIng;
      //   if(unitIndex > -1) {
      //       //There ins a unit

      //   }else if(parseInt(arrIng[0], 10)) {
      //     //There is no unit but first element is a number
      //     objIng = {
      //         count : pareseInt(arrIng[0], 10),
      //         unit : '',
      //         ingredients : el.originalString.split(1)
      //     }

      //   }else if(unitIndex === -1){
      //     // There is no unit and no number
      //     objIng = {
      //         count : 1,
      //         unit : '',
      //         ingredients : el.originalString
      //     }
      //   }

      return el;
    });
    this.ingredients = newIngredients;
  }

  updateServings(type) {
    //servings
    const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;

    //Ingredients

    this.ingredients.forEach(ing => {
      ing.amount *= newServings / this.servings;
    });

    this.servings = newServings;
  }
}
