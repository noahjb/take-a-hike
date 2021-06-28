import express from 'express';
import loaders from './loaders';
import startServer from './index';

jest.mock('./loaders');

const dummyPort = 1234;
const listenMock = jest.fn();
const mockApp = {
  get: (field: string) => (field === 'port' ? dummyPort : ''),
  listen: listenMock
};

describe('startServer', () => {
  beforeEach(() => {
    (loaders as jest.Mock).mockClear();
  });

  afterAll((done) => {
    done();
  });

  it('should start the server correctly', async () => {
    // Trick TypeScript into thinking this is a full express app,
    // since we only need a couple methods for the test
    await startServer(mockApp as unknown as express.Application);
    expect(loaders).toHaveBeenCalledWith({ expressApp: mockApp });
    expect(listenMock).toHaveBeenCalledWith(dummyPort);
  });
});
