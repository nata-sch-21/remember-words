const Dictionary = require('../models/DictionaryModel');
const Word = require('../models/WordModel');
const tools = require('../utils/tools');

class Controller {
  static async allDictionaries(req, res) {
    try {
      const data = await Dictionary.getAllDictionaries();

      if (!data || data.length === 0) {
        tools.errorResponse(res, 'The dictionaries weren\'t found');
      }
      tools.successResponse(res, data);
    } catch (e) {
      console.log(`Error get dictionaries: ${e}`);
      tools.errorResponse(res, 'Server error');
    }
  }

  static async wordsByDictionaryId(req, res) {
    try {
      if (!req.params.id) {
        tools.errorResponse(res, 'Parameter id is required');
      }

      const data = await Word.getWordsByDictionaryId(req.params.id);

      if (!data || data.length === 0) {
        tools.errorResponse(res, 'The words weren\'t found');
      }
      tools.successResponse(res, data);
    } catch (e) {
      console.log(`Error get words: ${e}`);
      tools.errorResponse(res, 'Server error');
    }
  }
}

module.exports = Controller;
