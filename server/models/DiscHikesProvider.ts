import * as fs from 'fs';
import { HikeNotFoundError } from '../errors/NotFoundError';
import { IHike } from '../interfaces/IHike';
import IHikesProvider from '../interfaces/IHikesProvider';

const FILE_NAME = './models/hikes.json';

const DiscHikesProvider: IHikesProvider = {
  get: (): Promise<IHike[]> =>
    new Promise((resolve, reject) => {
      fs.readFile(FILE_NAME, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const hikes = JSON.parse(data as unknown as string) as IHike[];
          resolve(hikes);
        }
      });
    }),
  getById: (id: string): Promise<IHike> =>
    new Promise((resolve, reject) => {
      fs.readFile(FILE_NAME, (err, data) => {
        if (err) {
          reject(err);
        } else {
          const hikes = JSON.parse(data as unknown as string) as IHike[];
          const foundHike = hikes.find((hike) => hike.id === id);
          if (foundHike) {
            resolve(foundHike);
          } else {
            reject(new HikeNotFoundError(id));
          }
        }
      });
    })
};

export default DiscHikesProvider;
