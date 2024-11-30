/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { NextFunction } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = err.message || 'Something went wrong.';
  res.status(statusCode).json({
    success: false,
    message: message,
    error: err,
  });
};

export default globalErrorHandler;
