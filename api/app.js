const express = require('express');

const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

module.exports = app;
