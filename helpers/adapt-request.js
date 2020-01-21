// Express will send messages via http.
// The responsibility of our app is to then interpret these messages and
// formulate responses

// Capture data from Express request to be processed by this application

/**
 *
 * @param {import('express').Request} req - Express Request object
 */
function adaptRequest(req) {
  return Object.freeze({
    path: req.path,
    method: req.method,
    pathParams: req.params,
    queryParams: req.params,
    body: req.body
  });
}

module.exports = { adaptRequest };
