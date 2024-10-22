const express = require('express');
const Section = require('../models/Section');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const router = express.Router();

router.post('/sections', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log(name, description);
    const section = new Section({ name, description });
    await section.save();
    res.status(201).json(section);
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear la sección', error });
  }
});

router.get('/sections', async (req, res) => {
  try {
    const sections = await Section.find();
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener las secciones', error });
  }
});

router.get('/sections/:id', async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) return res.status(404).json({ msg: 'Sección no encontrada' });
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener la sección', error });
  }
});

router.delete('/sections/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Section.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Sección eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar la sección', error });
  }
});

module.exports = router;
