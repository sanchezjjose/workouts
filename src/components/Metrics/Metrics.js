import React, { Component } from 'react';
import { saveExerciseMetrics } from '../../api/ExerciseMetrics';

import './Metrics.css';

class Metrics extends Component {

  state = {
    metricValue: this.props.metricValue,
    edited: false // represents in draft mode
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
      const increment = this.props.metricType === 'weight' ? 2.5 : 1;
      // const initialValue = e.target.value;
      const initialValue = this.state.metricValue;
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
    const metricUnit = this.props.metricUnit;
    const settingsUnit = this.props.settingsUnit;
    const shouldConvert = settingsUnit !== metricUnit
      && typeof settingsUnit !== 'undefined'
      && !isNaN(this.state.metricValue);

    // Unit settings unchanged or don't exist
    if (shouldConvert) {
      this.setState({ metricValue: this.convertMetricValue() });
    }
  }

  componentDidUpdate = (prevProps, prevState, prevContext) => {
    const metricValueChanged = this.state.metricValue !== prevState.metricValue;
    const metricValueEdited = this.state.edited;
    const saveButtonClicked = this.props.saveMode;
    const inEditMode = this.props.editMode;
    const shouldSave = (metricValueChanged && !inEditMode) || (metricValueEdited && saveButtonClicked);

    if (shouldSave) {
      this.setState({ edited: false });
      this.saveMetric(prevState.metricValue, this.props.metricUnit, this.state.metricValue, this.props.settingsUnit);
    }
  }

  saveMetric(prevMetricValue, prevSettingsUnit, metricValue, settingsUnit) {
    const id = this.props.user.id;
    const routineType = this.props.routineType;
    const dayOfWeek = this.props.routine.day;
    const workoutName = this.props.workout.name;
    const exercise = this.props.exercise;
    const metricType = this.props.metricType;

    saveExerciseMetrics(id, dayOfWeek, routineType, workoutName, exercise.name, metricType, metricValue, settingsUnit)
      .then(() => {
        console.debug(`Changed ${metricType} metric for ${exercise.name} from ${prevMetricValue} ${prevSettingsUnit} to ${metricValue} ${settingsUnit}.`);

        if (this.props.saveMode === true) {
          this.props.handleUserChange(this.props.user, false, false);
        }
      })
      .catch(err => {
        console.error(err);
        this.setState(prevState => ({ metricValue: prevState.metricValue }));
      });

    // Update user props and bubble up to parent component
    this.props.user.routines[dayOfWeek][routineType][workoutName][exercise.name][this.props.metricType] = {
      value: metricValue,
      unit: settingsUnit
    };

    this.props.handleUserChange(this.props.user);
  }

  convertMetricValue = () => {
    const metricValue = this.props.metricValue;
    const metricUnit = this.props.metricUnit;

    switch (metricUnit) {
      case 'lbs':
        return (metricValue / 2.205).toFixed(1);

      case 'kg':
        return Math.round((metricValue * 2.205).toFixed(1));

      case 'mi':
        return (metricValue * 1.609).toFixed(1);

      case 'km':
        return (metricValue / 1.609).toFixed(1);

      case 'min':
        return (metricValue * 60).toFixed(1);

      case 'sec':
        return (metricValue / 60).toFixed(1);

      default:
        return metricValue;
    }
  }

  render() {
    let metricValue = this.state.metricValue;
    const metricType = this.props.metricType;
    const metricUnit = this.props.metricUnit;
    const showMetricUnit = (typeof metricUnit !== 'undefined' && metricUnit !== '-' && metricValue !== '-') && !this.props.editMode;
    const hasUnitsClassName = showMetricUnit ? 'with-units' : '';

    if (showMetricUnit) {
      metricValue += ` ${metricUnit}`
    }

    return (
      // <div className={`Metrics ${hasUnitsClassName}`}>
      <div className={`Metrics`}>
        <input type='text' name={metricType} className={`${metricType}`}
          value={metricValue} 
          onTouchStart={this.handleTouchStart} 
          onTouchEnd={this.handleTouchEnd} 
          onClick={this.handleOnClick}
          onChange={this.handleOnChange} 
          readOnly={!this.props.editMode} />
        {/* {showMetricUnit &&
          <span className='metric-unit'>{metricUnit}</span>
        } */}
      </div>
    );
  }
}

export default Metrics;
