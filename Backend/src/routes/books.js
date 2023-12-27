const router = require("express").Router();
const { query } = require("express");
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

  //returning as raw JSON for resting purposes, see commented
  //possible make it a general object pass to the param

  //with assistance from lary AI bot
  router.get("/books/author", (req, res) => {
    const authorName = req.body.author; // Get the author's name from the query string
    getBookByAuthor(authorName);
  });
  
  const getBookByAuthor = (authorName) => {
    const queryString = `SELECT * FROM books WHERE author = $1`;
    return db.query(queryString, [author]) // Pass author as a parameter to the query
    .then(({ rows }) => {
      console.log(rows);
      res.json(rows);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
  }

  
  router.get("/books/title", (req, res) => {
    const bookTitle = req.body.title
  })
  //returning as raw JSON for testing purposes, see commented
  const getBookByTitle = (title) => {
    const queryString = `SELECT * FROM books WHERE title =$1`
    return db.query(queryString, [title])
    .then(({ rows }) => {
      console.log(rows);
      res.json(rows);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });

  }

  //returning as raw JSON for testing purposes
  router.get("/books:", (req, res) => {
    const userID = req.body.userID //I don't konw if this is right, but it's what Larry AI recommended
  })
  const getBooksByUser = (userID) => {
    const queryString = `SELECT * FROM books WHERE users.id = $1`
    return db.query(queryString, [userID])
    .then(({ rows }) => {
      console.log(rows);
      res.json(rows);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
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
