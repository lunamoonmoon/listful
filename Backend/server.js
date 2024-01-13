const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8001
const { searchBooks } = require('./src/routes/searchBooks.js');

const searchRouter = require('./src/routes/searchRouter.js');
const booksRouter = require("./src/routes/books.js")
const librariesRouter = require('./src/routes/libraries.js');
const usersRouter = require('./src/routes/users.js');

// const { searchBooks } = require('./googleBooksApi'); // Adjust the path accordingly

app.use(cors({ origin: 'http://localhost:3000' }));

// helps retrieve env var from .env file
require('dotenv').config();

app.use('/books', booksRouter);
app.use('/libraries', librariesRouter);
app.use('/users', usersRouter);
// app.use('/', booksRouter);
app.use('/search', searchRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
