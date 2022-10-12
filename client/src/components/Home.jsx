import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import styles from "../styles/Home.module.css";

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
      <div className={styles.contCards}>
        {allPokemons?.map((p) => {
          return (
            <Card name={p.name} image={p.image} types={p.types} key={p.id} />
          );
        })}
      </div>
    </div>
  );
}
