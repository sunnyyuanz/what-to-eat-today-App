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

    function addListItem(food) {
        const ulContainer = document.querySelector(".food ul");
        const node = document.createElement("li");
        let name = food.foodname;
        let score = food.healthiness_score;
        let ingredients = food.ingredients;
        const button = document.createElement('button');
        button.innerText = name;
        button.classList.add("foodbutton");
        const foodDetail = document.createElement('div');
        foodDetail.innerHTML =`
        <div>Healthiness Score: ${score}/5</div>
        <div>Ingredients: ${ingredients}</div>
        `;
        foodDetail.classList.add("clicked");
        node.appendChild(button);
        node.appendChild(foodDetail);
        ulContainer.appendChild(node);
        button.addEventListener("click", function (){
            showDetails(food)
        })
    }

    function showDetails(food){
        console.log(food)
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    }
})()

//Starting pull data from array to display in Html
// let goodFood = { healthiness_score: 4 }

//getAll the data from food list
foodRepository.getAll().forEach(foodinfo => {
    foodRepository.addListItem(foodinfo)
})

// function Checkanswersopen() {
//     for (let i = 0; i < answers.length; i++) {
//         questionBtns[i].classList.remove("open")
//     }
// }


//one function should only do one job so I created a seperate function just to display content on html.
// function buildHtml(option) {
//     const node = document.createElement("li");
//     let name = option.foodname
    
//     const button = document.createElement('button');
//     button.innerText = name;
//     button.classList.add("foodbutton");
//     node.appendChild(button);
    // const html = `
    // <div>Healthiness Score: ${score}/5</div>
    // <div>Ingredients: ${ingredients}</div>
    // `;
//     //determine which food has the best healthiness score
//     // if (score > goodFood.healthiness_score) {
//     //     goodFood = option
//     // }
//     //display a line of comment below that food.
//     // if (name === goodFood.foodname) {
//     //     node.innerHTML = html + `<div class="comment">This looks healthy and yummy. Let's eat ${name} today!</div>`;
//     // } else {
//     //     node.innerHTML = html;
//     // }
//     food.appendChild(node)
// }

