const AWS = require('aws-sdk');

AWS.config.update({ 
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();

const addExerciseHistory = (userId, date, exercise, muscle) => {
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
          muscle: muscle,
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

const deleteExerciseHistory = (userId, date, exercise) => {
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
  addExerciseHistory: addExerciseHistory,
  deleteExerciseHistory: deleteExerciseHistory
};

// export { addExerciseHistory, deleteExerciseHistory };
