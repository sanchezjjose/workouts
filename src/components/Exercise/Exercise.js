import React, { Component } from 'react';
import Metrics from '../Metrics/Metrics';
import { saveExerciseHistory, removeExerciseHistory } from '../../api/WorkoutHistory';
import { saveExerciseStatus } from '../../api/ExerciseStatus';
import { saveRoutine } from '../../api/Routine';

import './Exercise.css';
import "@material/icon-button/dist/mdc.icon-button.min.css";

class Exercise extends Component {

  handleExerciseStatus = (exerciseComplete) => {
    const user = this.props.user;
    const workoutDay = this.props.workout.day;
    const routineType = this.props.routineType;
    const date = user.routines[workoutDay].date;
    const workoutName = this.props.workout.name;
    const exercise = this.props.exercise;
    const updateExerciseHistory = exerciseComplete ? saveExerciseHistory : removeExerciseHistory;

    updateExerciseHistory(user.id, date, exercise, workoutName)
      .then(() => 
        saveExerciseStatus(user.id, workoutDay, routineType, workoutName, exercise.name, exerciseComplete)
      )
      .then(() => {
        user.routines[workoutDay][routineType][workoutName][exercise.name].done = exerciseComplete;
        this.props.handleUserChange(user, this.props.editMode, this.props.saveMode);
      })
      .catch(e => {
        console.error(e);
      });
  }

  handleExerciseDelete = (e) => {
    e.preventDefault();

    const user = this.props.user;
    const dayOfWeek = this.props.routine.day;
    const routineType = this.props.routineType;
    const workoutName = this.props.workout.name;
    const exerciseName = this.props.exercise.name;
    const todaysRoutine = user.routines[dayOfWeek];
    const exercises = todaysRoutine[routineType][workoutName];

    delete exercises[exerciseName];

    if (Object.keys(exercises).length === 0) {
      delete todaysRoutine[routineType][workoutName];
    }

    saveRoutine(user.id, todaysRoutine, dayOfWeek)
      .then(() => {
        this.props.handleUserChange(user, this.props.editMode, this.props.saveMode);
        this.props.displayMessage(`Deleted ${exerciseName} from ${workoutName} workout.`);
      })
      .catch(e => {
        console.log(e);
      })
  }

  render() {
    const exercise = this.props.exercise;
    const exerciseClassName = this.props.editMode ? 'editing' : '';
    const dayOfWeek = this.props.routine.day;
    const hasDate = this.props.user.routines[dayOfWeek].date ? true : false;
    const metricTypes = this.props.routineType === 'weight' ? ['weight', 'reps', 'sets'] : ['time', 'distance', 'kcal'];

    return (
      <div className={`Exercise ${exerciseClassName}`}>
        {this.props.editMode ?
          <button onClick={this.handleExerciseDelete} className="delete-button mdc-icon-button material-icons">clear</button> :
          (exercise.metrics.done ? 
            <button onClick={() => this.handleExerciseStatus(false)} className="status-button mdc-icon-button material-icons fill" disabled={!hasDate}>check_circle</button> :
            <button onClick={() => this.handleExerciseStatus(true)} className="status-button mdc-icon-button material-icons" disabled={!hasDate}>check_circle_outline</button>
          )
        }
        <div className='name'>{exercise.name}</div>

        {metricTypes.map(metricType =>
          <Metrics
            key={metricType}
            metricType={metricType}
            exercise={exercise}
            user={this.props.user}
            workout={this.props.workout}
            routine={this.props.routine}
            routineType={this.props.routineType}
            editMode={this.props.editMode}
            saveMode={this.props.saveMode}
            displayMessage={this.props.displayMessage}
            handleUserChange={this.props.handleUserChange}
          />
        )}
      </div>
    );
  }
}

export default Exercise;
