const AWS = require('./aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const saveDates = (userId, dates) => {
  return new Promise((resolve, reject) => {
    docClient.update({
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET history.dates = :d",
      ExpressionAttributeValues: {
        ":d": dates 
      },
      ReturnValues:"ALL_NEW"
    }, (err, data) => {
      if (err) {
        return reject('Error JSON:', JSON.stringify(err, null, 2));
      }

      resolve(data);
    });
  });
};

const saveWorkouts = (userId, workouts) => {
  return new Promise((resolve, reject) => {
    docClient.update({
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET history.workouts = :w",
      ExpressionAttributeValues: {
        ":w": workouts 
      },
      ReturnValues:"ALL_NEW"
    }, (err, data) => {
      if (err) {
        return reject('Error JSON:', JSON.stringify(err, null, 2));
      }

      resolve(data);
    });
  });
};

const deleteWorkout = (userId, id) => {
  return new Promise((resolve, reject) => {
    docClient.update({
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "REMOVE history.workouts.#id",
      ExpressionAttributeNames: {
        "#id": id
      },
      ReturnValues:"ALL_NEW"
    }, (err, data) => {
      if (err) {
        return reject('Error JSON:', JSON.stringify(err, null, 2));
      }

      resolve(data);
    });
  });
};

module.exports = { 
  saveDates: saveDates,
  saveWorkouts: saveWorkouts,
  deleteWorkout: deleteWorkout
};
