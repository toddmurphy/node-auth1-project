const express = require('express');
const bc = require('bcryptjs');
const Users = require('../users/userModel');

const router = express.Router();

//post --> /api/register -->creates a user
router.post('/register', (req, res) => {
  const newUser = req.body;

  Users.addUser(newUser)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: 'Sorry, no user created on the server', error });
    });
});

//post --> /api/login
router.post('/login', (req, res) => {});

module.exports = router;
