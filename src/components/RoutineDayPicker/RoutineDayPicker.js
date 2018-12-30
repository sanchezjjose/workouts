import React, { Component } from 'react';

import './RoutineDayPicker.css';

class RoutineDayPicker extends Component {

  state = {
    dayOfWeek: this.props.userObj.dayOfWeek
  }

  handleClick = (e, dayOfWeek) => {
    this.setState({ dayOfWeek: dayOfWeek });
  }

  render() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
      <div className='RoutineDayPicker'>
        {days.map (day => 
          <span 
            key={day}
            onClick={e => this.handleClick(e, day)}
            className={`routine-day ${this.state.dayOfWeek === day ? 'active' : ''}`}>{day.charAt(0)}</span>
        )}
      </div>
    );
  }
}

export default RoutineDayPicker;
