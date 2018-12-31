import React, { Component } from 'react';

import './RoutineDayPicker.css';

class RoutineDayPicker extends Component {

  handleClick = (dayOfWeek) => {
    this.props.handleDayChange(dayOfWeek);
  }

  render() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfweek = this.props.dayOfWeek;

    return (
      <div className='RoutineDayPicker'>
        {days.map (day => 
          <span 
            key={day}
            onClick={() => this.handleClick(day)}
            className={`routine-day ${dayOfweek === day ? 'active' : ''}`}>{day.charAt(0)}</span>
        )}
      </div>
    );
  }
}

export default RoutineDayPicker;
