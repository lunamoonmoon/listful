const router = require("express").Router();
const { query } = require("express");
const db = require("../database/index.js");
router.use(express.json()); 



//returns books based on id when login route called
router.get("login/:id", (req, res)=> {

  //I think this will need to be changed to req.body
  const id = req.query.id;

  const queryString = `SELECT * FROM books WHERE id = $1`;

  //generates list of books based on assigned library ID
  const login = (id) => {
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

  }

  login(id)

})