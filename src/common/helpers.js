const { getReasonPhrase, StatusCodes } = require('http-status-codes');

const helpers = {
  NewError: class NewError extends Error {
    constructor(stat, errorMessage) {
      super();
      this.statusCode = stat;
      this.message = errorMessage;
    }
  },

  handleError: (err, res) => {
    let { statusCode, message } = err;
    if (!(err instanceof helpers.NewError)) {
      statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      message = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
    }

    res.status(statusCode).send(message);
    return { statusCode, message };
  },

  catchErrors: func => async (req, res, next) => {
    try {
      return await func(req, res, next);
    } catch (err) {
      return next(err);
    }
  },
  stringifyObject: obj => {
    const arr = Object.entries(obj);
    if (arr.length === 0) return null;
    return `{${arr
      .map(parameter => {
        const [key, value] = parameter;
        if (typeof value === 'object') {
          const str = JSON.stringify(value);
          return `${key}: ${str}`;
        }
        return `${key}: ${value}`;
      })
      .join(', ')}}`;
  },
  getRequestLog: req => {
    const { url, method, body, query } = req;

    const request = helpers.stringifyObject(body);
    const params = helpers.stringifyObject(query);

    const logToConsole = `incoming request:
  {
    url: ${url},
    method: ${method},
    body: ${request},
    query_params: ${params}
  }`;
    const logToFile = `{ url: ${url}, method: ${method}, body: ${request}, query_params: ${params} }`;
    return { logToConsole, logToFile };
  }
};
module.exports = { helpers };
