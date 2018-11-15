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
const workoutsDB = require('./workouts.json');

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      workout: {}
    };
  }

  componentDidMount() {
    const id = window.location.pathname.split('/')[1];

    if (id.length > 0) {
      const user = { id: id };
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = days[new Date().getDay()];
      const query = Object.entries(workoutsDB.routine).filter(([ key ]) => key === dayOfWeek);

      if (query.length > 0) {
        const result = query[0][1];
        const routine = Object.entries(result).map(([ key, value ]) =>  {
          return {
            muscle: key,
            exercises: Object.entries(value)
          }
        });

        const workout = {
          day: dayOfWeek,
          routine: routine
        };

        this.setState({
          user: user,
          workout: workout
        });
      }
    }
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Route exact path="/" component={Landing}/> 
          <Route exact={true} path='/:user_id' render={() => (
            <div className='container'>
              <Home workout={this.state.workout} />
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
