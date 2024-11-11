const mysql = require("mysql2/promise");

const conn = mysql.createPool({
    user: "root",
    password: "root",
    database: "sql_store",
    host: "localhost",
    port: 3306,
  });

module.exports = conn;
