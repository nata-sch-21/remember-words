const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./routes');

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

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

module.exports = app;
