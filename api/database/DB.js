const DataStore = require('nedb-promise');

const config = require('../config');

const db = {};
const dbFiles = Object.keys(config.db.files) || [];
dbFiles.forEach((fileName) => {
  db[fileName] = DataStore({ filename: config.db.files[fileName], autoload: true });
});

module.exports = db;
