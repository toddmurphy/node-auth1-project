const express = require('express');
const Users = require('../users/userModel');

const router = express.Router();

//get seed data --> /api/users -->
router.get('/', (req, res) => {
  //ad here
  Users.getUsers()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Sorry, no users returned from server', error });
    });
});

module.exports = router;
