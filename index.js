const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const { contactsEndpointHandler } = require("./contacts");
const { adaptRequest } = require("./helpers/adapt-request");
const { config } = require("./config");

require("dotenv").config();

const PORT = config.port;

const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3001" })); // TODO: set origin depending on process.env.NODE_ENV
app.use(helmet());

// routes
app.all("/contacts", contactsController);
app.get("/contacts/:id", contactsController);
app.delete("/contacts/:id", contactsController);

// controllers
/**
 * Contacts Controller
 * Keep business logic out of here
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
