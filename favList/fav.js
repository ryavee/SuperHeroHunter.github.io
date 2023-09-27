

let listOfHeroInDom = document.getElementById("heroList");


console.log("Working");


let listOfHeros  = JSON.parse(localStorage.getItem("favHeros"));
function addHerosToDOM(hero){
    let li = document.createElement("li");
    li.setAttribute("id", `${hero.id}`);
    li.innerHTML = 
    `
    <img src="${hero.thumbnail.path+"."+hero.thumbnail.extension}" id = "poster"  >
    <h2 id="heroTitle"  data-id=${hero.id}>${hero.name}</h2>
    <button id="details" data-id="${hero.id}"> details </button>
    <button id="delete" data-id="${hero.id}"> delete </button>
    `
    listOfHeroInDom.append(li);


}

async function renderHeroList(){
    listOfHeroInDom.innerHTML = "";
   
    for(let i = 0; i < listOfHeros.length; i++){
        id = listOfHeros[i];
        const response = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=c2595c6e10b8e75e6bd3b3c61b14547c&hash=77964d9b5c2bef6213992685d7c2dfd4&ts=1`);
        heroDetails =( await response.json()).data.results[0];
       
        addHerosToDOM(heroDetails);
    }
}


function handleKeyAndClick(e){


    if(e.target.id === "details"){
        let heroId = e.target.dataset.id;
        localStorage.setItem("heroId", JSON.stringify(heroId));
        
        window.open("../details/details.html");
    }

    if(e.target.id === "delete"){
        let heroId = e.target.dataset.id;
        const newFav = listOfHeros.filter(function (id) {
            return heroId !== id;
        });
        listOfHeros =[... newFav];
         //updating the favList array present in the localStorage
        localStorage.setItem("favHeros", JSON.stringify(newFav));

        let ele = document.getElementById(heroId);
        ele.style.display ="none";

    }

}

document.addEventListener("click", handleKeyAndClick);
renderHeroList();