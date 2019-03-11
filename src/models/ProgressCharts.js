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
    return [6, 8, 8, 10, 7, 18, 22, 24, 15, 16, 18, 6];
  }
}

export default ProgressCharts;