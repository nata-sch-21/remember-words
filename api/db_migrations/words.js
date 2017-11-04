const DataStore = require('nedb-promise');

const config = require('../config');

const words = new DataStore({ filename: config.db.files.words, autoload: true });

const tools = require('../utils/tools.js');

const initialWords = [
  {
    id: 1,
    image_name: 'image1.jpg',
    image: tools.getImagePath('image1.jpg'),
    translations: {
      en: 'apple',
      ru: 'яблоко',
    },
    collection_id: 1,
  },
  {
    id: 2,
    image_name: 'image2.jpg',
    image: tools.getImagePath('image2.jpg'),
    translations: {
      en: 'pear',
      ru: 'груша',
    },
    collection_id: 1,
  },
  {
    id: 3,
    image_name: 'image3.jpg',
    image: tools.getImagePath('image3.jpg'),
    translations: {
      en: 'cat',
      ru: 'кот',
    },
    collection_id: 2,
  },
  {
    id: 4,
    image_name: 'image4.jpg',
    image: tools.getImagePath('image4.jpg'),
    translations: {
      en: 'wolf',
      ru: 'волк',
    },
    collection_id: 2,
  },
];

const migrate = async () => {
  await words.insert(initialWords);
};

module.exports = migrate;
