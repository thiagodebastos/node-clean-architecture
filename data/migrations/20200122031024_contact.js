/**
 * @param {import('knex')} knex
 */
exports.up = function(knex) {
  return knex.schema
    .dropTableIfExists("contacts")
    .createTable("contacts", tbl => {
      tbl.increments().primary();
      tbl.text("first_name", 30);
      tbl.text("last_name", 30);
      tbl
        .text("email", 30)
        .unique()
        .notNullable();
    });
};

/**
 * @param {import('knex')} knex
 */
exports.down = function(knex) {
  return knex.schema.dropSchemaIfExists("contacts");
};
