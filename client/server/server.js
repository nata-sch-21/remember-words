const express = require('express');
const path = require('path');

const port = 3000;
const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
