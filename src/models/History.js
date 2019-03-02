import { formatDate } from '../lib/Util';

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

  fill() {
    function addDays(date, days) {
      const initialDate = new Date(date);
      const result = initialDate.setDate(initialDate.getDate() + days);
      return new Date(result);
    }

    function skipDate(date) {
      const month = date.getMonth();
      const dayOfMonth = date.getDate();
      return (month === 11 && dayOfMonth > 20) || (month === 0 && dayOfMonth < 20);
    }

    const today = new Date();
    const start = new Date(2018, 8, 10);
    const end = new Date(today.getFullYear(), today.getDate(), today.getMonth());

    for (let i = 0; true; i++) {
      let date = addDays(start, i);

      if (formatDate(date) === formatDate(end)) {
        break;
      }

      if (!this.hasDate(date) && !skipDate(date)) {
        this.history.dates.all.push(formatDate(date));
      }
    }
  }
}

export default History;
