require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const { USER, PASSWORD, DATABASE, HOST, DIALECT } = process.env;

module.exports = {
  "development": {
    "username": USER,
    "password": PASSWORD,
    "database": DATABASE,
    "host": HOST,
    "dialect": DIALECT
  },
  "test": {
    "username": USER,
    "password": PASSWORD,
    "database": DATABASE,
    "host": HOST,
    "dialect": DIALECT
  },
  "production": {
    "username": USER,
    "password": PASSWORD,
    "database": DATABASE,
    "host": HOST,
    "dialect": DIALECT
  }
}
