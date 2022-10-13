import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import styles from "../styles/Home.module.css";
import Paginado from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleClick(ev) {
    ev.preventDefault();
    dispatch(getPokemons());
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

      <div className={styles.filters}>
        <select>
          <option value="asc">Ascendente A-Z</option>
          <option value="desc">Descendente Z-A</option>
        </select>

        <select>
          <option value="fue">Fuerte</option>
          <option value="deb">Debil</option>
        </select>

        <select>
          <option value="todos">Todos</option>
          <option value="creados">Creados</option>
        </select>

        <select>
          <option value="grass">Grass</option>
          <option value="poison">Poison</option>
          <option value="fire">Fire</option>
          <option value="flying">Flying</option>
          <option value="water">Water</option>
          <option value="bug">Bug</option>
          <option value="normal">Normal</option>
          <option value="electric">Electric</option>
          <option value="ground">Ground</option>
        </select>
      </div>
      {/* <div className={styles.contCards}>
        {allPokemons.length ? (
          allPokemons.map((p) => {
            return (
              <Card name={p.name} image={p.image} types={p.types} key={p.id} />
            );
          })
        ) : (
          <div>Cargando...</div>
        )}
      </div> */}

      <div>
        <Paginado></Paginado>
      </div>
    </div>
  );
}
