import { compareNames } from '../lib/Util';

const groupBy = (key, array) => {
  return array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});
};

class Workouts {

  constructor(workouts) {
    this.workouts = workouts;
  }

  addWorkout(group, workoutName, type) {
    const id = `${group}-${workoutName}-${type}`.toLowerCase().replace(' ', '-');

    const metrics = type === 'weight' ? {
      'done': false,
      'weight': { 'value': 0, 'unit': 'lbs' },
      'reps': { 'value': 0, 'unit': '-' },
      'sets': { 'value': 0, 'unit': '-' }
    } : {
      'done': false,
      'time': { 'value': 0, 'unit': 'min' },
      'distance': { 'value': 0, 'unit': 'mi' },
      'kcal': { 'value': 0, 'unit': '-' }
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

  deleteWorkout(id) {
    delete this.workouts[id];
  }

  get() {
    return this.workouts;
  }

  getViewModel() {
    const workoutsArr = Object.entries(this.workouts).map(w => w[1]);
    const groupedWorkouts = groupBy('group', workoutsArr);
    const resultArr = Object.entries(groupedWorkouts).map(r => { 
      return {
        name: r[0],
        exercises: r[1].sort(compareNames)
      }
    });

    return resultArr.sort(compareNames);
  }

  getWorkoutsByDay(day) {
    const workoutsArr = Object.entries(this.workouts).map(w => w[1]);
    const result = workoutsArr.filter(w => w.days.indexOf(day) > -1).flat();

    return result;
  }
}

export default Workouts;
