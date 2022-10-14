import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const RESET_POKEMONS = "RESET_POKEMONS";
export const GET_TYPES = "GET_TYPES";

export function getPokemons() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/pokemons");
    return dispatch({
      type: GET_POKEMONS,
      payload: json.data,
    });
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
    const json = await axios.get("http://localhost:3001/types");
    return dispatch({
      type: GET_TYPES,
      payload: json.data,
    });
  };
}
