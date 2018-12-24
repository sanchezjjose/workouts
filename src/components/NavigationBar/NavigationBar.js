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

    const workout = this.props.userObj.getWorkouts();
    const today = new Date();
    const date = `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`;
    const props = this.props;
    const workoutDay = workout.day;

    // Set date on workout for historical purposes
    props.user.routine[workoutDay].date = date;

    // Reset all exercise status
    workout.forEach(w => {
      w.routine.forEach(r => {
        r.exercises.forEach(e => {
          props.user.routine[workoutDay][w.type][r.muscle][e.name].done = false;
        });
      });
    });

    saveRoutine(props.user.id, props.user.routine[workoutDay], workoutDay)
      .then(() => {
        props.handleUserChange(props.user, false, false);
      });
  }

  render() {
    return (
      <header className='NavigationBar top-app-bar'>
        <section className='top-app-bar__section--align-start'>
          <span className='title'>Workouts</span>
        </section>
        {this.props.editMode ? (
          <section className='top-app-bar__section--align-end'>
            <a href='#' onClick={this.handleSave} className='mdc-top-app-bar__action-item' aria-label='Start Workout' alt='Start Workout'>Save</a>
            <a href='#' onClick={this.handleCancel} className='material-icons mdc-top-app-bar__action-item' aria-label='Edit' alt='Edit'>cancel</a>
          </section>
        ) : (
          <section className='top-app-bar__section--align-end'>
            <a href='#' onClick={this.handleStartWorkout} className='mdc-top-app-bar__action-item' aria-label='Start Workout' alt='Start Workout'>Start Workout</a>
            <a href='#' onClick={this.handleEdit} className='material-icons mdc-top-app-bar__action-item' aria-label='Edit' alt='Edit'>edit</a>
          </section>
        )}
      </header>
    );
  }
}

export default NavigationBar;
