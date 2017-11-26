const DB = require('../database/DB').dictionaries;

class Dictionary {
  static async getAllDictionaries() {
    const data = await DB.cfind({}).exec();
    return data;
  }

  static async getDictionaryById(id) {
    const data = await DB.cfind({ _id: id }).exec();
    return data;
  }
}

module.exports = Dictionary;
