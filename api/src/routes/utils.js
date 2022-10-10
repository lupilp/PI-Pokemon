const axios = require("axios");
const { Pokemon, Types } = require("../db");

const getInfoApi = async () => {
  try {
    const primerosPokemon = await axios.get(
      "https://pokeapi.co/api/v2/pokemon"
    );
    const segundosPokemon = await axios.get(primerosPokemon.data.next);
    const todosPokemon = primerosPokemon.data.results.concat(
      segundosPokemon.data.results
    );
    const infoPokemons = await Promise.all(
      todosPokemon.map(async (pokemon) => {
        let infoDePokemon = await axios.get(pokemon.url);
        return {
          id: infoDePokemon.data.id,
          name: infoDePokemon.data.name,
          hp: infoDePokemon.data.stats[0].base_stat,
          attack: infoDePokemon.data.stats[1].base_stat,
          defense: infoDePokemon.data.stats[2].base_stat,
          speed: infoDePokemon.data.stats[5].base_stat,
          height: infoDePokemon.data.height,
          weight: infoDePokemon.data.weight,
          image: infoDePokemon.data.sprites.other.dream_world.front_default,
          types: infoDePokemon.data.types.map((t) => t.type.name),
        };
      })
    );
    return infoPokemons;
  } catch (error) {
    console.log("entre al error del getinfoapi", error);
  }
};

module.exports = {
  getInfoApi,
};
