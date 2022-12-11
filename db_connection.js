const { Pool, Client } = require("pg");

const pool = new Pool({
    user: "",
    host: "127.0.0.1",
    database: "daria",
    password: null,
    port: 5432,
  });

  module.exports = pool;