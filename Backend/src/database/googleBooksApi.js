const axios = require('axios');
require('dotenv').config();

//fetch data from api
//get results of a users search from api
const searchBooks = async (query) => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  try {
    const res = await axios.get(apiUrl, {
      params: {
        q: query,
        key: apiKey,
      },
    });

    const volumes = res.data.items;
    if (!volumes) {
      throw new Error('No results for this search.');
    }
    const bookResults = volumes.map((volume) => ({
      Name: volume.volumeInfo.title,
      Author: volume.volumeInfo.authors,
    }));

    return bookResults;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


// Use function example
// const query = 'Harry Potter';
// searchBooks(query)
//   .then((results) => {
//     console.log('Search Results', results);
//   })
//   .catch((error) => {
//     // Handle errors
//     console.error('Error:', error);
//   });

module.exports = { searchBooks };
