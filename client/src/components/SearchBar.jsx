import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getNamePokemon } from "../actions";

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
    <div>
      <input
        type="text"
        placeholder="Busca tu pokemon..."
        onChange={(e) => handleInput(e)}
        value={pokemon}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
