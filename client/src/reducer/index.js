import {
  GET_POKEMONS,
  FILTER_BY_TYPE,
  FILTER_CREATED,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
} from "../actions";

const initialState = {
  pokemons: [],
  allPokemons: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };

    case FILTER_BY_TYPE:
      const allPokemons = state.allPokemons;
      const typesFiltered =
        action.payload === "all"
          ? allPokemons
          : allPokemons.filter((p) => p.types.includes(action.payload));
      return {
        ...state,
        pokemons: typesFiltered,
      };

    case FILTER_CREATED:
      const allPokemones = state.allPokemons;
      const createdFilter =
        action.payload === "created"
          ? allPokemones.filter((p) => p.createdInDb)
          : allPokemones.filter((p) => !p.createdInDb);

      return {
        ...state,
        pokemons: createdFilter,
      };

    case ORDER_BY_NAME:
      const allPokes = state.allPokemons;
      const sortedPokemon =
        action.payload === "asc"
          ? allPokes.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : allPokes.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedPokemon,
      };

    case ORDER_BY_ATTACK:
      const allPoke = state.allPokemons;
      const sortedPokemonAttack =
        action.payload === "fue"
          ? allPoke.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            })
          : allPoke.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        pokemons: sortedPokemonAttack,
      };

    default:
      return { ...state };
  }
}

export default rootReducer;
