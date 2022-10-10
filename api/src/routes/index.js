const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { getAllPokemons, getInfoDb } = require("./utils");
const { Pokemon, Type } = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", async (req, res) => {
  try {
    const { name } = req.query;
    const allPokemons = await getAllPokemons();

    if (name) {
      const pokemonName = await allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      );
      if (pokemonName.length > 0) res.status(200).send(pokemonName);
    } else {
      res.status(200).send(allPokemons);
    }
  } catch (error) {
    res.status(400).send("No se encuentra el pokemon");
  }
});

// getAllPokemons();
// getInfoDb();

module.exports = router;
