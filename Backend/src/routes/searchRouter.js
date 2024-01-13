const axios = require('axios');
require('dotenv').config();
const router = require("express").Router();

//fetch data from api
//get results of a users search from api
router.get('/', async (req, res) => {
  const term = req.query.searchTerm;
  try {
    const searchResults = await searchBooks(term)
    res.json({ searchResults });
  } catch (err) {
    res.status(500).json({ err })
  }
});

router.get('/catalogue', async(req, res) => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  try {
    const catalogueResults = await getBooks()
    res.json({ catalogueResults });
  } catch (err) {
    res.status(500).json({ err })
  }
});

const getBooks = async () => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  try {
    const res = await axios.get(
      // `https://www.googleapis.com/books/v1/volumes/volumeId?key=${apiKey}`
      // `https://books.google.com/books?uid=109805484301862886584&as_coll=1001&source=gbs_lp_bookshelf_list?key=${apiKey}`
      `https://www.googleapis.com/books/v1/user/109805484301862886584/bookshelves/1001/volumes?key=${apiKey}`
    );
    return res.data
  } catch (err) {
    console.error(`Error fetching books: ${err.message}`);
    throw err;
  }
};

const searchBooks = async (searchTerm) => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  try {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`
    );
    return res.data
  } catch (err) {
    console.error(`Error fetching books: ${err.message}`);
    throw err;
  }
};

module.exports = router;