import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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

  state = {
    user: {},
    settings: {},
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

  forceGlobalUpdate = () => {
    this.forceUpdate();
  }

  handleModeChange = (edit, save, cancel) => {
    this.setState({ editMode: edit, saveMode: save, cancelMode: cancel });
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
                userId={this.state.user.id}
                editMode={this.state.editMode}
                settings={this.state.settings}
                handleModeChange={this.handleModeChange}
              />
              {typeof this.state.user.id === 'string' ?
                <Home
                  userId={this.state.user.id}
                  workouts={this.state.workouts}
                  settings={this.state.settings}
                  history={this.state.history}
                  forceGlobalUpdate={this.forceGlobalUpdate}
                  handleDayChange={this.handleDayChange}
                  handleModeChange={this.handleModeChange}
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
          <Route exact={true} path='/:user_id/progress' render={() => (
            <div className='container progress'>
              <NavigationBar 
                userId={this.state.user.id}
                editMode={this.state.editMode}
                settings={this.state.settings}
                handleModeChange={this.handleModeChange}
              />
              {typeof this.state.user.id === 'string' ?
                <div>
                  <Progress history={this.state.history} />
                </div> :
                <div>Loading...</div>
              }
              <Footer userId={this.state.user.id} activeTab='progress' />
            </div>
          )}/>
          <Route exact={true} path='/:user_id/favorites' render={() => (
            <div className='container favorites'>
              <NavigationBar
                userId={this.state.user.id}
                editMode={this.state.editMode}
                settings={this.state.settings}
                handleModeChange={this.handleModeChange}
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
