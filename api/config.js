const path = require('path');

const config = {
  server_port: '8000',
  db: {
    path: 'db',
    files: {
      words: path.resolve(__dirname, 'db/words.db'),
      results: path.resolve(__dirname, 'db/results.db'),
      collections: path.resolve(__dirname, 'db/collections.db'),
    },
  },
  uploads_path: path.resolve(__dirname, 'uploads'),
  default_language: 'en',
};

module.exports = config;
