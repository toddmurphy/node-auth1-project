const express = require('express');
const bc = require('bcryptjs');
const Users = require('../users/userModel');

const router = express.Router();

//post --> /api/register -->creates a user
router.post('/register', (req, res) => {
  const newUser = req.body;

  const hash = bc.hashSync(req.body.password, 8);

  newUser.password = hash;

  Users.addUser(newUser)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: 'Sorry, no user created on the server', error });
    });
});

//post --> /api/login
router.post('/login', (req, res) => {
  let credentials = req.body;

  Users.findBy(credentials.username)
    .first()
    .then(user => {
      //    login works without compareSync --> user && bc.compareSync(password, user.password
      if (user && bc.compareSync(credentials.password, user.password)) {
        //check the password is valid --> if they match it works
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Sorry, no login working on the server', error });
    });
});

module.exports = router;
