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



//LIBRARY GET 

//LIBRARY FILTER BY PARAMS
//TESTED AND WORKING JAN 13TH
const handleLibraryFilter = async (params) => {
  try {
    const response = await axios.get('http://localhost:8001/libraries/filter', {params});
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

//assign book to library (you must have the book id already.
//if you wish to insert a totally new book, use the insert book request/route
//and it set the library id there for the nwe book)
//note you must include both book_id, and library_id in postData

//tested successfully Jan 13th, 2023
const handlePostAssignBookToLibrary= async (postData) => {
  try {
    const response = await axios.post('http://localhost:8001/books/assign_library', postData);

    const booksData = response.data;
    console.log('Books Data:', booksData);
   
  } catch (error) {
    console.error('Error:', error.message);

  }
};


//CREATE NEW LIBRARY...tested and worked Jan 13th
//note postdata requires user_id, library name, and public (true/false)
const handlePostCreateLibrary= async (postData) => {
  try {
    const response = await axios.post('http://localhost:8001/libraries/create', postData);

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

//ASSIGN BOOK TO LIBRARY TEST

// const postData = {
//   library_id: 2,
//   book_id: 14
// }

// const resultAssign = handlePostAssignBookToLibrary(postData)
// console.log(resultAssign)


//LIBRARY FILTER TEST
// const params = {
//   "library_id": 2,
//   "rating": 5,
//   "author": 'Joseph Heller'
// }

// const filterResults = handleLibraryFilter(params)
// console.log(filterResults)

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

//CREATE LIBRARY TEST

// const postData = {
//   "user_id": 1,
//   "library_name": "Best Sellers",
//   "public": true
// }
// const createLibraryResult = handlePostCreateLibrary(postData)
// console.log(createLibraryResult)



module.exports = { handleGetGetAllBooks, handlePostInsertBook, handleGetAllBooksByUserId, handleGetBookByName};


