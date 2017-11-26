const DB = require('../database/DB').words;

class Word {
  static async getWordsByDictionaryId(id) {
    const data = await DB.cfind({ dictionary_id: id }).exec();
    return data;
  }
}

module.exports = Word;
