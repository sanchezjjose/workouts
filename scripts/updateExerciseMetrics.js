const exerciseAPI = require('../src/api/ExerciseMetrics.js');

const userId = 'joses';
const dayOfWeek = 'Tuesday';
const workoutName = 'Back';
const exercise = { 
  name: 'TEST: Single-Arm Dumbbell Row',
  metrics: {
    'done': false,
    'weight': '60',
    'reps': '8',
    'sets': '3'
  }
};

exerciseAPI.updateExerciseMetrics(userId, dayOfWeek, workoutName, exercise.name, exercise.metrics)
  .then(() => {
    console.log('Successfully set exercise metrics');
  })
  .catch(err => {
    console.error(err);
  })
