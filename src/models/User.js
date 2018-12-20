class User {

  constructor(user) {
    this.user = user;
    this.favorites = user.favorites;
    this.routine = user.routine;
    this.history = user.history;
  }

  setWorkoutStatus(workoutDay, workoutType, muscle, exerciseName, status) {
    this.user.routine[workoutDay][workoutType][muscle][exerciseName].done = status;
  }

  getWorkouts(day) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    const dayOfWeek = day || days[today];
    const routine = Object.entries(this.routine[dayOfWeek]);

    const workout = routine.filter(workout => workout[0] !== 'date').map(workout => {
      return {
        type: workout[0],
        routine: Object.entries(workout[1]).map(routine => {
          return {
            muscle: routine[0],
            exercises: Object.entries(routine[1]).map((exercise) => {
              return {
                name: exercise[0],
                metrics: exercise[1]
              };
            })
          }
        }),
      };
    });

    workout.day = dayOfWeek;

    return workout;
  }

  getFavorites() {
    return Object.entries(this.favorites).map(favorite => {
      return {
        type: favorite[0],
        workouts: Object.entries(favorite[1]).map(workout => {
          return {
            muscle: workout[0],
            exercises: workout[1]
          };
        })
      };
    });
  }
}

export default User;