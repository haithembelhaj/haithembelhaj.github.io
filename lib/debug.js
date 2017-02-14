const debug = require('debug');

// log to stdout
const log = debug('app:log');

// log to stderr
const error = debug('app:error');

// route logger middleware
const middleware = (req, res, next) => {

  log('%s Route %s - %s - %s', new Date().toLocaleDateString(), req.protocol, req.originalUrl);
  next();
};

module.exports = {log, error, middleware};