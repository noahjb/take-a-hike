import express from 'express';
import request from 'supertest';
import path from 'path';
import fs from 'fs';
import loader from './express';
import errorHelper from '../errors/errorHelper';

describe('express loader', () => {
  afterAll((done) => {
    jest.restoreAllMocks();
    done();
  });

  it('load and setup express correctly', async () => {
    const app = express();
    const setMock = jest.fn();
    const useMock = jest.fn();
    app.set = setMock;
    app.use = useMock;
    jest
      .spyOn(express, 'static')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockImplementationOnce((filepath: string): any => filepath);
    const logErrorsToConsoleSpy = jest.spyOn(errorHelper, 'logErrorsToConsole');
    const clientErrorHandlerSpy = jest.spyOn(errorHelper, 'clientErrorHandler');
    const errorHandlerSpy = jest.spyOn(errorHelper, 'errorHandler');
    const getSpy = jest.spyOn(app, 'get');
    await loader({ app });
    expect(setMock).toHaveBeenCalledWith('port', 4000);
    expect(useMock.mock.calls[0][0]).toContain('/client/build');
    expect(useMock).toHaveBeenNthCalledWith(2, '/api', expect.any(Function));
    expect(getSpy).toHaveBeenCalledWith('*', expect.any(Function));
    expect(useMock).toHaveBeenNthCalledWith(3, logErrorsToConsoleSpy);
    expect(useMock).toHaveBeenNthCalledWith(4, clientErrorHandlerSpy);
    expect(useMock).toHaveBeenNthCalledWith(5, errorHandlerSpy);
  });

  it('GET * fallback', async () => {
    const dummyFilePath = path.join(__dirname, '..', 'testData', 'dummy.html');
    jest.spyOn(path, 'join').mockReturnValue(dummyFilePath);
    const dummyFile = fs.readFileSync(dummyFilePath);

    const app = express();
    const resultApp = await loader({ app });
    const response = await request(resultApp).get('/dsjasdfj82332489');
    expect(response.status).toBe(200);
    expect(response.text).toBe(dummyFile.toString());
  });
});
