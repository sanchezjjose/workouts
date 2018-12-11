import AWS from 'aws-sdk';

AWS.config.update({ 
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = 'Workouts';

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Workouts',
      Key: {
        'id': id
      }
    };

    docClient.get(params, (err, data) => {
      if (err) {
        console.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2));
        reject(err)

      } else {
        const user = JSON.parse(JSON.stringify(data));

        // if (Object.keys(user).length > 0) {
          const userWorkouts = (user && user.Item) || {};
          resolve(userWorkouts);

        // } else {
        //   reject(new Error(`User ${id} not found.`));
        // }
      }
    })
  });
};

const createUser = (userId, fullName) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: tableName,
      Item: {
        'id':  userId,
        'name': fullName,
        'exercises':  {},
        'history':  {},
        'routine':  {
          'Monday': {},
          'Tuesday': {},
          'Wednesday': {},
          'Thursday': {},
          'Friday': {},
          'Saturday': {},
          'Sunday': {},
        }
      }
    };

    docClient.put(params, function(err, data) {
      console.log('AAAAA');
      console.log(err)
      console.log(data);

      if (err) {
        console.error('Error creating user:', JSON.stringify(err, null, 2));
      } else {
        console.log('PutItem succeeded:', data);
      }
    });
  });
};

export { getUser, createUser };
