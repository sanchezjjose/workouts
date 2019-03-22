import React, { Component } from 'react';
import Chart from 'chart.js';
import ProgressCharts from '../../models/ProgressCharts';

class Progress extends Component {

  componentDidMount() {
    const ctx1 = document.getElementById("progress-workouts-by-month");
    const ctx2 = document.getElementById("progress-workouts-by-weight");
    const progress = new ProgressCharts(this.props.history);
    
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: progress.workoutsByMonthLabels(),
        datasets: [{
          label: '# of Workouts',
          data: progress.workoutsByMonth(),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
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

    new Chart(ctx2, {
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

      // data: {
      //   // TODO: limit to last 12 months.
      //   // TODO: change these to months, and make data points the dates.
      //   labels: ["02-18-2019", "02-26-2019", '03-01-2019', "03-13-2019"],
      //   datasets: [{
      //     label: 'Barbell Bench Press',
      //     data: ['40', '75', '100', '80'],
      //     backgroundColor: '#58b6f4',
      //     borderColor: '#58b6f4',
      //     borderWidth: 1,
      //     fill: false
      //   },
      //   {
      //     label: 'Barbell Squats',
      //     data: ['135', '150', '150', '165'],
      //     backgroundColor: '#d32f2f',
      //     borderColor: '#d32f2f',
      //     borderWidth: 1,
      //     fill: false
      //   }]
      // },
      // options: {
      //   elements: {
      //     line: {
      //       tension: 0, // disables bezier curves
      //     }
      //   },
      //   scales: {
      //     yAxes: [{
      //       ticks: {
      //         beginAtZero:true
      //       }
      //     }]
      //   }
      // }
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