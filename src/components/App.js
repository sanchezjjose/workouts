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

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = days[new Date().getDay()];

class App extends Component {

  state = {
    user: {},
    userObj: {},
    dayOfWeek: today,
    editMode: false,
    saveMode: false
  };

  componentDidMount() {
    const id = window.location.pathname.split('/')[1];

    if (id.length > 0) {
      getUser(id)
        .then(user => {
          this.setState({
            user: user,
            userObj: new User(user)
          });
        })
        .catch(err => {
          window.location = '/';
        });
    }
  }

  handleUserChange = (user, editMode = false, saveMode = false) => {
    this.setState({
      user: user,
      userObj: new User(user),
      editMode: editMode,
      saveMode: saveMode
    });
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
                saveMode={this.state.saveMode}
              />
              {this.state.user.routines ?
                <Home
                  user={this.state.user}
                  userObj={this.state.userObj}
                  handleUserChange={this.handleUserChange}
                  handleDayChange={this.handleDayChange}
                  dayOfWeek={this.state.dayOfWeek}
                  editMode={this.state.editMode}
                  saveMode={this.state.saveMode}
                /> :
                <div>Loading...</div>
              }
              <Footer userId={this.state.user.id} />
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
                  user={this.state.user}
                  userObj={this.state.userObj}
                  editMode={this.state.editMode}
                  handleUserChange={this.handleUserChange}
                /> :
                <div>Loading...</div>
              }
              <Footer userId={this.state.user.id} />
            </div>
          )}/>
        </div>
      </Router>
    );
  }
}

export default App;
