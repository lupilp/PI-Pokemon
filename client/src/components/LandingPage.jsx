import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Landing.module.css";
import logo from "../styles/Images/pokemon.png";
import charizard from "../styles/Gifs/charizard.gif";
import linkedin from "../styles/Images/linkedin.png";
import github from "../styles/Images/github.png";

export default function LandingPage() {
  return (
    <div className={styles.background}>
      <div className={styles.contIzq}>
        <img src={logo} alt="logo" className={styles.logo} />
        <div className={styles.contTitle}>
          <div className={styles.title}>¡Welcome to your pokedex!</div>
          <div className={styles.parrafo}>
            Here you can find all the info from your favorite pokemons. Also you
            can let your creativity fly and create a new exclusive pokemon! I
            hope you like it :)
          </div>
          <Link to="/home">
            <button className={styles.button}>Let's go !</button>
          </Link>
        </div>
        <div>
          <a
            href="https://www.linkedin.com/in/lourdeslopezpepa/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            <img src={linkedin} alt="linkedin" className={styles.linkedin} />
          </a>

          <a href="https://github.com/lupilp" target="_blank" rel="noreferrer">
            {" "}
            <img src={github} alt="github" className={styles.github} />
          </a>
        </div>
      </div>

      <div className={styles.contDer}>
        <img src={charizard} alt="charizard" className={styles.charizardImg} />
      </div>
    </div>
  );
}
