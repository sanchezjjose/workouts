import React, { Component } from 'react';
import { UserContext } from '../UserContext';
import Metrics from '../Metrics/Metrics';

// TODO: change from ../../api => ../../db
import { saveWorkout } from '../../api/Workouts';
import { saveWorkouts, deleteWorkout } from '../../api/History';

// import checkCircleFilled from './check_circle-24px.svg';
// import checkCircleOutline from './check_circle_outline-24px.svg';

import './Exercise.css';
import "@material/icon-button/dist/mdc.icon-button.min.css";

class Exercise extends Component {
  static contextType = UserContext;

  handleStatusChange = (status) => {
    const userId = this.props.userId;
    const workouts = this.props.workouts;
    const history = this.props.history;
    const exercise = this.props.exercise;
    const workoutDate = history.getDate(this.context.dayOfWeek);

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

    workouts.removeWorkoutDay(exercise.id, this.context.dayOfWeek);

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
    const modeClassName = this.context.editMode ? 'editing' : '';
    const metricTypes = exercise.type === 'weight' ? ['weight', 'reps', 'sets'] : ['time', 'distance', 'kcal'];
    const dayOfWeek = this.context.dayOfWeek;

    const history = this.props.history;
    const workoutDate = history.getDate(dayOfWeek);
    const exerciseDone = history.hasWorkout(workoutDate, exercise.id);

    const settings = this.props.settings;

    return (
      <div className={`Exercise ${modeClassName} ${this.props.workoutInProgress ? 'in-progress' : ''}`}>
        {this.context.editMode ?
          <button onClick={this.handleRemove} className="delete-button mdc-icon-button material-icons">clear</button> :
          (this.props.workoutInProgress &&
            (exerciseDone ?
              <button onClick={() => this.handleStatusChange(false)} className="status-button mdc-icon-button material-icons fill">check_circle</button> :
              <button onClick={() => this.handleStatusChange(true)} className="status-button mdc-icon-button material-icons">check_circle_outline</button>
              // <img className='status-button' onClick={() => this.handleStatusChange(false)} src={checkCircleFilled} alt="done" /> :
              // <img className='status-button' onClick={() => this.handleStatusChange(true)} src={checkCircleOutline} alt="not-done" />
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
            exercise={exercise}
            metricType={metricType}
            metricValue={exercise.metrics[metricType].value}
            metricUnit={exercise.metrics[metricType].unit}
            settingsUnit={settings.getUnit(metricType)}
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
