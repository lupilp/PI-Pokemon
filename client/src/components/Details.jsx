import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearDetail, getDetail } from "../actions";

function Details() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const pokemonDetail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(clearDetail());
  }, [dispatch, id]);

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
