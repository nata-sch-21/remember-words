const tools = require('../../utils/tools.js');

class WordModel {
  static async getWordsByDictionaryId(id) {
    try {
      // const data = await DB.cfind({ dictionary_id: id }).exec();
      // return this.addImagePath(data);
    } catch (e) {
      throw new Error(e);
    }
  }

  static async createMultiple(dictionaryId, words) {
    try {
      // const wordsWithDictionaryIds = this.processWords(dictionaryId, words);
      // const newWords = await DB.insert(wordsWithDictionaryIds);
      // return Object.keys(newWords).length;
    } catch (e) {
      throw new Error(e);
    }
  }

  static addImagePath(words) {
    const result = [];
    const keys = Object.keys(words);

    keys.forEach((key) => {
      const word = words[key];
      word.image = tools.getImagePath(word.image);
      result.push(word);
    });

    return result;
  }

  static processWords(dictionaryId, words) {
    const result = [];
    const keys = Object.keys(words);

    keys.forEach((key) => {
      const word = words[key];
      word.dictionary_id = dictionaryId;
      result.push(word);
    });

    return result;
  }
}

module.exports = Word;
