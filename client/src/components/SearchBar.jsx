import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getNamePokemon } from "../actions";
import styles from "../styles/SearchBar.module.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [pokemon, setPokemon] = useState("");

  const handleInput = (ev) => {
    setPokemon(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(getNamePokemon(pokemon));
    setPokemon("");
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Busca tu pokemon..."
        onChange={(e) => handleInput(e)}
        value={pokemon}
        className={styles.input}
      />
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className={styles.searchButton}
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
