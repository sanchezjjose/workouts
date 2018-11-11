import AWS from 'aws-sdk';

AWS.config.update({ 
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();

const getTeam = (id) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Teams',
      Key: {
        'id': id
      }
    };

    docClient.get(params, (err, data) => {
      if (err) {
        console.error('Unable to read item. Error JSON:', JSON.stringify(err, null, 2));
        reject(err)

      } else {
        const teams = JSON.parse(JSON.stringify(data, null, 2));

        if (Object.keys(teams).length > 0) {
          const team = (teams && teams.Item) || {};
          resolve(team);

        } else {
          reject(new Error(`Team ${id} not found.`));
        }
      }
    })
  });
};

const updateGame = (teamId, seasonId, game) => {
  console.log(`Updating game ${game.id}...`);

  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Teams',
      Key: {
        'id': teamId
      },
      UpdateExpression: `SET seasons.#s.schedule.#g = :game`,
      ExpressionAttributeNames: {
        "#s": seasonId,
        "#g": game.id
      },
      ExpressionAttributeValues: {
          ":game": game,
      },
      ReturnValues:"ALL_NEW"
    };

    docClient.update(params, (err, data) => {
      if (err) {
        console.error('Unable to update game. Error JSON:', JSON.stringify(err, null, 2));
        reject(err);

      } else {
        const teams = JSON.parse(JSON.stringify(data, null, 2));
        const team = (teams && teams.Item) || {};

        resolve(team);
      }
    })
  });
};

const addPlayer = (teamId, seasonId, gameId, playerName) => {
  console.log(`Adding ${playerName} to game...`);

  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Teams',
      Key: {
        'id': teamId
      },
      UpdateExpression: `SET seasons.#s.schedule.#g.#p = list_append(seasons.#s.schedule.#g.#p, :new_player)`,
      ExpressionAttributeNames: {
        "#p": "roster",
        "#s": seasonId,
        "#g": gameId
      },
      ExpressionAttributeValues: {
          ":new_player": [ playerName ]
      },
      ReturnValues:"ALL_NEW"
    };

    docClient.update(params, (err, data) => {
      if (err) {
        console.error('Unable to add player. Error JSON:', JSON.stringify(err, null, 2));
        reject(err)

      } else {
        const teams = JSON.parse(JSON.stringify(data, null, 2));
        const team = (teams && teams.Item) || {};

        resolve(team);
      }
    })
  });
};

const removePlayer = (teamId, seasonId, gameId, updatedroster) => {
  console.log(`Removing player from game...`);

  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Teams',
      Key: {
        'id': teamId
      },
      UpdateExpression: `SET seasons.#s.schedule.#g.#p = :roster`,
      ExpressionAttributeNames: {
        "#p": "roster",
        "#s": seasonId,
        "#g": gameId
      },
      ExpressionAttributeValues: {
          ":roster": updatedroster
      },
      ReturnValues:"ALL_NEW"
    };

    docClient.update(params, (err, data) => {
      if (err) {
        console.error('Unable to remove player. Error JSON:', JSON.stringify(err, null, 2));
        reject(err);

      } else {
        const teams = JSON.parse(JSON.stringify(data, null, 2));
        const team = (teams && teams.Item) || {};

        resolve(team);
      }
    })
  });
};

const addGame = (teamId, seasonId, game) => {
  console.log(`Adding game to season...`);

  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Teams',
      Key: {
        'id': teamId
      },
      UpdateExpression: `SET seasons.#s.schedule.#g = :game`,
      ExpressionAttributeNames: {
        "#s": seasonId,
        "#g": game.id
      },
      ExpressionAttributeValues: {
          ":game": game,
      },
      ReturnValues:"ALL_NEW"
    };

    docClient.update(params, (err, data) => {
      if (err) {
        console.error('Unable to add game. Error JSON:', JSON.stringify(err, null, 2));
        reject(err);

      } else {
        const teams = JSON.parse(JSON.stringify(data, null, 2));
        const team = (teams && teams.Item) || {};

        resolve(team);
      }
    })
  });
};

const removeGame = (teamId, seasonId, gameId) => {
  console.log(`Removing game ${gameId}...`);

  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'Teams',
      Key: {
        'id': teamId
      },
      UpdateExpression: `REMOVE seasons.#s.schedule.#g`,
      ExpressionAttributeNames: {
        "#s": seasonId,
        "#g": gameId
      },
      ReturnValues:"ALL_NEW"
    };

    docClient.update(params, (err, data) => {
      if (err) {
        console.error('Unable to remove game. Error JSON:', JSON.stringify(err, null, 2));
        reject(err);

      } else {
        const teams = JSON.parse(JSON.stringify(data, null, 2));
        const team = (teams && teams.Item) || {};

        resolve(team);
      }
    })
  });
};

export { getTeam, addPlayer, removePlayer, updateGame, addGame, removeGame };
