const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokeAPIList = document.querySelector('.pokeAPI__list');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.btn__left');
const buttonNext = document.querySelector('.btn__right');
const buttonUp = document.querySelector('.btn__up');
const buttonDown = document.querySelector('.btn__down');
const buttonA = document.querySelector('.btn__a');
const buttonB = document.querySelector('.btn__b');

var pokemonSelected = '';
var indexSelected = 1;
var newIndexSelected = 1;
var list = [];

var actualScreen = "MainList"; //PokemonList MovesList, BerriesList, NaturesList, AbilitiesList || PokemonDetail MovesDetail, BerriesDetail, NaturesDetail, AbilitiesDetail

const mainList = ["Pokemon", "Move", "Ability", "Nature", "Berry"];
const oakMessage = "Oak's words echoed... There's a time and place for everything, but not now.";

  

const fetchLista = async (type) => {
    if(type == "MainList"){
        renderList("main");
    } else {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/${getListType()}?limit=898&offset=0`);
        if(APIResponse.status == 200){
            list = await APIResponse.json();
            renderList(getListType(), list);
            console.log(list);
        }
    }
}

const renderList = async (type, list) => {
    var index = 1;
    pokeAPIList.innerHTML = '';
    if(type != "main"){
        for (let i = 0; i < list.results.length; i++) {
            const element = list.results[i];
            const obj = await fetchElement(type, element.name);
            var pokeOrder = obj.id.toString().length;
            if(pokeOrder == 1){
                pokeOrder = '00' + obj.id;
            } else if(pokeOrder == 2){
                pokeOrder = '0' + obj.id;
            } else{
                pokeOrder = obj.id;
            }
            const listItem = document.createElement('li');
        
            if (index === indexSelected) {
                listItem.className = 'active';
            } else {
                listItem.className = '#' + index;
            }
            
            listItem.id = index;
            listItem.innerHTML = `
                <span>${pokeOrder}</span> - 
                <span>${element.name}</span>
                `;
            
                pokeAPIList.appendChild(listItem);
                index++;
        }
      
        const element001 = document.getElementById("1");
        if (element001) {
            element001.className = "active";
        }
    } else{
        for(let i = 0; i < mainList.length; i++) {
            const listItem = document.createElement('li');
            if ((i+1) === indexSelected) {
                listItem.className = 'active';
            } else {
                listItem.className = '#' + index;
            }
            listItem.id = index;
            listItem.innerHTML = `- <span>${mainList[i]}</span>`;
            pokeAPIList.appendChild(listItem);
            index++;
        }
    }
};
  

const fetchElement = async (type ,element) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/${type}/${element}`);
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }   
}

const renderPokemon = async (type, id) => {

    pokemonName.innerHTML = 'Loading...';
    
    data = await fetchElement(type, id);
    
    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
    
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        let pokeSripte = pokemonImage.src;
        if (pokemonImage.src === 'http://127.0.0.1:5500/null' || pokemonImage.src === 'https://mario23leiva.github.io/PikaPokedex/null') {
            pokemonImage.src = data['sprites']['versions']['generation-viii']['icons']['front_default'];
        }
          
        input.value = '';
        pokemonSelected = data.id;
    }
    else{
        pokemonName.innerHTML = 'MissingNo';
        pokemonNumber.innerHTML = '¿?';
        pokemonImage.src = 'files/img_pika_pokedex/missigno.png';
        input.value = '';
    }

    
}


form.addEventListener('submit' , (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

buttonNext.addEventListener('click' , () =>{
    if(actualScreen == "PokemonDetail"){
        var numberPokemonSelected = parseInt(pokemonSelected);
        renderPokemon((numberPokemonSelected + 1));
    }
})

buttonPrev.addEventListener('click' , () =>{
    if(actualScreen == "PokemonDetail"){
        var numberPokemonSelected = parseInt(pokemonSelected);
        renderPokemon((numberPokemonSelected - 1));
    }
})

buttonUp.addEventListener('click' , () =>{
    changeElementSelected("restar");
})

buttonDown.addEventListener('click' , () =>{
    changeElementSelected("sumar");
})

buttonA.addEventListener('click' , () =>{
    const elementSelected = document.querySelector(".active");
    let idSelected = null;
    if(actualScreen == "MainList"){
        const spanSelected = elementSelected.querySelector("span");
        const textoSeleccionado = spanSelected.textContent;
        actualScreen = textoSeleccionado + "List";
        fetchLista(actualScreen);
    } else {
        if (elementSelected && elementSelected.id) {
            idSelected = elementSelected.id;
            changeScreen("PokemonDetail");
            renderPokemon("pokemon", elementSelected.id);
        }
    }
    
})

buttonB.addEventListener('click' , () =>{
    if (actualScreen != "MainList"){
        if(actualScreen.includes("List")){
            changeScreen("MainList");
        } else {
            
        }
    }
})

const changeElementSelected = (action) =>{
    if(actualScreen == "MainList"){
        changeElementsListSelected(action, actualScreen);
    } else{
        changeElementsListSelected(action);
    }
}



const changeElementsListSelected = (action, actualScreen) =>{
    if(actualScreen == "MainList"){
        if (action == "sumar"){
            if(indexSelected < mainList.length){
                const elementSelected = document.querySelector(".active");
                elementSelected.classList.replace("active", "#" + indexSelected);
                indexSelected++;
                const newElementSelected = document.getElementById(indexSelected);
                newElementSelected.classList.replace("#" + indexSelected, "active");
                newElementSelected.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        } else if (action == "restar"){
            if(indexSelected != 1){
                const elementSelected = document.querySelector(".active");
                elementSelected.classList.replace("active", "#" + indexSelected);
                indexSelected--;
                const newElementSelected = document.getElementById(indexSelected);
                newElementSelected.classList.replace("#" + indexSelected, "active");
                newElementSelected.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    } else {
        if (action == "sumar"){
            if(indexSelected != list.length){
                const elementSelected = document.querySelector(".active");
                elementSelected.classList.replace("active", "#" + indexSelected);
                indexSelected++;
                const newElementSelected = document.getElementById(indexSelected);
                newElementSelected.classList.replace("#" + indexSelected, "active");
                newElementSelected.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        } else if (action == "restar"){
            if(indexSelected != 1){
                const elementSelected = document.querySelector(".active");
                elementSelected.classList.replace("active", "#" + indexSelected);
                indexSelected--;
                const newElementSelected = document.getElementById(indexSelected);
                newElementSelected.classList.replace("#" + indexSelected, "active");
                newElementSelected.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }
}



const changeScreen = (screen) =>{
    actualScreen = screen;
    fetchLista(actualScreen);
}

const getListType = () =>{
    const subcadenas = actualScreen.split("List");
    const typeList = subcadenas[0];
    return typeList.toLowerCase();
}

const getScreenType = () =>{
    const subcadenas = actualScreen.split("Detail");
    const typeList = subcadenas[0];
    return typeList.toLowerCase();
}

fetchLista(actualScreen);