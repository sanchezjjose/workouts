const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  // endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const userId = 'joses';
const date = '11-24-2018';
const exercise = 'Curls (bands)';
const details = {
  muscle: 'Biceps',
  weight: '25',
  reps: '8',
  sets: '3'
};

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
    console.error('Error JSON:', JSON.stringify(err, null, 2));

  } else {
    console.log(data);

    const params = {
      TableName: 'Workouts',
      Key: {
        'id': userId
      },
      UpdateExpression: "SET history.#d.#e = :de",
      ExpressionAttributeNames: {
        "#d": date,
        "#e": exercise
      },
      ExpressionAttributeValues: {
        ":de": details
      },
      ReturnValues:"ALL_NEW"
    };

    docClient.update(params, (err, data) => {
      if (err) {
        console.error('Error JSON:', JSON.stringify(err, null, 2));

      } else {
        console.log(data);
      }
    });
  }
});
