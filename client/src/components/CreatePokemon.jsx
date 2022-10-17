import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getTypes, postPokemon } from "../actions";

function CreatePokemon() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    types: [],
  });

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleChange = (ev) => {
    setInput({
      ...input,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSelect = (ev) => {
    setInput({
      ...input,
      types: [...input.types, ev.target.value],
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(postPokemon(input));
    alert("Pokemon creado");
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      image: "",
      types: [],
    });

    history.push("/home");
  };

  const handleDeleteType = (ev) => {
    setInput({
      ...input,
      types: input.types.filter((t) => t !== ev),
    });
  };

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>

      <h1>Crea tu pokemon</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Hp:</label>
          <input
            type="number"
            value={input.hp}
            name="hp"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Attack:</label>
          <input
            type="number"
            value={input.attack}
            name="attack"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Defense:</label>
          <input
            type="number"
            value={input.defense}
            name="defense"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Speed:</label>
          <input
            type="number"
            value={input.speed}
            name="speed"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Height:</label>
          <input
            type="number"
            value={input.height}
            name="height"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Weight:</label>
          <input
            type="number"
            value={input.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Image:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <select onChange={(e) => handleSelect(e)}>
            {types.map((t) => {
              return (
                <option value={t.name} key={t.name}>
                  {t.name[0].toUpperCase() + t.name.slice(1)}
                </option>
              );
            })}
          </select>

          <ul>
            {input.types.map((t) => {
              return (
                <li key={t}>
                  {t} <button onClick={() => handleDeleteType(t)}>X</button>
                </li>
              );
            })}
          </ul>
        </div>

        <button type="submit">Crear</button>
      </form>
    </div>
  );
}

export default CreatePokemon;
