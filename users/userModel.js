const db = require('../data/dbConfig');

module.exports = {
  getUsers,
  getUserByID,
  addUser
};

//get users
function getUsers() {
  return db('username_password');
}

//findBy
// function findBy(filter)

//getUserByID --> get single user
function getUserByID(id) {
  return db('username_password')
    .where('id', id)
    .first();
}

//addUser --> create a new user
function addUser(user) {
  return db('username_password')
    .insert(user, 'id')
    .then(ids => {
      return getUserByID(ids[0]);
    });
}
