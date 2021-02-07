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
    .then((res) => res.json())
    .then((data) => displayFood(data));
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
  const foodid = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
  fetch(foodid)
    .then((res) => res.json())
    .then((data) => renderinfo(data.meals[0]));
}
const renderinfo = (info) => {
  const foodinfodiv = document.getElementById("foodinfo");
  foodinfodiv.innerHTML = ` <div>
  <img src = "${info.strMealThumb}">
  <ul>
  <li>${info.strIngredient1}</li>
  <li>${info.strIngredient2}</li>
  <li>${info.strIngredient3}</li>
  <li>${info.strIngredient4}</li>

  </ul>
  </div>
  `;
  document.getElementById("fooditem").style.display = "none";
};
