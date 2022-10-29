import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import styles from "../styles/Paginado.module.css";
import { clearHome, setCurrentPage } from "../actions";
import izq from "../styles/Images/chevron-left.png";
import der from "../styles/Images/chevron-right.png";
import pokeball from "../styles/Gifs/pokeball.gif";

const renderData = (data) => {
  return data.map((p) => {
    return (
      <Card
        name={p.name}
        image={p.image}
        types={p.types}
        key={p.id}
        id={p.id}
      />
    );
  });
};

function Paginado() {
  const dispatch = useDispatch();

  const allPokemons = useSelector((state) => state.pokemons);

  const currentPage = useSelector((state) => state.currentPage);

  const [pokemonsPerPage] = useState(12);

  useEffect(() => {
    dispatch(clearHome());
  }, [dispatch]);

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
          <div>
            <img src={pokeball} alt="pokeball" className={styles.pokeball} />
          </div>
        )}
      </div>

      <div>
        <ul className={styles.pageNumbers}>
          <li>
            <button onClick={handlePrev}>
              <img src={izq} alt="izq" className={styles.chevIzq}></img>
            </button>
          </li>

          {pageNumbers}

          <li>
            <button onClick={handleNext}>
              <img src={der} alt="der" className={styles.chevDer}></img>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Paginado;
