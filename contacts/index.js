const { makeDb } = require("../db");
const { makeContactList } = require("./contact-list");
const { makeContactsEndpointHandler } = require("./contacts-endpoint");

const database = makeDb(); // in this case, postgres via knex
const contactList = makeContactList({ database }); // @NOTE Easy to inject a mock database for testing
const contactsEndpointHandler = makeContactsEndpointHandler({ contactList });

module.exports = { contactsEndpointHandler };
