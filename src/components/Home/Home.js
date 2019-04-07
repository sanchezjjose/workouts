import React, { Component } from 'react';
import { UserContext } from '../UserContext';
import Routine from '../Routine/Routine';
import RoutineDayPicker from '../RoutineDayPicker/RoutineDayPicker';

import './Home.css';

class Home extends Component {
  static contextType = UserContext;

  render() {
    return (
      <div className='Home'>
        <div className='content-wrapper'>
          <div className='content'>
            <RoutineDayPicker />
            <Routine
              key={`${this.context.dayOfWeek}-routine`}
              userId={this.props.userId}
              workouts={this.props.workouts}
              settings={this.props.settings}
              history={this.props.history}
              forceGlobalUpdate={this.props.forceGlobalUpdate}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
