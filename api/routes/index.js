const controller = require('../controllers/Controller');

module.exports = (app) => {
  app.route('/dictionaries')
    .get(controller.allDictionaries);
};
