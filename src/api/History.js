const AWS = require('./aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const saveDates = (userId, history) => {
  return new Promise((resolve, reject) => {
    docClient.update({
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET history = :h",
      ExpressionAttributeValues: {
        ":h": history 
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
  saveDates: saveDates
};
