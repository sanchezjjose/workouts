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

    progress.workoutsByWeightLabels();

    // https://www.chartjs.org/docs/latest/axes/cartesian/time.html
    // labels: 
    // [ { label: ‘Barbell Bench Press’, data: ['40', '75', '100', '100', '80 ], backgroundColor: ... }, { label: 'Dips', data: ... } ] 

    this.progressByWorkoutChart = new Chart(ctx2, {
      type: 'line',
      data: {
        label: 'Blah Blah',
        datasets: [{
          data: [{
            t: new Date('02-18-2019'),
            y: 1
          }, {
            t: new Date('03-01-2019'),
            y: 10
          }]
        }],
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'series',
            ticks: {
              source: 'data',
              autoSkip: true
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Weight (lbs)'
            }
          }]
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