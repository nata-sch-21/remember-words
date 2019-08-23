const path = require('path');

const host = 'localhost';
const serverPort = '8001';
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
  },
  uploadsPath: `${protocol}${host}:${serverPort}/static/uploads/`,
  defaultLanguage: 'en',
  countGetLastResults: 10,
  parseDirNew: path.resolve(__dirname, 'parse/new'),
};

module.exports = config;
