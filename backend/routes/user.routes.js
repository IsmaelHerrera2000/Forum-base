const express = require('express');
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/auth'); 
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: ID autogenerado del usuario
 *         username:
 *           type: string
 *           description: Nombre de usuario único
 *         email:
 *           type: string
 *           description: Email del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *       example:
 *         id: 60c72b2f5f1b2c001c8e4e67
 *         username: JohnDoe
 *         email: johndoe@example.com
 *         password: 'hashedpassword123'
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Error al crear el usuario
 */
router.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'El usuario con ese email ya existe' });
    }

    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ msg: 'Error al crear el usuario', error });
  }
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener la lista de todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error del servidor
 */
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select('username email role profileImage');
    res.status(200).send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'Error al obtener los usuarios', error });
  }
});

/**
 * @swagger
 * /api/userssorted:
 *   get:
 *     summary: Obtener la lista de usuarios ordenados alfabéticamente
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios ordenada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error del servidor
 */
router.get('/userssorted', adminMiddleware, async (req, res) => {
  try {
    const userssorted = await User.find().sort({ username: 1 });
    res.status(200).send(userssorted);
  } catch (error) {
    res.status(500).send({ msg: 'Error al obtener los usuarios ordenados', error });
  }
});

module.exports = router;
