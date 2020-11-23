import React, { Component } from 'react';

import './App.css';

/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from './components/AuthHelperMethods';

//Our higher order component
import withAuth from './components/withAuth';

class App extends Component {

  state = {
    email: ''
  }
  /* Create a new instance of the 'AuthHelperMethods' compoenent*/
  Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
  }

  //Render the protected component
  render() {
    let name = null;
    if (this.props.confirm) {
      name = this.props.confirm.email;
    }
    //let name = this.props.confirm.email;
    console.log("Rendering Appjs!")
    return (

      <div className="App">
        <div className="App">
          <div className="main-page">
            <div className="top-section">
              <h1>Welcome, {name}</h1>
            </div>
            <div className="bottom-section">
              <button onClick={this._handleLogout}>LOGOUT</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//In order for this component to be protected, we must wrap it with what we call a 'Higher Order Component' 

export default withAuth(App);

