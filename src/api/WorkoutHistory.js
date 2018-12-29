const AWS = require('./aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const saveExerciseHistory = (userId, date, exercise, workout) => {
  const createDateEntry = new Promise((resolve, reject) => {
    docClient.update({
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET history.#d = if_not_exists(history.#d, :d)",
      ExpressionAttributeNames: {
        "#d": date
      },
      ExpressionAttributeValues: {
        ":d": {}
      },
      ReturnValues:"ALL_NEW"
    }, (err, data) => {
      if (err) {
        return reject('Error JSON:', JSON.stringify(err, null, 2));
      }

      resolve(data);
    });
  })

  const saveExercise = new Promise((resolve, reject) => {
    docClient.update({
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET history.#d.#e = :de",
      ExpressionAttributeNames: {
        "#d": date,
        "#e": exercise.name
      },
      ExpressionAttributeValues: {
        ":de": {
          workout: workout,
          weight: exercise.metrics.weight,
          reps: exercise.metrics.reps,
          sets: exercise.metrics.sets
        }
      },
      ReturnValues:"ALL_NEW"
    }, (err, data) => {
      if (err) {
        return reject('Error JSON:', JSON.stringify(err, null, 2));
      }

      resolve(data);
    });
  });

  return Promise.all([ createDateEntry, saveExercise ]);
};

const removeExerciseHistory = (userId, date, exercise) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: `REMOVE history.#d.#e`,
      ExpressionAttributeNames: {
        "#d": date,
        "#e": exercise.name
      },
      ReturnValues:"ALL_NEW"
    };
    
    docClient.update(params, (err, data) => {
      if (err) {
        return reject('Unable to remove attribute from item. Error JSON:', JSON.stringify(err, null, 2));
    
      } else {
        return resolve(data);
      }
    });
  });
};

module.exports = { 
  saveExerciseHistory: saveExerciseHistory,
  removeExerciseHistory: removeExerciseHistory
};

// export { addExerciseHistory, deleteExerciseHistory };
