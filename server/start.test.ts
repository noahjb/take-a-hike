import express from 'express';
import loaders from './loaders';
import start from './start';

jest.mock('./loaders');

const dummyPort = 1234;
const listenMock = jest.fn();
const mockApp = {
  get: (field: string) => (field === 'port' ? dummyPort : ''),
  listen: listenMock
};

describe('start', () => {
  beforeEach(() => {
    (loaders as jest.Mock).mockClear();
  });

  it('should start the server correctly', async () => {
    // Trick TypeScript into thinking this is a full express app,
    // since we only need a couple methods for the test
    await start(mockApp as unknown as express.Application);
    expect(loaders).toHaveBeenCalledWith({ expressApp: mockApp });
    expect(listenMock).toHaveBeenCalledWith(dummyPort);
  });
});
