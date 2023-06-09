const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');


const pokeAPIList = document.querySelector('.pokeAPI__list');

const mainList = ["Main", "Pokemon", "Move", "Ability", "Nature", "Berry"];
const lists = {
    PokemonList: 0,
    AbilityList: 0,
    MoveList: 0,
    NatureList: 0,
};


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

var actualScreen = "MainList"; //PokemonList MovesList, BerriesList, NaturesList, AbilitiesList || PokemonDetail MovesDetail, BerriesDetail, NaturesDetail, AbilitiesDetail


const oakMessage = "Oak's words echoed... There's a time and place for everything, but not now.";

  

const loadLists = async () => {
    for(let i = 0; i < mainList.length; i++){
        if(mainList[i] != "Main"){
            const APIResponse = await fetch(`https://pokeapi.co/api/v2/${mainList[i].toLowerCase()}?limit=898&offset=0`);
            if(APIResponse.status == 200){
                const list = await APIResponse.json();
                renderList(mainList[i], list);
                // Asigna la longitud de la lista a su correspondiente propiedad en el objeto
                lists[`${mainList[i]+'List'}`] = list.results.length;
            }
        } else {
            renderList(mainList[i]);
        }
    }
}

const renderList = async (type, list) => {
    var index = 1;
    const listToLoad = document.getElementById(type + "List");
    if(type != "Main"){
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
            
                listToLoad.appendChild(listItem);
                index++;
        }
      
        const element001 = document.getElementById("1");
        if (element001) {
            element001.className = "active";
        }
    } else{
        for(let i = 0; i < mainList.length; i++) {
            if(mainList[i] != "Main"){
                const listItem = document.createElement('li');
                if ((i+1) === indexSelected) {
                    listItem.className = 'active';
                } else {
                    listItem.className = '#' + index;
                }
                listItem.id = index;
                listItem.innerHTML = `- <span>${mainList[i]}</span>`;
                listToLoad.appendChild(listItem);
                index++;
                }
        }
    }
};
  

const fetchElement = async (type ,element) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/${type.toLowerCase()}/${element.toLowerCase()}`);
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
        changeScreen(actualScreen);
    } else {
        if (actualScreen.includes("List")){
            var newScreen = actualScreen.replace("List", "Detail");
            idSelected = elementSelected.id;
            changeScreen(newScreen);
            
        }
    }
    
})

buttonB.addEventListener('click' , () =>{
    if (actualScreen != "MainList"){
        if(actualScreen.includes("List")){
            changeScreen("MainList");
        } else {
            var newScreen = actualScreen.replace("Detail", "List");
            changeScreen(newScreen);
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
            if(indexSelected < mainList.length-1){
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
            if(indexSelected != lists[actualScreen]){
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

const showScreen = () =>{
    // Ocultar todos los elementos
    const menus = document.querySelectorAll('.vertical__menu');
    menus.forEach(menu => menu.classList.remove('show'));

    // Mostrar el div padre del elemento con el ID proporcionado
    const selectedMenu = document.getElementById(actualScreen);
    if (selectedMenu) {
        const parentDiv = selectedMenu.closest('.vertical__menu');
        if (parentDiv) {
            parentDiv.classList.add('show');
        }
    }
    indexSelected = 1;
    //hay que hacer fetch del elemento
}

const changeScreen = (screen) =>{
    actualScreen = screen;
    showScreen(actualScreen);
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

loadLists();