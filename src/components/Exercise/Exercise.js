import React, { Component } from 'react';
import Metrics from '../Metrics/Metrics';
import { saveExerciseHistory, removeExerciseHistory } from '../../api/WorkoutHistory';
import { saveExerciseStatus } from '../../api/ExerciseStatus';
import { saveRoutine } from '../../api/Routine';

import checkCircleFilled from './check_circle-24px.svg';
import checkCircleOutline from './check_circle_outline-24px.svg';

import './Exercise.css';
import "@material/icon-button/dist/mdc.icon-button.min.css";

class Exercise extends Component {

  handleExerciseStatus = (exerciseComplete) => {
    const user = this.props.user;
    const dayOfWeek = this.props.routine.day;
    const routineType = this.props.routineType;
    const date = user.routines[dayOfWeek].date;
    const workoutName = this.props.workout.name;
    const exercise = this.props.exercise;
    const updateExerciseHistory = exerciseComplete ? saveExerciseHistory : removeExerciseHistory;

    // Optimistic update
    user.routines[dayOfWeek][routineType][workoutName][exercise.name].done = exerciseComplete;
    this.props.handleUserChange(user, this.props.editMode, this.props.saveMode);

    updateExerciseHistory(user.id, date, exercise, workoutName)
      .then(
        saveExerciseStatus(user.id, dayOfWeek, routineType, workoutName, exercise.name, exerciseComplete)
      )
      .catch(e => {
        alert('There was a problem with updating exercise status.');
        console.error(e);

        // Reset update
        user.routines[dayOfWeek][routineType][workoutName][exercise.name].done = !exerciseComplete;
        this.props.handleUserChange(user, this.props.editMode, this.props.saveMode);
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
    const dayOfWeek = this.props.dayOfWeek;
    const exercise = this.props.exercise;
    const modeClassName = this.props.editMode ? 'editing' : '';
    const workoutStartedClassName = this.props.workoutInProgress ? 'workout-started' : '';
    // const workoutStartedClassName = this.props.workoutStartedToday ? 'workout-started' : '';
    const metricTypes = this.props.routineType === 'weight' ? ['weight', 'reps', 'sets'] : ['time', 'distance', 'kcal'];

    return (
      <div className={`Exercise ${modeClassName} ${workoutStartedClassName}`}>
        {this.props.editMode ?
          <button onClick={this.handleExerciseDelete} className="delete-button mdc-icon-button material-icons">clear</button> :
          (this.props.workoutInProgress &&
            (exercise.metrics.done ? 
              <img className='status-button' onClick={() => this.handleExerciseStatus(false)} src={checkCircleFilled} alt="done" /> :
              <img className='status-button' onClick={() => this.handleExerciseStatus(true)} src={checkCircleOutline} alt="not-done" />
            )
          )
        }
        <div className='name'>{exercise.name}</div>

        {/* {metricTypes.map(metricType =>
          <Metrics
            key={`${dayOfWeek}-${metricType}`}
            userId={this.props.user.id}
            workouts={this.props.workouts}
            forceGlobalUpdate={this.props.forceGlobalUpdate}

            exercise={exercise}
            metricType={metricType}
            metricValue={exercise.metrics[metricType].value}
            metricUnit={exercise.metrics[metricType].unit}
            settingsUnit={this.props.user.settings.units[metricType]}
            user={this.props.user}
            dayOfWeek={dayOfWeek}
            workout={this.props.workout}
            routine={this.props.routine}
            routineType={this.props.routineType}
            cancelMode={this.props.cancelMode}
            editMode={this.props.editMode}
            saveMode={this.props.saveMode}
            displayMessage={this.props.displayMessage}
            handleUserChange={this.props.handleUserChange}
          />
        )} */}
      </div>
    );
  }
}

export default Exercise;
