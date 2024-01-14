const express = require("express");
const router = require("express").Router();
const { query } = require("express");
const db = require("../database/index.js");
router.use(express.json()); 


// As a user, I want to easily categorize items/lists in my library
// As a user, I want to be able to filter the library by author/subject/alphabetically/ favourited, etc. 


//---DEPRECATED--- NO LIST TABLE


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


// 


//FILTER LIBRARY BY ANY PARAMETER
//"As a user, I want to be able to filter the library by author/subject/alphabetically/ favourited, etc. 
router.get("/filter", (req, res) => {

  //add any additional parameters here
  const library_id = req.query.library_id

  if (!library_id) {
    return res.status(400).json({ error: "Library ID is mandatory" });
  }

  const authorName = req.query.author
  const rating = req.query.rating
  const name = req.query.name
  const ownership = req.query.ownership

  //be sure to update the argumetns if you add any params
  //be sure to ALSO UPDATE THE ARGUEMENTS IN THE FUNCTION CALL AT THE BOTTOM OF THE ROUTE!
  const filterLibrary = (rating, library_id, authorName, name, ownership) => {

    console.log("query params: ", req.query)
    let queryString = 'SELECT * FROM books JOIN libraries ON books.library_id = libraries.id WHERE libraries.id = $1 '

    //optional parameters pushed to array if present, see below
    values = [library_id]

    //conditional parameter handling
    //note, library_id is mandatory, not optional ergo there is not if statement for it
    if(authorName){
      queryString += ' AND books.author = $' + (values.length + 1)
      values.push(authorName)
    }

    if(rating){
      queryString += ' AND books.rating = $' + (values.length + 1)
      values.push(rating)
    }

    if(name){
      queryString += ' AND books.name = $' + (values.length + 1)
      values.push(name)
    }

    if(ownership){
      queryString += ' AND books.name = $' + (values.length + 1)
      values.push(ownership)
    }

    console.log([values])

    //logs for testing purposes, delete for production
    console.log('rating:', rating);
    console.log("library id", library_id)
    console.log('getBooksByRating triggering');
    console.log('QUERY STRING', queryString)
    return db.query(queryString, values) // Pass author as a parameter to the query
      .then(({ rows }) => {
        console.log(rows);
        res.json(rows);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      });
  };

  filterLibrary(rating, library_id, authorName, name, ownership);
});


//REDUDANT LIBRARY filters as library/filters CAN FILTER BY ANY PARAM

//Author
//untested route
// router.get("/author", (req, res) =>{
//   const authorName = req.query.author
//   const library_id = req.query.library_id

//   const filterListByAuthor = (authorName, library_id) => {

//     values = [
//       authorName, 
//       library_id
//     ]

//     const queryString = `SELECT * FROM books WHERE author =$1 AND list_id =$2`
    
//     db.query(queryString, values)
//     .then(({ rows }) => {
//       console.log(rows);
//       res.json(rows);
//       // return data.rows[0]
//     })
//     .catch(error => {
//       console.error(error);
//       res.status(500).json({ error: "Internal server error" });
//     });

//   }
// })

//FILTER LIBRARY BY AUTHOR (As a user, I want to be able to filter the library by author/subject/alphabetically/ favourited, etc. )
// //tested and working Jan 10th
// router.get("/author", (req, res) => {
//   const authorName = req.query.author;
//   const library_id = req.query.library_id
  
//   const filterLibraryByAuthor = (authorName, library_id) => {


//     const queryString = `SELECT * FROM books
//     JOIN libraries ON books.library_id = libraries.id
//     WHERE books.author = $1 AND libraries.id = $2;`

//     values = [
//       authorName, 
//       library_id]

//     console.log([values])

//     //logs for testing purposes, delete for production
//     console.log('AuthorName:', authorName);
//     console.log("library id", library_id)
//     console.log('getBooksByAuthorName triggering');
//     return db.query(queryString, values) // Pass author as a parameter to the query
//       .then(({ rows }) => {
//         console.log(rows);
//         res.json(rows);
//       })
//       .catch(error => {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//       });
//   };

