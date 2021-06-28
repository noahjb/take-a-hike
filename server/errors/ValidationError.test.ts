import ValidationError from './ValidationError';

describe('ValidationError', () => {
  it('should construct the expected error object', () => {
    const dummyError = 'Bad validation';
    const testError = new ValidationError(dummyError);

    expect(testError.name).toBe('ValidationError');
    expect(testError.message).toBe(dummyError);
    expect(testError.status).toBe(400);
    expect(testError.statusText).toBe('Bad Request');
    expect(testError.code).toBe('BAD_REQUEST');
  });
});
