const AWS = require('../src/api/aws-sdk');
const fs = require('fs');
const docClient = new AWS.DynamoDB.DocumentClient();

const tableName = 'Workouts';
const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));

users.forEach (user => {
  const params = {
    TableName: tableName,
    Item: {
      'id':  user.id,
      'name': user.name,
      'settings': user.settings,
      'favorites':  user.favorites,
      'history':  user.history,
      'routines':  user.routines,
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error('Error', user.id, '. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log('PutItem succeeded:', user.id);
    }
  });
});
