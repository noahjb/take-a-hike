import express from 'express';
import index from './index';
import expressLoader from './express';

jest.mock('./express');

describe('Main loader', () => {
  afterAll((done) => {
    done();
  });

  it('should load all loaders', async () => {
    const dummyApp = express();
    await index({ expressApp: dummyApp });
    expect(expressLoader).toHaveBeenCalledWith({ app: dummyApp });
  });
});
