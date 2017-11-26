const tools = require('../utils/tools.js');

const DB = require('../database/DB')();

const initialDictionaries = [
  {
    translations: {
      en: 'Fruits',
      ru: 'Фрукты',
    },
  },
  {
    translations: {
      en: 'Animals',
      ru: 'Животные',
    },
  },
];

const getFruits = dictionaryId => [
  {
    image_name: 'image1.jpg',
    image: tools.getImagePath('image1.jpg'),
    translations: {
      en: 'apple',
      ru: 'яблоко',
    },
    dictionary_id: dictionaryId,
  },
  {
    image_name: 'image2.jpg',
    image: tools.getImagePath('image2.jpg'),
    translations: {
      en: 'pear',
      ru: 'груша',
    },
    dictionary_id: dictionaryId,
  },
];


const getAnimals = dictionaryId => [
  {
    image_name: 'image3.jpg',
    image: tools.getImagePath('image3.jpg'),
    translations: {
      en: 'cat',
      ru: 'кот',
    },
    dictionary_id: dictionaryId,
  },
  {
    image_name: 'image4.jpg',
    image: tools.getImagePath('image4.jpg'),
    translations: {
      en: 'wolf',
      ru: 'волк',
    },
    dictionary_id: dictionaryId,
  },
];


async function migrate() {
  const { dictionaries, words } = DB;

  await dictionaries.insert(initialDictionaries);
  const data = await dictionaries.cfind({}).exec();
  const wordsData = [...getFruits(data[0]._id), ...getAnimals(data[1]._id)];
  await words.insert(wordsData);
}

module.exports = migrate;
