const AWS = require("aws-sdk");
const exerciseAPI = require('../src/api/ExerciseStatus.js');

AWS.config.update({
  region: "us-east-1",
  // endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const userId = 'joses';
const muscle = 'Chest';
const exerciseName = 'Barbell Bench Press';
const done = true;

exerciseAPI.setExerciseStatus(userId, muscle, exerciseName, done)
  .then(() => {
    console.log('Successfully set exercise status');
  })
  .catch(err => {
    console.error(err);
  })
