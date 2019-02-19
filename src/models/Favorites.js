class Favorites {

  constructor(favorites) {
    this.favorites = favorites;
  }

  set (routineType, workout) {
    this.favorites[routineType][workout] = this.favorites[routineType][workout] || [];
  }

  get () {
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
