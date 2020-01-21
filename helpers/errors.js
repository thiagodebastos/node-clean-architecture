class RequiredParameterError extends Error {
  constructor(param) {
    super(`${param} can not be null or undefined.`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequiredParameterError);
    }
  }
}

module.exports = { RequiredParameterError };
