const express = require("express");
const router = require("express").Router();
const { query } = require("express");
const db = require("../database/index.js");
router.use(express.json());

//GET ROUTES

//get all books
router.get("/", (req, res) => {

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

//books by user///
//HOLD UP, WE DON'T HAVE BOOKS ASSOCIATED WITH A SPECIFIC USER IN THE TABLES

router.get("/user/:id", (req, res) => {

  
  //I think this will need to be changed to req.body?
  console.log("id: ", req.query.id)
  const id = req.query.id;
  // const id = req.params.id
  const getBooksByUser = (id) => {

    values = [id];
    const queryString = `SELECT * FROM books WHERE id = $1`;

    db.query(queryString, values)
      .then(({ rows }) => {
        console.log(rows);
        res.json(rows);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      });

  };

  getBooksByUser(id);


});


//returning as raw JSON for resting purposes, see commented
//possible make it a general object pass to the param

//   //with assistance from lary AI bot
router.get("/author", (req, res) => {
  const authorName = req.query.author;
  // const authorName = req.body.author; // Get the author's name from the query string
  //const authorName = 'Joseph Heller' // this line for testing only, comment out and uncomment out above line

  const getBookByAuthor = (authorName) => {
    const queryString = `SELECT * FROM books WHERE author = $1`;
    //logs for testing purposes, delete for production
    console.log('QueryString:', queryString);
    console.log('AuthorName:', authorName);
    console.log('getBooksByAuthorName triggering');
    return db.query(queryString, [authorName]) // Pass author as a parameter to the query
      .then(({ rows }) => {
        console.log(rows);
        res.json(rows);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  getBookByAuthor(authorName);
});

//name is the title of the book
//tested manually and with postman - Jeremy
router.get("/name", (req, res) => {
  const name = req.query.name;
  // const name = "Twilight"

  const getBookByTitle = (name) => {
    const queryString = `SELECT * FROM books WHERE name =$1`;
    console.log('QueryString:', queryString);
    return db.query(queryString, [name])
      .then(({ rows }) => {
        console.log(rows);
        res.json(rows);
        // return data.rows[0]
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      });

  };

  getBookByTitle(name);
});

//POST ROUTES

//Tested with postman Jan 8th, and working (need to re-test as we altered the server.js file)
router.post("/insert", (req, res) => {

  //set to req.query for testing, but probalby needs to be req.body 
  const newBookObject = req.query; //unclear if this should be req.query or req.body
  console.log("request object", req);
  console.log("req query", req.query);

  const insertNewBook = (newBookObject) => {
    const queryString = `INSERT INTO books (name, author, rating, ownership, book_cover_link, notes)
   VALUES ($1, $2, $3, $4, $5, $6)`;

    const values = [
      newBookObject.NAME,
      newBookObject.AUTHOR,
      newBookObject.RATING,
      newBookObject.OWNERSHIP,
      newBookObject.BOOK_COVER_LINK,
      newBookObject.NOTES


    ];

    db.query(queryString, values)
      .then(() => {
        console.log('Book inserted successfully');
        res.json({ success: true });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal server error" });
      });
  };

  insertNewBook(newBookObject);
});




//do we need to export these functions? I think so...- Jeremy
module.exports = router;
