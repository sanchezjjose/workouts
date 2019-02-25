import React, { Component } from 'react';
import Routine from '../Routine/Routine';
import RoutineDayPicker from '../RoutineDayPicker/RoutineDayPicker';

import './Home.css';

class Home extends Component {

  render() {
    return (
      <div className='Home'>
        <div className='content-wrapper'>
          <div className='content'>
            <RoutineDayPicker
              dayOfWeek={this.props.dayOfWeek}
              handleDayChange={this.props.handleDayChange} />
            <Routine
              key={`${this.props.dayOfWeek}-routine`}
              userId={this.props.user.id}
              workouts={this.props.workouts}
              history={this.props.history}
              forceGlobalUpdate={this.props.forceGlobalUpdate}

              user={this.props.user}
              favorites={this.props.favorites}
              userObj={this.props.userObj}
              handleUserChange={this.props.handleUserChange}
              dayOfWeek={this.props.dayOfWeek}
              cancelMode={this.props.cancelMode}
              editMode={this.props.editMode}
              saveMode={this.props.saveMode} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
