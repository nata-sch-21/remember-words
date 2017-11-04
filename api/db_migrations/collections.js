const config = require('../config');

const DataStore = require('nedb');

const collections = new DataStore({ filename: config.db.collections, autoload: true });

const initialCollections = [
  {
    id: 1,
    translations: {
      en: 'Fruits',
      ru: 'Фрукты',
    },
  },
  {
    id: 2,
    translations: {
      en: 'Animals',
      ru: 'Животные',
    },
  },
];

collections.insert(initialCollections, (err, docs) => {
  console.log(docs);
});
