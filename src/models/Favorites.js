class Favorites {

  constructor(favorites) {
    this.favorites = favorites;
  }

  addWorkout (routineType, workout) {
    const workouts = this.favorites[routineType];

    if (!workouts.hasOwnProperty(workout)) {
      workouts[workout] = [];
    }
  }

  addExercise (routineType, workout, exercise) {
    const exercises = this.favorites[routineType][workout];

    if (typeof exercises.find(e => e === exercise) === 'undefined') {
      exercises.push(exercise);
    }
  }

  removeExercise (routineType, workout, exercise) {
    const exercises = this.favorites[routineType][workout];
    const updatedExercises = exercises.filter(e => e !== exercise);

    this.favorites[routineType][workout] = updatedExercises;

    if (updatedExercises.length === 0) {
      delete this.favorites[routineType][workout];
    }
  }

  getExercises (routineType, workout) {
    return this.favorites[routineType][workout];
  }

  getViewModel () {
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

export default Favorites;
