const dotenv = require("dotenv");

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = Object.freeze({
  port: parseInt(process.env.PORT, 10),
  databaseName: process.env.DATABASE_NAME,
  databaseURL: process.env.DATABASE_URL
});

module.exports = { config };
