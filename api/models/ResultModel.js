const DB = require('../database/DB').results;

class Result {
  static async post(data) {
    await DB.loadDatabase();
    await DB.insert([data]);
    return true;
  }

  static async get(sort, limit) {
    const data = await DB.cfind({}).sort({ sort }).limit(limit);
    return data;
  }
}

module.exports = Result;
