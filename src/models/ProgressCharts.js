import Chart from 'chart.js';
import moment from 'moment';

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const chartColors = [
  '#EF5350',
  '#78909C',
  '#FF7043',
  '#FFA726',
  '#FFEE58',
  '#D4E157',
  '#26C6DA',
  '#66BB6A',
  '#9CCC65',
  '#26A69A',
  '#29B6F6',
  '#42A5F5',
  '#7E57C2',
  '#FFCA28',
  '#5C6BC0',
  '#AB47BC',
  '#EC407A',
];

class ProgressCharts {

  constructor(history) {
    this.history = history;
  }

  workoutsByMonthLabels = () => {
    const chartLabel = [];
    const currentMonth = months[new Date().getMonth()];
    const startIndex = months.indexOf(currentMonth);

    for (let i = startIndex; chartLabel.length !== months.length; i--) {
      if (i < 0) {
        i = months.length - 1;
      }
      chartLabel.push(months[i]);
    }

    return chartLabel.reverse();
  }

  workoutsByMonth = () => {
    const workouts = this.workoutsByMonthLabels().map(month => {
      return { month: month, workouts: 0 };
    });

    this.history.getDates().all.forEach(date => {
      const formattedDate = date.replace(/-/g, '/'); // Safari workaround. Remove this.
      const workoutMonth = months[new Date(formattedDate).getMonth()];
      const workoutYear = new Date(formattedDate).getFullYear();
      const currentYear = new Date().getFullYear();

      console.log(formattedDate)
      console.log(workoutYear);
      console.log(currentYear);

      if (workoutYear === currentYear) {
        workouts.find(w => w.month === workoutMonth && workoutYear === currentYear).workouts += 1;
      }
    });

    return workouts.map(w => w.workouts);
  }

  workoutsByWeightLabels = (workoutGroupFilter) => {
    const dataset = [];
    const color = Chart.helpers.color;
    const dateFormat = 'MM-DD-YYYY';

    Object.entries(this.history.getWorkouts()).sort().forEach(history => {
      const today = moment(new Date());
      const date = moment(history[0], dateFormat);
      const numDaysAgo = moment(today).diff(date, 'days', false);
      const workoutsOnDate = Object.entries(history[1]);

      if (numDaysAgo < 365) {
        workoutsOnDate.forEach((workout, i) => {
          const workoutGroup = workout[1].group;
          const workoutName = workout[1].name;
          const workoutType = workout[1].type;
          const metrics = workout[1].metrics[workoutType];
          const plot = { t: date.valueOf(), y: metrics.value };

          if (plot.y > 0) {
            if (dataset.some(d => d.label === workoutName)) {
              dataset.find(d => d.label === workoutName).data.push(plot);

            } else {
              dataset.push({
                label: workoutName,
                workoutGroup: workoutGroup,
                // hidden: dataset.length >= 3,
                metricType: workoutType,
                metricUnit: metrics.unit,
                data: [plot],
                type: 'line',
                // pointRadius: 0,
                fill: false,
                lineTension: 0,
                borderWidth: 2
              });
            }
          }
        });
      }
    });

    return dataset
      .filter(ds => ds.data.length > 1)
      .filter(ds => workoutGroupFilter ? workoutGroupFilter === ds.workoutGroup : true)
      .map((ds, i) => {
        const lineColor = chartColors[i] || chartColors[Math.floor(Math.random() * chartColors.length)];
        ds.backgroundColor = color(lineColor).alpha(0.5).rgbString();
        ds.borderColor = lineColor;
        return ds;
      });
  }

  initProgressByWeightChart = (workoutFilter) => {
    const ctx = document.getElementById("progress-workouts-by-weight");

    return new Chart(ctx, {
      type: 'line',
      data: {
        label: 'Workout Progress',
        datasets: this.workoutsByWeightLabels(workoutFilter)
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

  initProgressByMonthChart = () => {
    const ctx = document.getElementById("progress-workouts-by-month");
    const color = Chart.helpers.color;

    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.workoutsByMonthLabels(),
        datasets: [{
          label: '# of Workouts',
          data: this.workoutsByMonth(),
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
}

export default ProgressCharts;
