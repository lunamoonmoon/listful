TRUNCATE TABLE GENRE_BOOKS, BOOKS, LIBRARIES, USERS, GENRES;

INSERT INTO USERS (ID, USERNAME, PASSWORD, EMAIL)
VALUES 
  (1, 'tomnook1', 'islandliferocks', 'bells@gmail.com'),
  (2, 'celestestar', 'astronomy', 'stargazer@gmail.com'),
  (3, 'kkslider', 'singingtime', 'kkslider@gmail.com');

INSERT INTO LIBRARIES (USER_ID, NAME, PUBLIC)
VALUES 
  (1, 'Fav Books', true),
  (1, 'Comics to Read', true),
  (2, 'Classics', true);

INSERT INTO BOOKS (LIBRARY_ID, NAME, AUTHOR, RATING, NOTES, OWNERSHIP)
VALUES 
  (1, '1984', 'George Orwell', 5, 'So good!', true),
  (1, 'Catch 22', 'Joseph Heller', 5, 'Can I give 6/5 stars!', true),
  (2, 'Twilight', 'Stephanie Meyer', 2, 'Okay but better for younger audiences maybe.', false);

INSERT INTO GENRES (NAME)
VALUES 
  ('Young-Adult'),
  ('Fiction'),
  ('Science Fiction'),
  ('Non-Fiction'),
  ('Fantasy'),
  ('Romance');

INSERT INTO GENRE_BOOKS (BOOK_ID, GENRE_ID)
VALUES 
  (1, 1),
  (1, 2),
  (2, 2);
