var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.update({
    region: 'us-east-1',
    // endpoint: 'http://localhost:8000'
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing teams into DynamoDB. Please wait.');

var workouts = JSON.parse(fs.readFileSync('scripts/data/workouts.json', 'utf8'));

console.log(workouts);

var params = {
  TableName: 'Teams',
  Item: {
    'id':  team.id,
    'name': team.name,
    'seasons':  team.seasons
  }
};

docClient.put(params, function(err, data) {
  if (err) {
    console.error('Unable to add team', team.id, '. Error JSON:', JSON.stringify(err, null, 2));
  } else {
    console.log('PutItem succeeded:', team.id);
  }
});
