const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  // endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const userId = 'joses';
const date = '10-23-2018';
const exercise = {
  muscle: 'Biceps',
  exercise: 'Dumbbell Curls',
  weight: '25',
  reps: '8',
  sets: '3'
};

const params = {
  TableName: 'Workouts',
  Key: {
    'id': userId
  },
  UpdateExpression: "SET history = list_append(history, :e)",
  ConditionExpression: "attribute_exists(history, :d)",
  // ExpressionAttributeNames: {
  //   "#d": date
  // },
  ExpressionAttributeValues: {
    ":d": date,
    ":e": exercise,
  },
  // ConditionExpression: "attribute_not_exists(history.#d.#m.#e)",
  ReturnValues:"ALL_NEW"
};

docClient.update(params, (err, data) => {
  if (err) {
    console.error('Error JSON:', JSON.stringify(err, null, 2));

  } else {
    console.log(data);
  }
});
