
const { google } = require('googleapis');

const books = google.books({
  version: 'v1',
  auth: 'AIzaSyCW89WJ5picYdv0UU1kxwHaF4fI_a_LAPc',
});

const searchBooks = (query) => {
  const params = {
    q: query,
  };

  return books.volumes.list(params)
    .then((res) => {
      const volumes = res.data.items;
      if (volumes) {
        return volumes.map((volume) => ({
          title: volume.volumeInfo.title,
          authors: volume.volumeInfo.authors,
        }));
      }
      return [];
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

module.exports = { searchBooks };