const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

router.get('/profile/:userId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    if (req.user.userId !== req.params.userId && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'No autorizado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).send('Error en el servidor');
  }
});

router.put('/profile/:userId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    if (req.user.userId !== req.params.userId && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'No autorizado' });
    }

    const { username, email, profileImage } = req.body;
    user.username = username || user.username;
    user.email = email || user.email;
    user.profileImage = profileImage || user.profileImage;

    await user.save();
    res.json({ msg: 'Perfil actualizado con éxito' });
  } catch (error) {
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;
