const DB = require('../database/DB').results;

class Result {
  static async post(data) {
    try {
      await DB.loadDatabase();
      await DB.insert([data]);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async get() {
    try {
      await DB.loadDatabase();
      const data = await DB.cfind({}).exec();
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = Result;
