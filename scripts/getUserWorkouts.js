process.env.NODE_ENV = 'development';

const AWS = require('../src/api/aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: 'Workouts',
  Key: {
    'id': 'joses'
  }
};

docClient.get(params, function(err, data) {
  if (err) {
    console.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('GetItem succeeded:', JSON.stringify(data, null, 2));
  }
});
