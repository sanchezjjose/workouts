import AWS from 'aws-sdk';
import { debug } from 'util';

AWS.config.update({ 
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();

const addExerciseHistory = (userId, date, muscle, exercise) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET history.#d = :d",
      ExpressionAttributeNames: {
        "#d": date
      },
      ExpressionAttributeValues: {
        ":d": {}
      },
      ReturnValues:"ALL_NEW"
    };
    
    docClient.update(params, (err, data) => {
      if (err) {
        return reject('Error JSON:', JSON.stringify(err, null, 2));
    
      } else {
        const params = {
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
              weight: exercise.metric.weight,
              reps: exercise.metric.reps,
              sets: exercise.metric.sets
            }
          },
          ReturnValues:"ALL_NEW"
        };
    
        docClient.update(params, (err, data) => {
          if (err) {
            return reject('Error JSON:', JSON.stringify(err, null, 2));
    
          } else {
            return resolve(data);
          }
        });
      }
    });
  });
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

export { addExerciseHistory, deleteExerciseHistory };
