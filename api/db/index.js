const { Sequelize, DataTypes } = require("sequelize");
const { Client } = require('pg');
// const { Sequelize } = require('sequelize');

const conn = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432
});

// Conectar a la base de datos
conn.connect();

// Configurar Sequelize con el cliente de PostgreSQL
const sequelize = new Sequelize({
  dialect: 'postgres',
  dialectModule: require('pg'),
  dialectOptions: {
    client: conn
  }
});

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: "postgres",
//   }
// );

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../security/models/userModel")(sequelize, DataTypes);

module.exports = db;
