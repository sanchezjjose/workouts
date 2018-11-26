import React, { Component } from 'react';
import { addExerciseHistory, deleteExerciseHistory } from '../../api/WorkoutHistory';
import { setExerciseStatus } from '../../api/ExerciseStatus';

import './Exercise.css';

class Exercise extends Component {

  state = {
    // Seed data
    exerciseDone: this.props.exercise.metric.done
  }

  handleExerciseDone = (e, muscle, exercise) => {
    const id = this.props.userId;

    if (!this.state.exerciseDone) {
      this.setState({ exerciseDone: true });

      addExerciseHistory(id, muscle, exercise)
        .then(() => setExerciseStatus(id, muscle, exercise.name, true))
        .catch(e => {
          console.error(e);
          this.setState({ exerciseDone: false });
        });

    } else {
      this.setState({ exerciseDone: false });

      deleteExerciseHistory(id, exercise)
        .then(() => setExerciseStatus(id, muscle, exercise.name, false))
        .catch(e => {
          console.error(e);
          this.setState({ exerciseDone: true });
        });
    }
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
        {this.state.exerciseDone ? 
          <button onClick={e => this.handleExerciseDone(e, routine.muscle, exercise)} className="status-button mdc-icon-button material-icons fill">check_circle</button> :
          <button onClick={e => this.handleExerciseDone(e, routine.muscle, exercise)} className="status-button mdc-icon-button material-icons">check_circle_outline</button>
        }
        <div className='name'>{exercise.name}</div>
        <div className='weight'>{exercise.metric.weight}</div>
        <div className='reps'>{exercise.metric.reps}</div>
        <div className='sets'>{exercise.metric.sets}</div>
      </div>
    );
  }
}

export default Exercise;
