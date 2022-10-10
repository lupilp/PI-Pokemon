const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = requiere("axios");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
  const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon");
  const apiInfo = await apiUrl.data.map((e) => {
    return {
      name: e.name,
      id: e.id,
      hp: e.hp,
      attack: e.attack,
      defense: e.defense,
      speed: e.speed,
      heigth: e.heigth,
      weigth: e.weigth,
    };
  });
};

module.exports = router;
