class User {

  constructor(user) {
    this.id = user.id;
    this.favorites = user.favorites;
    this.routines = user.routines;
    this.history = user.history;
    this.settings = user.settings;
  }

  setExerciseStatus(dayOfWeek, routineType, workoutName, exerciseName, status) {
    this.routines[dayOfWeek][routineType][workoutName][exerciseName].done = status;
  }

  getRoutineByDay(dayOfWeek) {
    const routine = Object.entries(this.routines[dayOfWeek]).filter(routine => routine[0] !== 'date');
    const result = routine.map(routineTypes => {
      return {
        type: routineTypes[0],
        workouts: Object.entries(routineTypes[1]).map(workout => {
          return {
            name: workout[0],
            exercises: Object.entries(workout[1]).map(exercise => {
              return {
                name: exercise[0],
                metrics: exercise[1]
              };
            })
          }
        }),
      };
    });

    // TODO: maybe don't need this anymore
    result.day = dayOfWeek;

    return result;
  }

  getFavorites() {
    return Object.entries(this.favorites).map(favorite => {
      return {
        type: favorite[0],
        workouts: Object.entries(favorite[1]).map(workout => {
          return {
            name: workout[0],
            exercises: workout[1]
          };
        })
      };
    });
  }
}

export default User;