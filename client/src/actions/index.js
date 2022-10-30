import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const RESET_POKEMONS = "RESET_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const GET_NAME_POKEMON = "GET_NAME_POKEMON";
export const POST_POKEMON = "POST_POKEMON";
export const GET_DETAIL = "GET_DETAIL";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const GET_DETAIL_FROM_STATE = "GET_DETAIL_FROM_STATE";
export const SET_ERROR = "SET_ERROR";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const EDIT_POKEMON = "EDIT_POKEMON";
export const CLEAR_HOME = "CLEAR_HOME";

export function getPokemons() {
  return async function (dispatch) {
    try {
      const json = await axios.get("/pokemons");
      return dispatch({
        type: GET_POKEMONS,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: SET_ERROR,
        payload: true,
      });
    }
  };
}

export function filterByType(payload) {
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByAttack(payload) {
  return {
    type: ORDER_BY_ATTACK,
    payload,
  };
}

export function setCurrentPage(payload) {
  return {
    type: SET_CURRENT_PAGE,
    payload,
  };
}

export function resetPokemons() {
  return {
    type: RESET_POKEMONS,
  };
}

export function getTypes() {
  return async function (dispatch) {
    const json = await axios.get("/types");
    return dispatch({
      type: GET_TYPES,
      payload: json.data,
    });
  };
}

export function postPokemon(dataPokemon) {
  return async function (dispatch) {
    const json = await axios.post("/pokemons", dataPokemon);
    return json;
  };
}

export function getNamePokemon(namePokemon) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/pokemons?name=${namePokemon}`);
      return dispatch({
        type: GET_NAME_POKEMON,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: SET_ERROR,
        payload: true,
      });
    }
  };
}

export function getDetail(pokemonId) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`/pokemons/${pokemonId}`);
      return dispatch({
        type: GET_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log("NO TENGO EL DETAIL", error);
    }
  };
}

export function getDetailFromState(payload) {
  return {
    type: GET_DETAIL_FROM_STATE,
    payload,
  };
}

export function clearDetail() {
  return {
    type: CLEAR_DETAIL,
  };
}

export function clearHome() {
  return {
    type: CLEAR_HOME,
  };
}

export function setError(payload) {
  return {
    type: SET_ERROR,
    payload,
  };
}

export function deletePokemon(pokemonId) {
  return async function (dispatch) {
    try {
      await axios.delete(`/delete/${pokemonId}`);
      return dispatch({
        type: GET_DETAIL,
      });
    } catch (error) {
      console.log("No puedo eliminar el pokemon", error);
    }
  };
}

export function editPokemon(pokemonId, pokemonEditado) {
  return async function (dispatch) {
    try {
      const json = await axios.put(`/edit/${pokemonId}`, pokemonEditado);
      return dispatch({
        type: EDIT_POKEMON,
        payload: json.data,
      });
    } catch (error) {
      console.log("No pude modificar el pokemon", error);
    }
  };
}
