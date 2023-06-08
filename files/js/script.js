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
var index = 1;
var indexSelected = 1;
var newIndexSelected = 1;

var actualScreen = "PokemonList"; // MovesList, BerriesList, NaturesList, HabilitiesList


  

const fetchLista = async (type) => {
    if (type == "PokemonList"){
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=898&offset=0`);
        if(APIResponse.status == 200){
            const list = await APIResponse.json();
            renderList(list);
            console.log(list);
        }
    } else if(type == "MovesList"){
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/move`);
        if(APIResponse.status == 200){
            const list = await APIResponse.json();
            renderList(list);
            console.log(list);
        }
    } else if(type == "BerriesList"){

    } else if(type == "NaturesList"){

    } else if(type == "HabilitiesList"){

    } else if(type == "MainList"){
        
    }

}

const renderList = async (list) => {
    for (let i = 0; i < list.results.length; i++) {
        const pokemon = list.results[i];
        const poke = await fetchPokemon(pokemon.name);
        var pokeOrder = poke.id.toString().length;
        if(pokeOrder == 1){
            pokeOrder = '00' + poke.id;
        } else if(pokeOrder == 2){
            pokeOrder = '0' + poke.id;
        } else{
            pokeOrder = poke.id;
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
            <span>${pokemon.name}</span>
            `;
        
            pokeAPIList.appendChild(listItem);
            index++;
    }
  
    const element001 = document.getElementById("1");
    if (element001) {
        element001.className = "active";
    }
};
  


//poner aqui el elemento para que busque los elementos que pide(bayas, objetos...)
//hacer condicionales
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
    
    
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    
    data = await fetchPokemon(pokemon);
    
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
    if (elementSelected && elementSelected.id) {
        idSelected = elementSelected.id;
        changeScreen("PokemonDetail");
        renderPokemon(elementSelected.id);
    }
})

const changeElementSelected = (action) =>{
    if(actualScreen == "PokemonList"){
        changePokemonSelected(action);
    } else if(actualScreen == "MovesList"){
        
    } else if(actualScreen == "HabilitiesList"){
        
    } else if(actualScreen == "NaturesList"){
        
    } else if(actualScreen == "BerriesList"){
        
    } else if(actualScreen == "MainList"){
        //lista principal con los 5 menus(pokemon, bayas, habilidades...)
    }
}

const changePokemonSelected = (action) =>{
    if (action == "sumar"){
        if(indexSelected != 898){
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



const changeScreen = (screen) =>{
    if (screen == "PokemonDetail"){

    }
}

renderPokemon('1');
fetchLista();