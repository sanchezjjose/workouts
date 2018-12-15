const historyAPI = require('../src/api/WorkoutHistory.js');

const userId = 'joses';
const exercise = {
  name: 'TEST: Barbell Squats',
  metrics: {
    weight: '135',
    reps: '5',
    sets: '4'
  }
};

historyAPI.removeExerciseHistory(userId, exercise)
  .then(() => {
    console.log('Successfully deleted workout to history.');
  })
  .catch(e => {
    console.error(e);
  });
