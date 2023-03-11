let currentPokemon = [];
let searchedPokemon = [];
let currentPokemonBreeding = [];
let currentPokemonEvolution1 = [];
let totalStat;
let pokemons = ['charmander', 'charmeleon', 'growlithe', 'vulpix', 'ponyta', 'cyndaquil', 'bulbasaur', 'ivysaur', 'venusaur', 'treecko', 'exeggcute', 'bellsprout', 'squirtle', 'wartortle', 'psyduck', 'staryu', 'seel', 'wooper', 'pikachu', 'raichu', 'magnemite', 'voltorb'];

//load api and render pokedex
async function loadPokemon(arr) {
    try {
        for (let i = 0; i < arr.length; i++) {

            let url = `https://pokeapi.co/api/v2/pokemon/${arr[i]}`;
            let response = await fetch(url);
            currentPokemon[i] = await response.json();


            let url_breeding = `https://pokeapi.co/api/v2/pokemon-species/${arr[i]}`;
            let response_url_breeding = await fetch(url_breeding);
            currentPokemonBreeding[i] = await response_url_breeding.json();
        }
        loadPokemonEvolution(arr);

    } catch (e) {
        document.getElementById('not-found').classList.remove('d-none');
        setTimeout(() => {
            document.getElementById('not-found').classList.add('d-none');
        }, 3000);
    }
}

async function loadPokemonEvolution(arr) {
    for (let i = 0; i < arr.length; i++) {

        let evolution_chain = currentPokemonBreeding[i].evolution_chain.url;
        let response_evolution_chain = await fetch(evolution_chain);
        let currentPokemonEvolution = await response_evolution_chain.json();

        let evolution_1 = currentPokemonEvolution.chain.evolves_to[0].species.url;
        let response_evolution_1 = await fetch(evolution_1);
        currentPokemonEvolution1[i] = await response_evolution_1.json();

        renderPokemonCard(i, arr);
    }
    renderPokemonInfo(0);
}


//-------------Pokedex Menu---------------------------------------------------------------------------------

//search for Pokemon
function filterPokemon() {
    let filteredPokemon = document.getElementById('search').value.toLowerCase();
    searchedPokemon = [];
    currentPokemon = [];
    currentPokemonBreeding = [];
    currentPokemonEvolution1 = [];
    for (let i = 0; i < pokemons.length; i++) {
        if (pokemons[i].includes(filteredPokemon)) {
            searchedPokemon.push(pokemons[i]);
        }
    }
    renderNewPokemon(filteredPokemon, searchedPokemon);
    document.getElementById('search').value = '';
}

function renderNewPokemon(filteredPokemon, searchedPokemon) {
    if (searchedPokemon.length > 0) {
        document.getElementById('pokedex-menu').innerHTML = '';
        loadPokemon(searchedPokemon);
    } else {
        document.getElementById('pokedex-menu').innerHTML = '';
        searchedPokemon.push(filteredPokemon);
        loadPokemon(searchedPokemon);

    }
}

//render pokedex menu
function renderPokemonCard(i, arr) {
    document.getElementById('pokedex-menu').innerHTML += `
      <div onclick='renderPokemonInfo(${i})' class="pokemon-card" id="${arr[i]}">
        <b>${currentPokemonBreeding[i].name}</b>
        <img class="card-img" src="${currentPokemon[i].sprites.other.dream_world.front_default}">
      </div>
    `;
    renderPokemonCardType(i, arr);
    backgroundColorCard(i, arr);
}

//render Pokemon Types with different background-color
function renderPokemonCardType(index, arr) {
    for (let i = 0; i < currentPokemon[index].types.length; i++) {
        document.getElementById(arr[index]).innerHTML += `
        <div id="card-type-background${index}${i}" class="pokemon-type">${currentPokemon[index].types[i].type.name}<div>`;
    }
}

//background color of pokemon card, matching the pokemon type
function backgroundColorCard(i, arr) {
    if (currentPokemon[i].types[0].type.name == 'fire') {
        document.getElementById(`${arr[i]}`).classList.add('background-red');
        for (let j = 0; j < currentPokemon[i].types.length; j++) {
            document.getElementById(`card-type-background${i}${j}`).classList.add('background-type-red');
        }
    }
    if (currentPokemon[i].types[0].type.name == 'grass' || currentPokemon[i].types[0].type.name == 'bug') {
        document.getElementById(`${arr[i]}`).classList.add('background-green');
        for (let j = 0; j < currentPokemon[i].types.length; j++) {
            document.getElementById(`card-type-background${i}${j}`).classList.add('background-type-green');
        }
    }
    if (currentPokemon[i].types[0].type.name == 'water') {
        document.getElementById(`${arr[i]}`).classList.add('background-blue');
        for (let j = 0; j < currentPokemon[i].types.length; j++) {
            document.getElementById(`card-type-background${i}${j}`).classList.add('background-type-blue');
        }
    }
    if (currentPokemon[i].types[0].type.name == 'electric') {
        document.getElementById(`${arr[i]}`).classList.add('background-yellow');
        for (let j = 0; j < currentPokemon[i].types.length; j++) {
            document.getElementById(`card-type-background${i}${j}`).classList.add('background-type-yellow');
        }
    }
}


