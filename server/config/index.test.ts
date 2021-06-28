import config from './index';

describe('Server config', () => {
  it('should have appropriate values', () => {
    expect(config.api.prefix).toBe('/api');
  });
});
