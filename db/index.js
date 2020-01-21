const knex = require("knex");

const { knexConfig } = require("../knexfile");

const env = process.env.NODE_ENV;

const configOptions = knexConfig[env];

module.exports = { makeDb: () => knex(configOptions) };
