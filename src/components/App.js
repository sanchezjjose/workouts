import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getUser } from '../api/Users';
import UserWorkouts from '../models/Workouts';
import UserHistory from '../models/History';
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
    history: {},
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
            history: new UserHistory(user.history),
          });
        })
        .catch(err => {
          window.location = '/';
        });
    }
  }

  forceGlobalUpdate = () => {
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
                dayOfWeek={this.state.dayOfWeek}
                editMode={this.state.editMode}
              />
              {typeof this.state.user.id === 'string' ?
                <Home
                  userId={this.state.user.id}
                  workouts={this.state.workouts}
                  history={this.state.history}
                  forceGlobalUpdate={this.forceGlobalUpdate}
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
                editMode={this.state.editMode}
                saveMode={this.state.saveMode}
              />
              {typeof this.state.user.id === 'string' ?
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
