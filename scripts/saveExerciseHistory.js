const historyAPI = require('../src/api/WorkoutHistory.js');

const userId = 'joses';
const workoutName = 'Legs';
const exercise = {
  name: 'TEST: Barbell Squats',
  metrics: {
    weight: '135',
    reps: '5',
    sets: '4'
  }
};

historyAPI.saveExerciseHistory(userId, workoutName, exercise)
  .then(() => {
    console.log('Successfully saved workout to history.');
  })
  .catch(e => {
    console.error(e);
  });
