const path = require('path');

const config = {
  serverPort: '8000',
  db: {
    path: path.resolve('db'),
    files: {
      dictionaries: path.resolve(__dirname, 'db/collections.db'),
      words: path.resolve(__dirname, 'db/words.db'),
      // results: path.resolve(__dirname, 'db/results.db'),
    },
    migrations: {
      dictionaries: path.resolve(__dirname, 'db/dictionaries.db'),
      results: path.resolve(__dirname, 'db/results.db'),
    },
  },
  uploadsPath: path.resolve(__dirname, 'uploads'),
  defaultLanguage: 'en',
};

module.exports = config;
