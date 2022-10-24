import React from "react";
import { useDispatch } from "react-redux";
import { getPokemons, getTypes, setError } from "../actions";
import psyduck from "../styles/Images/psyduck.png";
import styles from "../styles/Error.module.css";

function Error() {
  const dispatch = useDispatch();

  const handleHome = (ev) => {
    ev.preventDefault();
    dispatch(setError(false));
    dispatch(getPokemons());
    dispatch(getTypes());
  };
  return (
    <div className={styles.contError}>
      <img src={psyduck} alt="psyduck" className={styles.psyduck} />
      <div className={styles.texto}>
        <div className={styles.text}>Oh no!</div>
        <div className={styles.parrafo}>Can't find what you're looking for</div>
      </div>
      <button onClick={(e) => handleHome(e)} className={styles.button}>
        Return to home
      </button>
    </div>
  );
}

export default Error;
