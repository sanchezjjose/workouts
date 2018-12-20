process.env.NODE_ENV = 'development';

const AWS = require('../src/api/aws-sdk');
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

docClient.put(params, function(err, data) {
  if (err) {
    console.error('Error', workouts.id, '. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('PutItem succeeded:', workouts.id);
  }
});
