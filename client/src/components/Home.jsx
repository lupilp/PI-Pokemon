import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterByType,
  filterCreated,
  orderByName,
  orderByAttack,
  resetPokemons,
  getTypes,
} from "../actions";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();

  const allTypes = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  function handleClick(ev) {
    ev.preventDefault();
    dispatch(getPokemons());
  }

  function handleFilterType(ev) {
    if (ev.target.value === "all") {
      ev.preventDefault();
      dispatch(resetPokemons());
    } else {
      dispatch(filterByType(ev.target.value));
    }
    // dispatch(setCurrentPage(1)); esta es otra forma de solucionar lo del setcurrentpage
  }

  function handleFilterCreated(ev) {
    if (ev.target.value === "existing" || ev.target.value === "created") {
      ev.preventDefault();
      dispatch(filterCreated(ev.target.value));
    }

    if (ev.target.value === "all") {
      ev.preventDefault();
      dispatch(resetPokemons());
    }
  }

  function handleOrder(ev) {
    if (ev.target.value === "asc" || ev.target.value === "desc") {
      ev.preventDefault();
      dispatch(orderByName(ev.target.value));
    }
    if (ev.target.value === "fue" || ev.target.value === "deb") {
      ev.preventDefault();
      dispatch(orderByAttack(ev.target.value));
    }

    if (ev.target.value === "default") {
      ev.preventDefault();
      dispatch(resetPokemons());
    }
  }

  return (
    <div>
      <Link to="/pokemons">Crear un nuevo pokemon</Link>
      <h1>Bienvenido a tu pokeapp</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a mostrar pokemons
      </button>

      <SearchBar></SearchBar>

      <div className={styles.filters}>
        <select onChange={(e) => handleOrder(e)}>
          <option value="default">Order</option>
          <option value="asc">Ascendente A-Z</option>
          <option value="desc">Descendente Z-A</option>
          <option value="fue">Fuerte</option>
          <option value="deb">Debil</option>
        </select>

        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="all">All</option>
          <option value="existing">Existing</option>
          <option value="created">Created</option>
        </select>

        <select onChange={(e) => handleFilterType(e)}>
          <option value="all">All</option>
          {allTypes.map((t) => {
            return (
              <option value={t.name} key={t.name}>
                {t.name[0].toUpperCase() + t.name.slice(1)}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <Paginado></Paginado>
      </div>
    </div>
  );
}
