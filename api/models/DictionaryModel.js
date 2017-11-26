const DB = require('../database/DB').dictionaries;

class Dictionary {
  static async getAllDictionaries() {
    const data = await DB.cfind({}).exec();
    return data;
  }
}

module.exports = Dictionary;
