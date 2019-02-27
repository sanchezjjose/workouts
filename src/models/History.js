class History {

  constructor(history) {
    this.history = history;
  }

  get() {
    return this.history;
  }

  getDate(dayOfWeek) {
    return this.history.recent[dayOfWeek];
  }

  getDates() {
    return this.history.dates;
  }

  getWorkouts() {
    return this.history.workouts;
  }

  hasDate(date) {
    return this.history.dates.indexOf(date) > -1;
  }

  addDate(date, dayOfWeek) {
    if (this.history.dates.indexOf(date) === -1) {
      this.history.dates.push(date);
    }

    this.history.recent[dayOfWeek] = date;
  }

  addWorkout(workout) {
    this.history.workouts[workout.id] = workout;
  }

  deleteWorkout(id) {
    delete this.history.workouts[id];
  }

  removeDate(date) {
    this.history.dates = this.history.dates.filter(d => d !== date);
  }
}

export default History;
