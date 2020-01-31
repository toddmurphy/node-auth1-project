const express = require('express');
const Users = require('../users/userModel');
const restricted = require('../api/restricted-middleware');

const router = express.Router();

//get seed data --> /api/users -->
//If the user is logged in, respond with an array of all the users contained in the database.
//If the user is not logged in repond with the correct status code and the message: 'You shall not pass!'.
router.get('/', restricted, (req, res) => {
  // const { username } = req.headers;
  // console.log('userRouter username',username);

  Users.getUsers()
    .then(user => {
      //If the user is logged in, respond with an array of all the users contained in the database.
      res.status(200).json(user);
    })
    .catch(error => {
      console.log('inside authRouter error', error);
      res.status(500).json({ message: 'Sorry, no users returned from server', error });
    });
});

module.exports = router;
