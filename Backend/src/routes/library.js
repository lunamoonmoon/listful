const router = require("express").Router();
const { query } = require("express");
const db = require("../database/index.js");


// As a user, I want to easily categorize items/lists in my library
// As a user, I want to be able to filter the library by author/subject/alphabetically/ favourited, etc. 
// Adding items (logged in): 
// As a user, I want to add items to my library, noting whether I own them, want to own them, or plan to read (wishlist)
// As a user, I want to be able to provide additional details for each item
// As a user, I want to be able to click an item to get more information (modal)
// Can move items between lists (stretch)

router.post("/library/create", (req, res) => {

  const createLibrary = (newLibraryObj) => {
  
    const queryString = `INSERT INTO libraries (user_id, public_boolean, library_name)
    VALUES ($1, $2, $3)
    RETURNING *`

    const values = [
      newLibraryObj.user_id, 
      newLibraryObj.public_boolean, 
      newLibraryObj.library_name
    ]

    return db.query(queryString, values)
    .then((data) => {
    return data.rows[0]
    })
    .catch((err) => {
    console.log("create map error message: ", err)
    });

  
  }

  createLibrary(newLibraryObj)
  
})

//JN pull book where library = (and other filters?) 



// router.post("/books/insert", (req, res) => {

//   const insertNewBook = (newBookObject) => {
//   const queryString = `INSERT INTO books (library_id, name, author, rating, notes, ownership)
//    VALUES ($1, $2, $3, $4, $5, $6)`;

//    const values = [
//     newBookObject.library_id,
//     newBookObject.name,
//     newBookObject, author,
//     newBookObject.rating,
//     newBookObject.notes,
//     newBookObject.ownership
//    ]

//    return db.query(queryString, values)

//   }

// })