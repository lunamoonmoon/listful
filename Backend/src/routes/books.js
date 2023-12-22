const router = require("express").Router();
const db = require("../database/index.js");

router.get("/books", (req, res) => {

    //A get request to retreive information about books from a database
    //Table BOOKS (ID, LIBRARY_ID, NAME, AUTHOR, RATING, NOTES, OWNERSHIP)

  const getAllBooks = () => {
    return db
      .query(`
        SELECT *
        FROM books;
        `)
      .then(({ rows }) => {
        console.log(rows);
        res.json(rows);
      });
  };

  getAllBooks();
});

  module.exports = router;
