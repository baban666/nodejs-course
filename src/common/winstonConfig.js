const { format, transports } = require('winston');
const path = require('path');
const { COMMON_LOG_LEVEL, ERROR_LOG_LEVEL } = require('../common/config');

const infoPath = path.join(__dirname, '../../logs/commons-log.log');
const errorsPath = path.join(__dirname, '../../logs/errors-log.log');

const winstonConfig = {
  configConsole: {
    format: format.combine(format.colorize(), format.cli()),
    transports: [new transports.Console()]
  },
  configFile: {
    format: format.json(),
    transports: [
      new transports.File({
        level: COMMON_LOG_LEVEL,
        filename: infoPath
      }),
      new transports.File({
        level: ERROR_LOG_LEVEL,
        filename: errorsPath
      })
    ]
  }
};

module.exports = winstonConfig;
