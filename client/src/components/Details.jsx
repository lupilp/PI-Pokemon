import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getDetailFromState } from "../actions";

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
          <div>{pokemonDetail[0].attack}</div>
          <div>{pokemonDetail[0].defense}</div>
          <div>{pokemonDetail[0].speed}</div>
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
