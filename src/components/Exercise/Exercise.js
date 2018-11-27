import React, { Component } from 'react';
import { addExerciseHistory, deleteExerciseHistory } from '../../api/WorkoutHistory';
import { setExerciseStatus } from '../../api/ExerciseStatus';
import { updateExerciseMetrics } from '../../api/ExerciseMetrics';

import './Exercise.css';

class Exercise extends Component {

  state = {
    // Seed data
    exerciseDone: this.props.exercise.metrics.done

    // TODO: set exercise state
  }

  handleExerciseDone = (e) => {
    const id = this.props.userId;
    const workoutDay = this.props.workoutDay;
    const muscle = this.props.routine.muscle;
    const exercise = this.props.exercise;

    if (!this.state.exerciseDone) {
      this.setState({ exerciseDone: true });

      addExerciseHistory(id, muscle, exercise)
        .then(() => setExerciseStatus(id, workoutDay, muscle, exercise.name, true))
        .catch(e => {
          console.error(e);
          this.setState({ exerciseDone: false });
        });

    } else {
      this.setState({ exerciseDone: false });

      deleteExerciseHistory(id, exercise)
        .then(() => setExerciseStatus(id, workoutDay, muscle, exercise.name, false))
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

  handleEditWeight = (e) => {
    const initialValue = +e.target.innerText;
    const finalValue = initialValue + 5;

    if (!isNaN(initialValue)) {
      const id = this.props.userId;
      const workoutDay = this.props.workoutDay;
      const muscle = this.props.routine.muscle;
      const exercise = this.props.exercise;

      updateExerciseMetrics(id, workoutDay, muscle, exercise)
        .then(() => {
          console.log(`Successfully increased weight from ${initialValue} to ${finalValue}...`);
        })
        .catch(err => {
          console.error(err);
        })
    }
  }

  render() {
    const exercise = this.props.exercise;

    return (
      <div className='Exercise'>
        {this.props.edit &&
          <button onClick={this.handleExerciseDelete} className="delete-button mdc-icon-button material-icons">delete</button>
        }
        {this.state.exerciseDone ? 
          <button onClick={this.handleExerciseDone} className="status-button mdc-icon-button material-icons fill">check_circle</button> :
          <button onClick={this.handleExerciseDone} className="status-button mdc-icon-button material-icons">check_circle_outline</button>
        }
        <div className='name'>{exercise.name}</div>
        <div onClick={this.handleEditWeight} className='weight'>{exercise.metrics.weight}</div>
        <div className='reps'>{exercise.metrics.reps}</div>
        <div className='sets'>{exercise.metrics.sets}</div>
      </div>
    );
  }
}

export default Exercise;
