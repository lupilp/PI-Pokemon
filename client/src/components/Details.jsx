import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";

function Details(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const pokemonDetail = useSelector((state) => state.detail);
  return (
    <div>
      <h1>Ruta Detalles</h1>
      {pokemonDetail.length ? (
        <div>
          <div>{pokemonDetail[0].name}</div>
          <img src={pokemonDetail[0].image} alt="imagen-del-pokemon" />
          <div>{pokemonDetail[0].hp}</div>
          <div>{pokemonDetail[0].attack}</div>
          <div>{pokemonDetail[0].defense}</div>
          <div>{pokemonDetail[0].speed}</div>
          <div>{pokemonDetail[0].height}</div>
          <div>{pokemonDetail[0].weight}</div>
          <ul>
            {pokemonDetail[0].types.map((t) => (
              <li>{t}</li>
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
