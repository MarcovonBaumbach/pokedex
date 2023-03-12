let currentPokemon = [];
let searchedPokemon = [];
let currentPokemonBreeding = [];
let currentPokemonEvolution1 = [];
let totalStat;
let allPokemons = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Cyndaquil", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "treecko", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "wooper", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidorina", "Nidoqueen", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "Scyther", "Jynx", "Electabuzz", "Magmar", "Magikarp", "Gyarados", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Snorlax", "Dratini", "Dragonair", "Dragonite"];
let pokemons = ['charmander', 'charmeleon', 'growlithe', 'vulpix', 'ponyta', 'cyndaquil', 'bulbasaur', 'ivysaur', 'venusaur', 'treecko', 'exeggcute', 'bellsprout', 'squirtle', 'wartortle', 'psyduck', 'staryu', 'seel', 'wooper', 'pikachu', 'raichu', 'magnemite', 'voltorb', 'golbat'];
let pokemonTypes = [
    {
        type: 'fire',
        background: 'background-red',
        backgroundType: 'background-type-red'
    },
    {
        type: 'dragon',
        background: 'background-red',
        backgroundType: 'background-type-red'
    },
    {
        type: 'grass',
        background: 'background-green',
        backgroundType: 'background-type-green'
    },
    {
        type: 'bug',
        background: 'background-green',
        backgroundType: 'background-type-green'
    },
    {
        type: 'water',
        background: 'background-blue',
        backgroundType: 'background-type-blue'
    },
    {
        type: 'ice',
        background: 'background-blue',
        backgroundType: 'background-type-blue'
    },
    {
        type: 'electric',
        background: 'background-yellow',
        backgroundType: 'background-type-yellow'
    },
    {
        type: 'fighting',
        background: 'background-gray',
        backgroundType: 'background-type-gray'
    },
    {
        type: 'rock',
        background: 'background-gray',
        backgroundType: 'background-type-gray'
    },
    {
        type: 'poison',
        background: 'background-violett',
        backgroundType: 'background-type-violett'
    },
    {
        type: 'psychic',
        background: 'background-violett',
        backgroundType: 'background-type-violett'
    },
    {
        type: 'normal',
        background: 'background-normal',
        backgroundType: 'background-type-normal'
    },
    {
        type: 'ground',
        background: 'background-brown',
        backgroundType: 'background-type-brown'
    },
    {
        type: 'fairy',
        background: 'background-pink',
        backgroundType: 'background-type-pink'
    },
]
