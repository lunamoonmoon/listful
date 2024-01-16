const axios = require('axios');
const express = require("express");
const cors = require("cors");
const router = require("express").Router();
const db = require("../database/index.js");

router.use(express.json());
// router.use(cors());
router.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

require('dotenv').config();

// ... (rest of your routes)


//GET ROUTES

// //GET BOOKS BY USER ID
//TESTED AND I THINK IT'S WORKING....JAN 9TH (BUT CURRENTLY RETURNING ALL BOOKS...BUT MAYBE ALL BOOKS ARE ASSOCIATED TO USER ID 1?)
//note this is pre-fixed by /books/ via the book router
router.get("/users/:id", (req, res) => {

  console.log("id: ", req.params.id)
  const id = req.params.id;
  // const id = req.params.id
  const getBooksByUser = (id) => {

    values = [id];

    const queryString = `SELECT BOOKS.* FROM USERS 
    JOIN LIBRARIES ON USERS.ID = LIBRARIES.user_id
    JOIN BOOKS ON LIBRARIES.ID = BOOKS.library_id
    WHERE USERS.id = $1`;

    db.query(queryString, values)
      .then(({ rows }) => {
        res.json(rows);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      });

  };

  getBooksByUser(id);


});


// name is the title of the book
// tested manually and with postman - Jeremy
router.get("/:name", (req, res) => {

  console.log("get book by name")
  const name = req.params.name;
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


//insert new routes here, not below get all books or it will error

//get all books
router.get("/", (req, res) => {

  console.log("get all books")

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


//POST ROUTES

//As a user, I want to add items to my library,
//Insert new book into library (note this will insert a NEW book entirely...we will need a differnet query to add an existing book in teh books table to a library)
router.post("/insert", async(req, res) => {
  console.log("server");
  console.log(req.body);
  const { library_id, name, author, rating, ownership, book_cover_link, notes } = req.body;
  const queryString = `INSERT INTO books (library_id, name, author, rating, ownership, book_cover_link, notes) VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  const values = [library_id, name, author, rating, ownership, book_cover_link, notes];
  db.query(queryString, values)
  .then(() => {
    console.log('Book inserted successfully');
    res.json({ success: true });
  })
  .catch(error => {
    console.error(error.stack);
    res.status(500).json({ success: false, error: error.message + "Internal server error" });
  });
});

//ASSIGN BOOK TO LIBRARY (requires you to already have the book_id
//not yet tested
router.post("/assign_library", (req, res) => {
  console.log("req body", req.body)

  const library_id = req.body.library_id;
  const book_id = req.body.book_id;

  const assignBook = (library_id, book_id) => {

    const queryString = `UPDATE books 
    SET library_id = $1
    WHERE id = $2;`

    //this has to be in sequential order it seems
    const values = [
      library_id,
      book_id, 
      
    ]

    db.query(queryString, values)
    .then(() => {
      console.log('Book assigned library successfully');
      res.json({ success: true });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal server error" });
    });

  }

  assignBook(library_id, book_id)

})

module.exports = router;
