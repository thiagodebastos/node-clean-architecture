const RequiredParameterError = require("./errors").RequiredParameterError;

function requiredParam(param) {
  throw new RequiredParameterError(param);
}

module.exports = { requiredParam };
