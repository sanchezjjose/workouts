const AWS = require('./aws-sdk.js');

const docClient = new AWS.DynamoDB.DocumentClient();

const saveExerciseMetrics = (userId, dayOfWeek, workoutType, workoutName, exerciseName, metricType, metricValue, metricUnit) => {
  return new Promise((resolve, reject) => {
    docClient.update({
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET #r.#d.#wt.#wn.#e.#mt = :metric",
      ExpressionAttributeNames: {
        "#r": "routines",
        "#d": dayOfWeek,
        "#wt": workoutType,
        "#wn": workoutName,
        "#e": exerciseName,
        "#mt": metricType
      },
      ExpressionAttributeValues: {
        ":metric": {
          value: metricValue,
          unit: metricUnit
        }
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
  saveExerciseMetrics: saveExerciseMetrics
};
