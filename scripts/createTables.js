const AWS = require('../src/api/aws-sdk');
const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'Workouts',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }, // Partition key
    // { AttributeName: 'name', KeyType: 'RANGE' } // Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' },
    // { AttributeName: 'name', AttributeType: 'S' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

dynamodb.createTable(params, (err, data) => {
   if (err) {
     console.log('Unable to create table. Error JSON:', JSON.stringify(err, null, 2));
   } else {
     console.log('Created table. Table description JSON:', JSON.stringify(data, null, 2));
   }
});
