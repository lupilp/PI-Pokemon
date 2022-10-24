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
      const pokemonName = allPokemons.filter(
        (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
      );
      if (pokemonName.length > 0) {
        res.status(200).send(pokemonName);
      } else {
        res.status(400).send("Pokemon not found");
      }
    } else {
      res.status(200).send(allPokemons);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/types", async (req, res) => {
  try {
    const cantidadTypes = await Type.count();
    if (!cantidadTypes) {
      console.log("los tuve que crear");
      const allMyPokemons = await getAllPokemons();
      const pokemonTypes = allMyPokemons.map((pokemon) => pokemon.types);
      const myTypes = pokemonTypes.flat(); // Nuevo arreglo con los elem. de los sub arreglos concatenados -> [[1, 2], [3, 2]] -> [1, 2, 3, 2]
      const mySetTypes = [...new Set(myTypes)]; // Me elimina los repetidos(set solo acepta valores unicos) -> [1, 2, 3, 2] -> [1, 2, 3]
      // res.status(200).send(mySetTypes);
      mySetTypes.forEach((type) => {
        Type.findOrCreate({ where: { name: type } }); // Busca en la tabla type, en la columna name si tiene el type, sino lo crea.
      });
      const theTypes = await Type.findAll();
      res.status(200).send(theTypes);
    } else {
      console.log("ya los tenia asi que no los cree");
      // const allTypes = await Type.findAll(); // Trae todos los datos de la tabla type.
      const theTypes = await Type.findAll();
      res.status(200).send(theTypes);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/pokemons", async (req, res) => {
  const { name, types } = req.body;
  if (name && types) {
    try {
      const {
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image,
        types,
        createdInDb,
      } = req.body;

      let urlDeImagen = "";

      if (image) {
        urlDeImagen = image;
      } else {
        urlDeImagen =
          "https://www.pngkit.com/png/full/62-622203_anime-pokemon-png-transparent-pokemon-pikachu.png";
      }

      const createPokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image: urlDeImagen,
        createdInDb,
      });

      const typeDb = await Type.findAll({
        where: { name: types },
      });

      createPokemon.addType(typeDb);
      res.status(200).send("Pokemon creado con exito");
    } catch (error) {
      console.log("entre al error del post", error);
    }
  } else {
    res.status(400).send("El name y los tipos del pokemon son obligatorio");
  }
});

router.get("/pokemons/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getById = await getAllPokemons();

    if (id) {
      const pokemonById = getById.filter(
        (pokemon) => pokemon.id.toString() === id
      );

      if (pokemonById) {
        res.status(200).json(pokemonById);
      } else {
        res
          .status(404)
          .send("No se encontró ningun pokemon en all pokemons con el id");
      }
    } else {
      res.status(404).send("No se encontró el id por params");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// getInfoDb();

module.exports = router;
