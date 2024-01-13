const axios = require('axios');

//tested Jan 13th and and working
const getGetAllBooks = async () => {
  try {
    const response = await axios.get('http://localhost:8001/books');

    // Axios automatically checks for HTTP response status
    const booksData = response.data;
    console.log('Books Data:', booksData);
    // Handle the response, e.g., update state or perform other actions
  } catch (error) {
    console.error('Error:', error.message);
    // Handle errors, e.g., show an error message to the user
  }
};

//

//Post routes
//tested Jan 13th, working
const postInsertBook= async (postData) => {
  try {
    const response = await axios.post('http://localhost:8001/books/insert', postData);

    // Axios automatically checks for HTTP response status
    const booksData = response.data;
    console.log('Books Data:', booksData);
    // Handle the response, e.g., update state or perform other actions
  } catch (error) {
    console.error('Error:', error.message);
    // Handle errors, e.g., show an error message to the user
  }
};

//TESTING 

//get all books

// console.log(getGetAllBooks)
// const result = getGetAllBooks()
// console.log(result)

//insert books

// const postData = {
//   "library_id": 1,
//   "name": "Joshua Then and Now",
//   "author": "Morcdecai Richler",
//   "rating": 4,
//   "ownership": true,
//   "book_cover_link": "https://www.books.com",
//   "notes": "some notes probably",

// }

// const result = postInsertBook(postData)


module.exports = { getGetAllBooks, postInsertBook };


