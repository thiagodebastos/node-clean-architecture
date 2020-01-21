const { makeDb } = require("../db");
const { makeContactList } = require("./contact-list");
const { makeContactsEndpointHandler } = require("./contacts-endpoint");

const database = makeDb();
const contactList = makeContactList({ database });
const contactsEndpointHandler = makeContactsEndpointHandler({ contactList });

module.exports = { contactsEndpointHandler };
