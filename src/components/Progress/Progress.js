import React, { Component } from 'react';
import Chart from 'chart.js';
import ProgressCharts from '../../models/ProgressCharts';

class Progress extends Component {

  constructor() {
    super();

    this.progressByMonthChart = {};
    this.progressByWorkoutChart = {};
  }

  setDefaults() {
    const colorMode = this.props.settings.getMode();

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
    const ctx1 = document.getElementById("progress-workouts-by-month");
    const ctx2 = document.getElementById("progress-workouts-by-weight");
    const progress = new ProgressCharts(this.props.history);

    this.setDefaults();

    this.progressByMonthChart = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: progress.workoutsByMonthLabels(),
        datasets: [{
          label: '# of Workouts',
          data: progress.workoutsByMonth(),
          backgroundColor: 'rgb(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });

    this.progressByWorkoutChart = new Chart(ctx2, {
      type: 'line',
      data: {
        label: 'Workout Progress',
        datasets: progress.workoutsByWeightLabels()
      },
      options: {
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

  render() {
    return (
      <div className='Progress'>
        <canvas id="progress-workouts-by-weight" width="400" height="400"></canvas>
        <canvas id="progress-workouts-by-month" width="400" height="400"></canvas>
      </div>

      // <div className='Progress' style={{width: '100%', height: '50%'}}>
      //   <div style={{position: 'relative', height: 100 + 'vh', width: 100 + 'vw'}}>
      //     <canvas id="progress-workouts-by-weight"></canvas>
      //   </div>
      //   <div style={{position: 'relative', height: 100 + 'vh', width: 100 + 'vw'}}>
      //     <canvas id="progress-workouts-by-month"></canvas>
      //   </div>
      // </div>
    );
  }
}

export default Progress;