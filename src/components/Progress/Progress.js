import React, { Component } from 'react';
import { UserContext } from '../UserContext';
import Chart from 'chart.js';
import ProgressCharts from '../../models/ProgressCharts';

import './Progress.css';

class Progress extends Component {
  static contextType = UserContext;

  state = {
    progress: new ProgressCharts(this.context.history),
    workoutFilter: ''
  };

  progressByMonthChart = {};
  progressByWorkoutChart = {};

  setDefaults() {
    const colorMode = this.context.settings.getMode();

    if (colorMode === 'dark') {
      Chart.defaults.global.defaultFontColor = '#fff';
      Chart.defaults.scale.gridLines.color = '#757575';

    } else {
      Chart.defaults.global.defaultFontColor = '#000';
      Chart.defaults.scale.gridLines.color = 'rgba(0, 0, 0, 0.1)';
    }
  }

  componentDidUpdate() {
    this.setDefaults();
    this.progressByMonthChart.update();
    this.progressByWorkoutChart.update();
  }

  componentDidMount() {
    this.setDefaults();
    this.updateProgressByMonthChart();
    this.updateProgressByWeightChart();
  }

  updateProgressByMonthChart = () => {
    const ctx = document.getElementById("progress-workouts-by-month");
    const color = Chart.helpers.color;

    this.progressByMonthChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.state.progress.workoutsByMonthLabels(),
        datasets: [{
          label: '# of Workouts',
          data: this.state.progress.workoutsByMonth(),
          backgroundColor: color('#EF5350').alpha(0.5).rgbString(),
          borderColor: '#EF5350',
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  updateProgressByWeightChart = (workoutGroup) => {
    const ctx = document.getElementById("progress-workouts-by-weight");

    this.progressByWorkoutChart = new Chart(ctx, {
      type: 'line',
      data: {
        label: 'Workout Progress',
        datasets: this.state.progress.workoutsByWeightLabels(workoutGroup)
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'series',
            ticks: {
              source: 'data',
              autoSkip: true,
              beginAtZero: true
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        tooltips: {
					intersect: false,
					mode: 'index',
					callbacks: {
						label: function(tooltipItem, data) {
							const label = data.datasets[tooltipItem.datasetIndex].label;
              const unit = data.datasets[tooltipItem.datasetIndex].metricUnit;
							return `${label}: ${tooltipItem.yLabel} ${unit}`;
						}
					}
				}
      }
    });
  }

  filterWorkouts = (e) => {
    const workoutGroup = e.target.innerText;

    this.updateProgressByWeightChart(workoutGroup);
    this.setState({ workoutFilter: e.target.innerText });
  }

  render() {
    return (
      <div className='Progress'>
        {/* <div className='workout-group'>
          <div onClick={this.filterWorkouts} className='group-name'>Chest</div>
          <div onClick={this.filterWorkouts} className='group-name'>Biceps</div>
          <div onClick={this.filterWorkouts} className='group-name'>Legs</div>
        </div> */}
        <canvas id="progress-workouts-by-weight"></canvas>
        <canvas id="progress-workouts-by-month"></canvas>
      </div>
    );
  }
}

export default Progress;