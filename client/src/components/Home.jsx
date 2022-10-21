import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterByType,
  filterCreated,
  orderByName,
  orderByAttack,
  resetPokemons,
  getTypes,
  clearDetail,
} from "../actions";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import logo from "../styles/Images/pokemon.png";
import recargar from "../styles/Images/recargar.png";
import add from "../styles/Images/add.png";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const pokemonDetail = useSelector((state) => state.detail);

  const allTypes = useSelector((state) => state.types);

  useEffect(() => {
    if (!allPokemons.length) {
      dispatch(getPokemons());
      dispatch(getTypes());
    }
    pokemonDetail.length && dispatch(clearDetail());
  }, [dispatch, allPokemons.length, pokemonDetail.length]);

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
      <div className={styles.navBar}>
        <div className={styles.navIzq}>
          <Link to="/">
            <img src={logo} alt="logo" className={styles.logo}></img>
          </Link>
        </div>

        <SearchBar></SearchBar>
        <div className={styles.navDer}>
          <Link to="/pokemons">
            <img src={add} alt="add" className={styles.add}></img>
          </Link>

          <button
            onClick={(e) => {
              handleClick(e);
            }}
            className={styles.buttonRec}
          >
            <img
              src={recargar}
              alt="recargar"
              className={styles.recargar}
            ></img>
          </button>
        </div>
      </div>

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
