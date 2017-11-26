const Dictionary = require('../models/DictionaryModel');
const tools = require('../utils/tools');

class Controller {
  static async allDictionaries(req, res) {
    try {
      const data = await Dictionary.getAllDictionaries();

      if (!data || data.length === 0) {
        tools.errorResponse(res, 'Dictionaries weren\'t found');
      }
      tools.successResponse(res, data);
    } catch (e) {
      console.log(`Error get dictionaries: ${e}`);
      res.send(e);
    }
  }
}

module.exports = Controller;
