const AWS = require('./aws-sdk.js');

const docClient = new AWS.DynamoDB.DocumentClient();

const saveSettings = (userId, settings) => {
  return new Promise((resolve, reject) => {
    docClient.update({
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET settings = :settings",
      ExpressionAttributeValues: {
        ":settings": settings
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
  saveSettings: saveSettings
};
