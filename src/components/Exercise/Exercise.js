import React, { Component } from 'react';
import { addExerciseHistory, deleteExerciseHistory } from '../../api/WorkoutHistory';
import { setExerciseStatus } from '../../api/ExerciseStatus';
import { updateExerciseMetrics } from '../../api/ExerciseMetrics';

import './Exercise.css';

class Exercise extends Component {

  state = {
    // Seed data
    exercise: this.props.exercise
  }

  touchStartX = 0;
  touchEndX = 0;

  handleTouchStart = (e) => {
    this.touchStartX = e.changedTouches[0].clientX;
    this.touchStartY = e.changedTouches[0].clientY;
  }

  handleTouchEnd = (e) => {
    if (this.touchStartX === null || this.touchStartY === null) {
      return;
    }

    const currentX = e.changedTouches[0].clientX;
    const currentY = e.changedTouches[0].clientY;
    const diffX = this.touchStartX - currentX;
    const diffY = this.touchStartY - currentY;
    const swipedLeft = diffX > 0;
    const swipedHorizontal = Math.abs(diffX) > Math.abs(diffY);

    if (swipedHorizontal) {
      const metric = e.target.dataset.metric;
      const increment = metric === 'weight' ? 5 : 1;
      const initialValue = e.target.innerText;
      const finalValue = swipedLeft ? +initialValue + increment : +initialValue - increment;

      if (!isNaN(finalValue) && finalValue > 0) {
        const id = this.props.userId;
        const workoutDay = this.props.workoutDay;
        const muscle = this.props.routine.muscle;
        const exercise = this.state.exercise;

        let newMetrics = { ...this.state.exercise.metrics };
        if (metric === 'weight') {
          newMetrics = { ...this.state.exercise.metrics, weight: finalValue };
        } else if (metric === 'reps') {
          newMetrics = { ...this.state.exercise.metrics, reps: finalValue };
        } else if (metric === 'sets') {
          newMetrics = { ...this.state.exercise.metrics, sets: finalValue };
        }

        this.setState((prevState) => ({
          exercise: { ...prevState.exercise, metrics: newMetrics }
        }));

        updateExerciseMetrics(id, workoutDay, muscle, exercise.name, newMetrics)
          .then(() => {
            console.log(`Successfully changed ${metric} from ${initialValue} to ${finalValue}...`);
          })
          .catch(err => {
            console.error(err);
            this.setState((prevState) => ({
              exercise: { ...prevState.exercise, metrics: { ...prevState.exercise.metrics, weight: initialValue } }
            }));
          })
      }
    }
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
        <div className='Metric weight' data-metric='weight' onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd}>{exercise.metrics.weight}</div>
        <div className='Metric reps' data-metric='reps' onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd}>{exercise.metrics.reps}</div>
        <div className='Metric sets' data-metric='sets' onTouchStart={this.handleTouchStart} onTouchEnd={this.handleTouchEnd}>{exercise.metrics.sets}</div>
      </div>
    );
  }
}

export default Exercise;
