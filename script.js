let currentPokemon;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log(currentPokemon);
    renderPokemonInfo();
    renderAbout();
}

function renderPokemonInfo() {
    document.getElementById('pokemon-name').innerHTML = currentPokemon.name; 
    document.getElementById('pokemon-type').innerHTML = currentPokemon.types[0].type.name;
    document.getElementById('pokemon-image').src = currentPokemon.sprites.other.dream_world.front_default;
    renderPokemonId();
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
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td></td>
            <td></td>
        </tr>
    </table>
    `;
}