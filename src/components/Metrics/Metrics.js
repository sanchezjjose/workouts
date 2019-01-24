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

     // Unit settings changed, convert value
    let result = metricValue;

    switch (metricUnit) {
      case 'lbs':
        result = (metricValue / 2.205).toFixed(1);
        break;

      case 'kg':
        result = Math.round((metricValue * 2.205).toFixed(1));
        break;

      case 'mi':
        result = (metricValue * 1.609).toFixed(1);
        break;

      case 'km':
        result = (metricValue / 1.609).toFixed(1);
        break;

      case 'min':
        result = (metricValue * 60).toFixed(1);
        break;

      case 'sec':
        result = (metricValue / 60).toFixed(1);
        break;

      default:
        break;
    }

    return result;
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
