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
