const path = require('path');

const host = 'localhost';
const serverPort = '8000';
const protocol = 'http://';

const config = {
  host,
  serverPort,
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
  uploadsPath: `${protocol}${host}:${serverPort}/static/uploads/`,
  defaultLanguage: 'en',
};

module.exports = config;
