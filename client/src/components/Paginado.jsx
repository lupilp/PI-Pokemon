import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import styles from "../styles/Paginado.module.css";
import { setCurrentPage } from "../actions";

const renderData = (data) => {
  return data.map((p) => {
    return <Card name={p.name} image={p.image} types={p.types} key={p.id} />;
  });
};

function Paginado() {
  const dispatch = useDispatch();

  const allPokemons = useSelector((state) => state.pokemons);

  const currentPage = useSelector((state) => state.currentPage);

  const [pokemonsPerPage] = useState(12);

  const handleClick = (ev) => {
    dispatch(setCurrentPage(Number(ev.target.id)));
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
      <li
        key={numbers}
        id={numbers}
        onClick={handleClick}
        className={currentPage === numbers ? styles.active : null}
      >
        {numbers}
      </li>
    );
  });

  const handleNext = () => {
    if (currentPage + 1 <= pages.length) {
      dispatch(setCurrentPage(currentPage + 1));
    } else {
      return null;
    }
  };

  const handlePrev = () => {
    if (currentPage - 1 >= 1) {
      dispatch(setCurrentPage(currentPage - 1));
    } else {
      return null;
    }
  };

  return (
    <>
      <div className={styles.contCards}>
        {allPokemons.length ? (
          renderData(currentPokemons)
        ) : (
          <div>Cargando...</div>
        )}
      </div>
      <ul className={styles.pageNumbers}>
        <li>
          <button onClick={handlePrev}>Prev</button>
        </li>

        {pageNumbers}

        <li>
          <button onClick={handleNext}>Next</button>
        </li>
      </ul>
    </>
  );
}

export default Paginado;