//----------------------Pokedex Info Card------------------------------------------------------------------------------------


//render information of selected pokemon
function renderPokemonInfo(i) {
    if (window.innerWidth < '900') {
        document.getElementById('pokedex-menu').classList.add('d-none');
    }
    document.getElementById('pokedex').classList.remove('d-none');
    document.getElementById('pokedex').innerHTML = returnFrontCover(i);
    document.getElementById('pokemon-name').innerHTML = currentPokemonBreeding[i].name;
    document.getElementById('pokemon-image').src = currentPokemon[i].sprites.other.dream_world.front_default;
    renderPokemonType(i);
    renderPokemonId(i);
    backgroundColorPokedex(i);
    renderAbout(i);
}

//Hide Pokedex Info Card, when clicking on back-arrow
function hideCard() {
    document.getElementById('pokedex').classList.add('d-none');
    document.getElementById('pokedex-menu').classList.remove('d-none');
}

//background color of pokemon info card, matching the pokemon type
function backgroundColorPokedex(i) {
    if (currentPokemon[i].types[0].type.name == 'fire') {
        document.getElementById('pokedex-background').classList.add('background-red');
        for (let j = 0; j < currentPokemon[i].types.length; j++) {
            document.getElementById('type-background' + j).classList.add('background-type-red');
        }
    }
    if (currentPokemon[i].types[0].type.name == 'grass' || currentPokemon[i].types[0].type.name == 'bug') {
        document.getElementById('pokedex-background').classList.add('background-green');
        for (let j = 0; j < currentPokemon[i].types.length; j++) {
            document.getElementById('type-background' + j).classList.add('background-type-green');
        }
    }
    if (currentPokemon[i].types[0].type.name == 'water') {
        document.getElementById('pokedex-background').classList.add('background-blue');
        for (let j = 0; j < currentPokemon[i].types.length; j++) {
            document.getElementById('type-background' + j).classList.add('background-type-blue');
        }
    }
    if (currentPokemon[i].types[0].type.name == 'electric') {
        document.getElementById('pokedex-background').classList.add('background-yellow');
        for (let j = 0; j < currentPokemon[i].types.length; j++) {
            document.getElementById('type-background' + j).classList.add('background-type-yellow');
        }
    }
    if (currentPokemon[i].types[0].type.name != 'electric' &&
        currentPokemon[i].types[0].type.name != 'water' && 
        currentPokemon[i].types[0].type.name != 'grass' && 
        currentPokemon[i].types[0].type.name != 'bug' &&
        currentPokemon[i].types[0].type.name != 'fire'    
    ) {
        document.getElementById('pokedex-background').classList.add('background-black');
    }
}

//render Pokemon Types with different background-color
function renderPokemonType(index) {
    for (let i = 0; i < currentPokemon[index].types.length; i++) {
        document.getElementById('pokemon-type').innerHTML += `
        <div id="type-background${i}" class="pokemon-type">${currentPokemon[index].types[i].type.name}<div>`;
    }
}

function renderPokemonId(i) {
    if (currentPokemon[i].id < 10) {
        document.getElementById('pokemon-id').innerHTML = '#00' + currentPokemon[i].id;
    }
    if (currentPokemon[i].id >= 10 && currentPokemon[i].id < 100) {
        document.getElementById('pokemon-id').innerHTML = '#0' + currentPokemon[i].id;
    }
    if (currentPokemon[i].id >= 100) {
        document.getElementById('pokemon-id').innerHTML = '#' + currentPokemon[i].id;
    }
}

//--------render the about section of the pokemon info card--------------------------------------------

function renderAbout(i) {
    document.getElementById('nav-tab-about').classList.add('selected-menu');
    document.getElementById('nav-tab-stats').classList.remove('selected-menu');
    document.getElementById('nav-tab-evolution').classList.remove('selected-menu');
    document.getElementById('nav-tab-moves').classList.remove('selected-menu');

    document.getElementById('info-container-content').innerHTML = returnAboutHTML(i);
    renderAbilities(i);
    renderEggGroups(i);
    if (currentPokemonBreeding[i].gender_rate < 0) {
        document.getElementById('gender').innerHTML = 'unknown';
    }
}

