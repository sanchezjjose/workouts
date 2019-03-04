const AWS = require('../src/api/aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
    TableName: 'Workouts',
    Key: {
      'id': process.env.USER_ID
    }
};

docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});
