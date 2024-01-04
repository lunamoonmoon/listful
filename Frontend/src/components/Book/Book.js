import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Book({ searchResults }) {
  const results = searchResults && searchResults.map((book) => {
    const {
      title,
      authors,
      categories,
      description,
    } = book.volumeInfo;

    return (
      <div>
        <h2>{title}</h2>
      </div>
    )
  })

  return (
    <div data-testid='Book'>
      {results}
    </div>
  )


//   //get books from specific library db
//   const [details, setDetails] = useState([]);
//   const [text, setText] = useState([]);

//   // useEffect(() => {
//   //   fetch(`http://localhost:8001/libraries/${libraryId}`)
//   //     .then(res => res.json())
//   //     .then(data => setBooks(data))
//   //     .catch(err => console.error(`Error fetching books: ${err}`))
//   // }, [libraryId]);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       const resources = await axios.get(
//         `https://www.googleapis.com/books/v1/volumes?q=${text}&maxResults=11`
//       );
//       setDetails(resources.data.items);
//     };
//     fetchDetails();
//   }, []);
  

//   return (
//     <div data-testid='Book'>
//       {details.map((book, index) => (
//         <ul key={book.volumeInfo.id}>
//           <li>
//               <h2>{book.volumeInfo.title}</h2>
//               <div>
//                 {book.volumeInfo.author}
//               </div>
//           </li>
//         </ul>
//       ))};
//     </div>
//   )
};
