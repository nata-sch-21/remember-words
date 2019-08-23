const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes');
const createDictionaries = require('./mongoDB/populate');
const models = require('./mongoDB/models');

const connectDb = () => mongoose.connect('mongodb://localhost/words', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Successfully connected'));

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/static', express.static(path.join(__dirname, 'public')));

routes(app);

connectDb().then(async () => {
  await Promise.all([
    models.Dictionary.deleteMany({}),
    models.Word.deleteMany({}),
  ]);

  await createDictionaries();
  app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
  });
});

module.exports = app;
