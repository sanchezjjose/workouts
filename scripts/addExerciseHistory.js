const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  // endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();

const userId = 'joses';
const date = '10-21-2018';
const muscle = 'Legs';
const exercise = 'Squats';
const metrics = { 
  "weight": "100",
  "reps": "6",
  "sets": "3"
};

const params = {
  TableName: 'Workouts',
  Key: {
    'id': userId
  },
  UpdateExpression: "SET history.#d = if_not_exists(history.#d, :m), history.#d.#m = if_not_exists(history.#d.#m, :e), history.#d.#m.#e = if_not_exists(history.#d.#m.#e, :metrics)",
  ExpressionAttributeNames: {
    "#d": date,
    "#m": muscle,
    "#e": exercise
  },
  ExpressionAttributeValues: {
    ":d": date,
    ":m": muscle,
    ":e": exercise,
    ":metrics": metrics,
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
