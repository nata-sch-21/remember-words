const { Dictionary } = require('./models');

class DictionaryModel {
  static async get() {
    try {
      const data = await Dictionary.find();
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getById(id) {
    try {
      const data = await Dictionary.findOne({ _id: id });
      return data;
    } catch (e) {
      return null;
    }
  }
}

module.exports = DictionaryModel;
