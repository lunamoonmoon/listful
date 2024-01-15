//use for loop to extract from the json object returned by the api?

//array of json objects of books returned containing title, authors, and image links
//for each book
//should be able to extra json object and assign directly as postData
const extractedBooksData = []

for(const item of searchResults.items) {
  //I can't figure out where in the object coming from the google api
  //rating is...
  const title = item.volumeInfo.title;
  const authors = item.volumeInfo.authors;
  const imageLinks = items.volumeInfo.imageLinks;

const bookDetails = {
  title: title,
  authors: authors,
  imageLinks: imageLinks
}

//push to array
extractedBooksData.push(bookDetails)

}

