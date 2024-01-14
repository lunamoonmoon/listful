import React, { useState } from 'react';
import './SignUpLogIn.scss';

const SignUpLogIn = ({ closeModal, setIsSignUp }) => {
  const [isSignUp, setIsSignUpLocal] = useState(true);

  const toggleSignUp = () => {
    setIsSignUpLocal((prevIsSignUp) => !prevIsSignUp);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // Implement authentication logic here with the routes we created - once signed up, render the catalogue page component
  //   if (isSignUp) {
  //     console.log('Sign-up submitted');
  //   } else {
  //     console.log('Login submitted');
  //   }
  //   setIsSignUp(!isSignUp);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Implement authentication logic here with the routes we created - once signed up, render the catalogue page component
    if (isSignUp) {
      console.log('Sign-up submitted');
    } else {
      console.log('Login submitted');
    }
  
    // Toggle the value of isSignUp
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="modal-content">
      <div className={`signup-login-container ${isSignUp ? 'sign-up-view' : 'log-in-view'}`}>
        <div className="image-container">
          <img
            src={process.env.PUBLIC_URL + "/listful_logo_graphic.png"}
            alt="Listful Logo"
            className="logo-image"
          />
        </div>
        <div className="text-container">
          <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
          <form onSubmit={handleSubmit}>
            {isSignUp ? <input type="text" placeholder="Name" /> : null}
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
          </form>
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button type="button" onClick={toggleSignUp}>
              {isSignUp ? 'Log In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpLogIn;
