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
    workout: {}
  };

  componentDidMount() {
    const id = window.location.pathname.split('/')[1];

    if (id.length > 0) {
      getUserWorkouts(id).then(user => {
        if (user) {
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          const dayOfWeek = 'Monday';
          // const dayOfWeek = days[new Date().getDay()];
          const query = Object.entries(user.routine).filter(([ key ]) => key === dayOfWeek);

          if (query.length > 0) {
            const result = query[0][1];
            const routines = Object.entries(result).map(([ key, value ]) =>  {
              return {
                muscle: key,
                exercises: Object.entries(value).map(([ key, value ]) => {
                  return {
                    name: key,
                    metrics: value
                  }
                })
              }
            });

            // TODO: Make Class instance / View Model
            const workout = {
              day: dayOfWeek,
              routines: routines
            };

            this.setState({
              user: user,
              workout: workout
            });
          }
        }
      });
    }
  }

  handleRoutineChange = (user) => {
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
