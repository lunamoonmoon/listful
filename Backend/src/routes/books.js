const router = require("express").Router();

module.exports = db => {
  router.get("/books", (request, response) => {
    const protocol = request.protocol;
    const host = request.hostname;
    const port = process.env.PORT || 8001;
    const serverUrl = `${protocol}://${host}:${port}`;

    //A get request to retreive information about books from a database
    //Table BOOKS (ID, LIBRARY_ID, NAME, AUTHOR, RATING, NOTES, OWNERSHIP)

    const getAllBooks = () => {
      return db
        .query(`
          SELECT 
          json_agg(
              json_build_object(
                'id', books.id,
                'library_id', books.library_id,
                'name', books.name,
                'author', books.author,
              )
            ) as book_data
          FROM books;
          `)
        .then(({ rows }) => {
          console.log(rows[0].book_data);
          response.json(rows[0].book_data);
        });
      };

      getAllBooks();
  });

  return router;
};
