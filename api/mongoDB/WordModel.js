const tools = require('../utils/tools.js');
const { Word } = require('./models');

class WordModel {
  static async getWordsByDictionaryId(id) {
    try {
      const data = await Word.find({ dictionary: id });
      return this.addImagePath(data);
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

module.exports = WordModel;
