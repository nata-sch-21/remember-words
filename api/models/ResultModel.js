const DB = require('../database/DB').results;

class Result {
  static async post(data) {
    await DB.loadDatabase();
    await DB.insert([data]);
    return true;
  }

  static async get() {
    await DB.loadDatabase();
    const data = await DB.cfind({}).exec();
    return data;
  }
}

module.exports = Result;
