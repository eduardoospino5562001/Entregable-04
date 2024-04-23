// Importar funciones del controlador de usuarios
const { getAll, create, getOne, remove, update, veryCode, login, logged } = require('../controllers/user.controllers');

// Importar la biblioteca Express
const express = require('express');

// Importar función para verificar token JWT
const { verifyJwt } = require('../utils/verifyJWT');

// Crear un nuevo router para usuarios
const routerUser = express.Router();

// Ruta para obtener todos los usuarios
routerUser.route('/')
 .get(verifyJwt, getAll)   
 .post(create); // Ruta para crear un nuevo usuario

// Ruta para iniciar sesión
routerUser.route('/login')
 .post(login)

// Ruta para obtener información del usuario autenticado
routerUser.route("/me")
 .get(verifyJwt, logged)

// Ruta para verificar código de verificación
routerUser.route('/verify/:code')
 .get(veryCode)

// Ruta para obtener, eliminar o actualizar un usuario por ID 
routerUser.route('/:id')
 .get(verifyJwt, getOne) 
 .delete(verifyJwt, remove) 
 .put(verifyJwt, update);

// Exportar el router de usuarios
module.exports = routerUser;