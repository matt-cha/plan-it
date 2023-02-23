const ClientError = require('./client-error');

function errorMiddleware(err, req, res, next) {
  if (err instanceof ClientError) {
    res.status(err.status).json({
      error: err.message
    });
  } else {
    console.error('err line9', err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
}

module.exports = errorMiddleware;
