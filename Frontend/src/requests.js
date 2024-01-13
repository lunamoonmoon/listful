const handleInsertBook= async (postData) => {
  try {
    //in the component create a postData and setPostData state
    //pass postData to the function call
    const response = await makePostRequest('/insert', postData);
    console.log('Response:', response);
    // Handle the response, e.g., update state or perform other actions
  } catch (error) {
    console.error('Error:', error);
    // Handle errors, e.g., show an error message to the user
  }
};

export default handleInsertBook;