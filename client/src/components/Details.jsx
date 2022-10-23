import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getDetailFromState } from "../actions";
import styles from "../styles/Details.module.css";

function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const pokemonDetail = useSelector((state) => state.detail);

  const allPokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    if (allPokemons.length) {
      dispatch(getDetailFromState(id));
    } else {
      dispatch(getDetail(id));
    }
  }, [dispatch, id, allPokemons.length]);

  return (
    <div>
      <h1>Ruta Detalles</h1>
      {pokemonDetail.length ? (
        <div>
          <div>{pokemonDetail[0].name}</div>
          <img src={pokemonDetail[0].image} alt="imagen-del-pokemon" />
          <div>{pokemonDetail[0].id}</div>
          <div>{pokemonDetail[0].hp}</div>
          <div className={styles.barra}>
            <div
              className={styles.barraPintada}
              style={{ width: `${(pokemonDetail[0].hp / 125) * 100}%` }}
            ></div>
          </div>
          <div>{pokemonDetail[0].attack}</div>
          <div className={styles.barra}>
            <div
              className={styles.barraPintada}
              style={{ width: `${(pokemonDetail[0].attack / 125) * 100}%` }}
            ></div>
          </div>
          <div>{pokemonDetail[0].defense}</div>
          <div className={styles.barra}>
            <div
              className={styles.barraPintada}
              style={{ width: `${(pokemonDetail[0].defense / 125) * 100}%` }}
            ></div>
          </div>
          <div>{pokemonDetail[0].speed}</div>
          <div className={styles.barra}>
            <div
              className={styles.barraPintada}
              style={{ width: `${(pokemonDetail[0].speed / 125) * 100}%` }}
            ></div>
          </div>
          <div>{pokemonDetail[0].height}</div>
          <div>{pokemonDetail[0].weight}</div>
          <ul>
            {pokemonDetail[0].types.map((t) => (
              <li key={pokemonDetail[0].name + t}>{t}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
}

export default Details;
