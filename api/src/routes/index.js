const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { getInfoApi } = require("./utils");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

getInfoApi();

module.exports = router;
