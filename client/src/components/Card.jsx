import React from "react";

export default function Card({ name, image, types, id }) {
  return (
    <div>
      <h1>{name}</h1>
      <h4>
        {types.map((type) => {
          return <div key={id + type}>{type}</div>;
        })}
      </h4>
      <img src={image} alt="imagen card" />
    </div>
  );
}
