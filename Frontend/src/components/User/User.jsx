// UserComponent.js
import React, { useState, useEffect } from "react";
import "./User.scss";
import ListsCarousel from "../ListsCarousel/ListsCarousel";
import BookGrid from "../BookGrid/BookGrid";
import BookDetails from "../BookDetails/BookDetails";
import { library } from "@fortawesome/fontawesome-svg-core";
import CreateNewListForm from "../CreateNewListForm/CreateNewListForm";

export default function UserComponent({ openModal }) {
  const [isMyBooks, setIsMyBooks] = useState(true);
  const [userBooks, setUserBooks] = useState([]);
  const [libraries, setLibraries] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const userId = 1;

    // Fetch user books
    fetch(`http://localhost:8001/books/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("user books:", data)
        const bookData = [];

        data.forEach((book) => {
          bookData.push({
            id: book.id,
            volumeInfo: {
              title: book.name,
              authors: [book.author],
              averageRating: book.rating,
              imageLinks: {
                smallThumbnail: book.book_cover_link,
              },
              description: "",
              notes: book.notes,
              ownership: book.ownership,
            },
          });
        });
        setUserBooks(bookData);
      })
      .catch((error) =>
        console.error("Error fetching user books:", error.message)
      );

    // Fetch libraries associated with the user
    fetch(`http://localhost:8001/libraries/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const libraryData = [];
        const usedLibraryCategories = [];

        data.forEach((library) => {
          if (!usedLibraryCategories.includes(library.library_name)) {
            usedLibraryCategories.push(library.library_name);
            libraryData.push({
              category: library.library_name,
              books: [],
            });
          }
        });

        libraryData.forEach((libraryItem) => {
          data.forEach((library) => {
            if (libraryItem.category === library.library_name) {
              libraryItem.books.push({
                id: library.id,
                volumeInfo: {
                  title: library.name,
                  authors: [library.author],
                  averageRating: library.rating,
                  imageLinks: {
                    smallThumbnail: library.book_cover_link,
                  },
                  description: "",
                  notes: library.notes,
                  ownership: library.ownership,
                },
              });
            }
          });
        });
        console.log("check:", libraryData);
        setLibraries(libraryData);
      })
      .catch((error) =>
        console.error("Error fetching user libraries:", error.message)
      );
  }, []);

  return (
    <div
      className={`user-component ${
        isMyBooks ? "my-books-active" : "my-lists-active"
      }`}
    >
      <div className="toggle-switch">
        <button
          className={isMyBooks ? "active" : ""}
          onClick={() => setIsMyBooks(true)}
        >
          My Books
        </button>
        <button
          className={isMyBooks ? "" : "active"}
          onClick={() => {
            setIsMyBooks(false);
            setSelectedBook(null); // Close book details when switching to My Lists
          }}
        >
          My Lists
        </button>
      </div>
      <div className="toggle-content">
        {isMyBooks ? (
          <BookGrid
            books={userBooks}
            setUserBooks={setUserBooks}
            openModal={openModal}
          />
        ) : (
          <>
            <ListsCarousel libraries={libraries} />
            <button className="create-list-button">Create a List</button>
          </>
        )}
      </div>
      {selectedBook && (
        <BookDetails
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}
