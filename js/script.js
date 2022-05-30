
// Followed Task 1.2 instruction of building a pokemonlist but now directly related to this project. 
let pokemonList = [
    { name: "Charmeleon", height: 1.1, types: ["steel", "fire", "ice", "fairy"] },
    { name: "Beedrill", height: 1, types: ["poison", "bug", "fairy", "fighting", "grass"] },
    { name: "Pikachu", height: 0.4, types: ["flying", "steel", "electric"] }
];

//Something might be really related to this project which is a foodlist. 
let foodList = [
    { foodname: "Sushi", healthiness_score: 5, ingredients: ["salmon", "avocado", "rice", "cucumber", "seeweed"] },
    { foodname: "Pasta", healthiness_score: 4, ingredients: ["chicken", "broccoli", "mushrooms", "tomatoes", "Alfred Sauce", "Fettuccine"] },
    { foodname: "Burger", healthiness_score: 3.8, ingredients: ["beef", "onion", "hamburger buns", "mayonnaise", "ketchup", "lettuce leaves", "tomato"] },
];

//Starting pull data from array to display in Html
const food = document.querySelector(".food ul");

for (i = 0; i < foodList.length; i++) {
    const node = document.createElement("li");
    let name = foodList[i].foodname
    let score = foodList[i].healthiness_score;
    let ingredients = foodList[i].ingredients;
    const html = `
    <h2>${name}</h2>
    <div>Healthiness Score: ${score}/5</div>
    <div>Ingredients: ${ingredients}</div>    
`;
    node.innerHTML = html;

    food.appendChild(node)
//determine which food has the highest healthiness score and add the comment below that food. 
    if(score>4 && score>foodList[i+1].healthiness_score){
        const div = document.createElement("div");
        const divhtml = `This looks healthy and yummy. Let's eat ${name} today!`;
        div.innerHTML = divhtml;
        node.appendChild(div)
    }

}





