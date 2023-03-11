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