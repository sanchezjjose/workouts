var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  // endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

const workoutId = 'jose';
const seasonId = '1';
const gameId = '9';

const params = {
  TableName: 'Teams',
  Key: {
    'id': teamId
  },
  UpdateExpression: `REMOVE seasons.#s.schedule.#g`,
  ExpressionAttributeNames: {
    "#s": seasonId,
    "#g": gameId
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
