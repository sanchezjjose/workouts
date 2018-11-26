const AWS = require('aws-sdk');

AWS.config.update({ 
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();

const setExerciseStatus = (userId, muscle, exerciseName, done) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = days[new Date().getDay()];

  return new Promise((resolve, reject) => {
    docClient.update({
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET #r.#d.#m.#e.done = :done",
      ExpressionAttributeNames: {
        "#r": "routine",
        "#d": dayOfWeek,
        "#m": muscle,
        "#e": exerciseName
      },
      ExpressionAttributeValues: {
        ":done": done 
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
  setExerciseStatus: setExerciseStatus
};
