const AWS = require('./aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const saveFavoriteExercise = (userId, workoutType, workout, exercise) => {
  const createMuscleEntry = new Promise((resolve, reject) => {
    docClient.update({
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET #f.#t.#w = if_not_exists(#f.#t.#w, :e)",
      ExpressionAttributeNames: {
        "#f": "favorites",
        "#t": workoutType,
        "#w": workout
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
      UpdateExpression: "SET #f.#t.#w = list_append(#f.#t.#w, :e)",
      ExpressionAttributeNames: {
        "#f": "favorites",
        "#t": workoutType,
        "#w": workout
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

const removeFavoriteExercise = (userId, workoutType, workout, exercises) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: `SET #f.#t.#w = :e`,
      ExpressionAttributeNames: {
        "#f": "favorites",
        "#t": workoutType,
        "#w": workout
      },
      ExpressionAttributeValues: {
        ":e": exercises
      },
      ReturnValues:"ALL_NEW"
    };

    if (exercises.length === 0) {
      params.UpdateExpression = 'Remove #f.#t.#w';
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