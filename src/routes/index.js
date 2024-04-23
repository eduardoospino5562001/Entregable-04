// Importar la biblioteca Express
const express = require('express');

// Importar el router de usuarios
const routerUser = require('./user.router');

// Crear un nuevo router
const router = express.Router();

// Agregar el router de usuarios al router principal
router.use('/users', routerUser)

// Exportar el router principal
module.exports = router;