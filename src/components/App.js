import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getUser } from '../api/Users';
import User from '../models/User';
import Landing from './Landing/Landing';
import Home from './Home/Home';
import Favorites from './Favorites/Favorites';
import NavigationBar from './NavigationBar/NavigationBar';
import Footer from './Footer/Footer';

import './App.css';

class App extends Component {

  state = {
    user: {}
  };

  componentDidMount() {
    const id = window.location.pathname.split('/')[1];

    if (id.length > 0) {
      getUser(id)
        .then(user => {

          const userObj = new User(user);
          console.log(userObj);
          console.log(userObj.getWorkouts());
          console.log(userObj.getFavorites());

          this.setState({
            user: user
          });
        })
        .catch(err => {
          window.location = '/';
        });
    }
  }

  handleUserChange = (user) => {
    this.setState({
      user: user
    });
  }

  handleFavoritesChange = (user) => {
    this.setState({
      user: user
    });
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Route exact path="/" component={Landing}/> 
          <Route exact={true} path='/:user_id' render={() => (
            <div className='container'>
              <NavigationBar />
              {this.state.user.routine ?
                <Home user={this.state.user} handleUserChange={this.handleUserChange} /> :
                <div>Loading...</div>
              }
              <Footer userId={this.state.user.id} />
            </div>
          )}/>
          <Route exact={true} path='/:user_id/favorites' render={() => (
            <div className='container'>
              <NavigationBar />
              <Favorites user={this.state.user} handleFavoritesChange={this.handleFavoritesChange} />
              <Footer userId={this.state.user.id} />
            </div>
          )}/>
        </div>
      </Router>
    );
  }
}

export default App;
