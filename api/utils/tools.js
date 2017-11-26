const config = require('../config');

const getImagePath = imageName => config.uploadsPath + imageName;


const successResponse = (res, data, message = '') => {
  res.json({ response: { status: 'ok', message }, data });
};

const errorResponse = (res, message) => {
  res.json({ response: { status: 'error', message } });
};

module.exports = {
  getImagePath,
  successResponse,
  errorResponse,
};
