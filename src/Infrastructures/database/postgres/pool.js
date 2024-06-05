/* istanbul ignore file */
const { Pool } = require("pg");

const config = {
  host: process.env.PGHOST,
  post: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
};

const pool = new Pool(config);

module.exports = pool;
