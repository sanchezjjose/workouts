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

    window.dataset = Object.entries(this.history.getWorkouts()).forEach(history => {
      var date = moment(history[0], dateFormat);
      var workoutsOnDate = Object.entries(history[1]);
  
      workoutsOnDate.forEach(workout => {
        var workoutName = workout[1].name;
        var workoutType = workout[1].type;
        var metrics = workout[1].metrics[workoutType];
        var plot = { t: date.valueOf(), y: metrics.value };

        if (dataset.some(d => d.label === workoutName)) {
          dataset.find(d => d.label === workoutName).data.push(plot);

        } else {
          dataset.push({
            label: workoutName,
            metricType: workoutType,
            metricUnit: metrics.unit,
            data: [plot],

            backgroundColor: color('rgb(255, 99, 132)').alpha(0.5).rgbString(),
            borderColor: 'rgb(255, 99, 132)',

            type: 'line',
            pointRadius: 0,
            fill: false,
            lineTension: 0,
            borderWidth: 2
          });
        }
      });
    });

    window.dataset2 = dataset;

    dataset[1].backgroundColor = 'green';

    return dataset;
  }
}

export default ProgressCharts;