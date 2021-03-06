/**
 * @description error handler class to handle errors.
 * @param message error message
 * @param statusCode error status code
 */
export class AppError extends Error {
  isOperational: boolean;
  status: string;
  constructor(public message: string, public statusCode?: number) {
    super(message);
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
