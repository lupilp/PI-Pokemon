import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getNamePokemon } from "../actions";
import styles from "../styles/SearchBar.module.css";
import buscar from "../styles/Images/search.png";

function SearchBar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleInput = (ev) => {
    setInput(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(getNamePokemon(input));
    setInput("");
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Busca tu pokemon..."
        onChange={(e) => handleInput(e)}
        value={input}
        className={styles.input}
      />
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className={styles.searchButton}
      >
        <img src={buscar} alt="buscar" className={styles.buscar}></img>
      </button>
    </div>
  );
}

export default SearchBar;
