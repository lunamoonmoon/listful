const express = require("express");
const router = require("express").Router();
const { query } = require("express");
const db = require("../database/index.js");
router.use(express.json()); 


//RETRIEVE ACCOUNT INFO (GET)

//get specific user info
router.get("/:id", (req, res) => {

  const user = req.query.id;

  const getUserInfo = (user) => {
    const queryString = `SELECT * FROM users WHERE id = $1`;

    return db.query(querySTring, [id])
      .then(({ rows }) => {
        console.log(rows);
        res.json(rows);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      });
  };


});

//POST REQUESTS

//create user




// const getBookByAuthor = (authorName) => {
//   const queryString = `SELECT * FROM books WHERE author = $1`;
//   //logs for testing purposes, delete for production
//   console.log('QueryString:', queryString);
//   console.log('AuthorName:', authorName);
//   console.log('getBooksByAuthorName triggering')
//   return db.query(queryString, [authorName]) // Pass author as a parameter to the query
//   .then(({ rows }) => {
//     console.log(rows);
//     res.json(rows);
//   })
//   .catch(error => {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   });
// }

// getBookByAuthor(authorName);
// });

module.exports = router

