exports.up = function(knex) {
  return knex.schema.createTable('username_password', tbl => {
    tbl.increments();

    tbl
      .string('username', 255)
      .notNullable()
      .unique();

    tbl.string('password', 255).notNullable();

    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('username_password');
};
