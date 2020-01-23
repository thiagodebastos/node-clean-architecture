const {
  UniqueConstraintError,
  RequiredParameterError,
  InvalidPropertyError
} = require("../helpers/errors");
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
    const db = database;
    const contact = await db("contacts").where({ email });
    return contact;
  }

  async function add({ contact }) {
    const db = database;
    const id = await db("contacts")
      .insert({ ...contact })
      .returning("id")
      .then(([id]) => id)
      .catch(error => {
        // TODO: review knex-specific error-code
        if (error.code === "23505") {
          throw new UniqueConstraintError(error);
        }
        // TODO: review knex-specific error-code
        if (error.code === "42703") {
          throw new InvalidPropertyError(error.message);
        }
        return error;
      });

    const result = await findById({ id });

    return result;
  }

  async function remove({ id }) {
    const db = database;
    const contactToDelete = await db("contacts")
      .del()
      .where({ id });

    return contactToDelete;
  }

  async function update({ contact }) {
    const db = database;

    const { id, ...updatedContactInfo } = contact;

    if (!id) {
      throw new RequiredParameterError("id");
    }

    const query = await db("contacts")
      .where({ id })
      .update({ ...updatedContactInfo }, ["id"])
      .catch(error => {
        // TODO: review knex-specific error-code
        if (error.code === "23505") {
          throw new UniqueConstraintError(error);
        }
        // TODO: review knex-specific error-code
        if (error.code === "42703") {
          throw new InvalidPropertyError(error.message);
        }
        return error;
      });

    if (query.length === 0) {
      throw new InvalidPropertyError(`Contact with id ${id} does not exist`);
    }

    return query;
  }
}

module.exports = { makeContactList };
