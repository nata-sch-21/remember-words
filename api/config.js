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
      dictionaries: path.resolve(__dirname, 'db/dictionaries.db'),
      words: path.resolve(__dirname, 'db/words.db'),
      results: path.resolve(__dirname, 'db/results.db'),
    },
    migrations: {
      dictionaries: path.resolve(__dirname, 'db/dictionaries.db'),
      results: path.resolve(__dirname, 'db/results.db'),
    },
  },
  uploadsPath: `${protocol}${host}:${serverPort}/static/uploads/`,
  defaultLanguage: 'en',
  countGetLastResults: 3,
  parseDirNew: path.resolve('parse/new'),
};

module.exports = config;
