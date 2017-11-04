const DataStore = require('nedb-promise');

const config = require('../config');

const collections = DataStore({ filename: config.db.files.collections, autoload: true });

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

const migrate = async () => {
  await collections.insert(initialCollections);
};

module.exports = migrate;
