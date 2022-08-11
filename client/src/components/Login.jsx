import React from 'react';

function Login() {

  return (
    <form id='sign-in'>
      <label id='user'>
        Username
        <input type='text' minLength='8' required></input>
      </label>
      <label id='pass'>
        Password
        <input type='password' minLength='8' required></input>
      </label>
      <button id='login' type='button' >Log Into Your Account</button>
      <button id='create' type='submit'>Create a New Account</button>
    </form>
  );
}

export default Login;