//   filterLibraryByAuthor(authorName, library_id);
// });

// //FILTER LIBRARY BY RATING (note from user story, we don't have subject or favourited in the books table)
// //but we do have rating
// //) (As a user, I want to be able to filter the library by author/subject/alphabetically/ favourited, etc. )
// //tested and working Jan 10th
// router.get("/rating", (req, res) => {
//   const rating = req.query.rating
//   const library_id = req.query.library_id
  
//   const filterLibraryByRating = (rating, library_id) => {


//     const queryString = `SELECT * FROM books
//     JOIN libraries ON books.library_id = libraries.id
//     WHERE books.rating = $1 AND libraries.id = $2;`

//     values = [
//       rating, 
//       library_id]

//     console.log([values])

//     //logs for testing purposes, delete for production
//     console.log('rating:', rating);
//     console.log("library id", library_id)
//     console.log('getBooksByRating triggering');
//     return db.query(queryString, values) // Pass author as a parameter to the query
//       .then(({ rows }) => {
//         console.log(rows);
//         res.json(rows);
//       })
//       .catch(error => {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//       });
//   };

//   filterLibraryByRating(rating, library_id);
// });



//////------lists routes----note we do not have anywhere to store lists int schema----/////


//ADD BOOK TO LIST ROUTE (INDIA NEED THIS)
//Jan 9th. Tested query using pre-defined values, coulnd't get postman to work when I submitted values, but used postman to trigger route...unsure what I am doing wrong
//untested since revisions to route, need to refactor!!!
// router.post("/add_book", (req, res)=> {
//   console.log("Route /lists/add_book was hit");
//   console.log("req body book_id: ", req.body.book_id)
//   console.log("req body list_id: ", req.body.list_id)
//   console.log("req body:", req.body)

//   const book_id = req.body.book_id;
//   const list_id = req.body.list_id

  //QUERY WORKS WHEN I HARD CODE THE VALUES
  // const book_id = 1;
  // const list_id = 1;

 
  // const addBookToList = (book_id, list_id) => {
  //   const queryString = `INSERT INTO BOOKS_LISTS (BOOK_ID, LIST_ID)
  //   VALUES ($1, $2);`
  
  //   const values = [
  //     book_id,
  //     list_id
  //   ]
  
  //   db.query(queryString, values)
  //   .then(() => {
  //     console.log('Book added to table successfully');
  //     res.json({ success: true });
  //   })
  //   .catch(error => {
  //     console.error(error);
  //     res.status(500).json({ success: false, error: "Internal server error" });
  //   });
  // }

  // addBookToList(book_id, list_id)


// })


// //GET ALL LISTS
// router.get("/lists", (req, res) => {

//   //I think this will need to be changed to req.body
//   const id = req.query.id;

//   const queryString = `SELECT * FROM lists`;

//   //generates list of books based on assigned library ID
//   const loadAllLists = () => {
//     return db.query(queryString)
//       .then(({ rows }) => {
//         console.log(rows);
//         res.json(rows);
//         // return data.rows[0]
//       })
//       .catch(error => {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//       });

//   };

//   loadAllLists();

// });

//GET BOOKS BY LISTS ID
//UNTESTED
// router.get("/lists/:id", (req, res) => {

//   //I think this will need to be changed to req.body
//   const id = req.query.id;

//   const queryString = `SELECT * FROM books WHERE list_id = $1`;

//   //generates list of books based on assigned library ID
//   const loadList = (id) => {
//     return db.query(queryString, [id])
//       .then(({ rows }) => {
//         console.log(rows);
//         res.json(rows);
//         // return data.rows[0]
//       })
//       .catch(error => {
//         console.error(error);
//         res.status(500).json({ error: "Internal server error" });
//       });

//   };

//   loadList(id);

// });

//FILTER LIBRARY BY....


module.exports = router






