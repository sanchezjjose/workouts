const AWS = require('../src/api/aws-sdk');
const fs = require('fs');
const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = 'Workouts';
const users = JSON.parse(fs.readFileSync('./scripts/data/backup.json', 'utf8'));
const user = users.find(u => u.id === process.env.USER_ID);

const params = {
  TableName: tableName,
  Item: {
    'id':  user.id,
    'name': user.name,
    'settings': user.settings,
    'workouts':  user.workouts,
    'history':  user.history
  }
};

docClient.put(params, function(err, data) {
  if (err) {
    console.error('Error', user.id, '. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('PutItem succeeded:', user.id);
  }
});
