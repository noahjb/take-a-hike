import express from 'express';
import index from './index';
import hikesRoutes from './hikes';

jest.mock('./hikes');

describe('setup', () => {
  it('should set up the correct routes', () => {
    const routerMock = jest.fn();
    jest
      .spyOn(express, 'Router')
      .mockImplementation(() => routerMock as unknown as express.Router);

    const app = index();
    expect(hikesRoutes).toHaveBeenCalled();
    expect(app).toBe(routerMock);
  });
});
