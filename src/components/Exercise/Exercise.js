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

    workouts.setStatus(exercise.id, status);
    this.props.forceGlobalUpdate();

    let promise = {};

    if (status) {
      // TODO: consider if model should also save to the database.. (MVC pattern research)
      history.addWorkout(exercise);
      // TODO: change to historyDB.saveWorkout(...)
      promise = saveWorkouts(userId, history.getWorkouts());

    } else {
      history.deleteWorkout(exercise.id);
      // TODO: change to historyDB.deleteWorkout(...)
      promise = deleteWorkout(userId, exercise.id);
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
    const dayOfWeek = this.props.dayOfWeek;
    const exercise = this.props.exercise;
    const modeClassName = this.props.editMode ? 'editing' : '';
    const metricTypes = this.props.routineType === 'weight' ? ['weight', 'reps', 'sets'] : ['time', 'distance', 'kcal'];

    return (
      <div className={`Exercise ${modeClassName} ${this.props.workoutInProgress ? 'in-progress' : ''}`}>
        {this.props.editMode ?
          <button onClick={this.handleRemove} className="delete-button mdc-icon-button material-icons">clear</button> :
          (this.props.workoutInProgress &&
            (exercise.metrics.done ? 
              <img className='status-button' onClick={() => this.handleStatusChange(false)} src={checkCircleFilled} alt="done" /> :
              <img className='status-button' onClick={() => this.handleStatusChange(true)} src={checkCircleOutline} alt="not-done" />
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
