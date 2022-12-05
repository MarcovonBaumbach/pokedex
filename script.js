let currentPokemon;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let url2 = 'https://pokeapi.co/api/v2/pokemon/bulbasaur';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log(currentPokemon);
    renderPokemonInfo();
    renderAbout();
}

function renderPokemonInfo() {
    document.getElementById('pokemon-name').innerHTML = currentPokemon.name; 
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
            <td>${currentPokemon.types[0].type.name}</td>
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
            <td>Species</td>
            <td>${currentPokemon.types[0].type.name}</td>
        </tr>
        <tr>
            <td>Height</td>
            <td>${((currentPokemon.height * 10) / 2.54).toFixed(2)}" (${currentPokemon.height * 10} cm)</td>
        </tr>
        <tr>
            <td>Weight</td>
            <td>${currentPokemon.weight / 10} lbs (${(currentPokemon.weight / 22.05).toFixed(2)} kg)</td>
        </tr>
    </table>
    `;
    renderAbilities();
}

function renderAbilities() {
    for (let i = 0; i < currentPokemon.abilities.length - 1; i++) {
        document.getElementById('abilities').innerHTML += `${currentPokemon.abilities[i].ability.name}, `;
    }
    document.getElementById('abilities').innerHTML += currentPokemon.abilities[currentPokemon.abilities.length - 1].ability.name;
}