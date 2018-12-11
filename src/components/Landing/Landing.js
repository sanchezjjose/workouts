import React, { Component } from 'react';
import { getUser, createUser } from '../../api/Users';

import './Landing.css';

class Landing extends Component {

  state = {
    username: '',
    fullName: '',
    showRegister: false
  }

  handleUsernameOnChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handleFullNameOnChange = (e) => {
    this.setState({ fullName: e.target.value });
  }

  handleRegisterLinkClick = (e) => {
    e.preventDefault();
    this.setState({ showRegister: true });
  }

  handleSigninLinkClick = (e) => {
    e.preventDefault();
    this.setState({ showRegister: false });
  }

  handleRegistration = (e) => {
    createUser(this.state.username, this.state.fullName)
      .then(() => window.location = `/${this.state.username}`)
      .catch((err) => {
        alert(err);
        console.error(`There was an error registering.`, err);
      });
  }

  handleSignin = (e) => {
    getUser(this.state.username)
      .then((user) => {
        if (user.id) {
          return window.location = `/${this.state.username}`
        }

        throw new Error(`User ${this.state.username} does not exist.`);
      })
      .catch(err => {
        alert(err);
        console.error(`There was an error signing in.`, err);
      });
  }

  render() {
    return (
      <div className='Landing'>
        <div className='content'>
          <h2 className='welcome-message'><span>Welcome to Workouts.</span></h2>
          <p className='description'>
            {
              `
              Create workouts, track your progress, and easily adjust your routines on the go.
              `
            }
          </p>
          <div className='auth'>
            <input onChange={this.handleUsernameOnChange} type='text' value={this.state.username} />
            {this.state.showRegister ? (
              <div>
                <input onChange={this.handleFullNameOnChange} type='text' value={this.state.fullName} />
                <button onClick={this.handleRegistration} className='register'>Register</button>
                <a onClick={this.handleSigninLinkClick} href='/'>Sign In</a>
              </div>
            ) : (
              <div>
                <button onClick={this.handleSignin} className='signin'>Sign In</button>
                <a onClick={this.handleRegisterLinkClick} href='/'>Register</a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Landing;
