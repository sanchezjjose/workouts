import React, { Component } from 'react';
import Routine from '../Routine/Routine';

import './Home.css';

class Home extends Component {

  render() {
    const workout = this.props.workout;
    const routines = workout.routines || [];

    return (
      <div className='Home'>
      {routines.length > 0 ? (
        <div className='content-wrapper'>
          <h1>{this.props.user.name}'s Workout</h1>
          <div className='content'>
           <Routine user={this.props.user} workout={workout} handleRoutineChange={this.props.handleRoutineChange} />
          </div>
        </div>) : (
          <h1>Today is your well deserved day off! Kick back and enjoy!</h1>
        )
      }
      </div>
    );
  }
}

export default Home;
