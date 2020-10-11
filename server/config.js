const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  API_KEY: process.env.API_KEY,
  LOG_LEVEL: process.env.LOG_LEVEL
};