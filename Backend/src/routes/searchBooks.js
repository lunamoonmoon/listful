const axios = require('axios');
require('dotenv').config();

//fetch data from api
//get results of a users search from api
const searchBooks = async (query) => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  try {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
    );
    return res.data
  } catch (err) {
    console.err(`Error fetching books: ${err.message}`);
    throw err;
  }
};

//make route to save to user library

module.exports = { searchBooks };
