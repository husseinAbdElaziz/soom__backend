/**
 * @description error handler controller to hande project errors
 */
export default (err, req, res, next) => {
  console.error(err);
  // error code based on error
  err.statusCode = err.statusCode || 500;

  // error status
  err.status = err.status || 'error';

  // handle mongodb error
  if (err.name === 'MongoError' && err.code === 11000) {
    err.message = 'mailUsed';
  }

  // to return custom error message instead of monoo error message
  if (
    err.message &&
    err.message.includes(
      'User validation failed: username: Path `username` is invalid'
    )
  ) {
    err.message = 'usernameInvalid';
  }

  // send response to user
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
