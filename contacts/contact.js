const { requiredParam } = require("../helpers/required-param");
const { isValidEmail } = require("../helpers/is-valid-email");
const { upperFirst } = require("../helpers/upper-first");

/**
 * Business rules about a contact.
 * This keeps handling contact-related logic decoupled from specific databases
 * or drivers.
 * @param {Object} contactInfo
 * @param {string} contactInfo.first_name
 * @param {string} contactInfo.last_name
 * @param {string} contactInfo.email
 * @param {Object} contactInfo.otherInfo
 */
function makeContact(contactInfo) {
  const validContact = validate(contactInfo);
  const normalisedContact = normalise(validContact);

  return Object.freeze(normalisedContact);

  function validate({
    first_name = requiredParam("first_name"),
    last_name = requiredParam("last_name"),
    email = requiredParam("email"),
    ...otherInfo
  } = {}) {
    validateName("first", first_name);
    validateName("last", last_name);
    validateEmail(email);

    return { first_name, last_name, email, ...otherInfo };
  }

  function validateName(label, name) {
    if (name.length < 2) {
      throw new InvalidPropertyError(
        `A contact's ${label} name must be at least 2 characters long.`
      );
    }
  }

  function validateEmail(email) {
    if (!isValidEmail(email)) {
      throw new InvalidPropertyError("Invalid contact email address.");
    }
  }

  function normalise({ email, first_name, last_name, ...otherInfo }) {
    return {
      ...otherInfo,
      first_name: upperFirst(first_name),
      last_name: upperFirst(last_name),
      email: email.toLowerCase()
    };
  }
}
module.exports = { makeContact };
