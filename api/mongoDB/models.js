const mongoose = require('mongoose');

const dictionarySchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  translations: {
    en: String,
    ru: String,
  },
});

const wordSchema = mongoose.Schema({
  translations: {
    en: String,
    ru: String,
  },
  image: String,
  image_name: String,
  dictionary: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dictionary',
  },
});

const resultSchema = mongoose.Schema({
  countCorrectAnswers: Number,
  countWords: Number,
  dictionaryName: String,
  coefficient: Number,
});

const Dictionary = mongoose.model('Dictionary', dictionarySchema);
const Word = mongoose.model('Word', wordSchema);
const Result = mongoose.model('Result', resultSchema);

const models = {
  Dictionary,
  Word,
  Result,
};

module.exports = models;
