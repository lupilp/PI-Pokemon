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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </div>
          <Link to="/home">
            <button className={styles.button}>Let's go !</button>
          </Link>
        </div>
        <div>
          <a
            href="https://www.linkedin.com/in/lourdeslopezpepa/"
            target="_blank"
            rel="nofollow"
          >
            {" "}
            <img src={linkedin} alt="linkedin" className={styles.linkedin} />
          </a>

          <a href="https://github.com/lupilp" target="_blank" rel="nofollow">
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
