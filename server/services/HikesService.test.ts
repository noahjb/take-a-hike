import HikesService from './HikesService';
import HikesModel from '../models/HikesModel';

const getMock = jest.fn();
const getByIdMock = jest.fn();
jest.mock('../models/HikesModel', () =>
  jest.fn().mockImplementation(() => ({
    get: getMock,
    getById: getByIdMock
  }))
);
let hikesService: HikesService;

describe('HikesService', () => {
  beforeAll(() => {
    hikesService = new HikesService();
  });

  beforeEach(() => {
    (HikesModel as jest.Mock).mockClear();
  });

  describe('get', () => {
    it('should return the exact promise from the hike model', () => {
      hikesService.get();
      expect(getMock).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return the exact promise from the hike model', () => {
      const dummyId = '1234';
      hikesService.getById(dummyId);
      expect(getByIdMock).toHaveBeenCalledWith(dummyId);
    });
  });

  describe('createHike', () => {
    it('should return an object with the title and description of the provided payload', async () => {
      const testPayload = {
        title: 'Dummy title',
        description: 'Dummy desc'
      };
      const newHike = await hikesService.createHike(testPayload);
      expect(newHike.id).toBeDefined();
      expect(newHike.title).toBe(testPayload.title);
      expect(newHike.description).toBe(testPayload.description);
    });
  });
});
