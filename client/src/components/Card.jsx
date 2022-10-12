import React from "react";
import styles from "../styles/Card.module.css";

export default function Card({ name, image, types, id }) {
  return (
    <div className={styles.contCard}>
      <div>{name}</div>
      <div>
        {types.map((type) => {
          return <div key={id + type}>{type}</div>;
        })}
      </div>
      <img src={image} alt="imagen card" className={styles.img} />
    </div>
  );
}
