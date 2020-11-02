const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  TASK_NUMBER: process.env.TASK_NUMBER,
  COMMON_LOG_LEVEL: process.env.COMMON_LOG_LEVEL,
  ERROR_LOG_LEVEL: process.env.ERROR_LOG_LEVEL,
  PATH_WHITELIST: process.env.PATH_WHITELIST,
  SALT_ROUNDS: process.env.SALT_ROUNDS
};
