let foodRepository=function(){let d=[],a=document.getElementById("search");function b(){let a=document.querySelector(".searchInput").value;if(console.log("button is clicked "+a),""!=a)return fetch("https://www.themealdb.com/api/json/v2/9973533/search.php?s="+a).then(a=>a.json()).then(function(a){a.meals.forEach(function(b){let a={image:b.strMealThumb,name:b.strMeal,ingredients:[],tutorial:b.strYoutube};a.ingredients=new Array(20).fill(1).map((a,c)=>b["strIngredient"+(a+c)]).filter(a=>!!a),console.log(a),e(a,a.name)})}).catch(a=>alert("Ooops, can't find this food. Please try again!"))}function c(a){"object"==typeof a?d.push(a):console.log("This is not on object!")}function e(c,e){let a=document.querySelector("#detailModal-container"),g=c.ingredients,h=c.tutorial;a.innerHTML="";let b=document.createElement("div");b.classList.add("modal-content"),b.innerHTML=`
        <h2 class="modal-title" role="food-name" >${e}</h2>
        <div class="modal-body">
        <img src="${c.image}" alt="${e}" class="modal-img" role="food-image">
        <div class="tutorial role="turorial-video">
        <a href="${h}" target="_blank">Checkout the cooking video!</a>
        </div>
        <p>
        <h3 role="ingredients">Main Ingredients</h3>
        <span>${g}</span>
        </p>
        </div>    
        `;let d=document.createElement("button");d.classList.add("modal-close"),d.innerText="Close",b.appendChild(d),a.appendChild(b),a.classList.add("is-visible"),f(a)}function f(a){a.addEventListener("click",b=>{b.target===a&&a.classList.remove("is-visible")}),window.addEventListener("keydown",b=>{"Escape"===b.key&&a.classList.contains("is-visible")&&a.classList.remove("is-visible")}),document.querySelector(".modal-close").addEventListener("click",()=>{a.classList.remove("is-visible")})}return a.addEventListener("click",function(){b()}),document.getElementById("clickMe").addEventListener("click",()=>{window.location.reload()}),{LoadList:function(){return fetch("https://www.themealdb.com/api/json/v2/9973533/randomselection.php").then(a=>a.json()).then(function(a){a.meals.forEach(function(a){let b={image:a.strMealThumb,name:a.strMeal,ingredients:[],tutorial:a.strYoutube};b.ingredients=new Array(20).fill(1).map((b,c)=>a["strIngredient"+(b+c)]).filter(a=>!!a),c(b)})}).catch(a=>console.log(a))},add:c,getAll:function(){return console.log(d),d},addListItem:function(c){let f=document.querySelector(".food ul"),b=document.createElement("li"),a=document.createElement("button"),d=c.name,g=c.image;a.innerHTML=`<img src="${g}" alt="${d}">`,b.appendChild(a),f.appendChild(b),b.classList.add("li"),a.classList.add("foodbutton"),a.classList.add("list-group-item"),a.classList.add("list-group-item-action"),a.setAttribute("data-toggle","modal"),b.setAttribute("role","food-button"),function(a,b,c){a.addEventListener("click",function(){a.setAttribute("data-target","#exampleModal"),e(b,c),console.log(b)})}(a,c,d)},searchfood:b}}();foodRepository.LoadList().then(function(){foodRepository.getAll().forEach(function(a){foodRepository.addListItem(a)})})