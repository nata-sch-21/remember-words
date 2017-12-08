const Dictionary = require('../models/DictionaryModel');
const Word = require('../models/WordModel');
const tools = require('../utils/tools');

class Controller {
  static async allDictionaries(req, res) {
    try {
      const data = await Dictionary.getAllDictionaries();

      if (!data || data.length === 0) {
        tools.errorResponse(res, 'The dictionaries weren\'t found');
        return;
      }
      tools.successResponse(res, data);
    } catch (e) {
      console.log(`Error get dictionaries: ${e}`);
      tools.errorResponse(res, 'Server error');
    }
  }

  static async dictionaryWithWordsById(req, res) {
    try {
      if (!req.params.id || req.params.id === 'undefined') {
        tools.errorResponse(res, 'Parameter id is required');
        return;
      }

      const dictionary = await Dictionary.getDictionaryById(req.params.id);
      if (!dictionary) {
        tools.errorResponse(res, 'The dictionary wasn\'t found');
        return;
      }

      const data = await Word.getWordsByDictionaryId(req.params.id);

      if (!data || data.length === 0) {
        tools.errorResponse(res, 'The words weren\'t found');
        return;
      }
      tools.successResponse(res, { words: data, dictionary });
    } catch (e) {
      console.log(`Error get words: ${e}`);
      tools.errorResponse(res, 'Server error');
    }
  }


  static saveResult(req, res) {
    try {
      console.log(req.body);
      // const dictionary = await Dictionary.getDictionaryById(req.params.id);
      // if (!dictionary) {
      //   tools.errorResponse(res, 'The dictionary wasn\'t found');
      //   return;
      // }
      //
      // const data = await Word.getWordsByDictionaryId(req.params.id);
      //
      // if (!data || data.length === 0) {
      //   tools.errorResponse(res, 'The words weren\'t found');
      //   return;
      // }
      tools.successResponse(res, null, 'Your result successfully saved');
    } catch (e) {
      console.log(`Error get words: ${e}`);
      tools.errorResponse(res, 'Server error');
    }
  }
}

module.exports = Controller;
