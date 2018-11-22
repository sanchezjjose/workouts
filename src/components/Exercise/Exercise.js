import React, { Component } from 'react';
import { addExerciseHistory, deleteExerciseHistory } from '../../api/WorkoutsAPI';

import './Exercise.css';

class Exercise extends Component {

  state = {
    exerciseDone: false
  }

  handleExerciseDone = (e, muscle, exercise) => {
    const date = new Date();
    const historicalDate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
    const id = this.props.userId;

    if (!this.state.exerciseDone) {
      e.target.innerText = 'check_circle';
      e.target.classList.add('fill');

      // Save to history
      // addExerciseHistory(id, historicalDate, muscle, exercise)
      //   .then(result => {
      //     console.log('Successfully saved workout to history.');
      //   })
      //   .catch(e => {
      //     console.error(e);
      //   });

    } else {
      e.target.innerText = 'check_circle_outline';
      e.target.classList.remove('fill');

      // Remove from history
      // deleteExerciseHistory(id, historicalDate, muscle, exercise)
      //   .then(result => {
      //     console.log('Successfully removed workout to history.');
      //   })
      //   .catch(e => {
      //     console.error(e);
      //   });
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
