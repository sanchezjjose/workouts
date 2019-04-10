import { groupBy, compareNames, compareGroupNames } from '../lib/Util';

class History {

  constructor(history) {
    this.history = history || {};
    this.history.dates = this.history.dates || {};
    this.history.dates.recent = this.history.dates.recent || {};
    this.history.dates.all = this.history.dates.all || [];
    this.history.workouts = this.history.workouts || {};
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

  addDate(date, dayOfWeekOpt) {
    if (this.history.dates.all.indexOf(date) === -1) {
      this.history.dates.all.push(date);
    }
    if (typeof dayOfWeekOpt === 'string') {
      this.history.dates.recent[dayOfWeekOpt] = date;
    }
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

  getViewModel(workoutDate, dayOpt) {
    const workoutsArr = Object.entries(this.history.workouts[workoutDate]).map(w => w[1]);
    const filteredWorkouts = dayOpt ? workoutsArr.filter(w => w.days.indexOf(dayOpt) > -1) : workoutsArr;
    const groupedWorkouts = groupBy('type', filteredWorkouts);
    const resultArr = Object.entries(groupedWorkouts).map(r => {
      const type = r[0];
      const sortedWorkouts = r[1].sort(compareNames);
      const groupedWorkoutsArr = groupBy('group', sortedWorkouts);
      const workouts = Object.entries(groupedWorkoutsArr).map(w => {
        return {
          group: w[0], 
          exercises: w[1]
        }
      });

      return {
        type: type,
        workouts: workouts.sort(compareGroupNames)
      }
    });

    return resultArr;
  }
}

export default History;
// module.exports = History;
