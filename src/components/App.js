import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getUser } from '../api/Users';
import User from '../models/User';
import UserFavorites from '../models/Favorites';
import UserWorkouts from '../models/Workouts';
import Landing from './Landing/Landing';
import Home from './Home/Home';
import Favorites from './Favorites/Favorites';
import NavigationBar from './NavigationBar/NavigationBar';
import Footer from './Footer/Footer';

import './App.css';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = days[new Date().getDay()];

class App extends Component {

  state = {
    user: {},
    workouts: {},

    userObj: {},
    favorites: {},
    dayOfWeek: today,
    editMode: false,
    saveMode: false,
    cancelMode: false
  };

  componentDidMount() {
    const id = window.location.pathname.split('/')[1];

    if (id.length > 0) {
      getUser(id)
        .then(user => {
          this.setState({
            user: user,
            workouts: new UserWorkouts(user.workouts),

            userObj: new User(user),
            favorites: new UserFavorites(user.favorites)
          });
        })
        .catch(err => {
          window.location = '/';
        });
    }
  }

  handleUserChange = (user, editMode = false, saveMode = false, cancelMode = false) => {
    this.setState({
      user: user,
      userObj: new User(user),
      editMode: editMode,
      saveMode: saveMode,
      cancelMode: cancelMode
    });
  }

  handleFavoritesChange = (favorites) => {
    // TODO: May not need this. 'favorites' object already updated, just need to for re-render after adding / deleting a favorite exercise.
    this.setState({ favorites: favorites });
  }

  forceGlobalUpdate = () => {
    // this.setState({ workouts: workouts });
    this.forceUpdate();
  }

  handleDayChange = (dayOfWeek) => {
    this.setState({ dayOfWeek: dayOfWeek });
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Route exact path="/" component={Landing}/> 
          <Route exact={true} path='/:user_id' render={() => (
            <div className='container home'>
              <NavigationBar 
                user={this.state.user}
                userObj={this.state.userObj}
                handleUserChange={this.handleUserChange}
                dayOfWeek={this.state.dayOfWeek}
                editMode={this.state.editMode}
              />
              {this.state.user.routines ?
                <Home
                  user={this.state.user}
                  userObj={this.state.userObj}
                  favorites={this.state.favorites}
                  handleUserChange={this.handleUserChange}
                  handleDayChange={this.handleDayChange}
                  dayOfWeek={this.state.dayOfWeek}
                  editMode={this.state.editMode}
                  saveMode={this.state.saveMode}
                  cancelMode={this.state.cancelMode}
                /> :
                <div>Loading...</div>
              }
              <Footer userId={this.state.user.id} activeTab='home' />
            </div>
          )}/>
          <Route exact={true} path='/:user_id/favorites' render={() => (
            <div className='container favorites'>
              <NavigationBar
                user={this.state.user}
                userObj={this.state.userObj}
                handleUserChange={this.handleUserChange}
                editMode={this.state.editMode}
                saveMode={this.state.saveMode}
              />
              {this.state.user.favorites ?
                <Favorites
                  userId={this.state.user.id}
                  workouts={this.state.workouts}
                  forceGlobalUpdate={this.forceGlobalUpdate}
                  editMode={this.state.editMode}
                /> :
                <div>Loading...</div>
              }
              <Footer userId={this.state.user.id} activeTab='favorites' />
            </div>
          )}/>
        </div>
      </Router>
    );
  }
}

export default App;
