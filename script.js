let currentPokemon = [];
let currentPokemonBreeding = [];
let currentPokemonEvolution1 = [];
let totalStat;
let pokemons = ['charmander', 'growlithe', 'vulpix', 'ponyta', 'cyndaquil', 'bulbasaur', 'treecko', 'exeggcute', 'bellsprout', 'squirtle', 'psyduck', 'staryu', 'seel', 'wooper', 'pikachu', 'raichu','magnemite', 'voltorb'];

//load api and render pokedex
async function loadPokemon() {
  for (let i = 0; i < pokemons.length; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemons[i]}`; 
    let response = await fetch(url);
    currentPokemon[i] = await response.json();

    let url_breeding = `https://pokeapi.co/api/v2/pokemon-species/${pokemons[i]}`;
    let response_url_breeding = await fetch(url_breeding);
    currentPokemonBreeding[i] = await response_url_breeding.json();

  }
  loadPokemonEvolution();
}

async function loadPokemonEvolution() {
    for (let i = 0; i < pokemons.length; i++) {

        let evolution_chain = currentPokemonBreeding[i].evolution_chain.url;
        let response_evolution_chain = await fetch(evolution_chain);
        let currentPokemonEvolution = await response_evolution_chain.json();
    
        let evolution_1 = currentPokemonEvolution.chain.evolves_to[0].species.url;
        let response_evolution_1 = await fetch(evolution_1);
        currentPokemonEvolution1[i] = await response_evolution_1.json();
    
        renderPokemonCard(i);
      }
      renderPokemonInfo(0);
}


//-------------Pokedex Menu---------------------------------------------------------------------------------


//render pokedex menu
function renderPokemonCard(i) {
    document.getElementById('pokedex-menu').innerHTML += `
      <div onclick='renderPokemonInfo(${i})' class="pokemon-card" id="${pokemons[i]}">
        <b>${currentPokemonBreeding[i].names[5].name}</b>
        <img class="card-img" src="${currentPokemon[i].sprites.other.dream_world.front_default}">
      </div>
    `;
    renderPokemonCardType(i);
    backgroundColorCard(i);
}

//render Pokemon Types with different background-color
function renderPokemonCardType(index) {
    for (let i = 0; i < currentPokemon[index].types.length; i++) {
        document.getElementById(pokemons[index]).innerHTML += `
        <div id="card-type-background${index}${i}" class="pokemon-type">${currentPokemon[index].types[i].type.name}<div>`;
    }
}

//background color of pokemon card, matching the pokemon type
function backgroundColorCard(i) {
    if (currentPokemon[i].types[0].type.name == 'fire'){
        document.getElementById(`${pokemons[i]}`).classList.add('background-red');
        for (let j = 0; j < currentPokemon[i].types.length; j++) {
            document.getElementById(`card-type-background${i}${j}`).classList.add('background-type-red');
        }
    }
    if (currentPokemon[i].types[0].type.name == 'grass' || currentPokemon[i].types[0].type.name == 'bug'){
        document.getElementById(`${pokemons[i]}`).classList.add('background-green');
        for (let j = 0; j < currentPokemon[i].types.length; j++) {
            document.getElementById(`card-type-background${i}${j}`).classList.add('background-type-green');
        }
    }
    if (currentPokemon[i].types[0].type.name == 'water'){
        document.getElementById(`${pokemons[i]}`).classList.add('background-blue');
        for (let j = 0; j < currentPokemon[i].types.length; j++) {
            document.getElementById(`card-type-background${i}${j}`).classList.add('background-type-blue');
        }
    }
    if (currentPokemon[i].types[0].type.name == 'electric'){
        document.getElementById(`${pokemons[i]}`).classList.add('background-yellow');
        for (let j = 0; j < currentPokemon[i].types.length; j++) {
            document.getElementById(`card-type-background${i}${j}`).classList.add('background-type-yellow');
        }
    }
}


//----------------------Pokedex Info Card------------------------------------------------------------------------------------


