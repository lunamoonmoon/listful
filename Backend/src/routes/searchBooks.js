const axios = require('axios');
require('dotenv').config();

//fetch data from api
//get results of a users search from api
const searchBooks = async (query) => {
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  const apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  try {
    const res = await axios.get(apiUrl, { //api request
      params: {
        q: query,
        key: apiKey,
      },
    });

    const volumes = res.data.items; //handle api response
    if (!volumes) {
      throw new Error('No results for this search.');
    }
    //map results into new array name, author
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

module.exports = { searchBooks };
