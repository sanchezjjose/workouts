const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  // endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const userId = 'joses';
const date = '10-21-2018';
const muscle = 'Shoulders';
const exercise = {
  "Upright Cable Row": {
    "weight": "90",
    "reps": "6",
    "sets": "3"
  }
};

const params = {
  TableName: 'Workouts',
  Key: {
    'id': userId
  },
  UpdateExpression: `SET history.#d.#m = :e`,
  ExpressionAttributeNames: {
    "#d": date,
    "#m": muscle
  },
  ExpressionAttributeValues: {
      ":e": exercise,
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