//render information of selected pokemon
function renderPokemonInfo(i) {
    if (window.innerWidth < '750') {
        document.getElementById('pokedex-menu').classList.add('d-none');
    }
    document.getElementById('pokedex').classList.remove('d-none');
    document.getElementById('pokedex').innerHTML = returnFrontCover(i);
    document.getElementById('pokemon-name').innerHTML = currentPokemonBreeding[i].names[5].name; 
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
    if (currentPokemon[i].types[0].type.name == 'fire'){
        document.getElementById('pokedex-background').classList.add('background-red');
        for (let j = 0; j < currentPokemon[i].types.length; j++) {
            document.getElementById('type-background' + j).classList.add('background-type-red');
        }
    }
    if (currentPokemon[i].types[0].type.name == 'grass' || currentPokemon[i].types[0].type.name == 'bug'){
        document.getElementById('pokedex-background').classList.add('background-green');
        for (let j = 0; j < currentPokemon[i].types.length; j++) {
            document.getElementById('type-background' + j).classList.add('background-type-green');
        }
    }
    if (currentPokemon[i].types[0].type.name == 'water'){
        document.getElementById('pokedex-background').classList.add('background-blue');
        for (let j = 0; j < currentPokemon[i].types.length; j++) {
            document.getElementById('type-background' + j).classList.add('background-type-blue');
        }
    }
    if (currentPokemon[i].types[0].type.name == 'electric'){
        document.getElementById('pokedex-background').classList.add('background-yellow');
        for (let j = 0; j < currentPokemon[i].types.length; j++) {
            document.getElementById('type-background' + j).classList.add('background-type-yellow');
        }
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
    if(currentPokemon[i].id < 10) {
        document.getElementById('pokemon-id').innerHTML = '#00' + currentPokemon[i].id;
    }
    if(currentPokemon[i].id >= 10 && currentPokemon[i].id < 100) {
        document.getElementById('pokemon-id').innerHTML = '#0' + currentPokemon[i].id;
    }
    if(currentPokemon[i].id >= 100) {
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

function totalBaseStats (i) {
    document.getElementById('total-base-stats').innerHTML =`
        ${  totalStat =
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
        if(currentPokemon[index].stats[i].base_stat > 49) {
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
    if(totalStat > 299) {
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


//------------------- HTML Templates --------------------------------------------------------------


function returnFrontCover(i) {
    return `
        <div class="pokedex-container" id="pokedex-background">
            <h1 id="pokemon-name"></h1>
            <div id="pokemon-type"></div>
            <div id="pokemon-id"></div>
        </div>
        <div class="info-container">
            <img onclick="hideCard()" class="arrow" src="./img/arrow.png">
            <img id="pokemon-image">
            <nav>
                <div id="nav-tab-about" onclick="renderAbout(${i})" class="nav-tab">About</div>
                <div id="nav-tab-stats" onclick="renderBaseStats(${i})" class="nav-tab">Base Stats</div>
                <div id="nav-tab-evolution" onclick="renderEvolution(${i})" class="nav-tab">Evolution</div>
                <div id="nav-tab-moves" onclick="renderMoves(${i})" class="nav-tab">Moves</div>
            </nav>
            <div id="info-container-content"></div>
        </div>
    `;
}

function returnAboutHTML(i) {
  return `
    <table>
        <tr>
            <td>Species</td>
            <td>${currentPokemonBreeding[i].genera[7].genus}</td>
        </tr>
        <tr>
            <td>Height</td>
            <td>${((currentPokemon[i].height * 10) / 2.54).toFixed(2)}" (${currentPokemon[i].height * 10} cm)</td>
        </tr>
        <tr>
            <td>Weight</td>
            <td>${currentPokemon[i].weight / 10} lbs (${(currentPokemon[i].weight / 22.05).toFixed(2)} kg)</td>
        </tr>
        <tr>
            <td>Abilities</td>
            <td id="abilities"></td>
        </tr>
    </table>
    <h3>Breeding</h3>
    <table>
        <tr>
            <td>Gender</td>
            <td id="gender"><img class="gender" src="./img/male-16.png"> ${(100 - (100 / (currentPokemonBreeding[i].gender_rate + 1))).toFixed(0)}%    <img class="gender" src="./img/female-16.png"> ${(100 / (currentPokemonBreeding[i].gender_rate + 1)).toFixed(0)}%</td>
        </tr>
        <tr>
            <td>Egg Groups</td>
            <td id="egg-groups"></td>
        </tr>
        <tr>
            <td>Egg Cycles</td>
            <td>${currentPokemonBreeding[i].hatch_counter}</td>
        </tr>
    </table>
    `;
}

function returnBaseStatsHTML(i) {
  return `
    <table>
        <tr>
            <td>HP</td>
            <td class="td-width">${currentPokemon[i].stats[0].base_stat}</td>
            <td class="d-flex"><div id="base-stat-0"></div><div id="base-stat-gray-0"></div></td>
        </tr>
        <tr>
            <td>Attack</td>
            <td class="td-width">${currentPokemon[i].stats[1].base_stat}</td>
            <td class="d-flex"><div id="base-stat-1"></div><div id="base-stat-gray-1"></div></td>
        </tr>
        <tr>
            <td>Defense</td>
            <td class="td-width">${currentPokemon[i].stats[2].base_stat}</td>
            <td class="d-flex"><div id="base-stat-2"></div><div id="base-stat-gray-2"></div></td>
        </tr>
        <tr>
            <td>Sp. Atk</td>
            <td class="td-width">${currentPokemon[i].stats[3].base_stat}</td>
            <td class="d-flex"><div id="base-stat-3"></div><div id="base-stat-gray-3"></div></td>
        </tr>
        <tr>
            <td>Sp. Def</td>
            <td class="td-width">${currentPokemon[i].stats[4].base_stat}</td>
            <td class="d-flex"><div id="base-stat-4"></div><div id="base-stat-gray-4"></div></td>
        </tr>
        <tr>
            <td>Speed</td>
            <td class="td-width">${currentPokemon[i].stats[5].base_stat}</td>
            <td class="d-flex"><div id="base-stat-5"></div><div id="base-stat-gray-5"></div></td>
        </tr>
        <tr>
            <td>Total</td>
            <td class="td-width" id="total-base-stats"></td>
            <td class="d-flex"><div id="base-stat-6"></div><div id="base-stat-gray-6"></div></td>
        </tr>
    </table>
    <h3>Type Defenses</h3>
    <span class="font-color-gray">The effectiveness of each type on ${currentPokemonBreeding[i].names[5].name}</span>
    `;
}

function returnEvolutionHTML(i) {
    return `
      <table>
          <tr>
              <td>Evolves to</td>
              <td>${currentPokemonEvolution1[i].names[5].name}</td>
          </tr>
          <tr>
              <td>Species</td>
              <td>${currentPokemonEvolution1[i].genera[7].genus}</td>
          </tr>
          <tr>
              <td>Habitat</td>
              <td>${currentPokemonEvolution1[i].habitat.name}</td>
          </tr>
      </table>
      <h3>Description</h3>
      <span class="font-color-gray">${currentPokemonEvolution1[i].flavor_text_entries[1].flavor_text}</span><br><br>
      <span class="font-color-gray">${currentPokemonEvolution1[i].flavor_text_entries[2].flavor_text}</span>
      `;
  }

  function returnMovesHTML(i) {
    return `
      <table>
          <tr>
              <td>Move 1</td>
              <td>${currentPokemon[i].moves[0].move.name}</td>
          </tr>
          <tr>
              <td>Move 2</td>
              <td>${currentPokemon[i].moves[1].move.name}</td>
          </tr>
          <tr>
              <td>Move 3</td>
              <td>${currentPokemon[i].moves[2].move.name}</td>
          </tr>
          <tr>
              <td>Move 4</td>
              <td>${currentPokemon[i].moves[3].move.name}</td>
          </tr>
          <tr>
              <td>Move 5</td>
              <td>${currentPokemon[i].moves[4].move.name}</td>
          </tr>
          <tr>
              <td>Move 6</td>
              <td>${currentPokemon[i].moves[5].move.name}</td>
          </tr>
          <tr>
              <td>Move 7</td>
              <td>${currentPokemon[i].moves[6].move.name}</td>
          </tr>
          <tr>
              <td>Move 8</td>
              <td>${currentPokemon[i].moves[7].move.name}</td>
          </tr>
          <tr>
              <td>Move 9</td>
              <td>${currentPokemon[i].moves[8].move.name}</td>
          </tr>
          <tr>
              <td>Move 10</td>
              <td>${currentPokemon[i].moves[9].move.name}</td>
          </tr>
      </table>
      `;
  }