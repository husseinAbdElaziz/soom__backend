import { NextFunction, Request, Response } from 'express';

/**
 * @description error handler controller to hande project errors
 */
export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
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
