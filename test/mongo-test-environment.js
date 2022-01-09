const NodeEnvironment = require('jest-environment-node');
const {start: startMongo, stop: stopMongo} = require('./connect-db');

class MongoDbEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.mongod = null;
  }

  async setup() {
    await super.setup();

     await startMongo();
  }

  async teardown() {
    await super.teardown();
    await stopMongo();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoDbEnvironment;
