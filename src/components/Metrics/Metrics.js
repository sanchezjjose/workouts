import React, { Component } from 'react';
import { saveExerciseMetrics } from '../../api/ExerciseMetrics';

import './Metrics.css';

class Metrics extends Component {

  state = {
    metricValue: this.props.exercise.metrics[this.props.metricType].value,
    metricUnit: this.props.exercise.metrics[this.props.metricType].unit,
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

    if (this.props.editMode) {
      return;
    }

    const currentX = e.changedTouches[0].clientX;
    const currentY = e.changedTouches[0].clientY;
    const diffX = this.touchStartX - currentX;
    const diffY = this.touchStartY - currentY;
    const swipedLeft = diffX > 0;
    const swipedHorizontal = Math.abs(diffX) > Math.abs(diffY);

    if (swipedHorizontal) {
      let increment = this.props.metricType === 'weight' ? 5 : 1;
      increment = this.props.user.settings.units[this.props.metricType] === 'kg' ? 2.5 : increment;

      const initialValue = e.target.value;
      const finalValue = swipedLeft ? +initialValue + increment : +initialValue - increment;

      if (!isNaN(finalValue) && finalValue >= 0) {
        this.setState({ metricValue: finalValue });
        this.props.displayMessage(`Changed ${this.props.exercise.name} ${this.props.metricType} value from ${initialValue} to ${finalValue}.`);
      }
    }
  }

  handleOnClick = (e) => {
    e.preventDefault();

    if (this.props.editMode && e.target.value === '-') {
      e.target.value = '';
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
    const saveButtonClicked = this.props.saveMode;
    const inEditMode = this.props.editMode;

    if ((metricValueChanged && !inEditMode) || (metricValueEdited && saveButtonClicked)) {
      this.setState({ edited: false });

      const id = this.props.user.id;
      const routineType = this.props.routineType;
      const dayOfWeek = this.props.routine.day;
      const workoutName = this.props.workout.name;
      const exercise = this.props.exercise;

      saveExerciseMetrics(id, dayOfWeek, routineType, workoutName, exercise.name, this.props.metricType, this.state.metricValue)
        .then(() => {
          console.debug(`Changed ${this.props.metricType} metric for ${exercise.name} from ${prevProps.metricValue} to ${this.state.metricValue}.`);
          if (this.props.saveMode === true) {
            this.props.handleUserChange(this.props.user, false, false);
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ metricValue: prevProps.metricValue });
        });

      // Update user props and bubble up to parent component
      this.props.user.routines[dayOfWeek][routineType][workoutName][exercise.name][this.props.metricType] = this.state.metricValue;
      this.props.handleUserChange(this.props.user);
    }
  }

  convertMetricValue = (initialValue, unit) => {

    if (Number.isInteger(parseInt(initialValue, 10))) {
      switch (unit) {
        case 'kg':
          return (initialValue * 0.45359237).toFixed(1);

        case 'km':
          return (initialValue * 1.609344).toFixed(1);

        case 'min':
          return initialValue / 60;

        default:
          break;
      }
    }

    return initialValue
  }

  render() {
    const metricType = this.props.metricType;
    const metricUnit = this.props.user.settings.units[metricType];
    const metricValue = this.convertMetricValue(this.state.metricValue, metricUnit);

    return (
      <input type='text' name={metricType} className={`Metric ${metricType}`}
        value={metricValue} 
        onTouchStart={this.handleTouchStart} 
        onTouchEnd={this.handleTouchEnd} 
        onClick={this.handleOnClick}
        onChange={this.handleOnChange} 
        readOnly={!this.props.editMode} />
    );
  }
}

export default Metrics;
