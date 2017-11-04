const config = require('../../config');

const DataStore = require('nedb');

const words = new DataStore({ filename: config.db.words, autoload: true });

words.insert({ data: 'data1' }, (err, docs) => {
  console.log(docs);
});
