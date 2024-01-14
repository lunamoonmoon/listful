//console.log("Starting database connection setup...");
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
// db
//   .connect()
//   .then(() => {
//     console.log('Successful connection!');
//     // A simple query to test the database connection right here
//     // return db.query('SELECT * FROM books LIMIT 1;');
//   })
//   .then(res => console.log('Test query result:', res.rows))
//   .catch(e => console.error('Error during test query:', e));

  db
  .connect()
  .then(client => {
    console.log('Successful connection!');
    // A simple query to test the database connection right here
    return client.query('SELECT * FROM books LIMIT 1;').then(result => {
      console.log('Test query result:', result.rows);
      client.release(); // Release the client back to the pool
    });
  })
  .catch(e => console.error('Error during test query:', e));

//console.log("Logging the dbparams:", dbParams);

module.exports = db;