const mysql = require("mysql2/promise");

const connection = () =>
  mysql.createPool({
    user: "root",
    password: "root",
    database: "sql_store",
    host: "localhost",
    port: 3306,
  });

const conn = connection();
module.exports = conn;
