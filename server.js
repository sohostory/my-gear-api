const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
require("dotenv").config();

const { Sequelize } = require("sequelize");
const { CONNECTION_STRING, SALT_ROUNDS, DB_CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(DB_CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const seed = require("./controllers/seed.js");
const signin = require("./controllers/sign-in.js");
const register = require("./controllers/register.js");
const account = require("./controllers/account.js");
const dashboard = require("./controllers/dashboard.js");
const equipment = require("./controllers/equipment.js");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Seed DB
app.post("/seed", (req, res) => seed.handleSeed(req, res, sequelize, bcrypt));

// Routes
app.post("/api/signin", (req, res) =>
  signin.handleSignin(req, res, sequelize, bcrypt)
);
app.post("/api/register", (req, res) =>
  register.handleRegister(req, res, sequelize, bcrypt)
);

// Account
app.get("/api/user/:id", (req, res) =>
  account.getAccount(req, res, sequelize, bcrypt)
);

app.put("/api/user/update", (req, res) =>
  account.updateAccount(req, res, sequelize, bcrypt)
);

// DB Query
app.get("/api/equipment/user/:id", (req, res) =>
  dashboard.getData(req, res, sequelize)
);

app.get("/api/select-data/:id/:table", (req, res) =>
  dashboard.getSelectData(req, res, sequelize)
);

app.post("/api/select-data/:id/:table", (req, res) =>
  dashboard.addSelectData(req, res, sequelize)
);

// Equipment
app.get("/api/equipment/serial/:serial", (req, res) =>
  equipment.getEquipment(req, res, sequelize)
);

app.post("/api/add-equipment", (req, res) =>
  equipment.addEquipment(req, res, sequelize)
);

app.put("/api/equipment/serial/:serial", (req, res) =>
  equipment.editEquipment(req, res, sequelize)
);

app.delete("/api/delete-equipment/serial/:serial_number", (req, res) =>
  equipment.deleteEquipment(req, res, sequelize)
);

// Start server
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
