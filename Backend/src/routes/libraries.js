const express = require("express");
const router = require("express").Router();
const { query } = require("express");
const db = require("../database/index.js");
router.use(express.json()); 


// As a user, I want to easily categorize items/lists in my library
// As a user, I want to be able to filter the library by author/subject/alphabetically/ favourited, etc. 


//ADD BOOK TO LIST ROUTE (INDIA NEED THIS)
//Jan 9th. Tested query using pre-defined values, coulnd't get postman to work when I submitted values, but used postman to trigger route...unsure what I am doing wrong
//untested since revisions to route, need to refactor!!!
router.post("/add_book", (req, res)=> {
  console.log("Route /lists/add_book was hit");
  console.log("req body book_id: ", req.body.book_id)
  console.log("req body list_id: ", req.body.list_id)
  console.log("req body:", req.body)

  const book_id = req.body.book_id;
  const list_id = req.body.list_id

  //QUERY WORKS WHEN I HARD CODE THE VALUES
  // const book_id = 1;
  // const list_id = 1;

 
  const addBookToList = (book_id, list_id) => {
    const queryString = `INSERT INTO BOOKS_LISTS (BOOK_ID, LIST_ID)
    VALUES ($1, $2);`
  
    const values = [
      book_id,
      list_id
    ]
  
    db.query(queryString, values)
    .then(() => {
      console.log('Book added to table successfully');
      res.json({ success: true });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal server error" });
    });
  }

  addBookToList(book_id, list_id)


})

//CREATE LIBRARY
//Tested sucessfully Jan 10th
//note, because I have added libraries in the libraries router, WE DO NOT NEED TO PREFIX IT, it's already there 
router.post("/create", (req, res) => {

  console.log("req body", req.body)

  //you would be choosing to pack in as a object for transfer. It is not coming as an object
  const newLibObj = {

    user_id: req.body.user_id,
    library_name: req.body.library_name,
    public: req.body.public

  }

  const createLib = (newLibObj) => {

    const queryString = `INSERT INTO libraries (user_id, library_name, public)
    VALUES ($1, $2, $3)
    RETURNING *`;

    const values = [
      newLibObj.user_id,
      newLibObj.library_name,
      newLibObj.public,
      
    ];
  
    db.query(queryString, values)
    .then(() => {
      console.log('New library created');
      res.json({ success: true });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal server error" });
    });


  };

  createLib(newLibObj);

});


//FILTER LIBRARY BY AUTHOR (As a user, I want to be able to filter the library by author/subject/alphabetically/ favourited, etc. )

router.get("/author", (req, res) => {
  const authorName = req.query.author;
  const library_id = req.query.library_id
  // const authorName = req.body.author; // Get the author's name from the query string
  //const authorName = 'Joseph Heller' // this line for testing only, comment out and uncomment out above line

  const filterLibraryByAuthor = (authorName, library_id) => {


    const queryString = `SELECT * FROM books, libraries
     WHERE books.library_id = libraries.id
      AND books.author = $1
      AND libraries.id = $2;`

    values = [
      authorName, 
      library_id]

    //logs for testing purposes, delete for production
    console.log('QueryString:', queryString);
    console.log('AuthorName:', authorName);
    console.log('getBooksByAuthorName triggering');
    return db.query(queryString, [values]) // Pass author as a parameter to the query
      .then(({ rows }) => {
        console.log(rows);
        res.json(rows);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  filterLibraryByAuthor(authorName, library_id);
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

//GET BOOKS BY LISTS ID
//UNTESTED
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

//FILTER LIBRARY BY....

//Author
//untested route
router.get("/author", (req, res) =>{
  const authorName = req.query.author
  const library_id = req.query.library_id

  const filterListByAuthor = (authorName, library_id) => {

    values = [
      authorName, 
      library_id
    ]

    const queryString = `SELECT * FROM books WHERE author =$1 AND list_id =$2`
    
    db.query(queryString, values)
    .then(({ rows }) => {
      console.log(rows);
      res.json(rows);
      // return data.rows[0]
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });

  }
})



module.exports = router







