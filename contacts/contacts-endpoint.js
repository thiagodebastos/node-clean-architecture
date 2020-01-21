const { RequiredParameterError } = require("../helpers/errors");
// const { makeContact } = require("./contact");

/**
 * Takes an instance of the database specific for contactList
 * @param {Object} obj
 * @param {Object} obj.contactList - an instance of the database returning contacts
 * @param {function} obj.contactList.getItems - returns items from db adaptor(?)
 */
function makeContactsEndpointHandler({ contactList }) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case "GET":
        return getContacts(httpRequest);
      case "POST":
        break;

      default:
        break;
    }
  };

  async function getContacts(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    const { email } = httpRequest.queryParams || {};

    let result;

    if (email) {
      result = await contactList.findByEmail({ email });
    } else if (id) {
      result = await contactList.findById({ id });
    } else {
      result = await contactList.getItems();
    }

    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: JSON.stringify(result)
    };
  }
}

module.exports = {
  makeContactsEndpointHandler
};
