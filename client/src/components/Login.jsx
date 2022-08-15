import React, { useState } from 'react';
import { PropTypes } from 'prop-types';

function Login( {login, create} ) {

  const [username, setUser] = useState('');
  const [password, setPass] = useState('');

  const handleInputChange = (event) => {
    const {target} = event;
    const {value} = target;
    const {name} = target;
    if (name === 'password') {
      setPass(value);
    } else {
      setUser(value);
    }
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    console.log(username, password);
    if (id === 1) {
      login(username, password);
    } else {
      create(username, password);
    }
  };

  return (
    <form id='sign-in' onSubmit={(e) => handleSubmit(e)}>

      <input
        type='text'
        className='login-input'
        name='username'
        minLength='8'
        placeholder='Username'
        required
        onChange={handleInputChange}>
      </input>
      <input
        type='password'
        className='login-input'
        name='password'
        minLength='8'
        required
        placeholder='Password'
        autoComplete='true'
        onChange={handleInputChange}>
      </input>
      <button
        id='login'
        className='login-button'
        type='button'
        onClick={(e) => handleSubmit(e, 1)}
      >
        Log Into Your Account
      </button>
      <button
        id='create'
        className='login-button'
        type='button'
        onClick={(e) => handleSubmit(e, 2)}
      >
        Create a New Account
      </button>
    </form>
  );
}

export default Login;

Login.propTypes = {
  login: PropTypes.func,
  create: PropTypes.func
};