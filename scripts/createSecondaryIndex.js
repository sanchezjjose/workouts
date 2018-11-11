const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
  // endpoint: 'http://localhost:8000'
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: 'Teams',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }, // Partition key
    // { AttributeName: 'name', KeyType: 'RANGE' } // Sort key
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'season_index', /* required */
      KeySchema: [ /* required */
        {
          AttributeName: 'seasonId', /* required */
          KeyType: 'HASH' /* required */
        },
      ],
      Projection: { /* required */
        NonKeyAttributes: [
          'title',
          'active',
          'schedule'
          /* more items */
        ],
        ProjectionType: 'INCLUDE'
      },
      ProvisionedThroughput: { /* required */
        ReadCapacityUnits: 10, /* required */
        WriteCapacityUnits: 10 /* required */
      }
    }
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' },
    { AttributeName: 'seasonId', AttributeType: 'S' },
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
