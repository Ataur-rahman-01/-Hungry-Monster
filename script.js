//SEARCH SECTION
function foodsearch() {
  const keywordfood = document.getElementById("foodinput").value;
  if (keywordfood == "") {
    document.getElementById("notFound").style.display = "block";
  } else {
    getFooditem(keywordfood);
    document.getElementById("notFound").style.display = "none";
  }
}
function getFooditem(keyword) {
  const searchinput = `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`;
  fetch(searchinput)
    .then(async (data) => {
      if (data.ok) {
        data = await data.json();
        displayFood(data);
      }
    })
    // unknown key error show
    .catch((e) => {
      alert("Fetch Error :worng word ", e);
    });
  const displayFood = (food) => {
    const foodDiv = document.getElementById("fooditem");
    const meals = food.meals;
    for (let i = 0; i < meals.length; i++) {
      const element = meals[i];
      const div = document.createElement("div");
      div.className = "food";
      const foodInfo = `
    <img onclick="getFooditeminfo ('${element.idMeal}')" src="${element.strMealThumb}">
    <p>${element.strMeal}</p>
    `;
      div.innerHTML = foodInfo;
      foodDiv.appendChild(div);
    }
  };
}
// click section
function getFooditeminfo(name) {
  const foodId = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
  fetch(foodId)
    .then((res) => res.json())
    .then((data) => renderinfo(data.meals[0]));
}
const renderinfo = (info) => {
  const foodinfodiv = document.getElementById("foodinfo");
  foodinfodiv.innerHTML = ` <div>
  <img src = "${info.strMealThumb}">
  <h2>${info.strMeal}</h2>
  <h4>Ingredient:</h4>
  <p>&#9989${info.strIngredient1}</p>
  <p>&#9989;${info.strIngredient2}</p>
  <p>&#9989;${info.strIngredient3}</p>
  <p>&#9989;${info.strIngredient4}</p>
  </div>
  `;
  document.getElementById("fooditem").style.display = "none";
};
