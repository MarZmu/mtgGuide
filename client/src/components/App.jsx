import React from 'react';
import axios from 'axios';
import Finder from './Finder.jsx';
import Login from './Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      loggedIn: true,
      finding: true,
      collection: true
    };

  }


  render() {
    return (
      <>
        <div id='header'>
          <h1 id='title'>MTG Guide</h1>
          <div id='banner'>
            <h3 id='subtitle'>Explore the Realm <br></br> Grow your Collection</h3>
          </div>
          {!this.state.loggedIn && <Login />}
          <Finder />
        </div>
      </>
    );
  }
}

export default App;