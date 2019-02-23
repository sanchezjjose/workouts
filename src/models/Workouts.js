
// Private methods
// const groupBySlow = (key => {
//   return (array) => {
//     array.reduce((objectsByKeyValue, obj) => ({
//       ...objectsByKeyValue,
//       [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
//     }), {});
//   }
// });

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

  deleteWorkout(id) {
    delete this.workouts[id];
  }

  getViewModel() {
    const workoutsArr = Object.entries(this.workouts).map(w => {
      const workoutId = w[0];
      const workoutData = w[1];
      workoutData.id = workoutId;
      return workoutData;
    });
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
