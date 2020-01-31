const express = require('express');
const bc = require('bcryptjs');
const Users = require('../users/userModel');

const router = express.Router();

//post --> /api/auth/register -->creates a user
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

//post --> /api/auth/login
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy(username)
    .first()
    .then(user => {
      //    login works without compareSync --> user && bc.compareSync(password, user.password --> //check the password is valid --> if they match it works
      if (user && bc.compareSync(password, user.password)) {
        req.session.loggedIn = true;
        req.session.userID = user.id;

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

//get --> /api/auth/logout
router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.status(500).json({ message: 'You can checkout anytime you want!' });
      } else {
        res.status(200).json({ message: 'Goodbye, thanks for using our app!' });
      }
    });
  } else {
    res.status(204).json({ message: 'Goodbye, you are logged out' });
  }
});

module.exports = router;
