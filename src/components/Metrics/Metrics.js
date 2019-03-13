import React, { Component } from 'react';

// TODO: change from ../../api => ../../db
import { saveWorkout } from '../../api/Workouts';

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

  handleOnChange = (e) => {
    const metricValue = e.target.value === '' ? '' : Number(e.target.value);

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
      this.setState({ metricValue: this.convertMetricValue() });
    }
  }

  componentDidUpdate = (prevProps, prevState, prevContext) => {
    const editMode = this.props.editMode;
    const saveMode = this.props.saveMode;
    const cancelMode = this.props.cancelMode;

    const metricValueChanged = this.state.metricValue !== this.props.metricValue;
    const isNumber = typeof this.state.metricValue === 'number';

    const shouldSave = isNumber && metricValueChanged && (saveMode || !editMode) && !cancelMode;
    const shouldReset = metricValueChanged && cancelMode;

    if (shouldReset) {
      this.setState({ metricValue: this.props.metricValue });
      this.props.handleModeChange(false, false, false);

    } else if (shouldSave) {
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

  convertMetricValue = () => {
    const metricValue = this.props.metricValue;
    const metricUnit = this.props.metricUnit;

    let result;

    switch (metricUnit) {
      case 'lbs':
        result = metricValue / 2.205;
        break;

      case 'kg':
        result = metricValue * 2.205;
        break;

      case 'mi':
        result = metricValue * 1.609;
        break;

      case 'km':
        result = metricValue / 1.609;
        break;

      case 'min':
        result = metricValue * 60;
        break;

      case 'sec':
        result = metricValue / 60;
        break;

      default:
        result = metricValue;
    }

    return Math.round(result * 10) / 10;
  }

  render() {
    const metricValue = this.state.metricValue;
    const metricType = this.props.metricType;
    const metricUnit = this.props.metricUnit;
    const showMetricUnit = (typeof metricUnit !== 'undefined' && metricValue > 0) && !this.props.editMode && window.innerWidth >= 320;
    const inputValue = showMetricUnit ? `${metricValue} ${metricUnit}` : metricValue;
    const inputType = showMetricUnit ? 'text' : 'number';

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
