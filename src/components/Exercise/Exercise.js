import React, { Component } from 'react';
import Metrics from '../Metrics/Metrics';
import { saveExerciseHistory, removeExerciseHistory } from '../../api/WorkoutHistory';
import { saveExerciseStatus } from '../../api/ExerciseStatus';
import { saveRoutine } from '../../api/RoutineWorkouts';

import './Exercise.css';
import "@material/icon-button/dist/mdc.icon-button.min.css";

class Exercise extends Component {

  handleExerciseStatus = (exerciseComplete) => {
    const user = this.props.user;
    const workoutDay = this.props.workout.day;
    const workoutType = this.props.workoutType;
    const date = user.routine[workoutDay].date;
    const muscle = this.props.routine.muscle;
    const exercise = this.props.exercise;
    const updateExerciseHistory = exerciseComplete ? saveExerciseHistory : removeExerciseHistory;

    updateExerciseHistory(user.id, date, exercise, muscle)
      .then(() => 
        saveExerciseStatus(user.id, workoutDay, workoutType, muscle, exercise.name, exerciseComplete)
      )
      .then(() => {
        user.routine[workoutDay][workoutType][muscle][exercise.name].done = exerciseComplete;
        this.props.handleUserChange(user);
      })
      .catch(e => {
        console.error(e);
      });
  }

  handleExerciseDelete = (e) => {
    e.preventDefault();

    const user = this.props.user;
    const workoutDay = this.props.workout.day;
    const workoutType = this.props.workoutType;
    const muscle = this.props.routine.muscle;
    const exercise = this.props.exercise;
    const todaysRoutine = user.routine[workoutDay][workoutType];
    const exercises = todaysRoutine[muscle];

    delete exercises[exercise.name];

    if (Object.keys(exercises).length === 0) {
      delete todaysRoutine[muscle];
    }

    saveRoutine(user.id, todaysRoutine, workoutDay)
      .then(() => {
        this.props.handleUserChange(user);
      })
      .catch(e => {
        console.log(e);
      })
  }

  render() {
    const exercise = this.props.exercise;
    const exerciseClassName = this.props.edit ? 'edit' : '';
    const workoutDay = this.props.workout.day;
    const hasDate = this.props.user.routine[workoutDay].date ? true : false;
    const metricTypes = this.props.workoutType === 'weight' ? ['weight', 'reps', 'sets'] : ['time', 'distance', 'calories'];

    return (
      <div className={`Exercise ${exerciseClassName}`}>
        {this.props.edit &&
          <button onClick={this.handleExerciseDelete} className="delete-button mdc-icon-button material-icons">clear</button>
        }
        {exercise.metrics.done ? 
          <button onClick={() => this.handleExerciseStatus(false)} className="status-button mdc-icon-button material-icons fill" disabled={!hasDate}>check_circle</button> :
          <button onClick={() => this.handleExerciseStatus(true)} className="status-button mdc-icon-button material-icons" disabled={!hasDate}>check_circle_outline</button>
        }
        <div className='name'>{exercise.name}</div>

        {metricTypes.map(metricType =>
          <Metrics key={metricType}
            metricType={metricType}
            user={this.props.user}
            workout={this.props.workout}
            workoutType={this.props.workoutType}
            routine={this.props.routine}
            exercise={exercise}
            edit={this.props.edit}
            save={this.props.save}
            handleUserChange={this.props.handleUserChange}
            handleSaveSubmit={this.props.handleSaveSubmit} />
        )}
      </div>
    );
  }
}

export default Exercise;
