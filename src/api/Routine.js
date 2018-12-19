const AWS = require('aws-sdk');

AWS.config.update({ 
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

if (process.env.NODE_ENV === 'development') {
  AWS.config.update({
    endpoint: 'http://localhost:8000'
  });
}

const docClient = new AWS.DynamoDB.DocumentClient();

const saveRoutine = (userId, routine, workoutDay) => {
  return new Promise((resolve, reject) => {
    docClient.update({
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET #r.#d = :routine",
      ExpressionAttributeNames: {
        "#r": "routine",
        "#d": workoutDay
      },
      ExpressionAttributeValues: {
        ":routine": routine 
      },
      ReturnValues:"ALL_NEW"
    }, (err, data) => {
      if (err) {
        console.error(err);
        return reject('Error JSON:', JSON.stringify(err, null, 2));
      }

      resolve(data);
    });
  });
};

module.exports = { 
  saveRoutine: saveRoutine
};
