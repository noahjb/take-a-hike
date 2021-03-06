import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from './NotFoundError';
import ValidationError from './ValidationError';

const errorHelper = {
  logErrorsToConsole: (
    err: NodeJS.ErrnoException,
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.error(
      `Log Entry: ${JSON.stringify(errorHelper.errorBuilder(err))}`
    );
    console.error('*'.repeat(80));
    if (!res.headersSent) {
      next(err);
    }
  },
  clientErrorHandler: (
    err: NodeJS.ErrnoException,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (req.xhr) {
      res.status(500).json({
        status: 500,
        statusText: 'Internal Server Error',
        message: 'XMLHttpRequest Error',
        error: {
          errno: 0,
          call: 'XMLHttpRequest Call',
          code: 'INTERNAL_SERVER_ERROR',
          message: 'XMLHttpRequest error'
        }
      });
    } else {
      next(err);
    }
  },
  errorHandler: (
    err: NodeJS.ErrnoException,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const errorResponse = errorHelper.errorBuilder(err);
    res.status(errorResponse.status).json(errorResponse);
  },
  errorBuilder: (err: NodeJS.ErrnoException) => {
    if (err instanceof NotFoundError || err instanceof ValidationError) {
      return {
        status: err.status,
        statusText: err.statusText,
        message: err.message,
        error: {
          code: err.code,
          message: err.message
        }
      };
    }

    return {
      status: 500,
      statusText: 'Internal Server Error',
      message: err.message,
      error: {
        errno: err.errno,
        call: err.syscall,
        code: 'INTERNAL_SERVER_ERROR',
        message: err.message
      }
    };
  }
};

export default errorHelper;
