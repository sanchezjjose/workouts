import React, { Component } from 'react';
import Metrics from '../Metrics/Metrics';
import { addExerciseHistory, deleteExerciseHistory } from '../../api/WorkoutHistory';
import { setExerciseStatus } from '../../api/ExerciseStatus';

import './Exercise.css';

class Exercise extends Component {

  handleExerciseStatus = (exerciseComplete) => {
    const user = this.props.user;
    const workoutDay = this.props.workout.day;
    const muscle = this.props.routine.muscle;
    const exercise = this.props.exercise;
    const updateExerciseHistory = exerciseComplete ? addExerciseHistory : deleteExerciseHistory;

    updateExerciseHistory(user.id, exercise, muscle)
      .then(() => setExerciseStatus(user.id, workoutDay, muscle, exercise.name, exerciseComplete))
      .then(() => {
        user.routine[workoutDay][muscle][exercise.name].done = exerciseComplete;
        this.props.handleRoutineChange(user);
      })
      .catch(e => {
        console.error(e);
      });
  }

  handleExerciseDelete = (e) => {
    e.preventDefault();
    console.log('Deleting exercise...');
  }

  render() {
    const exercise = this.props.exercise;
    const exerciseClassName = this.props.edit ? 'edit' : '';

    return (
      <div className={`Exercise ${exerciseClassName}`}>
        {this.props.edit &&
          <button onClick={this.handleExerciseDelete} className="delete-button mdc-icon-button material-icons">clear</button>
        }
        {exercise.metrics.done ? 
          <button onClick={() => this.handleExerciseStatus(false)} className="status-button mdc-icon-button material-icons fill">check_circle</button> :
          <button onClick={() => this.handleExerciseStatus(true)} className="status-button mdc-icon-button material-icons">check_circle_outline</button>
        }
        <div className='name'>{exercise.name}</div>
        <Metrics metricType='weight'
          user={this.props.user}
          workout={this.props.workout}
          routine={this.props.routine}
          exercise={exercise}
          metricValue={exercise.metrics.weight}
          edit={this.props.edit}
          save={this.props.save}
          handleSaveSubmit={this.props.handleSaveSubmit} />
        <Metrics metricType='reps'
          user={this.props.user}
          workout={this.props.workout}
          routine={this.props.routine}
          exercise={exercise}
          metricValue={exercise.metrics.reps}
          edit={this.props.edit}
          save={this.props.save}
          handleSaveSubmit={this.props.handleSaveSubmit} />
        <Metrics metricType='sets'
          user={this.props.user}
          workout={this.props.workout}
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
