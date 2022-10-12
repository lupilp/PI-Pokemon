const axios = require("axios");
const { Pokemon, Type } = require("../db");

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

const getInfoDb = async () => {
  const pokemonsDB = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const pokemonsMapeados = pokemonsDB?.map((pokemon) => {
    const { types } = pokemon;
    const pokemonData = {
      ...pokemon.dataValues,
      types: types.map((t) => t.name),
    };
    return pokemonData;
  });
  return pokemonsMapeados;
};

const getAllPokemons = async () => {
  try {
    const apiInfo = await getInfoApi();
    const dbInfo = await getInfoDb();
    const allInfo = dbInfo.concat(apiInfo);
    return allInfo;
  } catch (error) {
    console.log("entre al error del getAllPokemons", error);
  }
};
module.exports = {
  getAllPokemons,
  getInfoDb,
};
