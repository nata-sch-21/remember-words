const DB = require('../database/DB').dictionaries;

class Dictionary {
  static async get() {
    await DB.loadDatabase();
    const data = await DB.cfind({}).exec();
    return data;
  }

  static async getById(id) {
    await DB.loadDatabase();
    const data = await DB.cfind({ _id: id }).exec();
    if (data && data[0]) {
      return data[0];
    }
    return null;
  }
}

module.exports = Dictionary;
