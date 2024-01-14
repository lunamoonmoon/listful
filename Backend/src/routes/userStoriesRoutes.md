

Creating the library (logged in):
As a user, I want to be able to log in and see my account

- get user by ID route (/books/user) Tested/working but may have to be slightly refactored to use params v.s body (/books/user/:id)

As a user, I want to create a library for my media collection - books, (stretch: music, movies, etc) (think about using cards like jungle’s css for the display?)

- /libraries/create route (testing/working)

As a user, I want to easily categorize items/lists in my library
 - note from Jeremy: there is no where to store lists in schema as it is set in the documentation
  - ()

As a user, I want to be able to filter the library by author/subject/alphabetically/ favourited, etc. 

  - FILTER BY LIBRARY AND ANY CONDITIONAL PARAMS ROUTE (/libraries/author/rating)
  - FILTER BY LIBRARY AND AUTHOR ROUTE (/libraries/author) 
  - FILTER BY LIBRARY AND RATINGS ROUTE (/libraries/rating)
  


Adding items (logged in): 

As a user, I want to add items to my library, noting whether I own them, want to own them, or plan to read (wishlist)

- ADD NEW BOOK TO LIBDRARY ROUTE (/books/insert)
#note, does not include wishlist

As a user, I want to be able to provide additional details for each item
As a user, I want to be able to click an item to get more information (modal)
Can move items between lists (stretch)
Tracking and Managing (logged in): 
As a user, I want to easily track items I own, those I want to view (wishlist), those I have read, and those I want to own. 
As a user, I want to mark items as completed or owned and be able to see this easily when looking through the library (like the hearts in photolabs?)
