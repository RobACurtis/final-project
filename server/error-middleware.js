const ClientError = require('./client-error');
const { JsonWebTokenError } = require('jsonwebtoken');

function errorMiddleware(err, req, res, next) {
  if (err instanceof ClientError) {
    res.status(err.status).json({
      error: err.message
    });
  } else if (err instanceof JsonWebTokenError) {
    res.status(401).json({
      error: 'invalid access token'
    });
  } else if (err.code === '23505') {
    console.error(err);
    res.status(401).json({
      error: 'invalid username'
    });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
}

module.exports = errorMiddleware;
