const axios = require('axios');

//tested Jan 13th and and working
const handleGetGetAllBooks = async () => {
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
const handleGetAllBooksByUserId = async (id) => {
  try {
    //note the use of back ticks in this particilar request, it is required for proper string interpolation
    const response = await axios.get(`http://localhost:8001/books/users/${id}`);
    const booksData = response.data;
    console.log('Books Data:', booksData);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

//Get book from books table by name 
"/name"

//where name is title not author name
const handleGetBookByName = async (name) => {
  try {
    //note the use of back ticks in this particilar request, it is required for proper string interpolation
    const response = await axios.get(`http://localhost:8001/books/${name}`);
    const booksData = response.data;
    console.log('Books Data:', booksData);
  } catch (error) {
    console.error('Error:', error.message);
  }
}



//Post routes
//tested Jan 13th, working
const handlePostInsertBook= async (postData) => {
  try {
    const response = await axios.post('http://localhost:8001/books/insert', postData);

    const booksData = response.data;
    console.log('Books Data:', booksData);
   
  } catch (error) {
    console.error('Error:', error.message);

  }
};

//TESTS

//GET ALL BOOKS TEST
// const result = handleGetGetAllBooks()
// console.log(result)

//GET ALL BOOKS BY USER ID TEST 
// const resultById = handleGetAllBooksByUserId(1)
// console.log(resultById)

//GET BOOK BY NAME TEST
// const bookNameResult = handleGetBookByName(1984)
// console.log(bookNameResult)

//INSERT BOOK TEST
// const postData = {
//   "library_id": 1,
//   "name": "Joshua Then and Now",
//   "author": "Morcdecai Richler",
//   "rating": 4,
//   "ownership": true,
//   "book_cover_link": "https://www.books.com",
//   "notes": "some notes probably",

// }

// const result = handlePostInsertBook(postData)



module.exports = { handleGetGetAllBooks, handlePostInsertBook, handleGetAllBooksByUserId };


