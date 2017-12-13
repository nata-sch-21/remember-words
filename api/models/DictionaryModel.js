const DB = require('../database/DB').dictionaries;

class Dictionary {
  static async get() {
    try {
      await DB.loadDatabase();
      const data = await DB.cfind({}).exec();
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async create(dictionary) {
    try {
      await DB.loadDatabase();
      const newDictionary = await DB.insert(dictionary);
      return newDictionary._id;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getById(id) {
    try {
      await DB.loadDatabase();
      const data = await DB.cfind({ _id: id }).exec();
      if (data && data[0]) {
        return data[0];
      }
      return null;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = Dictionary;
