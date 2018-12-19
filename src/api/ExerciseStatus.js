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

const saveExerciseStatus = (userId, workoutDay, workoutType, muscle, exerciseName, done) => {
  return new Promise((resolve, reject) => {
    docClient.update({
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET #r.#d.#t.#m.#e.done = :done",
      ExpressionAttributeNames: {
        "#r": "routine",
        "#d": workoutDay,
        "#t": workoutType,
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
  saveExerciseStatus: saveExerciseStatus
};
