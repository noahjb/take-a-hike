import { HikeNotFoundError, NotFoundError } from './NotFoundError';

describe('NotFoundError', () => {
  it('should construct the expected error object', () => {
    const dummyError = 'Dummy';
    const testError = new NotFoundError(dummyError);

    expect(testError.name).toBe('NotFoundError');
    expect(testError.message).toBe(`${dummyError} not found.`);
    expect(testError.status).toBe(404);
    expect(testError.statusText).toBe('Not found');
    expect(testError.code).toBe('NOT_FOUND');
  });
});

describe('HikeNotFoundError', () => {
  it('should construct the expected error object', () => {
    const dummyId = `1234`;
    const testError = new HikeNotFoundError(dummyId);

    expect(testError.name).toBe('HikeNotFoundError');
    expect(testError.message).toBe(`Hike with id ${dummyId} not found.`);
    expect(testError.status).toBe(404);
    expect(testError.statusText).toBe('Not found');
    expect(testError.code).toBe('NOT_FOUND');
  });
});
