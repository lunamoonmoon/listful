import React, { useState, useReducer, useEffect} from 'react';
import './SignUpLogIn.scss';
import { filterReducer, initialFilterState } from '../../hooks/filterReducerReducer';

//LOGGED IN


const FilterLibrary = ({ closeModal }) => {

  const [ filterState, filterDispatch] = useReducer(filterReducer, initialFilterState);


 
  //for testing
  useEffect(() => {
    console.log("userState", filterState);

    // Close the modal when login state is set to 1
    if (filterState.loginState === 1) {
      closeModal(); // Implement closeModal function to hide the modal
    }
  }, [filterState]);

  const handleSubmitFilterSearch = async (event) => {

    event.preventDefault();

    try {

      const formData = new FormData(event.target)
       
      const response = await fetch('http://localhost:8001/libraries/filter', {
        method: 'GET',
        headers: {

        },

        body: formData

      })

      if(!response.ok) {
        console.error('Server error:', response.statusText)
        return;
      }

      const data = await response.json();
      console.log('Filtered library data:', data);

    } catch (error) {
      console.error('Error during API request:', error.message)
    }

  }

  return (
    <div className="modal-content">
      <div className='signup-login-container log-in-view'>
        <div className="image-container">
          <img
            src={process.env.PUBLIC_URL + "/listful_logo_graphic.png"}
            alt="Listful Logo"
            className="logo-image"
          />
        </div>
        <div className="text-container">
          <h2>Log In</h2>
          <form onSubmit={handleSubmitFilterSearch}>
            <input type="text" placeholder="Library ID" />
            <input type="email" placeholder="Title" />
            <input type="password" placeholder="Author" />
            <input type="password" placeholder="Rating" />
            <input type="password" placeholder="Ownership" />

            {/* <button type="submit">{userState ? 'Sign Up' : 'Log In'}</button> */}
             <button type="submit"> Search Library </button>
          </form>
          <p>
            {/* {userState ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button type="button" onClick={toggleSignUp}>
              Login
            </button> */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilterLibrary;
