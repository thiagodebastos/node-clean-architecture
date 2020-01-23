const {
  RequiredParameterError,
  UniqueConstraintError,
  InvalidPropertyError
} = require("../helpers/errors");
const { makeContact } = require("./contact");
const { makeHttpError } = require("../helpers/http-error");

// TODO: update param  makeContactsEndpointHandler descriptions
/**
 * Factory function that creates a function that can handle an HTTP request.
 * This is so one can inject a contactList used to manipulate contacts in the database.
 * This should be independent of any framework.
 * @NOTE: RORO pattern: https://www.freecodecamp.org/news/elegant-patterns-in-modern-javascript-roro-be01e7669cbd/
 * @NOTE: Ice Factory pattern: https://www.freecodecamp.org/news/elegant-patterns-in-modern-javascript-ice-factory-4161859a0eee/
 * @param {Object} obj
 * @param {Object} obj.contactList - an instance of the database returning contacts
 * @param {function} obj.contactList.getItems - returns items from db adaptor(?)
 * @param {function} obj.contactList.findById - returns items from db adaptor(?)
 * @param {function} obj.contactList.findByEmail - returns items from db adaptor(?)
 * @param {function} obj.contactList.add - returns items from db adaptor(?)
 * @param {function} obj.contactList.remove - returns items from db adaptor(?)
 * @param {function} obj.contactList.update - returns items from db adaptor(?)
 */
function makeContactsEndpointHandler({ contactList }) {
  return async function handle(httpRequest) {
    switch (httpRequest.method) {
      case "GET":
        return getContacts(httpRequest);
      case "POST":
        return postContact(httpRequest);
      case "DELETE":
        return removeContact(httpRequest);
      case "PATCH":
        return updateContact(httpRequest);

      default:
        return makeHttpError({
          statusCode: 405,
          errorMessage: `${httpRequest.method} method not allowed.`
        });
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

  async function postContact(httpRequest) {
    let contactInfo = httpRequest.body;
    if (!contactInfo) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: "Bad request. No POST body."
      });
    }
    // if req.body is string, try to parse string as JSON
    if (typeof httpRequest.body === "string") {
      try {
        contactInfo = JSON.parse(contactInfo);
      } catch {
        return makeHttpError({
          statusCode: 400,
          errorMessage: "Bad request. POST body must be valid JSON."
        });
      }
    }

    try {
      // pass to contact factory which handles contact business logic
      const contact = makeContact(contactInfo);
      // pass transformed contact object to contactList repository
      const result = await contactList.add({ contact });
      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: 201, // Created https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
        data: JSON.stringify(result)
      };
    } catch (error) {
      return makeHttpError({
        errorMessage: error.message,
        statusCode:
          error instanceof UniqueConstraintError
            ? 409 // Conflict https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
            : error instanceof InvalidPropertyError ||
              error instanceof RequiredParameterError
            ? 400 // Bad Request https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
            : 500 // Internal Server Error https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500
      });
    }
  }

  async function removeContact(httpRequest) {
    const { id } = httpRequest.pathParams || {};
    let result;
    try {
      result = await contactList.remove({ id });

      if (result === 0) {
        throw new InvalidPropertyError(`Contact with id ${id} does not exist.`);
      }

      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: 200,
        data: JSON.stringify(result)
      };
    } catch (error) {
      return makeHttpError({
        errorMessage: error.message,
        statusCode:
          error instanceof UniqueConstraintError
            ? 409 // Conflict https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
            : error instanceof InvalidPropertyError ||
              error instanceof RequiredParameterError
            ? 400 // Bad Request https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
            : 500 // Internal Server Error https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500
      });
    }
  }

  async function updateContact(httpRequest) {
    const contact = httpRequest.body;

    try {
      const result = await contactList.update({ contact });
      return {
        headers: {
          "Content-Type": "application/json"
        },
        statusCode: 200,
        data: JSON.stringify(result)
      };
    } catch (error) {
      return makeHttpError({
        errorMessage: error.message,
        statusCode:
          error instanceof UniqueConstraintError
            ? 409 // Conflict https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
            : error instanceof InvalidPropertyError ||
              error instanceof RequiredParameterError
            ? 400 // Bad Request https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
            : 500 // Internal Server Error https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/500
      });
    }
  }
}

module.exports = {
  makeContactsEndpointHandler
};
