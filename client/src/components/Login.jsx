import React from 'react';

function Login() {

  return (
    <form id='sign-in'>
      <label id='user' className='login-label'>
        Username
        <input type='text' minLength='8' required></input>
      </label>
      <label id='pass' className='login-label'>
        Password
        <input type='password' minLength='8' required></input>
      </label>
      <button id='login' className='login-button' type='submit' >Log Into Your Account</button>
      <button id='create' className='login-button' type='submit'>Create a New Account</button>
    </form>
  );
}

export default Login;