import AWS from 'aws-sdk';

AWS.config.update({ 
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

if (process.env.NODE_ENV === 'development') {
  AWS.config.update({
    endpoint: 'http://localhost:8000'
  });
}

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
        const userData = user && user.Item;

        // TODO: Check Authentication cookie here
        if (userData) {
          resolve(userData);

        } else {
          reject(`User ${id} does not exist.`);
        }
      }
    })
  });
};

const createUser = (userId, fullName) => {
  return new Promise((resolve, reject) => {
    getUser(userId)
      .then((user) => {
        reject(`User ${user.id} already exists.`);

      }).catch((msg) => {
        console.log(msg);

        const params = {
          TableName: tableName,
          Item: {
            'id':  userId,
            'name': fullName,
            'settings': {
              'units': 'pounds',
              'time': 'minutes'
            },
            'favorites':  {
              'weight': {},
              'time': {}
            },
            'history':  {},
            'routine':  {
              'Monday': {
                'weight': {},
                'time': {}
              },
              'Tuesday': {
                'weight': {},
                'time': {}
              },
              'Wednesday': {
                'weight': {},
                'time': {}
              },
              'Thursday': {
                'weight': {},
                'time': {}
              },
              'Friday': {
                'weight': {},
                'time': {}
              },
              'Saturday': {
                'weight': {},
                'time': {}
              },
              'Sunday': {
                'weight': {},
                'time': {}
              }
            }
          }
        };

        docClient.put(params, function(err, data) {
          if (err) {
            console.error('Error creating user:', JSON.stringify(err, null, 2));
            reject(err);

          } else {
            console.log('PutItem succeeded:', data);
            resolve(data);
          }
        });
      });
  });
};

export { getUser, createUser };
