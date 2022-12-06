let currentPokemon;
let currentPokemonBreeding;
let totalStat;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let url2 = 'https://pokeapi.co/api/v2/pokemon-species/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log(currentPokemon);
    let response2 = await fetch(url2);
    currentPokemonBreeding = await response2.json();
    console.log(currentPokemonBreeding);
    renderPokemonInfo();
    renderAbout();
}

function renderPokemonInfo() {
    document.getElementById('pokemon-name').innerHTML = currentPokemonBreeding.names[5].name; 
    document.getElementById('pokemon-image').src = currentPokemon.sprites.other.dream_world.front_default;
    renderPokemonType();
    renderPokemonId();
}

function renderPokemonType() {
    for (let i = 0; i < currentPokemon.types.length; i++) {
         document.getElementById('pokemon-type').innerHTML += `
          <div class="pokemon-type">${currentPokemon.types[i].type.name}<div>`;
    }
}

function renderPokemonId() {
    if(currentPokemon.id < 10) {
        document.getElementById('pokemon-id').innerHTML = '#00' + currentPokemon.id;
    }
    if(currentPokemon.id >= 10 && currentPokemon.held_items.id < 100) {
        document.getElementById('pokemon-id').innerHTML = '#0' + currentPokemon.id;
    }
    if(currentPokemon.id > 100) {
        document.getElementById('pokemon-id').innerHTML = '#' + currentPokemon.id;
    }
}

function renderAbout() {
    document.getElementById('info-container-content').innerHTML = `
    <table>
        <tr>
            <td>Species</td>
            <td>${currentPokemonBreeding.genera[7].genus}</td>
        </tr>
        <tr>
            <td>Height</td>
            <td>${((currentPokemon.height * 10) / 2.54).toFixed(2)}" (${currentPokemon.height * 10} cm)</td>
        </tr>
        <tr>
            <td>Weight</td>
            <td>${currentPokemon.weight / 10} lbs (${(currentPokemon.weight / 22.05).toFixed(2)} kg)</td>
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
            <td><img class="gender" src="./img/male-16.png"> ${currentPokemonBreeding.gender_rate * 100}%    <img class="gender" src="./img/female-16.png"> ${(1 - currentPokemonBreeding.gender_rate) * 100}%</td>
        </tr>
        <tr>
            <td>Egg Groups</td>
            <td id="egg-groups"></td>
        </tr>
        <tr>
            <td>Egg Cycles</td>
            <td>${currentPokemonBreeding.hatch_counter}</td>
        </tr>
    </table>
    `;
    renderAbilities();
    renderEggGroups();
}

function renderAbilities() {
    for (let i = 0; i < currentPokemon.abilities.length - 1; i++) {
        document.getElementById('abilities').innerHTML += `${currentPokemon.abilities[i].ability.name}, `;
    }
    document.getElementById('abilities').innerHTML += currentPokemon.abilities[currentPokemon.abilities.length - 1].ability.name;
}

function renderEggGroups() {
    for (let i = 0; i < currentPokemonBreeding.egg_groups.length - 1; i++) {
        document.getElementById('egg-groups').innerHTML += `${currentPokemonBreeding.egg_groups[i].name}, `;
    }
    document.getElementById('egg-groups').innerHTML += currentPokemonBreeding.egg_groups[currentPokemonBreeding.egg_groups.length - 1].name;
}

function renderBaseStats() {
    document.getElementById('info-container-content').innerHTML = `
    <table>
        <tr>
            <td>HP</td>
            <td class="d-flex">${currentPokemon.stats[0].base_stat}<div class="base-stats-gap" id="base-stat-0"></div><div id="base-stat-gray-0"></div></td>
        </tr>
        <tr>
            <td>Attack</td>
            <td class="d-flex">${currentPokemon.stats[1].base_stat}<div class="base-stats-gap" id="base-stat-1"></div><div id="base-stat-gray-1"></div></td>
        </tr>
        <tr>
            <td>Defense</td>
            <td class="d-flex">${currentPokemon.stats[2].base_stat}<div class="base-stats-gap" id="base-stat-2"></div><div id="base-stat-gray-2"></div></td>
        </tr>
        <tr>
            <td>Sp. Atk</td>
            <td class="d-flex">${currentPokemon.stats[3].base_stat}<div class="base-stats-gap" id="base-stat-3"></div><div id="base-stat-gray-3"></div></td>
        </tr>
        <tr>
            <td>Sp. Def</td>
            <td class="d-flex">${currentPokemon.stats[4].base_stat}<div class="base-stats-gap" id="base-stat-4"></div><div id="base-stat-gray-4"></div></td>
        </tr>
        <tr>
            <td>Speed</td>
            <td class="d-flex">${currentPokemon.stats[5].base_stat}<div class="base-stats-gap" id="base-stat-5"></div><div id="base-stat-gray-5"></div></td>
        </tr>
        <tr>
            <td>Total</td>
            <td class="d-flex"><div id="total-base-stats"></div><div class="base-stats-gap" id="base-stat-6"></div><div id="base-stat-gray-6"></div></td>
        </tr>
    </table>
    <h3>Type Defenses</h3>
    <span class="font-color-gray">The effectiveness of each type on ${currentPokemonBreeding.names[5].name}</span>
    `;
    totalBaseStats();
    baseStatsBar();
    totalBaseStatsBar();
}

function totalBaseStats () {
    document.getElementById('total-base-stats').innerHTML =`
            ${  totalStat =
                currentPokemon.stats[0].base_stat
                + currentPokemon.stats[1].base_stat
                + currentPokemon.stats[2].base_stat
                + currentPokemon.stats[3].base_stat
                + currentPokemon.stats[4].base_stat
                + currentPokemon.stats[5].base_stat
            }     
    `;
}

function baseStatsBar() {
    for (let i = 0; i < 6; i++) {
        document.getElementById(`base-stat-${i}`).style.height = '5px';
        document.getElementById(`base-stat-${i}`).style.width = currentPokemon.stats[i].base_stat + 'px';
        if(currentPokemon.stats[i].base_stat > 49) {
            document.getElementById(`base-stat-${i}`).style.backgroundColor = 'green';
        } else {
            document.getElementById(`base-stat-${i}`).style.backgroundColor = 'red';
        }
        document.getElementById(`base-stat-gray-${i}`).style.width = (100 - currentPokemon.stats[i].base_stat) + 'px';
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