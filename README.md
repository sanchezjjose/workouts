This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Build
```
REACT_APP_AWS_ACCESS_KEY_ID=ABC REACT_APP_AWS_SECRET_ACCESS_KEY=xyz npm run build
```

## Run
```
REACT_APP_AWS_ACCESS_KEY_ID=ABC REACT_APP_AWS_SECRET_ACCESS_KEY=xyz npm run start
```

## AWS DynamoDB
The `lib` directory contains scripts that will get, load and query test data into DynamoDB. To run the scripts, simply run it with node, and optionally include the `AWS_PROFILE` environment variable at runtime.
```
AWS_PROFILE=home node lib/getTeam.js
```
