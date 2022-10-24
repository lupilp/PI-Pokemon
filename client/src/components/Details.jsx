import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getDetailFromState } from "../actions";
import styles from "../styles/Details.module.css";
import "../styles/index.css";
import pokeball from "../styles/Gifs/pokeball.gif";
import izq from "../styles/Images/chevron-left2.png";

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
      <div className={styles.navBar}>
        <img src={izq} alt="izq"></img>
        <Link to="/home">
          <button className={styles.buttonHome}>Return to home</button>
        </Link>
      </div>
      {pokemonDetail.length ? (
        <div className={styles.contGral}>
          <div className={styles.contRed}>
            <div className={styles.contGris}>
              <div className={styles.contIzq}>
                <div className={styles.circulo}>
                  <img
                    src={pokemonDetail[0].image}
                    alt="imagen-del-pokemon"
                    className={styles.image}
                  />
                </div>
                <div className={styles.infoBasica}>
                  <div className={styles.name}>
                    {pokemonDetail[0].name[0].toUpperCase() +
                      pokemonDetail[0].name.slice(1)}
                  </div>
                  <ul className={styles.types}>
                    {pokemonDetail[0].types.map((t) => (
                      <div key={pokemonDetail[0].name + t} className={t}>
                        {t.toUpperCase()}
                      </div>
                    ))}
                  </ul>
                  <div className={styles.id}>ID #{pokemonDetail[0].id}</div>
                </div>
              </div>

              <div className={styles.contDer}>
                <div className={styles.alturaPeso}>
                  <div className={styles.medidas}>
                    <div className={styles.title}>Height</div>
                    <div>{pokemonDetail[0].height}cm</div>
                  </div>

                  <div className={styles.medidas}>
                    <div className={styles.title}>Weight</div>
                    <div>{pokemonDetail[0].weight}kg</div>
                  </div>
                </div>

                <div className={styles.stats}>
                  <div className={styles.filaStat}>
                    <div>Hp</div>
                    <div className={styles.number}>{pokemonDetail[0].hp}</div>

                    <div className={styles.barra}>
                      <div
                        className={styles.barraPintada}
                        style={{
                          width: `${(pokemonDetail[0].hp / 150) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.filaStat}>
                    <div>Attack</div>
                    <div className={styles.number}>
                      {pokemonDetail[0].attack}
                    </div>
                    <div className={styles.barra}>
                      <div
                        className={styles.barraPintada}
                        style={{
                          width: `${(pokemonDetail[0].attack / 150) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.filaStat}>
                    <div>Defense</div>
                    <div className={styles.number}>
                      {pokemonDetail[0].defense}
                    </div>
                    <div className={styles.barra}>
                      <div
                        className={styles.barraPintada}
                        style={{
                          width: `${(pokemonDetail[0].defense / 150) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className={styles.filaStat}>
                    <div>Speed</div>
                    <div className={styles.number}>
                      {pokemonDetail[0].speed}
                    </div>
                    <div className={styles.barra}>
                      <div
                        className={styles.barraPintada}
                        style={{
                          width: `${(pokemonDetail[0].speed / 150) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.poke}>
          <img src={pokeball} alt="pokeball" className={styles.pokeball} />
        </div>
      )}
    </div>
  );
}

export default Details;
