const express = require('express');
const app = express();
const PORT = process.env.PORT || 8001
const ENV = require("./environment");
const { searchBooks } = require('./googleBooksApi'); // Adjust the path accordingly

// const PORT = process.env.PORT || 8001;
require('dotenv').config();
const db = require('./database/index')

app.get('/search-books', async (req, res) => {
  try {
    const query = req.query.q;
    const results = await searchBooks(query);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const server = require('http').createServer(app);

// This displays message that the server running and listening to specified port
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// create a GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });
