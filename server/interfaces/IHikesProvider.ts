import { IHike } from "./IHike";

interface IHikesProvider {
    get: () => Promise<IHike[]>;
    getById: (id: string) => Promise<IHike>;
}

export {
    IHikesProvider
};
