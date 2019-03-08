import React, { Component } from 'react';
import Chart from 'chart.js';
import { chartMonths } from '../../lib/Util';

class Progress extends Component {

  componentDidMount() {
    const ctx = document.getElementById("progress");
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartMonths('March'),
            datasets: [{
                label: '# of Workouts',
                data: [6, 8, 8, 10, 7, 18, 22, 24, 15, 16, 18, 6],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                // backgroundColor: [
                //     'rgba(255, 99, 132, 0.2)',
                //     // 'rgba(54, 162, 235, 0.2)',
                //     // 'rgba(255, 206, 86, 0.2)',
                //     // 'rgba(75, 192, 192, 0.2)',
                //     // 'rgba(153, 102, 255, 0.2)',
                //     // 'rgba(255, 159, 64, 0.2)'
                // ],
                // borderColor: [
                //     'rgba(255,99,132,1)',
                //     // 'rgba(54, 162, 235, 1)',
                //     // 'rgba(255, 206, 86, 1)',
                //     // 'rgba(75, 192, 192, 1)',
                //     // 'rgba(153, 102, 255, 1)',
                //     // 'rgba(255, 159, 64, 1)'
                // ],
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
  }

  render() {
    return (
      <canvas id="progress" width="400" height="400"></canvas>
    );
  }
}

export default Progress;