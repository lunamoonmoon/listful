const express = require("express");
const router = require("express").Router();
const { query } = require("express");
const db = require("../database/index.js");
router.use(express.json()); 


// As a user, I want to easily categorize items/lists in my library
// As a user, I want to be able to filter the library by author/subject/alphabetically/ favourited, etc. 
// Adding items (logged in): 
// As a user, I want to add items to my library, noting whether I own them, want to own them, or plan to read (wishlist)
// As a user, I want to be able to provide additional details for each item
// As a user, I want to be able to click an item to get more information (modal)
// Can move items between lists (stretch)


//ADD BOOK TO LIST ROUTE (INDIA NEED THIS)

router.post("/add_book", (req, res)=> {
  console.log("Route /lists/add_book was hit");

  const book_id = req.body.book_id;
  const list_id = req.body.list_id
 
  const addBookToList = (book_id, list_id) => {
    const queryString = `INSERT INTO BOOKS_LISTS (BOOK_ID, LIST_ID)
    VALUES ($1, $2);`
  
    const values = [
      book_id,
      list_id
    ]
  
    db.query(queryString, values)
    .then(() => {
      console.log('Book added to list successfully');
      res.json({ success: true });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal server error" });
    });
  }

  addBookToList(book_id, list_id)


})

//untested
//note, because I have added lists in the lists router, WE DO NOT NEED TO PREFIX IT, it's already there 
router.post("/create", (req, res) => {

  //you would be choosing to pack in as a object for transfer. It is not coming as an object
  const newLibraryObj = {

    user_id: req.query.user_id,
    library_name: req.query.library_name,
    public_boolean: req.query.public_boolean
    

    // user_id: req.body.user_id,
    // public_boolean: req.body.public_boolean,
    // library_name: req.body.library_name

  };

  const createLibrary = (newLibraryObj) => {

    const queryString = `INSERT INTO libraries (user_id, public_boolean, list_name)
    VALUES ($1, $2, $3)
    RETURNING *`;

    const values = [
      newLibraryObj.user_id,
      newLibraryObj.public_boolean,
      newLibraryObj.list_name
    ];

    // USER_ID INT REFERENCES USERS(ID) ON DELETE CASCADE,
    // LIST_NAME VARCHAR(255) NOT NULL,
    // PUBLIC BOOLEAN NOT NULL

    //the below is based on Jeremy's midterm project    
    return db.query(queryString, values)
      .then((data) => {
        return data.rows[0];
      })
      .catch((err) => {
        console.log("create map library error message: ", err);
      });


  };

  createLibrary(newLibraryObj);

});



//GET ALL LISTS
router.get("/lists", (req, res) => {

  //I think this will need to be changed to req.body
  const id = req.query.id;

  const queryString = `SELECT * FROM lists`;

  //generates list of books based on assigned library ID
  const loadAllLists = () => {
    return db.query(queryString)
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

  loadAllLists();

});

//GET BOOKS BY LIBRARY ID

router.get("/lists/:id", (req, res) => {

  //I think this will need to be changed to req.body
  const id = req.query.id;

  const queryString = `SELECT * FROM books WHERE list_id = $1`;

  //generates list of books based on assigned library ID
  const loadList = (id) => {
    return db.query(queryString, [id])
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

  loadList(id);

});



module.exports = router







