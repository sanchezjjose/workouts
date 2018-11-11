var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  // endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
  TableName : "Workouts",
  KeyConditionExpression: "id = :workoutId",
  // ProjectionExpression: "title",
  FilterExpression: "#n = :name",
  ExpressionAttributeNames: {
    "#n": "name"
  },
  ExpressionAttributeValues: {
    ":workoutId": "jose",
    ":name": "Jose's Workout Plan"
  }
};

docClient.query(params, function(err, data) {
  if (err) {
    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
  } else {
    console.log("Query succeeded.");
    console.log(data);
  }
});
