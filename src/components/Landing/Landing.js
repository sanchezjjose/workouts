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
    if (typeof window.Particles === 'object' && window.innerWidth >= 320) {
      window.Particles.init({ selector: '.Landing .background', connectParticles: true, speed: 0.3, maxParticles: 70 })
    }
  }

  render() {
    return (
      <div className='Landing'>
        <canvas className="background"></canvas>
        <div className='title'>Workouts</div>
        <div className='content'>
          <div className='auth'>
            <div className='credentials'>
              <input className='username-input' placeholder='Username' onChange={this.handleUsernameOnChange} type='text' value={this.state.username} />
            </div>
            <div className='submit'>
              <button className='mdc-button--unelevated button signin-button' onClick={this.handleSignin}>Sign In</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Landing;
