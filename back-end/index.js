const express = require("express");
const PORT = 2000;
const server = express();
const db = require("./models");
const bearerToken = require("express-bearer-token");
const cors = require("cors");
require("dotenv").config()

server.use(express.json());
server.use(cors());
server.use(bearerToken());
server.use(express.static("./Public"))

const { user } = require("./routers");
server.use("/users", user);

server.listen(PORT, () => {
  // db.sequelize.sync({alter: true})
  console.log(`Success running at PORT: ${PORT}`);
});
