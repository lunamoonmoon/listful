const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8001
const searchRouter = require('./src/routes/searchRouter.js');
const booksRouter = require("./src/routes/books.js")
const librariesRouter = require('./src/routes/libraries.js');
const usersRouter = require('./src/routes/users.js');

app.use(cors({ origin: 'http://localhost:3000' }));

// helps retrieve env var from .env file
require('dotenv').config();

app.use('/', booksRouter);
app.use('/search', searchRouter);
app.use('/libraries', librariesRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
