import React, { Component } from 'react';
import Metrics from '../Metrics/Metrics';
import { addExerciseHistory, deleteExerciseHistory } from '../../api/WorkoutHistory';
import { setExerciseStatus } from '../../api/ExerciseStatus';

import './Exercise.css';

class Exercise extends Component {

  state = {
    // Seed data
    exercise: this.props.exercise
  }

  handleExerciseDone = (e) => {
    const id = this.props.userId;
    const workoutDay = this.props.workoutDay;
    const muscle = this.props.routine.muscle;
    const exercise = this.state.exercise;

    if (!exercise.metrics.done) {
      this.setState((prevState) => ({
        exercise: { ...prevState.exercise, metrics: { ...prevState.exercise.metrics, done: true } }
      }));

      addExerciseHistory(id, muscle, exercise)
        .then(() => setExerciseStatus(id, workoutDay, muscle, exercise.name, true))
        .catch(e => {
          console.error(e);
          this.setState((prevState) => ({
            exercise: { ...prevState.exercise, metrics: { ...prevState.exercise.metrics, done: false } }
          }));
        });

    } else {
      this.setState((prevState) => ({
        exercise: { ...prevState.exercise, metrics: { ...prevState.exercise.metrics, done: false } }
      }));

      deleteExerciseHistory(id, exercise)
        .then(() => setExerciseStatus(id, workoutDay, muscle, exercise.name, false))
        .catch(e => {
          console.error(e);
          this.setState((prevState) => ({
            exercise: { ...prevState.exercise, metrics: { ...prevState.exercise.metrics, done: true } }
          }));
        });
    }
  }

  handleExerciseDelete = (e) => {
    e.preventDefault();
    console.log('Deleting exercise...');
  }

  render() {
    const exercise = this.state.exercise;
    const exerciseClassName = this.props.edit ? 'edit' : '';

    return (
      <div className={`Exercise ${exerciseClassName}`}>
        {this.props.edit &&
          <button onClick={this.handleExerciseDelete} className="delete-button mdc-icon-button material-icons">clear</button>
        }
        {exercise.metrics.done ? 
          <button onClick={this.handleExerciseDone} className="status-button mdc-icon-button material-icons fill">check_circle</button> :
          <button onClick={this.handleExerciseDone} className="status-button mdc-icon-button material-icons">check_circle_outline</button>
        }
        <div className='name'>{exercise.name}</div>
        <Metrics metricType='weight'
          userId={this.props.userId}
          workoutDay={this.props.workoutDay}
          routine={this.props.routine}
          exercise={exercise}
          metricValue={exercise.metrics.weight}
          edit={this.props.edit}
          save={this.props.save}
          handleSaveSubmit={this.props.handleSaveSubmit} />
        <Metrics metricType='reps'
          userId={this.props.userId}
          workoutDay={this.props.workoutDay}
          routine={this.props.routine}
          exercise={exercise}
          metricValue={exercise.metrics.reps}
          edit={this.props.edit}
          save={this.props.save}
          handleSaveSubmit={this.props.handleSaveSubmit} />
        <Metrics metricType='sets'
          userId={this.props.userId}
          workoutDay={this.props.workoutDay}
          routine={this.props.routine}
          exercise={exercise}
          metricValue={exercise.metrics.sets}
          edit={this.props.edit}
          save={this.props.save}
          handleSaveSubmit={this.props.handleSaveSubmit} />
      </div>
    );
  }
}

export default Exercise;
