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
    
  }
}

export default ProgressCharts;