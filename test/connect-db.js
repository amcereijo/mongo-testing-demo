const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');


let mongod;

async function maybeCreateMongoDB () {
  if (!mongod) {
    mongod = await MongoMemoryServer.create({
      binary: {
        version: '4.2.0'
      }
    });


  }
}

module.exports = {
  start: async () => {
    await maybeCreateMongoDB();
    return mongod;
  },
  stop: async () => {
    if(mongod) {
      await mongod.stop();
    }
  },

  connect: async () => {
    await maybeCreateMongoDB();
    const connection = MongoClient.connect(mongod.getUri(), {});
    return connection;
  },
  getDbName: () => {
    return mongod.instanceInfo.dbName;
  },
  disconnect: async (connection) => {
    await connection.close();
  },
}
