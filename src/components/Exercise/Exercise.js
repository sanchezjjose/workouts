import React, { Component } from 'react';
import { addExerciseHistory, deleteExerciseHistory } from '../../api/WorkoutHistory';

import './Exercise.css';

class Exercise extends Component {

  state = {
    exerciseDone: false
  }

  handleExerciseDone = (e, muscle, exercise) => {
    const id = this.props.userId;

    if (!this.state.exerciseDone) {
      e.target.innerText = 'check_circle';
      e.target.classList.add('fill');

      addExerciseHistory(id, muscle, exercise)
        .catch(e => {
          console.error(e);

          // Reset
          e.target.innerText = 'check_circle_outline';
          e.target.classList.remove('fill');
        });

    } else {
      e.target.innerText = 'check_circle_outline';
      e.target.classList.remove('fill');

      deleteExerciseHistory(id, exercise)
        .catch(e => {
          console.error(e);

          // Reset
          e.target.innerText = 'check_circle';
          e.target.classList.add('fill');
        });
    }

    this.setState(prevState => ({
      exerciseDone: !prevState.exerciseDone
    }));
  }

  handleExerciseDelete = (e) => {
    e.preventDefault();
    console.log('Deleting exercise...');
  }

  render() {
    const routine = this.props.routine;
    const exercise = this.props.exercise;

    return (
      <div className='Exercise'>
        {this.props.edit &&
          <button onClick={e => this.handleExerciseDelete(e, routine.muscle, exercise)} className="delete-button mdc-icon-button material-icons">delete</button>
        }
        <button onClick={e => this.handleExerciseDone(e, routine.muscle, exercise)} className="status-button mdc-icon-button material-icons">check_circle_outline</button>
        <div className='name'>{exercise.name}</div>
        <div className='weight'>{exercise.metric.weight}</div>
        <div className='reps'>{exercise.metric.reps}</div>
        <div className='sets'>{exercise.metric.sets}</div>
      </div>
    );
  }
}

export default Exercise;
