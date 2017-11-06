const Dictionary = require('../models/DictionaryModel');

class Controller {
  static async allDictionaries(req, res) {
    try {
      const data = await Dictionary.getAllDictionaries();
      res.json(data);
    } catch (e) {
      console.log(`Error get dictionaries: ${e}`);
      res.send(e);
    }
  }
}

module.exports = Controller;
