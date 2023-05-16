const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
require("dotenv").config();

const { Sequelize } = require("sequelize");
const { CONNECTION_STRING, SALT_ROUNDS } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING);

const seed = require("./controllers/seed.js");
const signin = require("./controllers/sign-in.js");
const register = require("./controllers/register.js");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// // Test DB
// sequelize.authenticate();

// Seed DB
app.post("/seed", (req, res) => seed.handleSeed(req, res, sequelize));

// Routes
app.post("/signin", (req, res) =>
  signin.handleSignin(req, res, sequelize, bcrypt)
);
app.post("/register", (req, res) =>
  register.handleRegister(req, res, sequelize, bcrypt)
);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});