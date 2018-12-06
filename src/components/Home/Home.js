import React, { Component } from 'react';
import Routine from '../Routine/Routine';

import './Home.css';

class Home extends Component {

  render() {
    return (
      <div className='Home'>
        <div className='content-wrapper'>
          <h1>{this.props.user.name}'s Workout</h1>
          <div className='content'>
           {/* <Routine user={this.props.user} workout={this.props.workout} handleRoutineChange={this.props.handleRoutineChange} /> */}
           <Routine user={this.props.user} handleUserChange={this.props.handleUserChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
