import React, { Component } from 'react';
import Exercise from '../Exercise/Exercise';

import './Routine.css';

import { MDCRipple } from '@material/ripple';
import "@material/fab/dist/mdc.fab.min.css";
import "@material/icon-button/dist/mdc.icon-button.min.css";

class Routine extends Component {

  state = {
    edit: false
  }

  handleRoutineEdit = (e) => {
    e.preventDefault();
    console.log('Edit clicked...');
    this.setState({ edit: !this.state.edit });
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
        <div className='routine-heading'>
          <h2 className='weekday'>{this.props.workout.day}</h2>
          <button onClick={this.handleRoutineEdit} className='edit'>Edit</button>
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
                <Exercise key={exercise.name} routine={routine} exercise={exercise} edit={this.state.edit} />
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
