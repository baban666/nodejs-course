const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, PATH_WHITELIST } = require('../common/config');
const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const { helpers } = require('../common/helpers');

const checkRouteAccess = (req, res, next) => {
  const { url, headers } = req;
  if (PATH_WHITELIST.includes(url)) {
    return next();
  }
  try {
    const token = headers.authorization.replace('Bearer ', '');
    jwt.verify(token, JWT_SECRET_KEY);
    return next();
  } catch {
    throw new helpers.NewError(
      StatusCodes.UNAUTHORIZED,
      ReasonPhrases.UNAUTHORIZED
    );
  }
};

module.exports = checkRouteAccess;
