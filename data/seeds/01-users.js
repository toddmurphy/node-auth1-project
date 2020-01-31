exports.seed = function(knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex('username_password').insert([
    { username: 'Todd', password: 'chico' },
    { username: 'Liam', password: 'bowser' },
    { username: 'Don', password: 'spot' }
  ]);
};
