import React, { Component } from 'react';
import Exercise from '../Exercise/Exercise';

import './Routine.css';

import { MDCRipple } from '@material/ripple';
import "@material/fab/dist/mdc.fab.min.css";
import "@material/icon-button/dist/mdc.icon-button.min.css";

class Routine extends Component {

  state = {
    saveMode: false,
    editMode: false
  }

  handleEdit = (e) => {
    e.preventDefault();
    this.setState({ editMode: true });
  }

  handleSave = (e) => {
    e.preventDefault();
    this.setState({ saveMode: true });
    this.setState({ editMode: false });
  }

  handleCancel = (e) => {
    e.preventDefault();
    this.setState({ editMode: false });
  }

  handleStartWorkout = (e) => {
    e.preventDefault();

    const today = new Date();
    const date = `${today.getMonth()+1}-${today.getDate()}-${today.getFullYear()}`;
    const props = this.props;
    const workoutDay = props.workout.day;

    props.user.routine[workoutDay].date = date;

    // Reset all exercise status
    props.workout.routines.forEach(r => {
      r.exercises.forEach(e => {
        props.user.routine[workoutDay][r.muscle][e.name].done = false;
      });
    });

    // Save Routine

    props.handleRoutineChange(props.user);
  }

  handleSaveSubmit = () => {
    if (this.state.saveMode === true) {
      this.setState({ saveMode: false });
    }
  }

  componentDidUpdate() {
    const fabButtonSelector = document.querySelector('.mdc-fab');
    if (fabButtonSelector) {
      new MDCRipple(fabButtonSelector);
    }
  }

  render() {
    const workoutDay = this.props.workout.day;
    const routines = this.props.workout.routines;

    return (
      <div className='Routine'>
        <div className={`routine-heading ${this.state.editMode ? 'save-mode' : ''}`}>
          <h2 className='weekday'>{workoutDay}</h2>
          {this.state.editMode ? (
            <div className='mode-button-container editing'>
              <button onClick={this.handleSave} className='mode-button save'>Save</button>
              <button onClick={this.handleCancel} className='mode-button cancel'>Cancel</button>
            </div>
          ) : (
            <div className='mode-button-container'>
              <button onClick={this.handleStartWorkout} className='mode-button reset'>Start Workout</button>
              <button onClick={this.handleEdit} className='mode-button edit'>Edit</button>
            </div>
          )}
        </div>
        {routines.map (routine => {
          return (
            <div key={routine.muscle} className='group'>
              <div className='header'>
                <h3 className='muscle'>{routine.muscle}</h3>
                <span className='weight'>Weight</span>
                <span className='reps'>Reps</span>
                <span className='sets'>Sets</span>
              </div>
              {routine.exercises.map (exercise => 
                <Exercise key={exercise.name} 
                  user={this.props.user} 
                  workout={this.props.workout} 
                  routine={routine} 
                  exercise={exercise} 
                  edit={this.state.editMode} 
                  save={this.state.saveMode}
                  handleRoutineChange={this.props.handleRoutineChange}
                  handleSaveSubmit={this.handleSaveSubmit} />
              )}
            </div>
          );
        })}
        <button className="mdc-fab add-exercise-button" aria-label="Add">
          <span className="mdc-fab__icon material-icons">add</span>
        </button>
      </div>
    );
  }
}

export default Routine;
