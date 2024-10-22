const express = require('express');
const Post = require('../models/Post');
const Section = require('../models/Section');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

router.post('/sections/:sectionId/posts', authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body; 
    const sectionId = req.params.sectionId;
    const section = await Section.findById(sectionId);

    if (!section) return res.status(404).json({ msg: 'Sección no encontrada' });

    const post = new Post({
      title,
      content,
      section: sectionId,
      author: req.user.userId 
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear el post', error });
  }
});

router.get('/sections/:id/posts', async (req, res) => {
  try {
    const posts = await Post.find({ section: req.params.id }).populate('author', 'username');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener los posts', error });
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ msg: 'Post no encontrado' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener el post', error });
  }
});

router.delete('/posts/:id', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post no encontrado' });

    if (post.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'No autorizado para eliminar este post' });
    }

    await post.remove();
    res.status(200).json({ msg: 'Post eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar el post', error });
  }
});

module.exports = router;
