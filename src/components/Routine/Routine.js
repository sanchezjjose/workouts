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
    this.setState({ editMode: !this.state.editMode });
  }

  handleSave = (e) => {
    e.preventDefault();
    this.setState({ saveMode: true });
    this.setState({ editMode: !this.state.editMode });
  }

  handleReset = (e) => {
    e.preventDefault();

    const props = this.props;
    const dayOfWeek = props.workout.day;

    // Reset all exercise status
    props.workout.routines.forEach(r => {
      r.exercises.forEach(e => {
        props.user.routine[dayOfWeek][r.muscle][e.name].done = false;
      });
    });

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
    return (
      <div className='Routine'>
        <div className={`routine-heading ${this.state.editMode ? 'save-mode' : ''}`}>
          <h2 className='weekday'>{this.props.workout.day}</h2>
          {this.state.editMode ? (
            <div className='mode-button-container editing'>
              <button onClick={this.handleSave} className='mode-button save'>Save</button>
              <button onClick={this.handleSave} className='mode-button cancel'>Cancel</button>
            </div>
          ) : (
            <div className='mode-button-container'>
              <button onClick={this.handleReset} className='mode-button reset'>Start Workout</button>
              <button onClick={this.handleSave} className='mode-button edit'>Edit</button>
            </div>
          )}
        </div>
        {this.props.routines.map (routine => {
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
                  userId={this.props.user.id} 
                  workoutDay={this.props.workout.day} 
                  routine={routine} 
                  exercise={exercise} 
                  edit={this.state.editMode} 
                  save={this.state.saveMode}
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
