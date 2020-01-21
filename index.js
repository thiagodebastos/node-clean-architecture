const express = require("express");
const helmet = require("helmet");

const { contactsEndpointHandler } = require("./contacts");
const { adaptRequest } = require("./helpers/adapt-request");
const { config } = require("./config");

require("dotenv").config();

const app = express();
const PORT = config.port;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

// routes
app.all("/contacts", contactsController);
app.get("/contacts/:id", contactsController);

// controllers
/**
 *
 * @param {import("@types/express").Request} req
 * @param {import("@types/express").Response} res
 */
function contactsController(req, res) {
  const httpRequest = adaptRequest(req);
  contactsEndpointHandler(httpRequest)
    .then(({ headers, statusCode, data }) =>
      res
        .set(headers)
        .status(statusCode)
        .send(data)
    )
    .catch(error => {
      console.log(error);
      res.status(500).end();
    });
}

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
