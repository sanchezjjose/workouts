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
            <Routine key={`${this.context.dayOfWeek}-routine`}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
