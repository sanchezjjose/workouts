import AWS from 'aws-sdk';

AWS.config.update({ 
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();

const getUserWorkouts = (id) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Workouts',
      Key: {
        'id': id
      }
    };

    docClient.get(params, (err, data) => {
      if (err) {
        console.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2));
        reject(err)

      } else {
        const workouts = JSON.parse(JSON.stringify(data, null, 2));

        if (Object.keys(workouts).length > 0) {
          const userWorkout = (workouts && workouts.Item) || {};
          resolve(userWorkout);

        } else {
          reject(new Error(`User ${id} not found.`));
        }
      }
    })
  });
};

const addExerciseHistory = (id, date, muscle, exercise) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Workouts',
      Key: {
        'id': id
      },
      UpdateExpression: `SET history.#d.#m = :exercise`,
      ExpressionAttributeNames: {
        "#d": date,
        "#m": muscle
      },
      ExpressionAttributeValues: {
          ":exercise": exercise,
      },
      ReturnValues:"ALL_NEW"
    };

    docClient.update(params, (err, data) => {
      if (err) {
        console.error('Unable to remove attribute from item. Error JSON:', JSON.stringify(err, null, 2));

      } else {
        console.log(data);
      }
    });
  });
};

const deleteExerciseHistory = (id, date, muscle, exercise) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Workouts',
      Key: {
        'id': id
      },
      UpdateExpression: `REMOVE history.#d.#m.#e`,
      ExpressionAttributeNames: {
        "#d": date,
        "#m": muscle,
        "#e": exercise
      },
      ReturnValues:"ALL_NEW"
    };

    docClient.update(params, (err, data) => {
      if (err) {
        console.error('Unable to remove attribute from item. Error JSON:', JSON.stringify(err, null, 2));

      } else {
        console.log(data);
      }
    });
  });
};

export { getUserWorkouts, addExerciseHistory, deleteExerciseHistory };
