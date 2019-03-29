import React, { Component } from 'react';
import Chart from 'chart.js';
import ProgressCharts from '../../models/ProgressCharts';

class Progress extends Component {

  constructor() {
    super();

    this.progressByMonthChart = {};
    this.progressByWorkoutChart = {};
  }

  componentDidUpdate() {
    const colorMode = this.props.settings.getMode();

    if (colorMode === 'dark') {
      Chart.defaults.global.defaultFontColor = '#fff';
    } else {
      Chart.defaults.global.defaultFontColor = '#000';
    }

    this.progressByMonthChart.update();
    this.progressByWorkoutChart.update();
  }

  componentDidMount() {
    const ctx1 = document.getElementById("progress-workouts-by-month");
    const ctx2 = document.getElementById("progress-workouts-by-weight");
    const progress = new ProgressCharts(this.props.history);
    const colorMode = this.props.settings.getMode();

    if (colorMode === 'dark') {
      Chart.defaults.global.defaultFontColor = '#fff';
    }

    this.progressByMonthChart = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: progress.workoutsByMonthLabels(),
        datasets: [{
          label: '# of Workouts',
          data: progress.workoutsByMonth(),
          backgroundColor: '#EF5350',
          borderColor: '#EF5350',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              color: '#757575'
            }
          }],
          yAxes: [{
            gridLines: {
              color: '#757575'
            },
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });

    this.progressByWorkoutChart = new Chart(ctx2, {
      type: 'bar',
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
            // scaleLabel: {
            //   display: true,
            //   labelString: 'Weight / Time'
            // },
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
							let label = data.datasets[tooltipItem.datasetIndex].label || '';
							let unit = data.datasets[tooltipItem.datasetIndex].metricUnit || '';
							if (label) {
								label += ': ';
							}
							label += `${tooltipItem.yLabel} ${unit}`;
							return label;
						}
					}
				}
      }
    });
  }

  render() {
    return (
      <div className='Progress'>
        <canvas id="progress-workouts-by-month" width="400" height="400"></canvas>
        <canvas id="progress-workouts-by-weight" width="400" height="400"></canvas>
      </div>
    );
  }
}

export default Progress;