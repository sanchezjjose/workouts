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
const workouts = JSON.parse(fs.readFileSync('./data/workouts.json', 'utf8'));

console.log(workouts);

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

  console.log('Loading test data.');

  docClient.put(params, function(err, data) {
    if (err) {
      console.error('Error', workout.id, '. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('PutItem succeeded:', workout.id);
    }
  });
});
