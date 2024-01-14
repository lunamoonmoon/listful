const { searchBooks } = require('./searchBooks');

describe('searchBooks', () => {
  it('Should return an array of book results', async () => {
    const query = 'Lord of the Rings';
    const results = await searchBooks(query);
    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBeGreaterThan(0);
  });

  //it('should throw an error message if no results for that query')
  //throw new Error('No results for this search.');
});
