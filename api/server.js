const config = require('./config');

const express = require('express');

const app = express();


const port = config.server_port;
app.listen(port, () => {
  console.log(`We are live on ${port}`);
});
