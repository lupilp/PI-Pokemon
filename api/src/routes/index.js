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
    res.status(400).json({ error: error.message });
  }
});

router.get("/types", async (req, res) => {
  try {
    const allMyPokemons = await getAllPokemons();
    const pokemonTypes = allMyPokemons.map((pokemon) => pokemon.types);
    const myTypes = pokemonTypes.flat(); // Nuevo arreglo con los elem. de los sub arreglos concatenados -> [[1, 2], [3, 2]] -> [1, 2, 3, 2]
    const mySetTypes = [...new Set(myTypes)]; // Me elimina los repetidos(set solo acepta valores unicos) -> [1, 2, 3, 2] -> [1, 2, 3]
    // res.status(200).send(mySetTypes);

    mySetTypes.forEach((type) => {
      Type.findOrCreate({ where: { name: type } }); // Busca en la tabla type, en la columna name si tiene el type, sino lo crea.
    });

    const allTypes = await Type.findAll(); // Trae todos los datos de la tabla type.
    res.status(200).send(allTypes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// getAllPokemons();
// getInfoDb();

module.exports = router;
