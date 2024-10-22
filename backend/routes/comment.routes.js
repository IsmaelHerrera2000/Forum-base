const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

router.post('/posts/:postId/comments', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.postId);

    if (!post) return res.status(404).json({ msg: 'Post no encontrado' });

    const comment = new Comment({
      content,
      post: req.params.postId,
      author: req.user.userId
    });

    await comment.save();

    const populatedComment = await Comment.findById(comment._id).populate('author', 'username');

    res.status(201).json(populatedComment); 
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear el comentario', error });
  }
});


router.get('/posts/:postId/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username profileImage');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener los comentarios', error });
  }
});

router.delete('/comments/:id', authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ msg: 'Comentario no encontrado' });

    if (comment.author.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'No autorizado para eliminar este comentario' });
    }

    await comment.remove();
    res.status(200).json({ msg: 'Comentario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al eliminar el comentario', error });
  }
});

module.exports = router;
