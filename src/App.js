import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout'
import fire from './firebase/fire'
import Login from './containers/Login/Login'



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        user : {}
    }
    // this.authListerner = this.authListerner.bind(this);
  }
  componentDidMount() {
    this.authListener();
  }

  logout() {
    console.log('We are at the logout steps')
    fire.auth().signOut();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        console.log(user)
      } else {
        this.setState({ user: null });
        console.log('user not found but we in here somehow')
      }
    });
  }



  render() {
    return (
      <div className="App">
      {this.state.user === null? 
        <Login/>
        :
        <Layout logout={this.logout}/>
      }  
      </div>
    );
  }
}

export default App;
