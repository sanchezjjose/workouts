const exerciseAPI = require('../src/api/ExerciseStatus.js');

const userId = 'joses';
const workoutDay = 'Monday';
const muscle = 'Chest';
const exerciseName = 'TEST: Barbell Bench Press';
const done = true;

exerciseAPI.saveExerciseStatus(userId, workoutDay, muscle, exerciseName, done)
  .then(() => {
    console.log('Successfully set exercise status');
  })
  .catch(err => {
    console.error(err);
  })
