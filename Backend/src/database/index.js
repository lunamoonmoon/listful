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

// Testing the database connection
db.connect()
  .then(client => {
    console.log('Successful connection!');
    // A simple query to test the database connection right here
    return client.query('SELECT * FROM books LIMIT 1;')
      .then(result => {
        console.log('Test query result:', result.rows);
        client.release(); // Release the client back to the pool
      })
      .catch(e => {
        console.error('Error during test query:', e);
        client.release(); // Ensure the client is released in case of an error
      });
  })
  .catch(e => console.error('Error connecting to the database:', e));

module.exports = db;
