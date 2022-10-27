import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  editPokemon,
  getDetail,
  getDetailFromState,
  getPokemons,
  getTypes,
} from "../actions";

import styles from "../styles/Edit.module.css";
import ash from "../styles/Images/ash2.png";
import izq from "../styles/Images/chevron-left2.png";
import poke from "../styles/Images/poke.png";

function EditPokemon() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const allPokemons = useSelector((state) => state.pokemons);

  const pokemonDetail = useSelector((state) => state.detail);
  const types = useSelector((state) => state.types);

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
    input.hp &&
    input.attack &&
    input.defense &&
    input.speed &&
    input.types.length
  );

  console.log(input);

  useEffect(() => {
    dispatch(getTypes());
    if (allPokemons.length) {
      dispatch(getDetailFromState(id));
    } else {
      dispatch(getDetail(id));
    }
  }, [dispatch, allPokemons.length, id]);

  useEffect(() => {
    if (pokemonDetail.length) {
      setInput(pokemonDetail[0]);
    }
  }, [pokemonDetail.length, pokemonDetail]);

  const handleChange = (ev) => {
    setInput({
      ...input,
      [ev.target.name]: ev.target.value.toLowerCase(),
    });
  };

  const handleSelect = (ev) => {
    setInput({
      ...input,
      types: [...input.types, ev.target.value],
    });
  };

  const handleDeleteType = (ev) => {
    setInput({
      ...input,
      types: input.types.filter((t) => t !== ev),
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(editPokemon(input, id));
    alert("Pokemon editado");
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

  return (
    <div>
      <div className={styles.navBar}>
        <img src={izq} alt="izq"></img>
        <Link to="/home">
          <button className={styles.buttonHome}>Return to home</button>
        </Link>
      </div>
      <div className={styles.contGral}>
        <div className={styles.cardCreate}>
          <img src={ash} alt="ash" className={styles.ash} />
          <div className={styles.redTitle}>
            <img src={poke} alt="poke" className={styles.poke}></img>
            <div className={styles.title}>Edit your pokemon</div>
          </div>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.form}>
              <div className={styles.izq}>
                <div>
                  <div>Name:</div>
                  <input
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    placeholder="Name"
                    className={styles.inputs}
                  />
                </div>

                <div>
                  <div>Hp:</div>
                  <input
                    type="number"
                    value={input.hp}
                    name="hp"
                    onChange={(e) => handleChange(e)}
                    placeholder="1 - 150"
                    className={styles.inputs}
                  />
                </div>

                <div>
                  <div>Attack:</div>
                  <input
                    type="number"
                    value={input.attack}
                    name="attack"
                    onChange={(e) => handleChange(e)}
                    placeholder="1 - 150"
                    className={styles.inputs}
                  />
                </div>

                <div>
                  <div>Defense:</div>
                  <input
                    type="number"
                    value={input.defense}
                    name="defense"
                    onChange={(e) => handleChange(e)}
                    placeholder="1 - 150"
                    className={styles.inputs}
                  />
                </div>

                <div>
                  <select
                    onChange={(e) => handleSelect(e)}
                    className={styles.select}
                    disabled={input.types.length >= 2}
                    defaultValue="title"
                  >
                    <option value="title" disabled name="types">
                      Types
                    </option>
                    {types.map((t) => {
                      return (
                        <option
                          value={t.name}
                          key={t.name}
                          className={styles.options}
                        >
                          {t.name[0].toUpperCase() + t.name.slice(1)}
                        </option>
                      );
                    })}
                  </select>

                  <ul className={styles.types}>
                    {input.types.map((t) => {
                      return (
                        <li key={t} className={styles.types}>
                          {t[0].toUpperCase() + t.slice(1)}
                          <button
                            onClick={() => handleDeleteType(t)}
                            className={styles.deleteButton}
                          >
                            x
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className={styles.der}>
                <div>
                  <div>Speed:</div>
                  <input
                    type="number"
                    value={input.speed}
                    name="speed"
                    onChange={(e) => handleChange(e)}
                    placeholder="1 - 150"
                    className={styles.inputs}
                  />
                </div>
                <div>
                  <div>Height:</div>
                  <input
                    type="number"
                    value={input.height}
                    name="height"
                    onChange={(e) => handleChange(e)}
                    placeholder="Height"
                    className={styles.inputs}
                  />
                </div>
                <div>
                  <div>Weight:</div>
                  <input
                    type="number"
                    value={input.weight}
                    name="weight"
                    onChange={(e) => handleChange(e)}
                    placeholder="Weight"
                    className={styles.inputs}
                  />
                </div>
                <div>
                  <div>Image:</div>
                  <input
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={(e) => handleChange(e)}
                    className={styles.inputs}
                    placeholder="URL"
                  />
                </div>

                <button
                  type="submit"
                  className={styles.button}
                  disabled={btnDisabled}
                >
                  Edit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPokemon;
