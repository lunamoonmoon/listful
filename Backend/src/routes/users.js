const express = require("express");
const router = require("express").Router();
const { query } = require("express");
const db = require("../database/index.js");
router.use(express.json());


//RETRIEVE ACCOUNT INFO (GET)

//note if you create a get all users, do it beneath this ones or it will that route before it gets to the id one

//get specific user info
//tested Jan 13th
router.get("/:id", (req, res) => {

  const user_id = req.params.id;


  const getUserInfo = (user_id) => {
    const queryString = `SELECT * FROM users WHERE id = $1`;

    db.query(queryString, [user_id])
      .then(({ rows }) => {
        console.log(rows);
        res.json(rows);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  getUserInfo(user_id);


});

//POST REQUESTS

//create user


router.post("/create", (req, res) => {

  const values = [
    req.body.username,
    req.body.password,
    req.body.email
  ];

  //TESTED Jan 13th...but I had a weird error where it auto incrementing from 1 instead of 4 (pre-seeded 1-3)
  //it only worked on the 4th attempt. 
  const createNewUser = (values) => {
    const queryString = `INSERT INTO users (username, password, email)
  VALUES ($1, $2, $3)`;

    db.query(queryString, values)
      .then(() => {
        console.log('User created successfully');
        res.json({ success: true });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal server error" });
      });

  };

  createNewUser(values);

});





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

