const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  // endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const userId = 'joses';
const dayOfWeek = 'Saturday';
const exercise = 'Curls (bands)';
const done = true;

const params = {
  TableName: 'Workouts',
  Key: {
    'id': userId
  },
  UpdateExpression: "SET routine.#d = :d",
  ExpressionAttributeNames: {
    "#d": dayOfWeek
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
