import React, { useState, useReducer, useEffect} from 'react';
import './SignUpLogIn.scss';
import { loginReducer, loginState } from '../../hooks/loginReducer';

//LOGGED IN


const SignUpLogIn = ({ closeModal, setIsSignUp }) => {

  const [ userState, loginDispatch] = useReducer(loginReducer, loginState);
  //const { isLoggedIn } = loginState;
 
  //for testing
  useEffect(() => {
    // Close the modal when login state is set to 1
    if (userState.loginState === 1) {
      closeModal(); // Implement closeModal function to hide the modal
    }
  }, [userState]);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    //hard coded for testing
    loginDispatch({ type: 'SET_LOGIN', payload: 1 });
  
    // // Toggle the value of isSignUp
    // setIsSignUp(!isSignUp);
  };

  useEffect(() => {
  }, [userState.loginState]);

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
          <form onSubmit={handleSubmit}>
            {userState ? <input type="text" placeholder="Name" /> : null}
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            {/* <button type="submit">{userState ? 'Sign Up' : 'Log In'}</button> */}
             <button type="submit"> Login </button>
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

export default SignUpLogIn;
