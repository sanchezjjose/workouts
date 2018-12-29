class User {

  constructor(user) {
    this.user = user;
    this.favorites = user.favorites;
    this.routines = user.routines;
    this.history = user.history;
  }

  setExerciseStatus(workoutDay, routineType, workoutName, exerciseName, status) {
    this.user.routine[workoutDay][routineType][workoutName][exerciseName].done = status;
  }

  getRoutineByDay(day) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = day || days[new Date().getDay()];
    const routine = Object.entries(this.routines[dayOfWeek]);
    const result = routine.filter(routine => routine[0] !== 'date').map(routineTypes => {
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