const express = require('express');
const User = require('../models/user.model');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: ID autogenerado del usuario
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *       example:
 *         id: 60c72b2f5f1b2c001c8e4e67
 *         name: John Doe
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
    const user = new User({ name: req.body.name });
    await user.save();
    res.status(201).send(user); 
  } catch (error) {
    res.status(400).send(error);
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
router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); 
    res.send(users); 
  } catch (error) {
    res.status(500).send(error); 
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
router.get('/userssorted', async (req, res) => {
    try {
      const userssorted = await User.find().sort({ name: 1 }); 
      res.send(userssorted);
    } catch (error) {
      res.status(500).send(error);
    }
});

module.exports = router;
