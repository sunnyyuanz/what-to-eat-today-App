//wrap foodList array in an IIFE to avoid accidentally accessing the global state. 
//create create a new foodRepository variable to hold what my IIFE will return, then assign the IIFE to that variable.
let foodRepository = (function () {
    let foodList = [];
    let searchFood = "";
    let apiUrl = "https://www.themealdb.com/api/json/v2/9973533/randomselection.php";
    let searchButton = document.getElementById("search")
    

    function LoadList(){
        return fetch(apiUrl)
        .then(response => response.json())
        .then(function(json){
            json.meals.forEach(function(item){
                let food = {
                    image: item.strMealThumb,
                    name: item.strMeal,
                    ingredients: [],
                    tutorial: item.strYoutube                
                };
                food.ingredients = new Array(20).fill(1).map((element, i) => item['strIngredient' + (element + i)]).filter((food) => !!food)
                add(food);
            });
        }).catch(e => console.log(e));
    }

   

    searchButton.addEventListener("click", function(){
        searchfood()
    })

    function searchfood(){
        let searchInput = document.querySelector(".searchInput").value;
        let searchBaseUrl = "https://www.themealdb.com/api/json/v2/9973533/search.php?s="
        console.log("button is clicked "+searchInput);
        if(searchInput != ""){
        let searchApiUrl = searchBaseUrl+searchInput;
        return fetch(searchApiUrl)
        .then(response => response.json())
        .then(function(json){
            json.meals.forEach(function(item){
                searchFood = {
                    image: item.strMealThumb,
                        name: item.strMeal,
                        ingredients: [],
                        tutorial: item.strYoutube
                }
                searchFood.ingredients = new Array(20).fill(1).map((element, i) => item['strIngredient' + (element + i)]).filter((food) => !!food);
                console.log(searchFood)
                showModal(searchFood,searchFood.name)
            });
        }).catch(e => alert("Ooops, can't find this food. Please try again!"));       
    }
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
        return foodList
    }

    function addListItem(food) {
        const ulContainer = document.querySelector(".food ul");
        const node = document.createElement("li");
        const button = document.createElement('button');
        let name = food.name;
        let image = food.image;
        button.innerHTML = `<img src="${image}" alt="${name}">`;
        node.appendChild(button);
        ulContainer.appendChild(node);
        node.classList.add("li")
        button.classList.add("foodbutton");
        button.classList.add("list-group-item");
        button.classList.add("list-group-item-action");
        button.setAttribute("data-toggle","modal")
        node.setAttribute("role","food-button")
        buttonClick(button,food,name);
        
    }

    function showModal(food,name){
        let detailModal = document.querySelector("#detailModal-container");
        let ingredients = food.ingredients;
        let tutorial = food.tutorial;
        // Clear all existing modal content
        detailModal.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal-content');

        modal.innerHTML = `
        <h2 class="modal-title" role="food-name" >${name}</h2>
        <div class="modal-body">
        <img src="${food.image}" alt="${name}" class="modal-img" role="food-image">
        <div class="tutorial role="turorial-video">
        <a href="${tutorial}" target="_blank">Checkout the cooking video!</a>
        </div>
        <p>
        <h3 role="ingredients">Main Ingredients</h3>
        <span>${ingredients}</span>
        </p>
        </div>    
        `;

        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';

        modal.appendChild(closeButtonElement);
        detailModal.appendChild(modal);

        detailModal.classList.add("is-visible")
        closModal(detailModal)
    }

    function closModal(detailModal){
        detailModal.addEventListener('click', (e) =>{
            let target = e.target;
            if(target === detailModal){
                detailModal.classList.remove("is-visible")
            }
        })

        window.addEventListener('keydown',(e)=>{
            if(e.key === 'Escape' && detailModal.classList.contains('is-visible')){
                detailModal.classList.remove("is-visible")
            }
        })

        document.querySelector(".modal-close").addEventListener('click', () =>{
            detailModal.classList.remove("is-visible")

        })

    }

    function buttonClick(button,food,name){
       button.addEventListener("click", function (){
        button.setAttribute("data-target","#exampleModal")
           showModal(food,name) 
            // showDetails(foodDetail) 
            console.log(food)                   
        })
    }

    document.getElementById("clickMe").addEventListener('click', () =>{
        window.location.reload();
    })

    return {
        LoadList:LoadList,
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        searchfood: searchfood
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

