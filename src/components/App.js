import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UserContext } from './UserContext';

import { getUser } from '../api/Users';
import UserWorkouts from '../models/Workouts';
import UserHistory from '../models/History';
import UserSettings from '../models/Settings';
import Landing from './Landing/Landing';
import Home from './Home/Home';
import Progress from './Progress/Progress';
import Favorites from './Favorites/Favorites';
import NavigationBar from './NavigationBar/NavigationBar';
import Footer from './Footer/Footer';

import './App.css';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const today = days[new Date().getDay()];

class App extends Component {

  updateMode = (edit, save, cancel) => {
    this.setState({ editMode: edit, saveMode: save, cancelMode: cancel });
  }

  updateDayOfWeek = (dayOfWeek) => {
    this.setState({ dayOfWeek: dayOfWeek });
  }

  updateSettings = (settings) => {
    this.setState({ settings: settings });
  }

  updateWorkouts = (workouts) => {
    this.setState({ workouts: workouts });
  }

  updateHistory = (history) => {
    this.setState({ history: history });
  }

  state = {
    user: {},
    settings: {},
    workouts: {},
    history: {},
    dayOfWeek: today,
    editMode: false,
    saveMode: false,
    cancelMode: false,
    updateSettings: this.updateSettings,
    updateMode: this.updateMode,
    updateDayOfWeek: this.updateDayOfWeek,
    updateWorkouts: this.updateWorkouts,
    updateHistory: this.updateHistory
  };

  componentDidMount() {
    const id = window.location.pathname.split('/')[1];

    if (id.length > 0) {
      getUser(id)
        .then(user => {
          this.setState({
            user: user,
            settings: new UserSettings(user.settings),
            workouts: new UserWorkouts(user.workouts),
            history: new UserHistory(user.history),
          });
        })
        .catch(err => {
          window.location = '/';
        });
    }
  }

  render() {
    const settings = this.state.settings;
    const colorMode = typeof settings.getMode === 'function' ? settings.getMode() : '';
    const isLoading = typeof this.state.user.id !== 'string';
    const loadingDiv = <div>Loading...</div>;

    document.querySelector('body').classList = [colorMode];

    return (
      <Router>
        <UserContext.Provider value={this.state}>
          <div className={`App ${colorMode}`}>
            <Route exact path="/" component={Landing}/> 
            <Route exact={true} path='/:user_id' render={() => (
              <div className='container home'>
                <NavigationBar />
                {isLoading ? loadingDiv : <Home />}
                <Footer activeTab='home' />
              </div>
            )}/>
            <Route exact={true} path='/:user_id/progress' render={() => (
              <div className='container progress'>
                <NavigationBar />
                {isLoading ? loadingDiv : <Progress />}
                <Footer activeTab='progress' />
              </div>
            )}/>
            <Route exact={true} path='/:user_id/favorites' render={() => (
              <div className='container favorites'>
                <NavigationBar />
                {isLoading ? loadingDiv : <Favorites />}
                <Footer activeTab='favorites' />
              </div>
            )}/>
          </div>
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;
