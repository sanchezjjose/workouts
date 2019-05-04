import React, { Component } from 'react';
import { UserContext } from '../UserContext';
import Chart from 'chart.js';
import ProgressCharts from '../../models/ProgressCharts';

import './Progress.css';

class Progress extends Component {
  static contextType = UserContext;

  charts = new ProgressCharts(this.context.history);
  workoutGroups = [...new Set(this.charts.workoutsByWeightLabels().map(w => w.workoutGroup))];
  progressByMonthChart = {};
  progressByWorkoutChart = {};

  state = {
    workoutFilter: this.workoutGroups[0]
  };

  setDefaults() {
    const colorMode = this.context.settings.getMode();

    if (colorMode === 'light') {
      Chart.defaults.global.defaultFontColor = '#000';
      Chart.defaults.scale.gridLines.color = 'rgba(0, 0, 0, 0.1)';

    } else {
      Chart.defaults.global.defaultFontColor = '#fff';
      Chart.defaults.scale.gridLines.color = '#757575';
    }
  }

  componentDidUpdate() {
    this.setDefaults();
    this.progressByMonthChart.update();
    this.progressByWorkoutChart.update();
  }

  componentDidMount() {
    this.setDefaults();
    this.progressByMonthChart = this.charts.initProgressByMonthChart();
    this.progressByWorkoutChart = this.charts.initProgressByWeightChart(this.state.workoutFilter);
  }

  filterWorkouts = (e) => {
    this.setState({ workoutFilter: e.target.innerText }, () => {
      this.progressByWorkoutChart.destroy();
      this.progressByWorkoutChart = this.charts.initProgressByWeightChart(this.state.workoutFilter);
    });
  }

  render() {
    return (
      <div className='Progress'>
        {this.workoutGroups.length > 1 &&
          <div className='workout-group'>
            {this.workoutGroups.map (group =>
              <div key={group} onClick={this.filterWorkouts} className={`group-name ${group === this.state.workoutFilter ? 'selected' : ''}`}>{group}</div>
            )}
          </div>
        }
        <canvas id="progress-workouts-by-weight"></canvas>
        <canvas id="progress-workouts-by-month"></canvas>
      </div>
    );
  }
}

export default Progress;
