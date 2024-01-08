require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./api/db/index");

const app = express();
const port = 3006;

app.use(bodyParser.json());

// CORS
app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Init Sequelize
db.sequelize.sync().then(() => {
  console.log("Database sync. Running server...");

  app.listen(port, () => {
    console.log(`Server run on http://localhost:${port}`);
  });
});
