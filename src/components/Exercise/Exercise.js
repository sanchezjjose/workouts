import React, { Component } from 'react';
import { UserContext } from '../UserContext';
import Metrics from '../Metrics/Metrics';

// TODO: change from ../../api => ../../db
import { saveWorkout } from '../../api/Workouts';
import { saveWorkouts, deleteWorkout } from '../../api/History';

import checkCircleFilled from './check_circle-24px.svg';
import checkCircleOutline from './check_circle_outline-24px.svg';
import checkCircleFilledDark from './check_circle-24px-dark.svg';
import checkCircleOutlineDark from './check_circle_outline-24px-dark.svg';

import './Exercise.css';
import "@material/icon-button/dist/mdc.icon-button.min.css";

class Exercise extends Component {
  static contextType = UserContext;

  handleStatusChange = (status) => {
    const userId = this.context.user.id;
    const workouts = this.context.workouts;
    const history = this.context.history;
    const exercise = this.props.exercise;
    const workoutDate = history.getDate(this.context.dayOfWeek);

    workouts.setStatus(exercise.id, status);
    this.context.updateWorkouts(workouts);

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
        this.context.updateWorkouts(workouts);
      });
  }

  handleRemove = () => {
    const userId = this.context.user.id;
    const workouts = this.context.workouts;
    const exercise = this.props.exercise;

    workouts.removeWorkoutDay(exercise.id, this.context.dayOfWeek);

    this.context.updateWorkouts(workouts);
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

    const history = this.context.history;
    const workoutDate = history.getDate(dayOfWeek);
    const exerciseDone = history.hasWorkout(workoutDate, exercise.id);

    const settings = this.context.settings;
    const darkMode = settings.getMode() !== 'light';

    return (
      <div className={`Exercise ${modeClassName} ${this.props.workoutInProgress ? 'in-progress' : ''}`}>
        {this.context.editMode ?
          <button onClick={this.handleRemove} className="delete-button mdc-icon-button material-icons">clear</button> :
          (this.props.workoutInProgress &&
            (exerciseDone ?
              // <button onClick={() => this.handleStatusChange(false)} className="status-button mdc-icon-button material-icons fill">check_box</button> :
              // <button onClick={() => this.handleStatusChange(true)} className="status-button mdc-icon-button material-icons">check_box_outline_blank</button>
              <img className='status-button' onClick={() => this.handleStatusChange(false)} src={darkMode ? checkCircleFilledDark : checkCircleFilled} alt="done" /> :
              <img className='status-button' onClick={() => this.handleStatusChange(true)} src={darkMode ? checkCircleOutlineDark : checkCircleOutline} alt="not-done" />
            )
          )
        }
        <div className='name'>{exercise.name}</div>
        {metricTypes.map(metricType =>
          <Metrics
            key={`${dayOfWeek}-${metricType}`}
            workout={this.props.workout}
            exercise={exercise}
            metricType={metricType}
            metricValue={exercise.metrics[metricType].value}
            metricUnit={exercise.metrics[metricType].unit}
            settingsUnit={settings.getUnit(metricType)}
            displayMessage={this.props.displayMessage}
          />
        )}
      </div>
    );
  }
}

export default Exercise;
