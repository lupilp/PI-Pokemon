import {
  GET_POKEMONS,
  FILTER_BY_TYPE,
  FILTER_CREATED,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
  SET_CURRENT_PAGE,
  RESET_POKEMONS,
  GET_TYPES,
  GET_NAME_POKEMON,
  POST_POKEMON,
  GET_DETAIL,
  CLEAR_DETAIL,
  GET_DETAIL_FROM_STATE,
  SET_ERROR,
  DELETE_POKEMON,
  EDIT_POKEMON,
  CLEAR_HOME,
} from "../actions";

const initialState = {
  pokemons: [],
  allPokemons: [],
  currentPage: 1,
  types: [],
  detail: [],
  error: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      if (!action.payload.includes(null)) {
        return {
          ...state,
          pokemons: action.payload,
          allPokemons: action.payload,
        };
      } else {
        return { ...state, error: true };
      }

    case FILTER_BY_TYPE:
      const allPokemons = [...state.allPokemons];
      const typesFiltered =
        action.payload === "all"
          ? allPokemons
          : allPokemons.filter((p) => p.types.includes(action.payload));
      return {
        ...state,
        pokemons: typesFiltered,
        currentPage: 1,
        error: false,
      };

    case FILTER_CREATED:
      const allPokemones = [...state.allPokemons];
      let pokemonesFiltrados;
      if (action.payload === "created") {
        pokemonesFiltrados = allPokemones.filter((p) => p.createdInDb);
        if (!pokemonesFiltrados.length) {
          return {
            ...state,
            error: true,
          };
        }
      }
      if (action.payload === "existing") {
        pokemonesFiltrados = allPokemones.filter((p) => !p.createdInDb);
      }
      return {
        ...state,
        pokemons: pokemonesFiltrados,
        currentPage: 1,
        error: false,
      };

    case ORDER_BY_NAME:
      const allPokes = [...state.pokemons];
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
        currentPage: 1,
        error: false,
      };

    case ORDER_BY_ATTACK:
      const allPoke = [...state.pokemons];
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
        currentPage: 1,
        error: false,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case RESET_POKEMONS:
      const allPokemonitos = [...state.allPokemons];
      return {
        ...state,
        pokemons: allPokemonitos,
        currentPage: 1,
        error: false,
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case GET_NAME_POKEMON:
      return {
        ...state,
        pokemons: action.payload,
        currentPage: 1,
      };

    case POST_POKEMON:
      return {
        ...state,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case GET_DETAIL_FROM_STATE:
      const todosLosPokemon = [...state.allPokemons];
      const detallesPokemon = todosLosPokemon.filter(
        (p) => p.id.toString() === action.payload
      );
      return {
        ...state,
        detail: detallesPokemon,
      };

    case CLEAR_HOME:
      return {
        ...state,
        pokemons: [],
      };

    case CLEAR_DETAIL:
      return {
        ...state,
        detail: [],
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_POKEMON:
      return {
        ...state,
      };

    case EDIT_POKEMON:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
