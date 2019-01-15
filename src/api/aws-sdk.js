const AWS = require('aws-sdk');

AWS.config.update({ 
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

if (process.env.NODE_ENV === 'development') {
  console.log('Setting localhost endpoint.');

  AWS.config.update({
    endpoint: 'http://localhost:8000'
  });
}

module.exports = AWS;
