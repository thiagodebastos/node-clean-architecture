class UniqueConstraintError extends Error {
  constructor(value) {
    super(`${value} must be unique.`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UniqueConstraintError);
    }
  }
}

class RequiredParameterError extends Error {
  constructor(param) {
    super(`${param} can not be null or undefined.`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequiredParameterError);
    }
  }
}

class InvalidPropertyError extends Error {
  constructor(msg) {
    super(msg);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidPropertyError);
    }
  }
}

module.exports = {
  RequiredParameterError,
  InvalidPropertyError,
  UniqueConstraintError
};
