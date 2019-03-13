import React, { Component } from 'react';
import Metrics from '../Metrics/Metrics';

// TODO: change from ../../api => ../../db
import { saveWorkout } from '../../api/Workouts';
import { saveWorkouts, deleteWorkout } from '../../api/History';

import checkCircleFilled from './check_circle-24px.svg';
import checkCircleOutline from './check_circle_outline-24px.svg';

import './Exercise.css';
import "@material/icon-button/dist/mdc.icon-button.min.css";

class Exercise extends Component {

  handleStatusChange = (status) => {
    const userId = this.props.userId;
    const workouts = this.props.workouts;
    const history = this.props.history;
    const exercise = this.props.exercise;
    const workoutDate = history.getDate(this.props.dayOfWeek);

    workouts.setStatus(exercise.id, status);
    this.props.forceGlobalUpdate();

    let promise = {};

    if (status) {
      // TODO: consider if model should also save to the database.. (MVC pattern research)
      history.addWorkout(workoutDate, exercise);
      // TODO: change to historyDB.saveWorkout(...)
      promise = saveWorkouts(userId, history.getWorkouts());

    } else {
      history.deleteWorkout(workoutDate, exercise.id);
      // TODO: change to historyDB.deleteWorkout(...)
      promise = deleteWorkout(userId, workoutDate, exercise.id);
    }

    promise
      .then(() => {
          // TODO: change to workoutDB.save(...)
          saveWorkout(userId, workouts.get())
      })
      .catch(e => {
        alert('There was a problem with updating exercise status.');
        console.error(e);

        // Reset status
        workouts.setStatus(exercise.id, !status);
        this.props.forceGlobalUpdate();
      });
  }

  handleRemove = () => {
    const userId = this.props.userId;
    const workouts = this.props.workouts;
    const exercise = this.props.exercise;

    workouts.removeWorkoutDay(exercise.id, this.props.dayOfWeek);

    this.props.forceGlobalUpdate();
    this.props.displayMessage(`Deleted ${exercise.name}.`);

    saveWorkout(userId, workouts.get())
      .catch(e => {
        alert('There was a problem with deleting exercise.');
        console.error(e);
      });
  }

  render() {
    const exercise = this.props.exercise;
    const modeClassName = this.props.editMode ? 'editing' : '';
    const metricTypes = exercise.type === 'weight' ? ['weight', 'reps', 'sets'] : ['time', 'distance', 'kcal'];
    const dayOfWeek = this.props.dayOfWeek;

    const history = this.props.history;
    const workoutDate = history.getDate(dayOfWeek);
    const exerciseDone = history.hasWorkout(workoutDate, exercise.id);

    const settings = this.props.settings;

    return (
      <div className={`Exercise ${modeClassName} ${this.props.workoutInProgress ? 'in-progress' : ''}`}>
        {this.props.editMode ?
          <button onClick={this.handleRemove} className="delete-button mdc-icon-button material-icons">clear</button> :
          (this.props.workoutInProgress &&
            (exerciseDone ?
              <img className='status-button' onClick={() => this.handleStatusChange(false)} src={checkCircleFilled} alt="done" /> :
              <img className='status-button' onClick={() => this.handleStatusChange(true)} src={checkCircleOutline} alt="not-done" />
            )
          )
        }
        <div className='name'>{exercise.name}</div>
        {metricTypes.map(metricType =>
          <Metrics
            key={`${dayOfWeek}-${metricType}`}
            userId={this.props.userId}
            workouts={this.props.workouts}
            forceGlobalUpdate={this.props.forceGlobalUpdate}
            handleModeChange={this.props.handleModeChange}
            dayOfWeek={dayOfWeek}
            exercise={exercise}
            metricType={metricType}
            metricValue={exercise.metrics[metricType].value}
            metricUnit={exercise.metrics[metricType].unit}
            settingsUnit={settings.getUnit(metricType)}
            cancelMode={this.props.cancelMode}
            editMode={this.props.editMode}
            saveMode={this.props.saveMode}
            displayMessage={this.props.displayMessage}

            // TODO: Maybe use this instead of workouts?
            workout={this.props.workout}
          />
        )}
      </div>
    );
  }
}

export default Exercise;
