const express = require('express');
const Users = require('../users/userModel');

const router = express.Router();

//get --> /api/users -->
router.get('/', (req, res) => {
  //ad here
});

//post --> /api/register -->creates a user
router.post('/register', (req, res) => {});

//post --> /api/login
router.post('/login', (req, res) => {});

module.exports = router;
