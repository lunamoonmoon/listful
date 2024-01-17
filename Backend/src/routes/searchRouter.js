const axios = require('axios');
require('dotenv').config();
const router = require("express").Router();

//fetch data from api
//get results of a users search from api
router.get('/', async (req, res) => {
  const searchTerm = req.query.searchTerm;
  try {
    const bookResults = await searchBooks(searchTerm)
    res.json({ bookResults });
  } catch (err) {
    res.status(500).json({ err })
  }
});

router.get('/catalogue', async(req, res) => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  try {
    const bookResults = await getBooks()
    res.json({ bookResults });
  } catch (err) {
    res.status(500).json({ err })
  }
});

const getBooks = async () => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  try {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/users/109805484301862886584/bookshelves/1001/volumes?&maxResults=20&key=${apiKey}`
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
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=20&key=${apiKey}`
    );
    return res.data
  } catch (err) {
    console.error(`Error fetching books: ${err.message}`);
    throw err;
  }
};

module.exports = router;
