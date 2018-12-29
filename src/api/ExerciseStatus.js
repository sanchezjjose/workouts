const AWS = require('./aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const saveExerciseStatus = (userId, dayOfWeek, workoutType, workout, exerciseName, done) => {
  return new Promise((resolve, reject) => {
    docClient.update({
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET #r.#d.#t.#w.#e.done = :done",
      ExpressionAttributeNames: {
        "#r": "routines",
        "#d": dayOfWeek,
        "#t": workoutType,
        "#w": workout,
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
