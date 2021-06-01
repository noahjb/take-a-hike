interface IHikePayload {
  title: string;
  description: string;
}

interface IHike extends IHikePayload {
  id: string;
}

export { IHike, IHikePayload };
