import React, { Component } from 'react';
import { UserContext } from '../UserContext';

import './RoutineDayPicker.css';

class RoutineDayPicker extends Component {
  static contextType = UserContext;

  handleClick = (dayOfWeek) => {
    this.context.updateDayOfWeek(dayOfWeek);
  }

  render() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    const selectedDay = this.context.dayOfWeek;

    return (
      <div className='RoutineDayPicker'>
        {days.map (day => 
          <span 
            key={day}
            onClick={() => this.handleClick(day)}
            className={`routine-day ${today === day ? 'today' : ''} ${selectedDay === day ? 'active' : ''}`}>{day.charAt(0)}</span>
        )}
      </div>
    );
  }
}

export default RoutineDayPicker;
