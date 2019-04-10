import { groupBy, compareNames, compareGroupNames } from '../lib/Util';

class Workouts {

  constructor(workouts) {
    this.workouts = workouts || {};
  }

  addWorkoutDay(id, day) {
    this.workouts[id].days.push(day);
  }

  addWorkoutDate(id, date) {
    this.workouts[id].dates.push(date);
  }

  addWorkout(group, workoutName, type) {
    const id = `${group}-${workoutName}-${type}`.toLowerCase().replace(' ', '-');

    const metrics = type === 'weight' ? {
      'done': false,
      'weight': { 'value': 0, 'unit': 'lbs' },
      'reps': { 'value': 0 },
      'sets': { 'value': 0 }
    } : {
      'done': false,
      'time': { 'value': 0, 'unit': 'min' },
      'distance': { 'value': 0, 'unit': 'mi' },
      'kcal': { 'value': 0 }
    };

    const template = {
      'id': id,
      'group': group,
      'name': workoutName,
      'type': type,
      'metrics': metrics,
      'days': []
    };

    if (typeof this.workouts[id] === 'undefined') {
      this.workouts[id] = template;
    }
  }

  removeWorkoutDate(id, date) {
    this.workouts[id].dates = this.workouts[id].dates.filter(d => d !== date);
  }

  removeWorkoutDay(id, day) {
    this.workouts[id].days = this.workouts[id].days.filter(d => d !== day);
  }

  deleteWorkout(id) {
    delete this.workouts[id];
  }

  setStatus(id, status) {
    this.workouts[id].metrics.done = status;
  }

  setMetricValue(id, metricType, metricValue) {
    this.workouts[id].metrics[metricType].value = metricValue;
  }

  setMetricUnit(id, metricType, metricUnit) {
    this.workouts[id].metrics[metricType].unit = metricUnit;
  }

  get() {
    return this.workouts;
  }

  getViewModel(dayOpt) {
    const workoutsArr = Object.entries(this.workouts).map(w => w[1]);
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

export default Workouts;
