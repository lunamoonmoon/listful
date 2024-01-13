const axios = require('axios');

//tested Jan 13th and and working
const getGetAllBooks = async () => {
  try {
    const response = await axios.get('http://localhost:8001/books');

   
    const booksData = response.data;
    console.log('Books Data:', booksData);
    
  } catch (error) {
    console.error('Error:', error.message);
    
  }
};


//Get all books by user 
//tested Jan 12th, working
const getAllBooksByUserId = async (id) => {
  try {
    //note the use of back ticks in this particilar request, it is required for proper string interpolation
    const response = await axios.get(`http://localhost:8001/books/users/${id}`);
    const booksData = response.data;
    console.log('Books Data:', booksData);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

//

//Post routes
//tested Jan 13th, working
const postInsertBook= async (postData) => {
  try {
    const response = await axios.post('http://localhost:8001/books/insert', postData);

    const booksData = response.data;
    console.log('Books Data:', booksData);
   
  } catch (error) {
    console.error('Error:', error.message);

  }
};

//TESTING CODE

//get all books

// console.log(getGetAllBooks)
// const result = getGetAllBooks()
// console.log(result)

//get books by user id

const resultById = getAllBooksByUserId(1)
console.log(resultById)

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



module.exports = { getGetAllBooks, postInsertBook, getAllBooksByUserId };


