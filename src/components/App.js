import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getUserWorkouts } from '../api/Users';
import Landing from './Landing/Landing';
import Home from './Home/Home';
import Progress from './Progress/Progress';
import Footer from './Footer/Footer';

import './App.css';

class App extends Component {

  state = {
    user: {},
    workout: []
  };

  getWorkout(workouts, dayOfWeek) {
    const workout = Object.entries(workouts[dayOfWeek]).map((workout) => {
      return {
        muscle: workout[0],
        exercises: Object.entries(workout[1]).map((exercise) => {
          return {
            name: exercise[0],
            metrics: exercise[1]
          };
        })
      };
    }).filter(w => w.muscle !== 'date');

    workout.day = dayOfWeek;

    return workout;
  }

  componentDidMount() {
    const id = window.location.pathname.split('/')[1];

    if (id.length > 0) {
      getUserWorkouts(id).then(user => {
        if (user) {
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const dayOfWeek = days[new Date().getDay()];
          const todaysWorkout = this.getWorkout(user.routine, 'Wednesday');

          // TODO: consider changing user.routine to user.workouts

          this.setState({
            user: user,
            workout: todaysWorkout
          });
        }
      });
    }
  }

  handleRoutineChange = (workouts, dayOfWeek) => {
    const workout = this.getWorkout(workouts, dayOfWeek);

    this.setState({
      workout: workout
    });
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <Route exact path="/" component={Landing}/> 
          <Route exact={true} path='/:user_id' render={() => (
            <div className='container'>
              <Home user={this.state.user} workout={this.state.workout} handleRoutineChange={this.handleRoutineChange} />
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
