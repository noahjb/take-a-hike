import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ValidationError from './ValidationError';
import errorHelper from './errorHelper';

const ValidationReporter = {
  run: (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];
      const errVal = firstError.value ? `: ${firstError.value}` : '';
      const err = new ValidationError(firstError.msg + errVal);
      res.status(err.status).json({
        status: err.status,
        statusText: err.statusText,
        message: err.message,
        error: {
          code: err.code,
          message: err.message
        }
      });
      errorHelper.logErrorsToConsole(err, req, res, next);
    } else {
      next();
    }
  }
};

export default ValidationReporter;
