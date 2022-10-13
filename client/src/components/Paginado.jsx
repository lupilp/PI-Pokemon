import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import styles from "../styles/Paginado.module.css";

const renderData = (data) => {
  return data.map((p) => {
    return <Card name={p.name} image={p.image} types={p.types} key={p.id} />;
  });
};

function Paginado() {
  const allPokemons = useSelector((state) => state.pokemons);

  const [currentPage, setcurrentPage] = useState(1);
  const [pokemonsPerPage, setpokemonsPerPage] = useState(12);

  const handleClick = (ev) => {
    setcurrentPage(Number(ev.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
    // divido mi cantidad de pokemones por la cantidad de pokemones que quiero por pagina
    pages.push(i);
  }

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const pageNumbers = pages.map((numbers) => {
    return (
      <li key={numbers} id={numbers} onClick={handleClick}>
        {numbers}
      </li>
    );
  });

  return (
    <>
      <ul className={styles.pageNumbers}>{pageNumbers}</ul>
      <div className={styles.contCards}>
        {allPokemons.length ? (
          renderData(currentPokemons)
        ) : (
          <div>Cargando...</div>
        )}
      </div>
    </>
  );
}

export default Paginado;
