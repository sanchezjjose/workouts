import React, { Component } from 'react';

// TODO: change from ../../api => ../../db
import { saveWorkout } from '../../api/Workouts';
import { convertMetric } from '../../lib/Util';

import './Metrics.css';

class Metrics extends Component {

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
    if (this.props.editMode) {
      e.target.value = '';
    }
  }

  // TODO: Move to Util.js
  // TODO: When calling, check if metricType === 'time'
  convertTimeToDecimal = (metricValue, unit) => {
    if (typeof metricValue !== 'string') {
      return metricValue;
    }

    const timeUnits = metricValue.split(':');
    const numTimeUnits = timeUnits.length;

    if (numTimeUnits === 1) {
      return Number(metricValue);
    }

    if (numTimeUnits > 3) {
      return alert(
        'Acceptable values are numbers, decimals, or time format separated by ":".' +
        'For example, 01:10:15 for 1 hour, 10 minutes and 15 seconds.'
      );
    }

    let [ hrs, mins, secs ] = [ 0, 0, 0 ];
    let result = metricValue;

    if (numTimeUnits === 2) {
      [ mins, secs ] = timeUnits.map(num => Number(num));

    } else if (numTimeUnits === 3) {
      [ hrs, mins, secs ] = timeUnits(num => Number(num));
    }

    if (unit === 'min') {
      result = (hrs * 60) + mins + (secs / 60)

    } else if (unit === 'sec') {
      result = (hrs * 3600) + (mins * 60) + secs;
    }

    return Number(result);
  }

  handleOnChange = (e) => {
    // const metricValue = e.target.value === '' ? '' : Number(e.target.value);
    const metricValue = e.target.value;

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
    const editMode = this.props.editMode;
    const saveMode = this.props.saveMode;
    const cancelMode = this.props.cancelMode;

    const metricValueChanged = this.state.metricValue !== this.props.metricValue;
    const isNumber = typeof this.state.metricValue === 'number';


    const shouldSave = /*isNumber && */metricValueChanged && (saveMode || !editMode) && !cancelMode;
    const shouldReset = metricValueChanged && cancelMode;

    if (shouldReset) {
      this.setState({ metricValue: this.props.metricValue });
      this.props.handleModeChange(false, false, false);

    } else if (shouldSave) {
      let formattedTime = '';
      if (this.props.metricType === 'time') {
        formattedTime = this.convertTimeToDecimal(this.state.metricValue, this.props.metricUnit);
      }

      this.saveMetric(prevState.metricValue, this.props.metricUnit, this.state.metricValue, this.props.settingsUnit);
      this.props.handleModeChange(false, false, false);
    }
  }

  saveMetric(prevMetricValue, prevSettingsUnit, metricValue, settingsUnit) {
    const userId = this.props.userId;
    const workouts = this.props.workouts;
    const exercise = this.props.exercise;
    const metricType = this.props.metricType;

    workouts.setMetricValue(exercise.id, metricType, metricValue);
    workouts.setMetricUnit(exercise.id, metricType, settingsUnit);

    saveWorkout(userId, workouts.get())
      .then(() => {
        console.debug(`Changed ${metricType} metric for ${exercise.name} from ${prevMetricValue} ${prevSettingsUnit} to ${metricValue} ${settingsUnit}.`);

        // if (this.props.saveMode === true) {
        //   this.props.forceGlobalUpdate();
        // }
      })
      .catch(err => { 
        console.error(err);
        // Reset?
        // this.setState(prevState => ({ metricValue: prevState.metricValue }));
      });
  }

  render() {
    const metricValue = this.state.metricValue;
    const metricType = this.props.metricType;
    const metricUnit = this.props.metricUnit;
    const showMetricUnit = (typeof metricUnit !== 'undefined' && metricValue > 0) && !this.props.editMode && window.innerWidth >= 320;
    const inputValue = showMetricUnit ? `${metricValue} ${metricUnit}` : metricValue;
    const inputType = showMetricUnit || metricType === 'time' ? 'text' : 'number';

    return (
      <div className={`Metrics`}>
        <input type={inputType} name={metricType} className={`${metricType}`}
          value={inputValue}
          onTouchStart={this.handleTouchStart} 
          onTouchEnd={this.handleTouchEnd} 
          onClick={this.handleOnClick}
          onChange={this.handleOnChange} 
          readOnly={!this.props.editMode} />
      </div>
    );
  }
}

export default Metrics;
