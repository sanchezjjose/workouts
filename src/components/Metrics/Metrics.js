import React, { Component } from 'react';
import { updateExerciseMetrics } from '../../api/ExerciseMetrics';

import './Metrics.css';

class Metrics extends Component {

  state = {
    metricValue: this.props.metricValue,
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

      if (!isNaN(finalValue) && finalValue > 0) {
        const id = this.props.userId;
        const workoutDay = this.props.workoutDay;
        const muscle = this.props.routine.muscle;
        const exercise = this.props.exercise;
        const newMetrics = { ...this.props.exercise.metrics };

        newMetrics[this.props.metricType] = finalValue;

        this.setState({ metricValue: finalValue });

        updateExerciseMetrics(id, workoutDay, muscle, exercise.name, newMetrics)
          .then(() => {
            console.debug(`Successfully changed ${this.props.metricValue} from ${initialValue} to ${finalValue}...`);
          })
          .catch(err => {
            console.error(err);
            this.setState({ metricValue: initialValue });
          })
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
    if (this.state.edited && this.props.save) {
      this.setState({ edited: false });

      const id = this.props.userId;
      const workoutDay = this.props.workoutDay;
      const muscle = this.props.routine.muscle;
      const exercise = this.props.exercise;
      const newMetrics = { ...this.props.exercise.metrics };

      newMetrics[this.props.metricType] = this.state.metricValue;

      updateExerciseMetrics(id, workoutDay, muscle, exercise.name, newMetrics)
        .then(() => {
          this.props.handleSaveSubmit();
        })
        .catch(err => {
          console.error(err);
          this.setState({ metricValue: prevProps.metricValue });
        });
    }
  }

  render() {
    const metricType = this.props.metricType;

    return (
      <input type='text' name={metricType} className={`Metric ${metricType}`}
        onTouchStart={this.handleTouchStart} 
        onTouchEnd={this.handleTouchEnd} 
        onChange={this.handleOnChange} 
        value={this.state.metricValue} 
        readOnly={!this.props.edit} />
    );
  }
}

export default Metrics;
