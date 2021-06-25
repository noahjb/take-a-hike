import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import ValidationReporter from './ValidationReporter';
import errorHelper from './errorHelper';

jest.mock('express-validator', () => ({
  validationResult: jest.fn()
}));

describe('ValidationReporter.run', () => {
  describe('run', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should result in a validation error when validation fails', () => {
      (validationResult as unknown as jest.Mock).mockReturnValue({
        array: () => [
          {
            value: 'dummy',
            msg: 'test validation error'
          }
        ],
        isEmpty: () => false
      });
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
      const mockNext = jest.fn();
      const logErrorsSpy = jest
        .spyOn(errorHelper, 'logErrorsToConsole')
        .mockImplementation();
      ValidationReporter.run(
        {} as unknown as Request,
        response as unknown as Response,
        mockNext
      );
      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalled();
      expect(logErrorsSpy).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should still result in a validation error even when there is no error value from the validation result', () => {
      (validationResult as unknown as jest.Mock).mockReturnValue({
        array: () => [
          {
            msg: 'test validation error with no value prop'
          }
        ],
        isEmpty: () => false
      });
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
      const mockNext = jest.fn();
      const logErrorsSpy = jest
        .spyOn(errorHelper, 'logErrorsToConsole')
        .mockImplementation();
      ValidationReporter.run(
        {} as unknown as Request,
        response as unknown as Response,
        mockNext
      );
      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalled();
      expect(logErrorsSpy).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should defer to the next function when validation is successful', () => {
      (validationResult as unknown as jest.Mock).mockReturnValue({
        isEmpty: () => true
      });
      const mockNext = jest.fn();
      ValidationReporter.run(
        {} as unknown as Request,
        {} as unknown as Response,
        mockNext
      );
      expect(mockNext).toHaveBeenCalled();
    });
  });
});
