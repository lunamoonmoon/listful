import React, { useState, useEffect } from "react";
import "./User.scss";
import ListsCarousel from "../ListsCarousel/ListsCarousel";
import BookGrid from "../BookGrid/BookGrid";
import BookDetails from "../BookDetails/BookDetails";
import CreateNewListForm from "../CreateNewListForm/CreateNewListForm";

export default function UserComponent({ openModal }) {
  const [isMyBooks, setIsMyBooks] = useState(true);
  const [userBooks, setUserBooks] = useState([]);
  const [libraries, setLibraries] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
  const [createdLists, setCreatedLists] = useState([]);
  const [libraryAdded, setLibraryAdded] = useState(false);

  const BOOKS_API_URL = "http://localhost:8001/books/users/";
  const LIBRARIES_API_URL = "http://localhost:8001/libraries/users/";

  useEffect(() => {
    const userId = 1;

    // Fetch user books
    fetch(`${BOOKS_API_URL}${userId}`)
      .then((response) => response.json())
      .then((data) => {
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
    fetch(`${LIBRARIES_API_URL}${userId}`)
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
        setLibraries(libraryData);
      })
      .catch((error) =>
        console.error("Error fetching user libraries:", error.message)
      );
  }, [libraryAdded]);

  const openCreateListModal = () => {
    openModal(
      <CreateNewListForm
        onSubmit={handleCreateListSubmit}
        onCancel={closeCreateListModal}
        books={userBooks}
      />
    );
    setIsCreateListModalOpen(true);
  };

  const closeCreateListModal = () => {
    setIsCreateListModalOpen(false);
  };

  const handleCreateListSubmit = async (listName, selectedBooks) => {
    try {
      const response = await fetch("http://localhost:8001/libraries/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          library_name: listName,
          public: true,
          books: selectedBooks,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create the list");
      }

      const newList = await response.json();

      for (const bookToAdd of selectedBooks) {
        const bookAddedResponse = await fetch(
          "http://localhost:8001/books/assign_library",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              library_id: newList.library.id,
              book_id: bookToAdd,
            }),
          }
        );

        if (!bookAddedResponse.ok) {
          throw new Error("Failed to add the book to the library");
        }
      }

      closeCreateListModal();

      setLibraryAdded(!libraryAdded);
    } catch (error) {
      console.error("Error creating the list:", error.message);
    }
  };

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
            setSelectedBook(null);
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
          <ListsCarousel
            libraries={[...libraries, ...createdLists]}
            onCreateList={(newList) =>
              setCreatedLists([...createdLists, newList])
            }
          />
        )}
        <button className="create-list-button" onClick={openCreateListModal}>
          Create a List
        </button>
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
