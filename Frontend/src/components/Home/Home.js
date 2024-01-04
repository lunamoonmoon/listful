import Book from '../Book/Book';

export default function Home({ searchResults }) {
  //get libraries from db
  // const [libraries, setLibraries] = useState([]);
  // const [openModal, setOpenModal] = useState(false);

  // useEffect(() => {
  //   axios.get('http://localhost:8001/libraries')
  //     .then(response => {
  //       setLibraries(response.data);
  //     })
  //     .catch(err => {
  //       console.error(`Error fetching libraries: ${err}`);
  //     });
  // }, []);


  //map through db libraries displaying its books
  //we only want to map through the libraries IF someone is logged in - need to implement this functionality
  return (
    <div data-testid='Home'>
      <img src={process.env.PUBLIC_URL + "/listful_logo.png"}></img>
      <Book searchResults={searchResults}/>
      <h1>Save all your favourite books in one spot</h1>
      <p>Organize your books, one list at a time with your Listful Library, a web app that collates your library in one easy location.</p>
      <button>Sign Up Now</button>
      {/* {libraries.map((library) => (
        <ul key={library.id}>
          <li>
              <h2>{library.name}</h2>
          </li>
        </ul>
      ))}; */}
      {/* {openModal && (
        <Modal setOpenModal={setOpenModal}></Modal>
      )}
      {/* {isModalOpen && (
        <SearchResultModal
          SearchResults={setSearchResults}
          closeModal={() => setIsModalOpen(false)}
        />
      )} */}
    </div>
  )
};
