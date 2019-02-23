const AWS = require('./aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const saveFavorites = (userId, favorites) => {
  return new Promise((resolve, reject) => {
    docClient.update({
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET #f = :f",
      ExpressionAttributeNames: {
        "#f": "favorites"
      },
      ExpressionAttributeValues: {
        ":f": favorites
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

const deleteWorkout = (userId, exerciseId) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: `REMOVE workouts.#id`,
      ExpressionAttributeNames: {
        "#id": exerciseId
      },
      ReturnValues:"ALL_NEW"
    };

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
  deleteWorkout: deleteWorkout
};
