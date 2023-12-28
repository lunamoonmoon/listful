const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8001
const { searchBooks } = require('./src/routes/searchBooks.js');
const booksRouter = require("./src/routes/books.js")

app.use(cors());

// helps retrieve env var from .env file
require('dotenv').config();

app.use('/', booksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
