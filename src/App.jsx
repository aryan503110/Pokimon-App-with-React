import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pokidata, setPokidata] = useState([]);
  const [search, setsearch] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );
        const pokemonDetails = await Promise.all(
          res.data.results.map(async (pokemon) => {
            const pokemonData = await axios.get(pokemon.url);
            return pokemonData.data;
          })
        );
        setPokidata(pokemonDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  const searchPokimon = pokidata.filter((currPokimon) =>
    currPokimon.name.includes(search)
  );

  return (
    <>
      <div className="container">
        <h1 className="title">Welcome to your Pokidex</h1>
        <input className="searchInput"
          type="text"
          placeholder="Enter Pokimon"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        ></input>
        <div className="pokemonGrid">
          {searchPokimon.map((currPokimon, index) => (
            <div key={index} className="pokemonCard">
              <img
                src={currPokimon.sprites.other.dream_world.front_default}
                alt={currPokimon.name}
                className="pokemonImage"
              />
              <p className="pokemonName">{currPokimon.name}</p>
              <p className="pokemonInfo">
                <span className="statName">Height:</span>
                <span className="statValue">{currPokimon.height}</span>
              </p>
              <p className="pokemonInfo">
                <span className="statName">Weight:</span>
                <span className="statValue">{currPokimon.weight}</span>
              </p>
              <p className="pokemonInfo">
                <span className="statName">Attack:</span>
                <span className="statValue">
                  {currPokimon.stats[1].base_stat}
                </span>
              </p>
              <p className="pokemonInfo">
                <span className="statName">Defence:</span>
                <span className="statValue">
                  {currPokimon.stats[2].base_stat}
                </span>
              </p>
              <p className="pokemonInfo">
                <span className="statName">HP:</span>
                <span className="statValue">
                  {currPokimon.stats[0].base_stat}
                </span>
              </p>
              <p className="pokemonInfo">
                <span className="statName">Speed:</span>
                <span className="statValue">
                  {currPokimon.stats[5].base_stat}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
