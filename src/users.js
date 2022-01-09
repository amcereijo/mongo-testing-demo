class Users {
  constructor(db) {
    this.userCollection = db.collection('users');
  }

  async saveUser(userData) {
    const result = await this.userCollection.insertOne(userData);
    return result.insertedId;
  }
}

module.exports = Users;
