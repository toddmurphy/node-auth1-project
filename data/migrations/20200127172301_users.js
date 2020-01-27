exports.up = function(knex) {
  return knex.schema.createTable('username_password', tbl => {
    tbl.increments();

    tbl
      .string('username', 255)
      .notNullable()
      .unique()
      .index()
      .timestamp(true, true);

    tbl
      .string('password', 255)
      .unique()
      .notNullable()
      .timestamp(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('username');
};
