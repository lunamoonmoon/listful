const axios = require('axios');
require('dotenv').config();

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

    const volume = res.data.items;

    if (volume) {
      return volume.map((volume) => ({
        title: volume.volumeInfo.title,
        authors: volume.volumeInfo.authors,
      }));
    }

      return [];
  } catch (err) {
    console.error(err);
    throw err;
  }
};


// Use function example
// const searchQuery = 'Harry Potter';
// searchBooks(searchQuery)
//   .then((books) => {
//     // Handle the retrieved book data (e.g., add to the database)
//     console.log('Books:', books);
//   })
//   .catch((error) => {
//     // Handle errors
//     console.error('Error:', error.message);
//   });

module.exports = { searchBooks };
