import React, { Component } from 'react';
import { saveExerciseMetrics } from '../../api/ExerciseMetrics';

import './Metrics.css';

class Metrics extends Component {

  constructor(props) {
    super(props);

    this.convertMetric = this.convertMetric.bind(this);

    this.state = {
      metricValue: (this.props.settingsUnit === this.props.metricUnit) ? this.props.metricValue : this.convertMetric(),
      // metricUnit: this.props.metricUnit,
      // edited is synonomous with being in 'draft' state.
      edited: false
    }
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

  componentDidMount = () => {
    // debugger;
  }

  componentDidUpdate = (prevProps, prevState, prevContext) => {
    const metricValue = this.state.metricValue;
    // const metricUnit = this.state.metricUnit;
    const metricType = this.props.metricType;
    const settingsUnit = this.props.settingsUnit || '-';
    // const shouldUpdate = metricUnit !== settingsUnit && !isNaN(this.state.metricValue);

    const metricValueChanged = this.state.metricValue !== prevState.metricValue;
    const metricValueEdited = this.state.edited;
    const saveButtonClicked = this.props.saveMode;
    const inEditMode = this.props.editMode;
    const shouldSave = (metricValueChanged && !inEditMode) || (metricValueEdited && saveButtonClicked);

    // if (shouldUpdate) {
    //   this.convertMetricValue(metricUnit, settingsUnit);

    // } else if (shouldSave) {
    if (shouldSave) {
      this.setState({ edited: false });

      const id = this.props.user.id;
      const routineType = this.props.routineType;
      const dayOfWeek = this.props.routine.day;
      const workoutName = this.props.workout.name;
      const exercise = this.props.exercise;

      saveExerciseMetrics(id, dayOfWeek, routineType, workoutName, exercise.name, metricType, metricValue, settingsUnit)
        .then(() => {
          console.debug(`Changed ${metricType} metric for ${exercise.name} from ${prevState.metricValue} to ${metricValue}.`);
          if (this.props.saveMode === true) {
            this.props.handleUserChange(this.props.user, false, false);
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ metricValue: prevState.metricValue });
        });

      // Update user props and bubble up to parent component
      this.props.user.routines[dayOfWeek][routineType][workoutName][exercise.name][this.props.metricType] = {
        value: metricValue,
        unit: settingsUnit
        // unit: metricUnit
      };
      this.props.handleUserChange(this.props.user);
    }
  }

  // TODO: Move to a util
  convertMetric = () => {
    const currentUnit = this.props.metricUnit;
    const initialValue = this.props.metricValue;
    let finalValue = initialValue;

    if (initialValue !== '-') {
      switch (currentUnit) {
        case 'lbs':
          finalValue = (initialValue / 2.205).toFixed(1);
          break;

        case 'kg':
          finalValue = (initialValue * 2.205).toFixed(1);
          break;

        case 'mi':
          finalValue = (initialValue * 1.609).toFixed(1);
          break;

        case 'km':
          finalValue = (initialValue / 1.609).toFixed(1);
          break;

        case 'min':
          finalValue = (initialValue * 60).toFixed(1);
          break;

        case 'sec':
          finalValue = (initialValue / 60).toFixed(1);
          break;

        default:
          break;
      }

      finalValue = Math.round(finalValue * 100) / 100;
    }

    return finalValue;

    // this.setState({
    //   metricValue: finalValue,
    //   metricUnit: settingsUnit
    // });
  }

  render() {
    const metricValue = this.state.metricValue;
    const metricType = this.props.metricType;

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
