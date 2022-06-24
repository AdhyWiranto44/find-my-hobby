require('dotenv').config();
module.exports = {
  "development": {
    "username": "postgres",
    "password": "12345",
    "database": "findmyhobby_development",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "12345",
    "database": "findmyhobby_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "findmyhobby",
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  }
}
