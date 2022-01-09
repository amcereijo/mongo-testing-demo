const testDB = require('../test/connect-db');
const { ObjectId } = require('mongodb');
const Users = require('./users');

describe('save-user', () => {
  let connection;
  let db;
  let users;
  let collection;

  beforeAll(async () => {
    connection = await testDB.connect();
    db = connection.db(testDB.getDbName());
    collection = db.collection('users');
    users = new Users(db);
  });
  afterAll(async () => {
    await testDB.disconnect(connection);
  })

  describe('run "saveUser"', () => {
    const userData = {
      name: 'Test',
      age: 21,
    };

    afterAll(async () => {
      // be sure we clean our data
      await collection.deleteOne({ name: userData.name });
    });

    it('should create a user', async () => {
      const newId = await users.saveUser(userData);
      expect(newId).toBeInstanceOf(ObjectId);

      const dbUser = await collection.findOne({name: userData.name});
      expect(dbUser._id).toBeInstanceOf(ObjectId);
      expect(dbUser.age).toBe(userData.age);
    });
  });
});
