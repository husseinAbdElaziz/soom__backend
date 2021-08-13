/**
 * @description error handler controller to hande project errors
 */
module.exports = errHandler = (err, req, res, next) => {
  console.error(err);

  // error code based on error
  err.statusCode = err.statusCode || 500;

  // error status
  err.status = err.status || 'error';

  // send response to user
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
