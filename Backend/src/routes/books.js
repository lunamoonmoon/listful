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

  //getAllBooks();

  //returning as raw JSON for resting purposes, see commented
  //possible make it a general object pass to the param
  const getBookByAuthor = (author) => {
    return db.query(`SELECT from books
    WHERE author = books.author`)
    .then(({ rows }) => {
      console.log(rows);
      res.json(rows);
    });

  }

  //returning as raw JSON for testing purposes, see commented
  const getBookByTitle = (title) => {
    return db.query(`SELECT from books 
    WHERE author = books.title`)
    .then(({ rows }) => {
      console.log(rows);
      res.json(rows);
    });

  }

  //returning as raw JSON for testing purposes
  const getBooksByUser = (userID) => {
    return db.query(`SELECT from books 
    WHERE id = books.id`)
    .then(({ rows }) => {
      console.log(rows);
      res.json(rows);
    });

  }

  

  // const getBookByAuthor = () => {
  //   return db.query(`SELECT from books
  //   WHERE author = books.author`)
  //     .then(data => {
  //       return data.rows
  //     });

  // }

  // const getPinsByMapId = (id) => {
  //   //is this a pool query?
  //   return db.query(`SELECT * FROM locations
  //   WHERE id = locations.id`, [])
  //     .then(data => {
  //       return data.rows;
  //     });
  // };



  postBook = () => {

  }


});


//do we need to export these functions? I think so...- Jeremy
  module.exports = router;
