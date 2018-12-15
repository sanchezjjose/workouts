import React, { Component } from 'react';
import { saveExerciseMetrics } from '../../api/ExerciseMetrics';

import './Metrics.css';

class Metrics extends Component {

  state = {
    metricValue: this.props.exercise.metrics[this.props.metricType],
    // edited is synonomous with being in 'draft' state.
    edited: false
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

    if (this.props.edit) {
      return;
    }

    const currentX = e.changedTouches[0].clientX;
    const currentY = e.changedTouches[0].clientY;
    const diffX = this.touchStartX - currentX;
    const diffY = this.touchStartY - currentY;
    const swipedLeft = diffX > 0;
    const swipedHorizontal = Math.abs(diffX) > Math.abs(diffY);

    if (swipedHorizontal) {
      const increment = this.props.metricType === 'weight' ? 5 : 1;
      const initialValue = e.target.value;
      const finalValue = swipedLeft ? +initialValue + increment : +initialValue - increment;

      if (!isNaN(finalValue) && finalValue >= 0) {
        this.setState({ metricValue: finalValue });
      }
    }
  }

  handleOnChange = (e) => {
    e.preventDefault();

    this.setState({
      metricValue: e.target.value,
      edited: true
    });
  }

  componentDidUpdate = (prevProps, prevState, prevContext) => {
    const metricValueChanged = this.state.metricValue !== prevState.metricValue;
    const metricValueEdited = this.state.edited;
    const saveButtonClicked = this.props.save;
    const inEditMode = this.props.edit;

    if ((metricValueChanged && !inEditMode) || (metricValueEdited && saveButtonClicked)) {
      this.setState({ edited: false });

      const id = this.props.user.id;
      const workoutDay = this.props.workout.day;
      const workoutType = this.props.workoutType;
      const muscle = this.props.routine.muscle;
      const exercise = this.props.exercise;

      saveExerciseMetrics(id, workoutDay, workoutType, muscle, exercise.name, this.props.metricType, this.state.metricValue)
        .then(() => {
          console.debug(`Changed ${this.props.metricType} metric for ${exercise.name} from ${prevProps.metricValue} to ${this.state.metricValue}.`);
          this.props.handleSaveSubmit();
        })
        .catch(err => {
          console.error(err);
          this.setState({ metricValue: prevProps.metricValue });
        });

      // Update user props and bubble up to parent component
      this.props.user.routine[workoutDay][workoutType][muscle][exercise.name][this.props.metricType] = this.state.metricValue;
      this.props.handleUserChange(this.props.user);
    }
  }

  render() {
    const metricValue = this.state.metricValue;
    const metricType = this.props.metricType;

    return (
      <input type='text' name={metricType} className={`Metric ${metricType}`}
        value={metricValue} 
        onTouchStart={this.handleTouchStart} 
        onTouchEnd={this.handleTouchEnd} 
        onChange={this.handleOnChange} 
        readOnly={!this.props.edit} />
    );
  }
}

export default Metrics;
