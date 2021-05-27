import { IHike, IHikePayload } from '../interfaces/IHike';
import { HikesModel } from '../models/HikesModel';

export default class HikesService {
    private hikesModel: HikesModel;
    
    constructor() {
        this.hikesModel = new HikesModel();
    }

    /**
     * Gets all hikes
     * @returns Array of all hike objects
     */
    public get(): Promise<IHike[]> {
        return this.hikesModel.get();
    }

    /**
     * Gets a single hike based on the given ID
     * @param id ID of the hike to retrieve
     * @returns Single hike object for the found hike
     */
    public getById(id: string): Promise<IHike> {
        return this.hikesModel.getById(id);
    }
    
    /**
     * createHike
     */
    public createHike(hike: IHikePayload): Promise<IHike> {
        const hikeResult = {
            id: '12345',
            title: 'Dummy hike',
            description: 'This is not a real hike - just a dummy'
        };
        return Promise.resolve(hikeResult);
    }
};
