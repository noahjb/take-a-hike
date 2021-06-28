import fs from 'fs';
import { IHike } from '../interfaces/IHike';
import { HikeNotFoundError } from '../errors/NotFoundError';
import DiscHikesProvider from './DiscHikesProvider';
import * as hikesJson from './hikes.json';

describe('DiscHikesProvider', () => {
  // afterAll((done) => {
  //   done();
  // });

  describe('get', () => {
    it('should result in an array of hikes', async () => {
      const readFileSpy = jest
        .spyOn(fs, 'readFile')
        .mockImplementationOnce((_, cb) => {
          cb(null, Buffer.from(JSON.stringify(hikesJson)));
        });
      await expect(DiscHikesProvider.get()).resolves.toEqual(hikesJson);
      expect(readFileSpy).toHaveBeenCalledWith(
        './models/hikes.json',
        expect.any(Function)
      );
    });

    it('should raise an error when something goes wrong', async () => {
      const dummyErr = new Error('getError');
      const readFileSpy = jest
        .spyOn(fs, 'readFile')
        .mockImplementationOnce((_, cb) => {
          cb(dummyErr, Buffer.from([]));
        });
      await expect(DiscHikesProvider.get()).rejects.toBe(dummyErr);
      expect(readFileSpy).toHaveBeenCalledWith(
        './models/hikes.json',
        expect.any(Function)
      );
    });
  });

  describe('getById', () => {
    it('should result in a single hike when the given id is found', async () => {
      const dummyId = 'foundId';
      const dummyHike: IHike = {
        id: dummyId,
        title: 'Dummy title',
        description: 'Dummy description'
      };
      const readFileSpy = jest
        .spyOn(fs, 'readFile')
        .mockImplementationOnce((_, cb) => {
          cb(null, Buffer.from(JSON.stringify([dummyHike])));
        });
      await expect(DiscHikesProvider.getById(dummyId)).resolves.toEqual(
        dummyHike
      );
      expect(readFileSpy).toHaveBeenCalledWith(
        './models/hikes.json',
        expect.any(Function)
      );
    });

    it('should raise a HikeNotFound error when the provided hike is not found', async () => {
      const dummyId = 'abc123';
      const dummyNotFoundErr = new HikeNotFoundError(dummyId);
      const readFileSpy = jest
        .spyOn(fs, 'readFile')
        .mockImplementationOnce((_, cb) => {
          cb(null, Buffer.from(JSON.stringify([])));
        });
      await expect(DiscHikesProvider.getById(dummyId)).rejects.toEqual(
        dummyNotFoundErr
      );
      expect(readFileSpy).toHaveBeenCalledWith(
        './models/hikes.json',
        expect.any(Function)
      );
    });

    it('should raise an error when something goes wrong', async () => {
      const dummyErr = new Error('getByIdError');
      const readFileSpy = jest
        .spyOn(fs, 'readFile')
        .mockImplementationOnce((_, cb) => {
          cb(dummyErr, Buffer.from(JSON.stringify([{}])));
        });
      await expect(DiscHikesProvider.getById('1234')).rejects.toBe(dummyErr);
      expect(readFileSpy).toHaveBeenCalledWith(
        './models/hikes.json',
        expect.any(Function)
      );
    });
  });
});
