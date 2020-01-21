/**
 * @param {import('knex')} knex
 */
exports.up = function(knex) {
  return knex.schema.createTable("user", tbl => {
    tbl.increments("id").primary();
    tbl.text("first_name", 30);
    tbl.text("last_name", 30);
    tbl.text("email", 30).notNullable();
    tbl.text("password", 30).notNullable();
  });
};

/**
 * @param {import('knex')} knex
 */
exports.down = function(knex) {
  return knex.schema.dropSchemaIfExists("user");
};
