const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1'
});

if (process.env.NODE_ENV === 'development') {
  AWS.config.update({
    endpoint: 'http://localhost:8000'
  });
}

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = 'Workouts';
const workouts = {
  id: 'joses',
  name: 'Jose',
  settings: {},
  favorites: {},
  history: {},
  routine: {}
};

console.log(workouts);

var params = {
  TableName: tableName,
  Item: {
    'id':  workouts.id,
    'name': workouts.name,
    'settings': workouts.settings,
    'favorites':  workouts.favorites,
    'history':  workouts.history,
    'routine':  workouts.routine,
  }
};

console.log('Creating user entry.');

docClient.put(params, function(err, data) {
  if (err) {
    console.error('Error', workouts.id, '. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('PutItem succeeded:', workouts.id);
  }
});
