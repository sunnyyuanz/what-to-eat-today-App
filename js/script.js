//wrap foodList array in an IIFE to avoid accidentally accessing the global state. 
//create create a new foodRepository variable to hold what my IIFE will return, then assign the IIFE to that variable.
let foodRepository = (function () {
    let foodList = [];
    let apiUrl = "https://www.themealdb.com/api/json/v2/9973533/randomselection.php";

    function LoadList(){
        return fetch(apiUrl)
        .then(response => response.json())
        .then(function(json){
            json.meals.forEach(function(item){
                let food = {
                    image: item.strMealThumb,
                    name: item.strMeal,
                    ingredients: [item.strIngredient1,item.strIngredient2,item.strIngredient3,
                        item.strIngredient4,item.strIngredient5],
                    tutorial: item.strYoutube                   
                };
                add(food);
            });
        }).catch(e => console.log(e));
    }


    function add(newfood) {
        if (typeof newfood === "object") {
            foodList.push(newfood);
        } else {
            console.log("This is not on object!")
        }
    }

    function getAll() {
        console.log(foodList);
        return foodList;
    }

    function addListItem(food) {
        const ulContainer = document.querySelector(".food ul");
        const node = document.createElement("li");
        const button = document.createElement('button');
        let name = food.name;
        let image = food.image;
        let ingredients = food.ingredients;
        let tutorial = food.tutorial;
        button.innerHTML = `<img src="${image}" alt="${name}">`;
        node.appendChild(button);
        ulContainer.appendChild(node);
        node.classList.add("li")
        button.classList.add("foodbutton");
        const foodDetail = document.createElement('div');
        // let score = food.healthiness_score;
        // let ingredients = food.ingredients;
        foodDetail.innerHTML =`
        <h2>${name}</h2>
        <div class="tutorial">
        <a href="${tutorial}">Checkout the cooking video!</a>
        </div>
        <p>
        <h3>Main Ingredients</h3>
        <span>${ingredients}</span>
        </p>    
        `;
        node.appendChild(foodDetail);
        foodDetail.classList.add("close")      

        buttonClick(button,foodDetail,food);
        
    }

    function showDetails(foodDetail){
        foodDetail.classList.toggle("open");
    }

    function buttonClick(button,foodDetail,food){
       button.addEventListener("click", function (){ 
            showDetails(foodDetail) 
            console.log(food)                   
        })
    }

    return {
        LoadList:LoadList,
        add: add,
        getAll: getAll,
        addListItem: addListItem
    }
})()

//Starting pull data from array to display in Html
// let goodFood = { healthiness_score: 4 }

//getAll the data from food list
foodRepository.LoadList().then(function(){
    foodRepository.getAll().forEach(function(food){
        foodRepository.addListItem(food);
    });
});
// .forEach(foodinfo => {
//     foodRepository.addListItem(foodinfo)
// })

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

