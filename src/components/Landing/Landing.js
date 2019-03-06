import React, { Component } from 'react';
import { getUser, createUser } from '../../api/Users';

import "@material/button/dist/mdc.button.min.css"
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
    e.preventDefault();

    if (this.state.username.length > 0) {
      createUser(this.state.username, this.state.fullName)
        .then(() => window.location = `/${this.state.username}`)
        .catch((err) => {
          alert(err);
          console.error(`There was an error registering.`, err);
        });
    }
  }

  handleSignin = (e) => {
    e.preventDefault();

    if (this.state.username.length > 0) {
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
  }

  componentDidMount() {
    if (typeof window.Particles === 'object' && window.innerWidth >= 320 && window.innerWidth <= 500) {
      window.Particles.init({ selector: '.Landing .background', connectParticles: true, speed: 0.3, maxParticles: 50 })
    }
  }

  render() {
    return (
      <div className='Landing'>
        <canvas className="background"></canvas>
        <div className='title'>Workouts</div>
        <div className='content'>
          {this.state.showRegister ? (
            <form className='auth' onSubmit={this.handleRegistration}>
              <div className='credentials'>
                <input type='text' className='username-input' placeholder='Username' onChange={this.handleUsernameOnChange} value={this.state.username} />
                <input type='text' className='full-name-input' placeholder='Full Name' onChange={this.handleFullNameOnChange} value={this.state.fullName} />
              </div>
              <div className='submit'>
                <input type='submit' className='mdc-button--unelevated button register-button' value='Register'/>
                <a className='link signin-link' onClick={this.handleSigninLinkClick} href='/'>Sign in</a>
              </div>
            </form>
          ) : (
            <form className='auth' onSubmit={this.handleSignin}>
              <div className='credentials'>
                <input type='text' className='username-input' placeholder='Username' onChange={this.handleUsernameOnChange} value={this.state.username} />
              </div>
              <div className='submit'>
                <input type='submit' className='mdc-button--unelevated button signin-button' value='Sign In'/>
                <a className='link register-link' onClick={this.handleRegisterLinkClick} href='/'>Register</a>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
};

export default Landing;
