import React, { Component } from 'react';
import Exercise from '../Exercise/Exercise';

import './Routine.css';

import { MDCRipple } from '@material/ripple';
import "@material/fab/dist/mdc.fab.min.css";
import "@material/icon-button/dist/mdc.icon-button.min.css";

class Routine extends Component {

  state = {
    save: false,
    edit: false
  }

  handleEdit = (e) => {
    e.preventDefault();
    this.setState({ edit: !this.state.edit });
  }

  handleSave = (e) => {
    e.preventDefault();
    this.setState({ save: true });
    this.setState({ edit: !this.state.edit });
  }

  handleSaveSubmit = () => {
    if (this.state.save === true) {
      console.log('AAAAA');
      this.setState({ save: false });
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
        <div className={`routine-heading ${this.state.edit ? 'save-mode' : ''}`}>
          <h2 className='weekday'>{this.props.workout.day}</h2>
          {this.state.edit &&
            <button onClick={this.handleSave} className='mode-button save'>Save</button>
          }
          <button onClick={this.handleEdit} className='mode-button edit'>Edit</button>
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
                  userId={this.props.userId} 
                  workoutDay={this.props.workout.day} 
                  routine={routine} 
                  exercise={exercise} 
                  edit={this.state.edit} 
                  save={this.state.save}
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
