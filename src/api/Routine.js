const AWS = require('./aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const saveRoutine = (userId, routine, dayOfWeek) => {
  return new Promise((resolve, reject) => {
    docClient.update({
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET #r.#d = :routine",
      ExpressionAttributeNames: {
        "#r": "routines",
        "#d": dayOfWeek
      },
      ExpressionAttributeValues: {
        ":routine": routine 
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
  saveRoutine: saveRoutine
};
