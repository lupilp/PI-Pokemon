import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getPokemons, getTypes, postPokemon } from "../actions";
import styles from "../styles/Create.module.css";

function validate(input) {
  const errors = {};
  if (!input.name || input.name.length < 3) {
    errors.name = "Se requiere un nombre de mas de tres letras";
  }

  if (!input.hp || input.hp < 0 || input.hp > 100) {
    errors.hp = "Valor maximo 100";
  }

  if (!input.attack || input.attack < 0 || input.attack > 100) {
    errors.attack = "Valor maximo 100";
  }

  if (!input.defense || input.defense < 0 || input.defense > 100) {
    errors.defense = "Valor maximo 100";
  }

  if (!input.speed || input.speed < 0 || input.speed > 100) {
    errors.speed = "Valor maximo 100";
  }

  if (input.types) {
  }

  return errors;
}

function CreatePokemon() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [errors, setErrors] = useState({});

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

  let btnDisabled = !(
    input.name.length &&
    input.hp.length &&
    input.attack.length &&
    input.defense.length &&
    input.speed.length &&
    input.types.length
  );

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const handleChange = (ev) => {
    setInput({
      ...input,
      [ev.target.name]: ev.target.value,
    });

    setErrors(
      validate({
        ...input,
        [ev.target.name]: ev.target.value,
      })
    );
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
    dispatch(getPokemons());
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
            placeholder="Nombre"
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div>
          <label>Hp:</label>
          <input
            type="number"
            value={input.hp}
            name="hp"
            onChange={(e) => handleChange(e)}
            placeholder="1 - 100"
          />
          {errors.hp && <p>{errors.hp}</p>}
        </div>

        <div>
          <label>Attack:</label>
          <input
            type="number"
            value={input.attack}
            name="attack"
            onChange={(e) => handleChange(e)}
            placeholder="1 - 100"
          />
          {errors.attack && <p>{errors.attack}</p>}
        </div>

        <div>
          <label>Defense:</label>
          <input
            type="number"
            value={input.defense}
            name="defense"
            onChange={(e) => handleChange(e)}
            placeholder="1 - 100"
          />
          {errors.defense && <p>{errors.defense}</p>}
        </div>

        <div>
          <label>Speed:</label>
          <input
            type="number"
            value={input.speed}
            name="speed"
            onChange={(e) => handleChange(e)}
            placeholder="1 - 100"
          />
          {errors.speed && <p>{errors.speed}</p>}
        </div>

        <div>
          <label>Height:</label>
          <input
            type="number"
            value={input.height}
            name="height"
            onChange={(e) => handleChange(e)}
            placeholder="1 - 100"
          />
        </div>

        <div>
          <label>Weight:</label>
          <input
            type="number"
            value={input.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
            placeholder="1 - 100"
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

        <button type="submit" disabled={btnDisabled} className={styles.button}>
          Crear
        </button>
      </form>
    </div>
  );
}

export default CreatePokemon;