function renderAbilities(index) {
    for (let i = 0; i < currentPokemon[index].abilities.length - 1; i++) {
        document.getElementById('abilities').innerHTML += `${currentPokemon[index].abilities[i].ability.name}, `;
    }
    document.getElementById('abilities').innerHTML += currentPokemon[index].abilities[currentPokemon[index].abilities.length - 1].ability.name;
}

function renderEggGroups(index) {
    for (let i = 0; i < currentPokemonBreeding[index].egg_groups.length - 1; i++) {
        document.getElementById('egg-groups').innerHTML += `${currentPokemonBreeding[index].egg_groups[i].name}, `;
    }
    document.getElementById('egg-groups').innerHTML += currentPokemonBreeding[index].egg_groups[currentPokemonBreeding[index].egg_groups.length - 1].name;
}

//-------render the Base Stats section of pokemon info card---------------------------------------------

function renderBaseStats(i) {
    document.getElementById('nav-tab-about').classList.remove('selected-menu');
    document.getElementById('nav-tab-stats').classList.add('selected-menu');
    document.getElementById('nav-tab-evolution').classList.remove('selected-menu');
    document.getElementById('nav-tab-moves').classList.remove('selected-menu');

    document.getElementById('info-container-content').innerHTML = returnBaseStatsHTML(i);
    totalBaseStats(i);
    baseStatsBar(i);
    totalBaseStatsBar();
}

function totalBaseStats(i) {
    document.getElementById('total-base-stats').innerHTML = `
        ${totalStat =
        currentPokemon[i].stats[0].base_stat
        + currentPokemon[i].stats[1].base_stat
        + currentPokemon[i].stats[2].base_stat
        + currentPokemon[i].stats[3].base_stat
        + currentPokemon[i].stats[4].base_stat
        + currentPokemon[i].stats[5].base_stat
        }     
    `;
}

function baseStatsBar(index) {
    for (let i = 0; i < 6; i++) {
        document.getElementById(`base-stat-${i}`).style.height = '5px';
        document.getElementById(`base-stat-${i}`).style.width = currentPokemon[index].stats[i].base_stat + 'px';
        if (currentPokemon[index].stats[i].base_stat > 49) {
            document.getElementById(`base-stat-${i}`).style.backgroundColor = 'green';
        } else {
            document.getElementById(`base-stat-${i}`).style.backgroundColor = 'red';
        }
        document.getElementById(`base-stat-gray-${i}`).style.width = (100 - currentPokemon[index].stats[i].base_stat) + 'px';
        document.getElementById(`base-stat-gray-${i}`).style.height = '5px';
        document.getElementById(`base-stat-gray-${i}`).style.backgroundColor = 'lightgray';
    }
}

function totalBaseStatsBar() {
    document.getElementById(`base-stat-6`).style.height = '5px';
    document.getElementById(`base-stat-6`).style.width = (totalStat / 6) + 'px';
    if (totalStat > 299) {
        document.getElementById(`base-stat-6`).style.backgroundColor = 'green';
    } else {
        document.getElementById(`base-stat-6`).style.backgroundColor = 'red';
    }
    document.getElementById(`base-stat-gray-6`).style.width = (100 - (totalStat / 6)) + 'px';
    document.getElementById(`base-stat-gray-6`).style.height = '5px';
    document.getElementById(`base-stat-gray-6`).style.backgroundColor = 'lightgray';
}

//-----------render the evolution section of pokemon info card------------------------------------------------

function renderEvolution(i) {
    document.getElementById('nav-tab-about').classList.remove('selected-menu');
    document.getElementById('nav-tab-stats').classList.remove('selected-menu');
    document.getElementById('nav-tab-evolution').classList.add('selected-menu');
    document.getElementById('nav-tab-moves').classList.remove('selected-menu');

    document.getElementById('info-container-content').innerHTML = returnEvolutionHTML(i);
}

//---------------------render the moves section of pokemon info card-----------------------------------

function renderMoves(i) {
    document.getElementById('nav-tab-about').classList.remove('selected-menu');
    document.getElementById('nav-tab-stats').classList.remove('selected-menu');
    document.getElementById('nav-tab-evolution').classList.remove('selected-menu');
    document.getElementById('nav-tab-moves').classList.add('selected-menu');

    document.getElementById('info-container-content').innerHTML = returnMovesHTML(i);
}