class DictionaryModel {
  static async get() {
    try {
      // const data = await DB.cfind({}).exec();
      // return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async create(dictionary) {
    try {
      // const newDictionary = await DB.insert(dictionary);
      // return newDictionary._id;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async getById(id) {
    try {
      // const data = await DB.cfind({ _id: id }).exec();
      // if (data && data[0]) {
      //   return data[0];
      // }
      return null;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = Dictionary;
