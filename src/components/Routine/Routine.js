import React, { Component } from 'react';
import Exercise from '../Exercise/Exercise';
import RoutineModal from '../RoutineModal/RoutineModal';
import { saveRoutine } from '../../api/Routine';

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

  handleStartWorkout = (e) => {
    e.preventDefault();

    const dayOfWeek = this.props.dayOfWeek;
    const routine = this.props.userObj.getRoutineByDay(dayOfWeek);
    const today = new Date();
    const todayDateFormatted = `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`;
    const user = this.props.user;

    // Set date on workout for historical purposes
    user.routines[dayOfWeek].date = todayDateFormatted;

    // Reset all exercise status
    routine.forEach(routineType => {
      routineType.workouts.forEach(workout => {
        workout.exercises.forEach(exercise => {
          user.routines[dayOfWeek][routineType.type][workout.name][exercise.name].done = false;
        });
      });
    });

    saveRoutine(user.id, user.routines[dayOfWeek], dayOfWeek)
      .then(() => {
        this.props.handleUserChange(user, false, false);
      });
  }

  isTodaysWorkoutStarted = (workoutDateFormatted) => {
    const today = new Date();
    const todayDateFormatted = `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`;

    return todayDateFormatted === workoutDateFormatted;
  }

  render() {
    const dayOfWeek = this.props.dayOfWeek;
    const routine = this.props.userObj.getRoutineByDay(dayOfWeek);
    const workoutDateFormatted = this.props.userObj.getWorkoutDate(dayOfWeek);
    const workoutStarted = this.isTodaysWorkoutStarted(workoutDateFormatted);
    const workoutStartedClassName = workoutStarted ? 'workout-started' : '';

    return (
      <div className={`Routine ${workoutStartedClassName}`}>
        {this.state.message.length > 0 &&
          <div className={`success-banner`}>{this.state.message}</div>
        }
        <div className={`routine-heading ${this.props.editMode ? 'save-mode' : ''}`}>
          <div className='weekday'>{routine.day} Routine</div>
          {workoutDateFormatted && 
            <div className='subtitle'>{workoutDateFormatted}</div>
          }
          {!workoutStarted &&
            <button onClick={this.handleStartWorkout} className='start-workout-button'>Start Workout</button>
          }
        </div>
        {routine.map (routineType =>
          routineType.workouts.map (workout =>
            <div key={workout.name} className='group'>
              {routineType.type === 'weight' ? (
                <div className='header'>
                  <div className='workout-name'>{workout.name}</div>
                  <span className='weight'>Weight</span>
                  <span className='reps'>Reps</span>
                  <span className='sets'>Sets</span>
                </div>
              ) : (
                <div className='header'>
                  <div className='workout-name'>{workout.name}</div>
                  <span className='weight'>Time</span>
                  <span className='reps'>Distance</span>
                  <span className='sets'>Kcal</span>
                </div>
              )}
              {workout.exercises.map (exercise =>
                <Exercise
                  key={exercise.name}
                  user={this.props.user}
                  userObj={this.props.userObj}
                  editMode={this.props.editMode}
                  saveMode={this.props.saveMode}
                  handleUserChange={this.props.handleUserChange} 
                  displayMessage={this.displayMessage}
                  workoutStarted={workoutStarted}
                  routine={routine}
                  routineType={routineType.type}
                  workout={workout}
                  exercise={exercise} />
              )}
            </div>
          )
        )}
        <RoutineModal 
          user={this.props.user}
          userObj={this.props.userObj}
          dayOfWeek={routine.day}
          handleUserChange={this.props.handleUserChange}
          displayMessage={this.displayMessage} />
      </div>
    );
  }
}

export default Routine;
