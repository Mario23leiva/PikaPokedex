const pokemonName = document.querySelector('.element__name');
const pokemonNumber = document.querySelector('.element__number');
const pokemonImage = document.querySelector('.element__image');


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

var actualList = "MainList"; //PokemonList MovesList, BerriesList, NaturesList, AbilitiesList || PokemonDetail MovesDetail, BerriesDetail, NaturesDetail, AbilitiesDetail
var listItems = document.querySelectorAll('.pokeAPI__list#' + actualList + ' li');
let activeList = null; // Variable global para almacenar la lista activa
let actualScreen = null;// Variable global para almacenar la pantalla actual
let prevScreen = null;// Variable global para almacenar la pantalla anterior

const oakMessage = "Oak's words echoed... There's a time and place for everything, but not now.";



// Función para obtener los elementos de la lista activa
function getListItems() {
    if (activeList) {
        return activeList.querySelectorAll('li');
    }
    return [];
}

// Función para cambiar la lista activafunction changeScreen(selectedID) {
function changeScreen(selectedID) {
    const currentActiveDiv = document.querySelector('.vertical__menu.show');
    const selectedList = document.getElementById(selectedID + 'List');

    if (selectedID != "Main") {
        loadLists(selectedID);
    }

    if (currentActiveDiv && selectedList) {
        // Quitar la clase 'show' al div actual
        currentActiveDiv.classList.remove('show');

        // Quitar la clase 'active' a la lista actual
        const currentActiveList = currentActiveDiv.querySelector('.pokeAPI__list');
        const activeItem = currentActiveList.querySelector('.active');
        if (activeItem) {
            activeItem.classList.remove('active');
        }

        // Obtener el nuevo div que contiene la lista seleccionada
        const selectedDiv = selectedList.parentNode;

        // Añadir la clase 'show' al nuevo div
        selectedDiv.classList.add('show');

        // Obtener el primer elemento de la nueva lista
        const firstListItem = selectedList.querySelector('li');

        // Añadir la clase 'active' al primer elemento de la nueva lista
        if (firstListItem) {
            firstListItem.classList.add('active');
        }

        activeList = selectedList;
    }
}




//--------------------------------------------------MENU MOVEMENT--------------------------------------------------//

// Función para disminuir el índice de la lista
buttonDown.addEventListener('click', () => {
    const listItems = getListItems();
    const activeItem = activeList.querySelector('.active');
    const activeIndex = Array.from(listItems).indexOf(activeItem);

    if (activeIndex !== -1 && activeIndex != listItems.length - 1) {
        activeItem.classList.remove('active');
        const nextIndex = (activeIndex + 1) % listItems.length;
        const nextItem = listItems[nextIndex];

        if (nextItem) {
            nextItem.classList.add('active');
            nextItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    }
});

// Función para aumentar el índice de la lista
buttonUp.addEventListener('click', () => {
    const listItems = getListItems();
    const activeItem = activeList.querySelector('.active');
    const activeIndex = Array.from(listItems).indexOf(activeItem);

    if (activeIndex !== -1 && activeIndex != 0) {
        activeItem.classList.remove('active');
        const previousIndex = (activeIndex - 1 + listItems.length) % listItems.length;
        const previousItem = listItems[previousIndex];

        if (previousItem) {
            previousItem.classList.add('active');
            previousItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        }
    }
});


//Send the selected element
buttonA.addEventListener('click', () => {

    const activeItem = document.querySelector('.pokeAPI__list .active');

    if (activeItem) {
        changeScreen(activeItem.id); // Imprimir contenido del elemento

    } else {
        console.log('No se encontró ningún elemento con la clase "active".');
    }

});

//Go to the last list screen
buttonB.addEventListener('click', () => {
    changeScreen('Main');
});

// Función para agregar la clase 'active' al elemento clicado
function setActiveOnClick(event) {
    // Verificar que el evento sea un clic izquierdo (botón 1) o un clic derecho (botón 3)
    if (event.which === 1 || event.button === 0) {
        const clickedElement = event.target;
        const activeList = document.querySelector('.vertical__menu.show');

        // Verificar que el elemento clicado es un <li> dentro de la lista activa
        if (clickedElement.tagName === 'LI' && clickedElement.parentNode.classList.contains('pokeAPI__list')) {
            // Quitar clase 'active' a todos los elementos de la lista activa
            const listItems = activeList.querySelectorAll('li');
            listItems.forEach(item => item.classList.remove('active'));

            // Agregar clase 'active' al elemento clicado
            clickedElement.classList.add('active');
        }
    }
}


// Función para manejar el doble clic izquierdo
function handleDoubleClick(event) {
    // Verificar que el evento sea un doble clic izquierdo (dblclick)
    if (event.detail === 2) {
        const clickedElement = event.target;
        // Verificar que el elemento clicado es un <li> dentro de la lista
        if (clickedElement.tagName === 'LI' && clickedElement.parentNode.classList.contains('pokeAPI__list')) {
            changeScreen(clickedElement.id); // Imprimir contenido del elemento
        }
    }
}

//--------------------------------------------------MENU MOVEMENT--------------------------------------------------//

//----------------------------------------------------DATA LOAD----------------------------------------------------//
const loadLists = async (lista) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/${lista.toLowerCase()}?limit=10&offset=0`);
    if (APIResponse.status == 200) {
        const list = await APIResponse.json();
        renderList(lista, list);
    }

}

const renderList = async (type, list) => {
    var index = 1;
    const listToLoad = document.getElementById(type + "List");
    if (type != "Main") {
        for (let i = 0; i < list.results.length; i++) {
            const element = list.results[i];
            const obj = await fetchElement(type, element.name);
            var pokeOrder = obj.id.toString().length;
            if (pokeOrder == 1) {
                pokeOrder = '00' + obj.id;
            } else if (pokeOrder == 2) {
                pokeOrder = '0' + obj.id;
            } else {
                pokeOrder = obj.id;
            }
            const listItem = document.createElement('li');

            listItem.id = index;
            listItem.innerHTML = `
                <span>${pokeOrder}</span> - 
                <span>${element.name}</span>
                `;

            listToLoad.appendChild(listItem);

            if (i === 0) {
                listItem.classList.add('active');
            }
            index++;
        }

        const element001 = document.getElementById("1");
        if (element001) {
            element001.className = "active";
        }
    }
};

const fetchElement = async (type, element) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/${type.toLowerCase()}/${element.toLowerCase()}`);
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

//----------------------------------------------------DATA LOAD----------------------------------------------------//



// Asociar la función 'setActiveOnClick' al evento 'click' en el documento
document.addEventListener('click', setActiveOnClick);
// Asociar la función 'handleDoubleClick' al evento 'dblclick' en el documento
document.addEventListener('dblclick', handleDoubleClick);

changeScreen('Main');