import express from 'express';
import request, { SuperTest } from 'supertest';
import errorHelper from '../errors/errorHelper';
import { IHike, IHikePayload } from '../interfaces/IHike';
import hikes from './hikes';

const dummyId = '12345';
const dummyHike: IHike = {
  id: dummyId,
  title: 'Dummy',
  description: 'Dummy desc'
};
const testErr = new Error('Not found');

const getMock = jest
  .fn()
  .mockImplementation(() => Promise.resolve([dummyHike]));
jest.mock('../services/HikesService', () =>
  jest.fn().mockImplementation(() => ({
    createHike: (hike: IHikePayload): Promise<IHike> =>
      hike.title !== ''
        ? Promise.resolve({ ...hike, id: dummyId })
        : Promise.reject(testErr),
    get: getMock,
    getById: (id: string) =>
      id === dummyId ? Promise.resolve(dummyHike) : Promise.reject(testErr)
  }))
);

jest.mock('../errors/HikesValidator', () => ({
  getHikeById: []
}));

let req: SuperTest<request.Test>;
describe('hikes routes', () => {
  beforeAll(() => {
    const dummyApp = express();
    dummyApp.use(express.json());
    hikes(dummyApp);
    dummyApp.use(errorHelper.errorHandler);
    req = request(dummyApp);
  });

  afterAll((done) => {
    done();
  });

  describe('get', () => {
    it('should respond with a 200 and an array of hikes when successful', async () => {
      const { body } = await req.get('/hikes/');
      expect(body.status).toBe(200);
      expect(body.statusText).toBe('OK');
      expect(body.data).toEqual([dummyHike]);
    });

    it('should forward to the next middleware if unsuccessful', async () => {
      getMock.mockImplementationOnce(() => Promise.reject(testErr));

      const { body } = await req.get('/hikes/');
      expect(body.status).toBe(500);
      expect(body.message).toBe(testErr.message);
    });
  });

  describe('get by id', () => {
    it('should respond with a 200 and a single hike when successful', async () => {
      const { body } = await req.get(`/hikes/${dummyId}`);
      expect(body.status).toBe(200);
      expect(body.statusText).toBe('OK');
      expect(body.message).toContain(dummyId);
      expect(body.data).toEqual(dummyHike);
    });

    it('should forward to the next middleware if unsuccessful', async () => {
      const { body } = await req.get('/hikes/BAD_ID');
      expect(body.status).toBe(500);
      expect(body.message).toBe(testErr.message);
    });
  });

  describe('create', () => {
    it('should respond with a 201 and a newly created hike when successful', async () => {
      const hikePayload: IHikePayload = {
        title: 'Dummy title',
        description: 'Dummy desc'
      };
      const { body } = await req.post('/hikes/').send(hikePayload);
      expect(body.status).toBe(201);
      expect(body.statusText).toBe('Created');
      expect(body.message).toContain(hikePayload.title);
      expect(body.data).toEqual({ ...hikePayload, id: dummyId });
    });

    it('should forward to the next middleware if unsuccessful', async () => {
      const hikePayload: IHikePayload = {
        title: '',
        description: 'Dummy desc'
      };
      const { body } = await req.post('/hikes/').send(hikePayload);
      expect(body.status).toBe(500);
      expect(body.message).toBe(testErr.message);
    });
  });
});
