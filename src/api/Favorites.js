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

const saveFavoriteExercise = (userId, workoutType, muscle, exercise) => {
  const createMuscleEntry = new Promise((resolve, reject) => {
    docClient.update({
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET #f.#t.#m = if_not_exists(#f.#t.#m, :e)",
      ExpressionAttributeNames: {
        "#f": "favorites",
        "#t": workoutType,
        "#m": muscle
      },
      ExpressionAttributeValues: {
        ":e": []
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

  const createMuscleExercises = new Promise((resolve, reject) => {
    docClient.update({
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET #f.#t.#m = list_append(#f.#t.#m, :e)",
      ExpressionAttributeNames: {
        "#f": "favorites",
        "#t": workoutType,
        "#m": muscle
      },
      ExpressionAttributeValues: {
        ":e": [ exercise ]
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

  return Promise.all([createMuscleEntry, createMuscleExercises]);
};

const removeFavoriteExercise = (userId, workoutType, muscle, exercises) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: `SET #f.#t.#m = :e`,
      ExpressionAttributeNames: {
        "#f": "favorites",
        "#t": workoutType,
        "#m": muscle
      },
      ExpressionAttributeValues: {
        ":e": exercises
      },
      ReturnValues:"ALL_NEW"
    };

    if (exercises.length === 0) {
      params.UpdateExpression = 'Remove #f.#t.#m';
      delete params.ExpressionAttributeValues;
    }

    docClient.update(params, (err, data) => {
      if (err) {
        console.error('Error JSON:', JSON.stringify(err, null, 2));
        return reject(err);

      } else {
        resolve(data);
      }
    })
  });
}

module.exports = { 
  saveFavoriteExercise: saveFavoriteExercise,
  removeFavoriteExercise: removeFavoriteExercise
};
