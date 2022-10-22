import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Landing.module.css";
import logo from "../styles/Images/pokemon.png";
import charizard from "../styles/Gifs/charizard.gif";

export default function LandingPage() {
  return (
    <div className={styles.background}>
      <div className={styles.contIzq}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.contTitle}>
          <div className={styles.title}>¡Bienvenido a tu pokedex!</div>
          <div className={styles.parrafo}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </div>
          <Link to="/home">
            <button className={styles.button}>Ingresar</button>
          </Link>
        </div>
      </div>

      <div className={styles.contDer}>
        <img src={charizard} alt="charizard" className={styles.charizardImg} />
      </div>
    </div>
  );
}
