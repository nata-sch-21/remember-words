const config = require('../config');

const getImagePath = imageName => config + imageName;

module.exports = {
  getImagePath,
};
