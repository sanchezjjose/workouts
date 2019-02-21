class Favorites {

  constructor(favorites) {
    this.favorites = favorites;
  }

  addWorkout (routineType, workout) {
    if (!this.favorites.hasOwnProperty(routineType)) {
      this.favorites[routineType] = {};
    }
    if (!this.favorites[routineType].hasOwnProperty(workout)) {
      this.favorites[routineType][workout] = [];
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

  get () {
    return this.favorites;
  }

  getExercises (routineType, workout) {
    const workouts = this.favorites[routineType] || [];
    const exercises = workouts[workout] || [];

    return exercises;
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

  hasWorkouts () {
    const weightWorkouts = Object.entries(this.favorites['weight'] || {});
    const timeWorkouts = Object.entries(this.favorites['time'] || {});

    return weightWorkouts.length + timeWorkouts.length > 0;
  }
}

export default Favorites;
