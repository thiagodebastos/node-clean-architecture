function makeContact(contactInfo) {
  const validContact = validate(contactInfo);

  return Object.freeze(validContact);

  function validate({ firstName, lastName, emailAddress, ...otherInfo }) {
    return { firstName, lastName, emailAddress, ...otherInfo };
  }
}
module.exports = { makeContact };
