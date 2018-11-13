import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

// import * as WorkoutsAPI from '../api/WorkoutsAPI';
// import * as Util from '../lib/Util';

import Landing from './Landing/Landing';
import Home from './Home/Home';
import Progress from './Progress/Progress';
import Footer from './Footer/Footer';

// import { TeamContext } from './TeamContext';

// TODO: Replace w/ DynamoDB
const workouts = require('./workouts.json');

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: { }
    };
  }

  componentDidMount() {
    const userId = window.location.pathname.split('/')[1];

    if (userId.length > 0) {
      const user = { id: userId };

      const nextWorkout = Object.entries(workouts.workouts)[0][0];
      const routine = Object.entries(workouts.workouts)[0][1];

      console.log(workouts);
      
      this.setState({
        user: user,
        workout: nextWorkout,
        routine: routine
      })
    }
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Route exact path="/" component={Landing}/> 
          <Route exact={true} path='/:user_id' render={() => (
            <div className='container'>
              <Home routine={this.state.routine} />
              <Footer userId={this.state.user.id} />
            </div>
          )}/>
          <Route exact={true} path='/:user_id/progress' render={() => (
            <div className='container'>
              <Progress />
              <Footer userId={this.state.user.id} />
            </div>
          )}/>
        </div>
      </Router>
    );
  }
}

export default App;
