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
    }, 1500);
  }

  render() {
    const workout = this.props.userObj.getWorkouts();

    return (
      <div className='Routine'>
        {this.state.message.length > 0 &&
          <div className={`success-banner`}>{this.state.message}</div>
        }
        <div className={`routine-heading ${this.props.editMode ? 'save-mode' : ''}`}>
          <h2 className='weekday'>{workout.day}</h2>
        </div>
        {workout.map (w =>
          w.routine.map (r =>
            <div key={r.muscle} className='group'>
              {w.type === 'weight' ? (
                <div className='header'>
                  <h3 className='muscle'>{r.muscle}</h3>
                  <span className='weight'>Weight</span>
                  <span className='reps'>Reps</span>
                  <span className='sets'>Sets</span>
                </div>
              ) : (
                <div className='header'>
                  <h3 className='muscle'>{r.muscle}</h3>
                  <span className='weight'>Time</span>
                  <span className='reps'>Distance</span>
                  <span className='sets'>Kcal</span>
                </div>
              )}
              {r.exercises.map (exercise =>
                <Exercise key={exercise.name}
                  user={this.props.user}
                  workout={workout}
                  workoutType={w.type}
                  routine={r}
                  exercise={exercise}
                  editMode={this.props.editMode}
                  saveMode={this.props.saveMode}
                  displayMessage={this.displayMessage}
                  handleUserChange={this.props.handleUserChange} />
              )}
            </div>
          )
        )}
        <RoutineModal user={this.props.user} userObj={this.props.userObj} workoutDay={workout.day} handleUserChange={this.props.handleUserChange} displayMessage={this.displayMessage} />
      </div>
    );
  }
}

export default Routine;
