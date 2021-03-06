import IHikesProvider from '../interfaces/IHikesProvider';
import DiscHikesProvider from './DiscHikesProvider';

class HikesModel {
  private hikesProvider: IHikesProvider;

  constructor(provider?: IHikesProvider) {
    this.hikesProvider = provider || DiscHikesProvider;
  }

  public get() {
    return this.hikesProvider.get();
  }

  public getById(id: string) {
    return this.hikesProvider.getById(id.toLowerCase());
  }
}

export default HikesModel;
