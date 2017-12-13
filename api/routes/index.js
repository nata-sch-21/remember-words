const controller = require('../controllers/Controller');

module.exports = (app) => {
  app.route('/dictionaries')
    .get(controller.allDictionaries);

  app.route('/dictionaries/:id')
    .get(controller.dictionaryWithWordsById);

  app.route('/results')
    .get(controller.bestResults)
    .post(controller.saveResult);
};
