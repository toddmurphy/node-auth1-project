const bcrypt = require('bcryptjs');

const Users = require('../users/userModel');

module.exports = (req, res, next) => {
  //use session information to restrict access
  console.log(req.session);
  if (req.session && req.session.loggedIn) {
    next();
  } else {
    res.status(401).json({ message: 'You shall not pass!' });
  }
};
