const config = require('../config');

const getImagePath = imageName => config.uploadsPath + imageName;

module.exports = {
  getImagePath,
};
