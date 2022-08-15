import React from 'react';
import axios from 'axios';
import Finder from './Finder.jsx';
import Login from './Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      finding: true,
      currentUser: ''
    };
    this.validateUser = this.validateUser.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  validateUser(user, pass) {
    console.log(user, pass);
    axios.get(`/user/${user}/${pass}`)
      .then((res) => {
        console.log(res);
        this.setState({loggedIn: true, currentUser: user});
      })
      .catch((err) => {
        console.log(err);
        alert('INVALID USERNAME OR PASSWORD');
      });
  }

  createUser = (user, pass) => {
    axios.post('/user', {username: user.toUpperCase(), password: pass})
      .then((res) => {
        console.log('here', res);
        if (res.data.errors) {
          alert(res.data.errors[0].message.toUpperCase());
        } else {
          console.log('Account Successfully Created', res);
          this.setState({loggedIn: true, currentUser: user.toUpperCase()});
        }
      })
      .catch((err) => console.log(err, 'INVALID USERNAME OR PASSWORD'));
  };



  render() {
    return (
      <>
        <div id='header'>
          <h1 id='title'>MTG Guide</h1>
          <div id='banner'>
            <h3 id='subtitle'>Explore the Realm <br></br> Grow your Collection</h3>
          </div>
          {this.state.loggedIn ? <Finder /> : <Login create={this.createUser} login={this.validateUser} />}
        </div>
      </>
    );
  }
}

export default App;