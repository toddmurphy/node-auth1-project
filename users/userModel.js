const db = require('../data/dbConfig');

module.exports = {
  getUsers,
  getUserByID,
  addUser,
  findBy
};

//get users
function getUsers() {
  return db('username_password');
}

//findBy
function findBy(user) {
  return db('username_password')
    .select('id', 'username', 'password')
    .where('username', user)
    .first();
}

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
      console.log(ids);
      return getUserByID(ids[0]);
    });
}
