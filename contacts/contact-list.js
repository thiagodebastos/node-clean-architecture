/**
 * Encapsulates interactions with the database
 * Implementation of the repository pattern
 * @param {Object} obj
 * @param {import('knex')} obj.database - An injectible object representing the database
 */
function makeContactList({ database }) {
  return Object.freeze({
    add,
    findByEmail,
    findById,
    getItems,
    update
  });

  async function getItems() {
    const db = database;
    const contacts = await db("contacts");
    return contacts;
  }

  async function findById({ id }) {
    const db = database;
    const contact = await db("contacts").where({ id });
    return contact;
  }

  async function findByEmail({ email }) {
    const db = await database;
    const contact = await db("contacts").where({ email });
    return contact;
  }

  async function add({ contact }) {
    const db = await database;
    const id = await db("contacts")
      .insert({ ...contact })
      .returning("id")
      .then(([id]) => id);

    const result = await findById({ id });

    return result;
  }

  async function remove() {}
  async function update() {}
}

module.exports = { makeContactList };
