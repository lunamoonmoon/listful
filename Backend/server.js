const express = require('express');
const app = express();
const PORT = process.env.PORT || 8001
const { searchBooks } = require('./src/routes/searchBooks.js');

const booksRouter = require("./src/routes/books.js")
const listsRouter = require('./src/routes/lists');
const usersRouter = require('./src/routes/users');
// const { searchBooks } = require('./googleBooksApi'); // Adjust the path accordingly

// helps retrieve env var from .env file
require('dotenv').config();

app.use('/books', booksRouter);
app.use('/lists', listsRouter);
app.use('/users', usersRouter);

// app.get('/search-books', async (req, res) => {
//   try {
//     const results = await searchBooks(query);
//     res.json(results);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// create a GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });
