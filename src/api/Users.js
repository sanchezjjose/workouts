const AWS = require('./aws-sdk.js');
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
              "units": {
                "weight": "lbs",
                "time": "min",
                "distance": "mi"
              }
            },
            'history':  {},
            'workouts': {},
            'favorites':  {
              'weight': {},
              'time': {}
            },
            'routines':  {
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
