const exerciseAPI = require('../src/api/ExerciseMetrics.js');

const userId = 'joses';
const workoutDay = 'Tuesday';
const muscle = 'Back';
const exercise = { 
  name: 'Single-Arm Dumbbell Row',
  metrics: { 
    'done': false,
    'weight': '60',
    'reps': '8',
    'sets': '3'
  }
};

exerciseAPI.updateExerciseMetrics(userId, workoutDay, muscle, exercise)
  .then(() => {
    console.log('Successfully set exercise metrics');
  })
  .catch(err => {
    console.error(err);
  })
