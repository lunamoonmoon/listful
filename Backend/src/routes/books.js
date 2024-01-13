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


// //GET BOOKS BY USER ID
//TESTED AND I THINK IT'S WORKING....JAN 9TH (BUT CURRENTLY RETURNING ALL BOOKS...BUT MAYBE ALL BOOKS ARE ASSOCIATED TO USER ID 1?)
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
// router.get("/author", (req, res) => {
//   const authorName = req.query.author;
//   // const authorName = req.body.author; // Get the author's name from the query string
//   //const authorName = 'Joseph Heller' // this line for testing only, comment out and uncomment out above line

//   const getBookByAuthor = (authorName) => {
//     const queryString = `SELECT * FROM books WHERE author = $1`;
//     //logs for testing purposes, delete for production
//     console.log('QueryString:', queryString);
//     console.log('AuthorName:', authorName);
//     console.log('getBooksByAuthorName triggering');
//     return db.query(queryString, [authorName]) // Pass author as a parameter to the query
//       .then(({ rows }) => {
//         console.log(rows);
//         res.json(rows);
//       })
//       .catch(error => {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//       });
//   };

//   getBookByAuthor(authorName);
// });


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

//As a user, I want to add items to my library,
//Insert new book into library (note this will insert a NEW book entirely...we will need a differnet query to add an existing book in teh books table to a library)
//TESTED JAN 11TH 6:59PM
router.post("/insert", (req, res) => {

  //set to req.query for testing, but probalby needs to be req.body 
  const newBookObject = req.body; //unclear if this should be req.query or req.body
  //console.log("request object", req);
  console.log("req body", req.body);

  console.log("name: ", req.body.name)

  const values = [
    req.body.library_id,
    req.body.name,
    req.body.author,
    req.body.rating,
    req.body.ownership,
    req.body.book_cover_link,
    req.body.notes

  ]

  const insertNewBook = (values) => {
    const queryString = `INSERT INTO books (library_id, name, author, rating, ownership, book_cover_link, notes)
   VALUES ($1, $2, $3, $4, $5, $6, $7)`;


    console.log("VALUES:", values)

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

  insertNewBook(values);
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
    WHERE book_id = $2;`

    const values = [
      book_id, 
      library_id
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

//     const queryString = `INSERT INTO books (library_id, name, author, rating, notes, ownership)
//     VALUES ($1, $2, $3, $4, $5, $6)`;
    
    
//     return db.query(queryString, [library_id, name, author, rating, notes, ownership])
//     .then(({ rows }) => {
//       console.log(rows);
//       res.json(rows);
//     })
//     .catch(error => {
//       console.error(error);
//       res.status(500).json({ error: "Internal server error" });
//     });
//   } 

//   //set to req.query for testing, but probalby needs to be req.body 
//   const newBookObject = req.query; //unclear if this should be req.query or req.body
//   console.log("request object", req);
//   console.log("req query", req.query);

//   const insertNewBook = (newBookObject) => {
//     const queryString = `INSERT INTO books (name, author, rating, ownership, book_cover_link, notes)
//    VALUES ($1, $2, $3, $4, $5, $6)`;

//     const values = [
//       newBookObject.NAME,
//       newBookObject.AUTHOR,
//       newBookObject.RATING,
//       newBookObject.OWNERSHIP,
//       newBookObject.BOOK_COVER_LINK,
//       newBookObject.NOTES


//     ];

//     db.query(queryString, values)
//       .then(() => {
//         console.log('Book inserted successfully');
//         res.json({ success: true });
//       })
//       .catch(error => {
//         console.error(error);
//         res.status(500).json({ success: false, error: "Internal server error" });
//       });
//   };

//   insertNewBook(newBookObject);
// });




//do we need to export these functions? I think so...- Jeremy
module.exports = router;
