const router = require("express").Router();
const { query } = require("express");
const db = require("../database/index.js");

//GET ROUTES

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
    
    getAllBooks()

});

//returning as raw JSON for resting purposes, see commented
//possible make it a general object pass to the param

//   //with assistance from lary AI bot
  router.get("/books/author", (req, res) => {
    const authorName = req.query.author
    // const authorName = req.body.author; // Get the author's name from the query string
    //const authorName = 'Joseph Heller' // this line for testing only, comment out and uncomment out above line

    const getBookByAuthor = (authorName) => {
      const queryString = `SELECT * FROM books WHERE author = $1`;
      //logs for testing purposes, delete for production
      console.log('QueryString:', queryString);
      console.log('AuthorName:', authorName);
      console.log('getBooksByAuthorName triggering')
      return db.query(queryString, [authorName]) // Pass author as a parameter to the query
      .then(({ rows }) => {
        console.log(rows);
        res.json(rows);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      });
    }

    getBookByAuthor(authorName);
  });
  
  //name is the title of the book
  //tested manually and with postman - Jeremy
  router.get("/books/name", (req, res) => {
    const name = req.query.name
    // const name = "Twilight"

    const getBookByTitle = (name) => {
          const queryString = `SELECT * FROM books WHERE name =$1`
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
      
        }

    getBookByTitle(name);
  })

  router.get("/libraries", (req, res) => {

    //A get request to retreive information about libraries from db
    const getAllLibraries = () => {
      return db
        .query(`
          SELECT *
          FROM Libraries;
          `)
        .then(({ rows }) => {
          console.log(rows);
          res.json(rows);
        });
        
    };  
    
    getAllLibraries()

});

router.get("/libraries/:library_id", (req, res) => {
  const { library_id } = req.params;

  //A get request to retreive the books in a specific library from db
  const getLibraryBooks = () => {
    return db
      .query(`
        SELECT *
        FROM Books
        WHERE LIBRARY_ID = $1;
        `, [library_id])
      .then(({ rows }) => {
        console.log(rows);
        res.json(rows);
      });
  };

  getLibraryBooks();
});


  //POST ROUTES

router.post("/books/insert", (req, res) => {

  const insertNewBook = (newBookObject) => {
  const queryString = `INSERT INTO books (library_id, name, author, rating, notes, ownership)
   VALUES ($1, $2, $3, $4, $5, $6)`;

   const values = [
    newBookObject.library_id,
    newBookObject.name,
    newBookObject, author,
    newBookObject.rating,
    newBookObject.notes,
    newBookObject.ownership
   ]

   return db.query(queryString, values)
   


}
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

// router.get("/books/add", (req, res) => {
//   const {library_id, name, author, rating, notes, ownership} = req.body
//   //I am uncertain about the structure of the body, ergo, I am unclear how to pull out the variables

//   addBook(library_id, name, author, rating, notes, ownership)
//   .then((result) => {
//     console.log(result.rows)
//     res.json(result.rows)
//   })
//   .catch((error) => {
//     console.error(error)
//     res.status(500).json({error: "Internal server error"})
//   })
//   //returning as raw JSON for testing purpose
//   

// })//END ROUTER


// //THE BELOW IS FROM OUR MIDTERM WHEN WE WERE ADDING LOCATIONS TO THE MAP
// // const addLocations = (dataObj) => {

// //   //pre-emptive debugging
// //   console.log("query file, add locations function triggered")
// //   console.log("dataObject received", dataObj)

// //   let data = [dataObj.title, dataObj.description, dataObj.map_id, dataObj.latitude, dataObj.longitude]
// //   return db.query(`INSERT INTO locations (title, description, map_id, latitude, longitude)
// //   VALUES ($1, $2, $3, $4, $5)
// //   RETURNING *`, data)
// //   .then(data => {
// //     return data.rows[0]
// //   })
// //   .catch((err)=> {
// //     console.log("insert query error msg: ", err)
// //   })


// // }


// });

//comment to test git


//do we need to export these functions? I think so...- Jeremy
  module.exports = router;
