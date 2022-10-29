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
      const pokemonName = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(name.toLowerCase())
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
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png";
    }

    if (name && types.length) {
      const createPokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height: Number(height),
        weight: Number(weight),
        image: urlDeImagen,
        createdInDb,
      });

      const typeDb = await Type.findAll({
        where: { name: types },
      });

      createPokemon.addType(typeDb);
      res.status(200).send("Pokemon creado con exito");
    } else {
      res.status(400).send("Faltaron datos para crear el pokemon");
    }
  } catch (error) {
    console.log("entre al error del post", error);
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

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pokemonDelete = await Pokemon.findByPk(id);
    if (!pokemonDelete) {
      res.status(400).send("No existe el pokemon que deseas eliminar");
    } else {
      pokemonDelete.destroy();
      return res.status(200).send("Pokemon eliminado correctamente");
    }
  } catch (error) {
    res.status(400).json({ error: error.message }, "Entré al error de delete");
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
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
    if (id) {
      let urlDeImagen = "";

      if (image) {
        urlDeImagen = image;
      } else {
        urlDeImagen =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png";
      }

      if (name) {
        const findPokemon = await Pokemon.findByPk(id);
        await findPokemon.update(
          {
            name,
            hp,
            attack,
            defense,
            speed,
            height: Number(height),
            weight: Number(weight),
            image: urlDeImagen,
            createdInDb,
          },
          { where: { id: id } }
        );

        const typeDb = await Type.findAll({
          where: { name: types },
        });

        await findPokemon.setTypes(typeDb);
        res.status(200).send("Pokemon modificado con exito");
      } else {
        res.status(400).send("Faltaron datos para modificar el pokemon");
      }
    }
  } catch (error) {
    console.log("entre al error del put", error);
  }
});

module.exports = router;
