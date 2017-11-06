const config = require('./config');

const app = require('./app');

const port = process.env.PORT || config.serverPort;

app.listen(port, () => {
  console.log(`Listen port: ${port}`);
});
