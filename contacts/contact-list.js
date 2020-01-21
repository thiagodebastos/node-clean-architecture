/**
 * Encapsulate interactions with the database
 */

const { makeContact } = require("./contact");
const { requiredParam } = require("../helpers/required-param");

/**
 * makeContactList allows for injection of a database object
 * @param {Object} obj
 * @param {import('knex')} obj.database - The  object
 */
function makeContactList({ database }) {
  async function getItems() {
    const db = database;
    const contacts = await db("contacts");
    return await contacts;
  }
  async function add() {}
  async function findById() {}
  async function findByEmail() {}
  async function update() {}

  return Object.freeze({ add, findByEmail, findById, getItems, update });
}

module.exports = { makeContactList };
