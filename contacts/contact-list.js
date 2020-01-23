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
    update,
    remove
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

  async function remove({ id }) {
    const db = await database;
    const contactToDelete = await db("contacts").where({ id });
    if (!contactToDelete) {
      return new Error(`user with id ${id} does not exist`);
    }
    await contactToDelete.del();

    return contactToDelete;
  }

  async function update() {}
}

module.exports = { makeContactList };
