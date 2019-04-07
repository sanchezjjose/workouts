import React, { Component } from 'react';
import { UserContext } from '../UserContext';

// TODO: change from ../../api => ../../db
import { saveWorkout } from '../../api/Workouts';
import { convertMetric, convertTimeToDecimal } from '../../lib/Util';

import './Metrics.css';

class Metrics extends Component {
  static contextType = UserContext;

  state = {
    metricValue: this.props.metricValue
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

    if (this.context.editMode) {
      return;
    }

    const currentX = e.changedTouches[0].clientX;
    const currentY = e.changedTouches[0].clientY;
    const diffX = this.touchStartX - currentX;
    const diffY = this.touchStartY - currentY;
    const swipedLeft = diffX > 0;
    const swipedHorizontal = Math.abs(diffX) > Math.abs(diffY);

    if (swipedHorizontal) {
      const name = this.props.exercise.name;
      const metricType = this.props.metricType;

      const increment = metricType === 'weight' ? 2.5 : 1;
      const initialValue = this.state.metricValue;
      const finalValue = swipedLeft ? initialValue + increment : initialValue - increment;

      if (typeof finalValue === 'number' && finalValue >= 0) {
        this.setState({ metricValue: finalValue });
        this.props.displayMessage(`Changed ${name} ${metricType} value from ${initialValue} to ${finalValue}.`);
      }
    }
  }

  handleOnClick = (e) => {
    if (this.context.editMode) {
      e.target.value = '';
    }
  }

  handleOnChange = (e) => {
    const metricValue = e.target.value;
    const isTimeMetric = this.props.metricType === 'time';

    if (isTimeMetric) {
      const colonsExceeded = metricValue.split(':').length > 3;
      const isInvalid = colonsExceeded || (isNaN(metricValue) && metricValue.indexOf(':') === -1);

      if (isInvalid) {
        alert(
          `${metricValue} is not a valid input. Please use numbers or a : symbol. \n` +
          'Examples are 10, 10:25 or 01:10:35.'
        );
        return;
      }
    }

    this.setState({
      metricValue: metricValue
    });
  }

  componentDidMount = () => {
    const metricUnit = this.props.metricUnit;
    const settingsUnit = this.props.settingsUnit;
    const shouldConvert = settingsUnit !== metricUnit
      && typeof settingsUnit !== 'undefined'
      && typeof this.state.metricValue === 'number';

    // Unit settings unchanged or don't exist
    if (shouldConvert) {
      this.setState({ metricValue: convertMetric(this.props.metricValue, this.props.metricUnit) });
    }
  }

  componentDidUpdate = (prevProps, prevState, prevContext) => {
    const editMode = this.context.editMode;
    const saveMode = this.context.saveMode;
    const cancelMode = this.context.cancelMode;

    const metricValueChanged = this.state.metricValue !== this.props.metricValue;
    const shouldSave = metricValueChanged && (saveMode || !editMode) && !cancelMode;
    const shouldReset = metricValueChanged && cancelMode;

    if (shouldReset) {
      this.setState({ metricValue: this.props.metricValue });
      this.context.updateMode(false, false, false);

    } else if (shouldSave) {
      this.saveMetric(prevState.metricValue, this.props.metricUnit, this.state.metricValue, this.props.settingsUnit);
      this.context.updateMode(false, false, false);
    }
  }

  saveMetric(prevMetricValue, prevSettingsUnit, metricValue, settingsUnit) {
    const userId = this.context.user.id;
    const workouts = this.context.workouts;
    const exercise = this.props.exercise;
    const metricType = this.props.metricType;

    if (this.props.metricType === 'time') {
      metricValue = convertTimeToDecimal(metricValue, settingsUnit);

      this.setState({
        metricValue: metricValue
      });
    }

    workouts.setMetricValue(exercise.id, metricType, metricValue);
    workouts.setMetricUnit(exercise.id, metricType, settingsUnit);

    saveWorkout(userId, workouts.get())
      .then(() => {
        console.debug(`Changed ${metricType} metric for ${exercise.name} from ${prevMetricValue} ${prevSettingsUnit} to ${metricValue} ${settingsUnit}.`);
      })
      .catch(err => { 
        console.error(err);
      });
  }

  render() {
    const metricValue = this.state.metricValue;
    const metricType = this.props.metricType;
    const metricUnit = this.props.metricUnit;
    const showMetricUnit = (typeof metricUnit !== 'undefined' && metricValue > 0) && !this.context.editMode && window.innerWidth >= 320;
    const inputValue = showMetricUnit ? `${metricValue} ${metricUnit}` : metricValue;
    const inputType = showMetricUnit || metricType === 'time' ? 'text' : 'number';

    return (
      <div className={`Metrics`}>
        <input type={inputType} name={metricType} className={`${metricType}`}
          placeholder={metricType === 'time' ? '15:20' : metricUnit}
          value={inputValue}
          onTouchStart={this.handleTouchStart} 
          onTouchEnd={this.handleTouchEnd} 
          onClick={this.handleOnClick}
          onChange={this.handleOnChange} 
          readOnly={!this.context.editMode} />
      </div>
    );
  }
}

export default Metrics;
