import Chart from 'chart.js';
import moment from 'moment';

class ProgressCharts {

  constructor(history) {
    this.history = history;
    this.months = [
      "January", "February", "March", "April", "May", "June", "July", 
      "August", "September", "October", "November", "December"
    ];
  }

  chartColors = [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
  ];

  workoutsByMonthLabels() {
    const chartLabel = [];
    const months = this.months;
    const currentMonth = months[new Date().getMonth()];

    let startIndex = months.indexOf(currentMonth);

    for (let i = startIndex; chartLabel.length !== months.length; i--) {
      if (i < 0) {
        i = months.length - 1;
      }
      chartLabel.push(months[i]);
    }

    return chartLabel.reverse();
  }

  workoutsByMonth() {
    const workouts = this.workoutsByMonthLabels().map(month => { 
      return { month: month, workouts: 0 };
    });

    this.history.getDates().all.forEach(date => {
      const formattedDate = date.replace('-', '/'); // Safari workaround. Remove this.
      const workoutMonth = this.months[new Date(formattedDate).getMonth()];

      workouts.find(w => w.month === workoutMonth).workouts += 1;
    });

    return workouts.map(w => w.workouts);
  }

  workoutsByWeightLabels() {
    const dataset = [];
    const color = Chart.helpers.color;
    const dateFormat = 'MM-DD-YYYY';

    // TODO Filters: 
    // - date must be > 12 months ago
    // - must have > 1 workout
    Object.entries(this.history.getWorkouts()).forEach(history => {
      const date = moment(history[0], dateFormat);
      const workoutsOnDate = Object.entries(history[1]);
  
      workoutsOnDate.forEach(workout => {
        const workoutName = workout[1].name;
        const workoutType = workout[1].type;
        const metrics = workout[1].metrics[workoutType];
        const plot = { t: date.valueOf(), y: metrics.value };
        const lineColor = this.chartColors[Math.floor(Math.random() * this.chartColors.length)];

        if (dataset.some(d => d.label === workoutName)) {
          dataset.find(d => d.label === workoutName).data.push(plot);

        } else {
          dataset.push({
            label: workoutName,
            metricType: workoutType,
            metricUnit: metrics.unit,
            data: [plot],
            backgroundColor: color(lineColor).alpha(0.5).rgbString(),
            borderColor: lineColor,
            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
          });
        }
      });
    });

    return dataset;
  }
}

export default ProgressCharts;
