import React, { Component } from 'react';
import { saveRoutine } from '../../api/Routine';

import './NavigationBar.css';

class NavigationBar extends Component {

  handleEdit = (e) => {
    e.preventDefault();
    this.props.handleUserChange(this.props.user, true, false);
  }

  handleSave = (e) => {
    e.preventDefault();
    this.props.handleUserChange(this.props.user, false, true);
  }

  handleCancel = (e) => {
    e.preventDefault();
    this.props.handleUserChange(this.props.user, false, false);
  }

  handleStartWorkout = (e) => {
    e.preventDefault();

    const dayOfWeek = this.props.dayOfWeek;
    const routine = this.props.userObj.getRoutineByDay(dayOfWeek);
    const today = new Date();
    const date = `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`;
    const user = this.props.user;

    // Set date on workout for historical purposes
    user.routines[dayOfWeek].date = date;

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

  render() {
    return (
      <header className='NavigationBar top-app-bar'>
        <section className='top-app-bar__section--align-start'>
          <span className='title'>Workouts</span>
        </section>
        {this.props.editMode ? (
          <section className='top-app-bar__section--align-end editing'>
            <button onClick={this.handleSave} className='mdc-top-app-bar__action-item' aria-label='Start Workout' alt='Start Workout'>Save</button>
            <button onClick={this.handleCancel} className='material-icons mdc-top-app-bar__action-item' aria-label='Edit' alt='Edit'>cancel</button>
          </section>
        ) : (
          <section className='top-app-bar__section--align-end'>
            <button onClick={this.handleStartWorkout} className='start-workout-button mdc-top-app-bar__action-item' aria-label='Start Workout' alt='Start Workout'>Start Workout</button>
            <button onClick={this.handleEdit} className='material-icons mdc-top-app-bar__action-item' aria-label='Edit' alt='Edit'>edit</button>
          </section>
        )}
      </header>
    );
  }
}

export default NavigationBar;
