import { Request, Response } from 'express';
import errorHelper from './errorHelper';
import { NotFoundError } from './NotFoundError';
import ValidationError from './ValidationError';

describe('errorHelper', () => {
  describe('logErrorsToConsole', () => {
    beforeEach(() => {
      console.error = jest.fn();
      errorHelper.errorBuilder = jest.fn().mockReturnValue('Dummy error');
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should log and continue execution when the response has not been sent', () => {
      const dummyErr = new Error('ABCD');
      const response = { headersSent: false };
      const mockNext = jest.fn();
      errorHelper.logErrorsToConsole(
        dummyErr,
        {} as unknown as Request,
        response as unknown as Response,
        mockNext
      );
      expect(console.error).toHaveBeenCalledTimes(2);
      expect(console.error).toHaveBeenNthCalledWith(
        1,
        'Log Entry: "Dummy error"'
      );
      expect(mockNext).toHaveBeenCalled();
    });

    it('should only log the error when the response has already been sent', () => {
      const dummyErr = new Error('ABCD');
      const response = { headersSent: true };
      const mockNext = jest.fn();
      errorHelper.logErrorsToConsole(
        dummyErr,
        {} as unknown as Request,
        response as unknown as Response,
        mockNext
      );
      expect(console.error).toHaveBeenCalledTimes(2);
      expect(console.error).toHaveBeenNthCalledWith(
        1,
        'Log Entry: "Dummy error"'
      );
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('clientErrorHandler', () => {
    it('should result in a 500 response when request is an XHR-type request', () => {
      const dummyErr = new Error('ABCD');
      const request = {
        xhr: true
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
      const mockNext = jest.fn();
      errorHelper.clientErrorHandler(
        dummyErr,
        request as unknown as Request,
        response as unknown as Response,
        mockNext
      );
      expect(mockNext).not.toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalled();
    });

    it('should defer to the next function when not an XHR request', () => {
      const dummyErr = new Error('ABCD');
      const request = {
        xhr: false
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
      const mockNext = jest.fn();
      errorHelper.clientErrorHandler(
        dummyErr,
        request as unknown as Request,
        response as unknown as Response,
        mockNext
      );
      expect(mockNext).toHaveBeenCalled();
      expect(response.status).not.toHaveBeenCalled();
      expect(response.json).not.toHaveBeenCalled();
    });
  });

  describe('errorHandler', () => {
    const dummyErr = new Error('ABCD');
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    const errorResponse = {
      status: 1234,
      statusText: 'abcd',
      message: dummyErr.message,
      error: {
        code: 'ABCDEFG',
        message: dummyErr.message
      }
    };
    const errorBuilderSpy = jest
      .spyOn(errorHelper, 'errorBuilder')
      .mockReturnValueOnce(errorResponse);

    errorHelper.errorHandler(
      dummyErr,
      {} as Request,
      response as unknown as Response,
      () => []
    );

    expect(errorBuilderSpy).toHaveBeenCalledWith(dummyErr);
    expect(response.status).toHaveBeenCalledWith(errorResponse.status);
    expect(response.json).toHaveBeenCalledWith(errorResponse);
  });

  describe('errorBuilder', () => {
    it('should return a specific error message for a NotFoundError', () => {
      const dummyNotFound = new NotFoundError('Dummy');
      const errObj = errorHelper.errorBuilder(dummyNotFound);
      expect(errObj.status).toBe(dummyNotFound.status);
      expect(errObj.statusText).toBe(dummyNotFound.statusText);
      expect(errObj.message).toBe(dummyNotFound.message);
      expect(errObj.error.code).toBe(dummyNotFound.code);
      expect(errObj.error.message).toBe(dummyNotFound.message);
    });

    it('should return a specific error message for a ValidationError', () => {
      const dummyValidationErr = new ValidationError('Dummy');
      const errObj = errorHelper.errorBuilder(dummyValidationErr);
      expect(errObj.status).toBe(dummyValidationErr.status);
      expect(errObj.statusText).toBe(dummyValidationErr.statusText);
      expect(errObj.message).toBe(dummyValidationErr.message);
      expect(errObj.error.code).toBe(dummyValidationErr.code);
      expect(errObj.error.message).toBe(dummyValidationErr.message);
    });

    it('should return a 500 error object when error is an unexpected type', () => {
      const dummyErr: NodeJS.ErrnoException = {
        name: 'Dummy',
        message: 'Unexpected',
        errno: 12345,
        syscall: 'Dummysyscall'
      };
      const errObj = errorHelper.errorBuilder(dummyErr);
      expect(errObj.status).toBe(500);
      expect(errObj.statusText).toBe('Internal Server Error');
      expect(errObj.message).toBe(dummyErr.message);
      expect(errObj.error.errno).toBe(dummyErr.errno);
      expect(errObj.error.call).toBe(dummyErr.syscall);
      expect(errObj.error.code).toBe('INTERNAL_SERVER_ERROR');
      expect(errObj.error.message).toBe(dummyErr.message);
    });
  });
});
