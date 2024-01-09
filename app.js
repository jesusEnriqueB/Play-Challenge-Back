require("dotenv").config();
const routes = require("./api/routes");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./api/db/index");
const cors = require("cors");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3006;

app.use(bodyParser.json());

// CORS
app.use(cors())
app.all("/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Playload API',
      version: '1.0.0',
      description: 'API DOC',
    },
  },
  apis: ['./api/security/routes/*.js'], // Rutas de tu aplicación
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

routes.inscribeRoutes(app);

// Init Sequelize
db.sequelize.sync().then(() => {
  console.log("Database sync. Running server...");

  app.listen(port, () => {
    console.log(`Server run on http://localhost:${port}`);
  });
});

module.exports = app;
