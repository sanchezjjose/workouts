var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  // endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

const userId = 'josed';
const seasonId = '1';
const game = {
  "id": "12",
  "type": "Pickup Game",
  "date": "October 15, 2018 7:00",
  "location": "Murry Bergtraum High School",
  "address": "411 Pearl St, New York, NY 10038",
  "roster": []
};

const params = {
  TableName: 'Workouts',
  Key: {
    'id': userId
  },
  UpdateExpression: `SET seasons.#s.schedule.#g = :game`,
  ExpressionAttributeNames: {
    "#s": seasonId,
    "#g": game.id
  },
  ExpressionAttributeValues: {
      ":game": game,
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
