const models = require('./models');

const dictionaries = [
  {
    translations: {
      en: 'Fiches',
      ru: 'Рыбы',
    },
    words: [
      {
        image_name: 'image2.jpg',
        image: 'image2.jpg',
        translations: {
          en: 'pear',
          ru: 'груша',
        },
      },
      {
        image_name: 'image1.jpg',
        image: 'image1.jpg',
        translations: {
          en: 'apple',
          ru: 'яблоко',
        },
      },
      {
        image_name: 'pomegranate',
        image: 'pomegranate.jpg',
        translations: {
          en: 'pomegranate',
          ru: 'гранат',
        },
      },
    ],
  },
  {
    translations: {
      en: 'Fruits',
      ru: 'Фрукты',
    },
    words: [
      {
        image_name: 'image2.jpg',
        image: 'image2.jpg',
        translations: {
          en: 'pear',
          ru: 'груша',
        },
      },
      {
        image_name: 'image1.jpg',
        image: 'image1.jpg',
        translations: {
          en: 'apple',
          ru: 'яблоко',
        },
      },
      {
        image_name: 'pomegranate',
        image: 'pomegranate.jpg',
        translations: {
          en: 'pomegranate',
          ru: 'гранат',
        },
      },
      {
        image_name: 'grape',
        image: 'grape.jpg',
        translations: {
          en: 'grape',
          ru: 'виноград',
        },
      },
      {
        image_name: 'melon',
        image: 'melon.jpg',
        translations: {
          en: 'melon',
          ru: 'дыня',
        },
      },
      {
        image_name: 'pomelo',
        image: 'pomelo.jpg',
        translations: {
          en: 'pomelo',
          ru: 'помело',
        },
      },
      {
        image_name: 'pear',
        image: 'pear.jpg',
        translations: {
          en: 'pear',
          ru: 'груша',
        },
      },
    ],
  },
  {
    translations: {
      en: 'Animals',
      ru: 'Животные',
    },
  },
  {
    translations: {
      en: 'Body',
      ru: 'Тело',
    },
  },
  {
    translations: {
      en: 'Food',
      ru: 'Еда',
    },
  },
  {
    translations: {
      en: 'Plants',
      ru: 'Растения',
    },
  },
];

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index += 1) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
}

const createDictionaries = async () => {
  await asyncForEach(dictionaries, async (dictionaryData) => {
    const dictionary = new models.Dictionary({
      translations: dictionaryData.translations,
    });

    if (dictionaryData.words) {
      await asyncForEach(dictionaryData.words, async (wordData) => {
        const word = new models.Word({
          translations: wordData.translations,
          image: wordData.image,
          image_name: wordData.image_name,
          dictionary: dictionary.id,
        });

        await word.save();
      });
    }


    await dictionary.save();
  });
};

module.exports = createDictionaries;
