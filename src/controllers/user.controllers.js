// Importar función para capturar errores
const catchError = require('../utils/catchError');

// Importar modelo de usuario
const User = require('../models/User');

// Importar función para enviar correos electrónicos
const { sendEmail } = require('../utils/sendEmail');

// Importar biblioteca para encriptar contraseñas
const bcrypt = require("bcrypt");

// Importar modelo de código de verificación de correo electrónico
const EmailCode = require('../models/EmailCode');

// Importar biblioteca para generar tokens de autenticación
const jwt = require("jsonwebtoken");

// Función para obtener todos los usuarios
const getAll = catchError(async (req, res) => {

  // Buscar todos los usuarios en la base de datos
  const results = await User.findAll();

  // Devolver los resultados en formato JSON
  return res.json(results);
});

// Función para crear un nuevo usuario
const create = catchError(async (req, res) => {

  // Extraer datos del cuerpo de la solicitud
  const { email, password, firstName, lastName, country, frontBaseUrl } = req.body

  // Generar código de verificación aleatorio
  const code = require("crypto").randomBytes(64).toString("hex")

  // Enviar correo electrónico de verificación
  sendEmail({
    to: email,
    subject: "Verficacion de la cuenta",
    html: `
      <!-- Contenido del correo electrónico -->
    `
  })

  // Encriptar contraseña
  const hashedPassword = await bcrypt.hash(password, 10)

  // Crear nuevo usuario en la base de datos
  const result = await User.create({...req.body, password: hashedPassword });

  // Crear código de verificación en la base de datos
  await EmailCode.create({ code, userId: result.id })

  // Devolver el resultado en formato JSON
  return res.status(201).json(result);
});

// Función para obtener un usuario por ID
const getOne = catchError(async (req, res) => {

  // Extraer ID del parámetro de la solicitud
  const { id } = req.params;

  // Buscar usuario en la base de datos
  const result = await User.findByPk(id);

  // Si no se encuentra el usuario, devolver un estado 404
  if (!result) return res.sendStatus(404);

  // Devolver el resultado en formato JSON
  return res.json(result);
});

// Función para eliminar un usuario
const remove = catchError(async (req, res) => {

  // Extraer ID del parámetro de la solicitud
  const { id } = req.params;

  // Eliminar usuario en la base de datos
  const result = await User.destroy({ where: { id } });

  // Si no se elimina el usuario, devolver un estado 404
  if (!result) return res.sendStatus(404);

  // Devolver un estado 204 para indicar que se eliminó correctamente
  return res.sendStatus(204);
});

// Función para actualizar un usuario
const update = catchError(async (req, res) => {

  // Extraer ID del parámetro de la solicitud
  const { id } = req.params;

  // Actualizar usuario en la base de datos
  const result = await User.update(
    req.body,
    { where: { id }, returning: true }
  );
  // Si no se actualiza el usuario, devolver un estado 404
  if (result[0] === 0) return res.sendStatus(404);

  // Devolver el resultado en formato JSON
  return res.json(result[1][0]);
});

// Función para verificar código de verificación
const veryCode = catchError(async (req, res) => {

  // Extraer código de verificación del parámetro de la solicitud
  const { code } = req.params

  // Buscar código de verificación en la base de datos
  const userCode = await EmailCode.findOne({ where: { code } })

  // Si no se encuentra el código, devolver un estado 401
  if (!userCode) return res.status(401).json('User not found')

  // Buscar usuario asociado al código de verificación
  const user = await User.findByPk(userCode.userId)

  // Actualizar usuario para marcar como verificado
  await user.update({ isVerified: true })

  // Eliminar código de verificación
  await userCode.destroy()

  // Devolver el usuario verificado en formato JSON
  return res.json(user)

})

// Función para iniciar sesión
const login = catchError(async (req, res) => {

  // Extraer credenciales de la solicitud
  const { email, password } = req.body

  // Buscar usuario en la base de datos
  const user = await User.findOne({ where: { email } })

  // Si no se encuentra el usuario, devolver un estado 401
  if (!user) return res.sendStatus(401)

  // Verificar contraseña
  const isValid = await bcrypt.compare(password, user.password)

  // Si la contraseña no es válida, devolver un estado 401
  if (!isValid) return res.sendStatus(401)

  // Verificar si el usuario está verificado
  if (!user.isVerified) return res.sendStatus(401)

  // Generar token de autenticación
  const token = jwt.sign(
    { user },
    process.env.TOKEN_SECRET,
    { expiresIn: "1d" }
  )

  // Devolver el usuario y el token en formato JSON
  return res.json({ user, token })
})

// Función para obtener el usuario autenticado
const logged = catchError(async (req, res) => {

  // Obtener el usuario autenticado desde la solicitud
  const user = req.user
  
  // Devolver el usuario en formato JSON
  return res.json(user)
})

// Exportar funciones
module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  veryCode,
  login,
  logged
}