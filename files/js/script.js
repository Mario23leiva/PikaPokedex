const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

var pokemonSelected = '';

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
    var numberPokemonSelected = parseInt(pokemonSelected);
    renderPokemon((numberPokemonSelected + 1));
})

buttonPrev.addEventListener('click' , () =>{
    var numberPokemonSelected = parseInt(pokemonSelected);
    renderPokemon((numberPokemonSelected - 1));
})

renderPokemon('1');