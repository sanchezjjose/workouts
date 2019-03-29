import React, { Component } from 'react';
import Chart from 'chart.js';
import moment from 'moment';
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

    const progressDataset = progress.workoutsByWeightLabels();

    // https://www.chartjs.org/docs/latest/axes/cartesian/time.html
    // labels: 
    // [ { label: ‘Barbell Bench Press’, data: ['40', '75', '100', '100', '80 ], backgroundColor: ... }, { label: 'Dips', data: ... } ]

    window.chartColors = [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ];

    const color = Chart.helpers.color;
    const dateFormat = 'MM-DD-YYYY';
    const date1 = moment('02-11-2019', dateFormat);
    const date2 = moment('02-20-2019', dateFormat);
    const date3 = moment('03-05-2019', dateFormat);
    const date4 = moment('03-14-2019', dateFormat);
    const date5 = moment('03-24-2019', dateFormat);

    /*
      // Filters: 
        - date must be > 12 months ago
        - must have > 1 workout
      [
        {
          label: 'Barbell Bench Press',
          data: [
            {
              t: date,
              y: 135
            }
          ]
        }
      ]
    */

    console.log(progressDataset)

    this.progressByWorkoutChart = new Chart(ctx2, {
      type: 'bar',
      data: {
        label: 'Workout Progress',
        datasets: progressDataset
        // datasets: [{
				// 	label: 'Barbell Bench Press (lbs)',
				// 	backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
				// 	borderColor: window.chartColors.red,
				// 	data: [{t: date1.valueOf(), y: 135},{t: date2.valueOf(), y: 125},{t: date3.valueOf(), y: 175},{t: date3.valueOf(), y: '155'}],
				// 	type: 'line',
				// 	pointRadius: 0,
				// 	fill: false,
				// 	lineTension: 0,
				// 	borderWidth: 2
				// }, {
				// 	label: 'Running (min)',
				// 	backgroundColor: color(window.chartColors.yellow).alpha(0.5).rgbString(),
				// 	borderColor: window.chartColors.yellow,
				// 	data: [{t: date1.valueOf(), y: '300'},{t: date2.valueOf(), y: '100'},{t: date4.valueOf(), y: '120'}],
				// 	type: 'line',
				// 	pointRadius: 0,
				// 	fill: false,
				// 	lineTension: 0,
				// 	borderWidth: 2
				// }]
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
            // scaleLabel: {
            //   display: true,
            //   labelString: 'Weight / Time'
            // },
            ticks: {
              beginAtZero:true
            }
          }]
        },
        tooltips: {
					intersect: false,
					mode: 'index',
					callbacks: {
						label: function(tooltipItem, myData) {
							let label = myData.datasets[tooltipItem.datasetIndex].label || '';
							if (label) {
								label += ': ';
							}
							label += tooltipItem.yLabel;
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