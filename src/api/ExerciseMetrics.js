const AWS = require('aws-sdk');

AWS.config.update({ 
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();

const updateExerciseMetrics = (userId, workoutDay, muscle, exerciseName, exerciseMetrics) => {
  return new Promise((resolve, reject) => {
    docClient.update({
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET #r.#d.#m.#e = :metrics",
      ExpressionAttributeNames: {
        "#r": "routine",
        "#d": workoutDay,
        "#m": muscle,
        "#e": exerciseName
      },
      ExpressionAttributeValues: {
        ":metrics": exerciseMetrics
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
  updateExerciseMetrics: updateExerciseMetrics
};
