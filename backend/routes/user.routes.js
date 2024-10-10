const express = require('express');
const User = require('../models/user.model');
const router = express.Router();


router.post('/users', async (req, res) => {
  try {
    const user = new User({ name: req.body.name });
    await user.save();
    res.status(201).send(user); 
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); 
    res.send(users); 
  } catch (error) {
    res.status(500).send(error); 
  }
});

router.get('/userssorted', async (req, res) => {
    try {
      const userssorted = await User.find().sort({ name: 1 }); 
      res.send(userssorted);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;
