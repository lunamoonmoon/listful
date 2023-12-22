const { Pool } = require("pg");
require('dotenv').config();

const dbParams = {
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
};

const db = new Pool(dbParams);

db
  .connect()
  .then(() => console.log('Successful connection!'))
  .catch(e => console.log(`Error connecting to Postgres server:\n${e}`));

module.exports = db;