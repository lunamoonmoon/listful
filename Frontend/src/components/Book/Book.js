import styles from './Book.module.scss';
import { useState, useEffect } from 'react';

export default function Book(libraryId) {
  //get books from specific library db
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8001/libraries/${libraryId}`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error(`Error fetching books: ${err}`))
  }, [libraryId]);

  return (
    <div data-testid='Book'>
      {books.map((book) => (
        <ul key={book.id}>
          <li>
              <h2>{book.name}</h2>
              <div>
                {book.author}
              </div>
              <div>
                {book.rating}
              </div>
          </li>
        </ul>
      ))};
    </div>
  )
};
