const config = require('../config');
const fs = require('fs');
const Dictionary = require('../models/DictionaryModel');
const Word = require('../models/WordModel');

const { parseDirNew } = config;

const addDataToDB = async (data) => {
  const keys = Object.keys(data);

  await keys.forEach(async (key) => {
    const dictionaryData = data[key];
    try {
      const id = await Dictionary.create(dictionaryData.dictionary);
      const count = await Word.createMultiple(id, dictionaryData.words);
      console.log(`Added dictionary ${dictionaryData.dictionary.translations[config.defaultLanguage]} with ${count} words`);
    } catch (e) {
      console.log(`Adding to DB ${e.message}`);
    }
  });
};

const parse = async () => {
  try {
    const files = fs.readdirSync(parseDirNew);
    if (!files || files.length === 0) {
      throw new Error('No new dictionaries for parsing');
    }

    await files.forEach(async (fileName) => {
      const filePath = `${parseDirNew}/${fileName}`;
      const json = fs.readFileSync(filePath);
      await addDataToDB(JSON.parse(json));

      try {
        fs.unlinkSync(filePath);
      } catch (e) {
        throw new Error(`ERROR during moving file to parsed dir ${e.message}`);
      }
    });
  } catch (e) {
    console.log(`ERROR parsing: ${e.message}`);
  }
};

parse();
