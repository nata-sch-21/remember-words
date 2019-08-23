const DictionaryModel = require('../mongoDB/DictionaryModel');
const WordModel = require('../mongoDB/WordModel');
const ResultModel = require('../mongoDB/ResultModel');
const tools = require('../utils/tools');
const config = require('../config');

class Controller {
  static async allDictionaries(req, res) {
    try {
      const data = await DictionaryModel.get();

      if (!data || data.length === 0) {
        tools.errorResponse(res, 'The dictionaries weren\'t found');
        return;
      }
      tools.successResponse(res, { dictionaries: data });
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

      const dictionary = await DictionaryModel.getById(req.params.id);
      if (!dictionary) {
        tools.errorResponse(res, 'The dictionary wasn\'t found');
        return;
      }

      const data = await WordModel.getWordsByDictionaryId(req.params.id);

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

  static async bestResults(req, res) {
    try {
      const lastResults = await ResultModel.get();
      if (!lastResults) {
        tools.successResponse(res, 'There are no results yet');
        return;
      }

      lastResults.sort((a, b) => {
        if (a.coefficient > b.coefficient) return 1;
        if (a.coefficient < b.coefficient) return -1;
        return 0;
      });
      lastResults.reverse();
      const result = [];

      lastResults.forEach((item) => {
        if (result.length === config.countGetLastResults) {
          return;
        }
        result.push(item);
      });

      tools.successResponse(res, { bestResults: result });
    } catch (e) {
      console.log(`Error get best results: ${e}`);
      tools.errorResponse(res, 'Server error');
    }
  }


  static async saveResult(req, res) {
    // todo ask Sergey
    try {
      req.body = JSON.parse(Object.keys(req.body)[0]);
    } catch (err) {
      req.body = req.body;
    }

    try {
      if (!req.body.result) {
        tools.errorResponse(res, 'Parameter result is required');
        return;
      }

      await ResultModel.create(req.body.result);

      tools.successResponse(res, null, 'Your result is successfully saved');
    } catch (e) {
      console.log(`Error save result: ${e}`);
      tools.errorResponse(res, 'Server error');
    }
  }
}

module.exports = Controller;
