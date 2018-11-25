const historyAPI = require('../src/api/WorkoutHistory.js');

const userId = 'joses';
const muscle = 'Legs';
const exercise = {
  name: 'TEST: Barbell Squats',
  metric: {
    weight: '135',
    reps: '5',
    sets: '4'
  }
};

historyAPI.addExerciseHistory(userId, muscle, exercise)
  .then(() => {
    console.log('Successfully saved workout to history.');
  })
  .catch(e => {
    console.error(e);
  });
