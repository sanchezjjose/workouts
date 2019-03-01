class History {

  constructor(history) {
    this.history = history || {};
    this.history.dates = history.dates || {};
    this.history.dates.recent = history.dates.recent || {};
    this.history.dates.all = history.dates.all || [];
    this.history.workouts = history.workouts || {};
  }

  get() {
    return this.history;
  }

  getDate(dayOfWeek) {
    return this.history.dates.recent[dayOfWeek];
  }

  getDates() {
    return this.history.dates;
  }

  getWorkouts() {
    return this.history.workouts;
  }

  hasDate(date) {
    return this.history.dates.all.indexOf(date) > -1;
  }

  hasWorkout(date, workoutId) {
    return typeof this.history.workouts[date] === 'object' &&
      typeof this.history.workouts[date][workoutId] === 'object';
  }

  addDate(date, dayOfWeek) {
    if (this.history.dates.all.indexOf(date) === -1) {
      this.history.dates.all.push(date);
    }

    this.history.dates.recent[dayOfWeek] = date;
  }

  addWorkout(date, workout) {
    if (typeof this.history.workouts[date] === 'undefined') {
      this.history.workouts[date] = {};
    }
    
    this.history.workouts[date][workout.id] = workout;
  }

  deleteWorkout(date, workoutId) {
    delete this.history.workouts[date][workoutId];
  }

  removeDate(date) {
    this.history.dates.all = this.history.dates.all.filter(d => d !== date);
  }
}

export default History;
