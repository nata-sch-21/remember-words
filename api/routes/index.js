const controller = require('../controllers/Controller');

module.exports = (app) => {
  app.route('/dictionaries')
    .get(controller.allDictionaries);

  app.route('/dictionaries/:id')
    .get(controller.wordsByDictionaryId);
};
