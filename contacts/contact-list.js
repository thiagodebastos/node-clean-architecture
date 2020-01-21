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

  /**
   * Use the database to find a result by id
   * @param {Object} param
   * @param {string|number} param.id
   */
  async function findById({ id }) {
    const db = database;
    const contact = await db("contacts").where({ id });
    return contact;
  }

  /**
   * Use the database to find a result by email
   * @param {Object} param
   * @param {string} param.email
   */
  async function findByEmail({ email }) {
    const db = await database;
    const contact = await db("contacts").where({ email });
    return contact;
  }

  async function update() {}

  return Object.freeze({ add, findByEmail, findById, getItems, update });
}

module.exports = { makeContactList };
