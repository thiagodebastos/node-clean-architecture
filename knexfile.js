const { config } = require("./config");
const { databaseURL } = config;

const knexConfig = Object.freeze({
  development: {
    client: "pg",
    connection: databaseURL,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: { directory: "./data/seeds" }
  },

  testing: {
    client: "pg",
    connection: databaseURL,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: { directory: "./data/seeds" }
  },

  production: {
    client: "pg",
    connection: databaseURL,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: { directory: "./data/seeds" }
  }
});

module.exports = knexConfig;
