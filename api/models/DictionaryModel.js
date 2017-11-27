const DB = require('../database/DB').dictionaries;

class Dictionary {
  static async getAllDictionaries() {
    await DB.loadDatabase();
    const data = await DB.cfind({}).exec();
    return data;
  }

  static async getDictionaryById(id) {
    await DB.loadDatabase();
    const data = await DB.cfind({ _id: id }).exec();
    return data;
  }
}

module.exports = Dictionary;
