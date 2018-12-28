import React, { Component } from 'react';
import Exercise from '../Exercise/Exercise';
import RoutineModal from '../RoutineModal/RoutineModal';

import './Routine.css';

class Routine extends Component {

  state = {
    message: ''
  }

  displayMessage = (message) => {
    this.setState({ 
      message: message 
    });

    setTimeout(() => {
      this.setState({ message: '' });
    }, 3000);
  }

  render() {
    const routine = this.props.userObj.getRoutineByDay();

    return (
      <div className='Routine'>
        {this.state.message.length > 0 &&
          <div className={`success-banner`}>{this.state.message}</div>
        }
        <div className={`routine-heading ${this.props.editMode ? 'save-mode' : ''}`}>
          <h2 className='weekday'>{routine.day}</h2>
        </div>
        {routine.map (routineType =>
          routineType.workouts.map (workout =>
            <div key={workout.name} className='group'>
              {routineType.type === 'weight' ? (
                <div className='header'>
                  <h3 className='muscle'>{workout.name}</h3>
                  <span className='weight'>Weight</span>
                  <span className='reps'>Reps</span>
                  <span className='sets'>Sets</span>
                </div>
              ) : (
                <div className='header'>
                  <h3 className='muscle'>{workout.name}</h3>
                  <span className='weight'>Time</span>
                  <span className='reps'>Distance</span>
                  <span className='sets'>Kcal</span>
                </div>
              )}
              {workout.exercises.map (exercise =>
                <Exercise
                  key={exercise.name}
                  user={this.props.user}
                  editMode={this.props.editMode}
                  saveMode={this.props.saveMode}
                  handleUserChange={this.props.handleUserChange} 
                  displayMessage={this.displayMessage}
                  routine={routine}
                  workoutType={routineType.type}
                  workout={workout}
                  exercise={exercise}
                />
              )}
            </div>
          )
        )}
        <RoutineModal 
          user={this.props.user}
          userObj={this.props.userObj}
          workoutDay={routine.day}
          handleUserChange={this.props.handleUserChange}
          displayMessage={this.displayMessage} />
      </div>
    );
  }
}

export default Routine;
