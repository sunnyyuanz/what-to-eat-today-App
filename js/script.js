//wrap foodList array in an IIFE to avoid accidentally accessing the global state. 
//create create a new foodRepository variable to hold what my IIFE will return, then assign the IIFE to that variable.
let foodRepository = (function () {
    let foodList = [
        { foodname: "Sushi", healthiness_score: 5, ingredients: ["salmon", "avocado", "rice", "cucumber", "seeweed"] },
        { foodname: "Pasta", healthiness_score: 4, ingredients: ["chicken", "broccoli", "mushrooms", "tomatoes", "Alfred Sauce", "Fettuccine"] },
        { foodname: "Burger", healthiness_score: 3.8, ingredients: ["beef", "onion", "hamburger buns", "mayonnaise", "ketchup", "lettuce leaves", "tomato"] },
    ];

    function add(newfood) {
        if (typeof newfood === "object") {
            foodList.push(newfood);
        } else {
            console.log("This is not on object!")
        }
    }

    function getAll() {
        return foodList;
    }

    return {
        add: add,
        getAll: getAll
    }
})()

//Starting pull data from array to display in Html
const food = document.querySelector(".food ul");
let goodFood = { healthiness_score: 4 }

//getAll the data from food list
foodRepository.getAll().forEach(foodinfo => {
    buildHtml(foodinfo)
})


//one function should only do one job so I created a seperate function just to display content on html.
function buildHtml(option) {
    const node = document.createElement("li");
    let name = option.foodname
    let score = option.healthiness_score;
    let ingredients = option.ingredients;
    const html = `
    <h2>${name}</h2>
    <div>Healthiness Score: ${score}/5</div>
    <div>Ingredients: ${ingredients}</div>    
`;
//determine which food has the best healthiness score
    if (score > goodFood.healthiness_score) {
        goodFood = option
    }
//display a line of comment below that food.
    if (name === goodFood.foodname) {
        node.innerHTML = html + `<div class="comment">This looks healthy and yummy. Let's eat ${name} today!</div>`;
    } else {
        node.innerHTML = html;
    }
    food.appendChild(node)
}

