import HikesModel from './HikesModel';
import IHikesProvider from '../interfaces/IHikesProvider';
import DiscHikesProvider from './DiscHikesProvider';
import { IHike } from '../interfaces/IHike';

const dummyHike: IHike = {
  id: '12345',
  title: 'Dummy title',
  description: 'Dummy desc'
};
const dummyHikesProvider: IHikesProvider = {
  get: jest.fn().mockReturnValue(Promise.resolve([dummyHike])),
  getById: jest.fn().mockReturnValue(Promise.resolve(dummyHike))
};

describe('HikesModel', () => {
  describe('with default provider', () => {
    it('should use the DiscHikesProvider', () => {
      const discProviderGetSpy = jest
        .spyOn(DiscHikesProvider, 'get')
        .mockImplementationOnce(() => Promise.resolve([]));
      const hikesModel = new HikesModel();
      hikesModel.get();
      expect(discProviderGetSpy).toHaveBeenCalled();
    });
  });

  describe('with given provider', () => {
    let hikesModel: HikesModel;
    beforeAll(() => {
      hikesModel = new HikesModel(dummyHikesProvider);
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('get', () => {
      it('should return the data from the HikesProvider', async () => {
        const hikes = await hikesModel.get();
        expect(dummyHikesProvider.get).toHaveBeenCalled();
        expect(hikes).toEqual([dummyHike]);
      });
    });

    describe('getById', () => {
      it('should return the data from the HikesProvider', async () => {
        const dummyId = 'ABCdef123';
        const hike = await hikesModel.getById(dummyId);
        expect(dummyHikesProvider.getById).toHaveBeenCalledWith(
          dummyId.toLowerCase()
        );
        expect(hike).toBe(dummyHike);
      });
    });
  });
});
