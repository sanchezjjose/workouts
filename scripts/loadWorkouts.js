process.env.NODE_ENV = 'development';

const AWS = require('../src/api/aws-sdk');
const fs = require('fs');
const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = 'Workouts';
const workouts = JSON.parse(fs.readFileSync('./data/workouts.json', 'utf8'));

workouts.forEach (workout => {
  const params = {
    TableName: tableName,
    Item: {
      'id':  workout.id,
      'name': workout.name,
      'settings': workout.settings,
      'favorites':  workout.favorites,
      'history':  workout.history,
      'routine':  workout.routine,
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error('Error', workout.id, '. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('PutItem succeeded:', workout.id);
    }
  });
});
