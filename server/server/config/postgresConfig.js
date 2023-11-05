const { Pool, Client } = require("pg");
const secrets = require('../../secrets');

const password = secrets.read('/run/secrets/POSTGRES_PASSWORD')
console.log(password)
const postgres = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  password: password,
  port: "5432"
});

module.exports = postgres;
