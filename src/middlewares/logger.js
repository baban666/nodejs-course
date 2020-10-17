const { createLogger } = require('winston');
const winstonConfig = require('../common/winstonConfig');
const { helpers } = require('../common/helpers');

const winstonConsole = createLogger(winstonConfig.configConsole);
const winstonFile = createLogger(winstonConfig.configFile);

const incomingLogger = (req, res, next) => {
  const { logToConsole, logToFile } = helpers.getRequestLog(req);

  winstonConsole.log('info', logToConsole);
  winstonFile.log('info', logToFile);
  next();
};

const processErrorLogger = (message, errorType) => {
  const time = new Date().toString();
  const errString = `${time} | ${errorType}: ${message}`;

  winstonConsole.log('error', errString);
  winstonFile.log('error', errString);
  return winstonFile;
};

const errorLogger = (err, req, res) => {
  const { statusCode, message } = helpers.handleError(err, res);
  const { logToFile } = helpers.getRequestLog(req);

  const time = new Date().toUTCString();
  const errString = `${time} | Error ${statusCode}: ${message}`;
  winstonConsole.log('error', errString);
  winstonFile.log('error', `${errString} | Request: ${logToFile}`);
};

module.exports = { incomingLogger, processErrorLogger, errorLogger };
