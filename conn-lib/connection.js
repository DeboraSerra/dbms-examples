const mysql = require("mysql2/promise");
require("dotenv").config();

const { USER, PASSWORD, DATABASE, HOST, PORT } = process.env;

const conn = mysql.createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  port: PORT,
});

module.exports = conn;
