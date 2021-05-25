import { Router, Request, Response } from 'express';
import { IHikePayload } from 'interfaces/IHike';
import HikesService from '../services/HikesService';
const route = Router();

export default (app: Router) => {
  app.use('/hikes', route);

  // GET All hikes
  route.get('/', (req: Request, res: Response, next) => {
    new HikesService().get()
    .then((hikes) => {
      res.status(200).json({
        status: 200,
        statusText: 'OK',
        message: `Retrieved hikes`,
        data: hikes
      });
    })
    .catch(err => {
      next(err);
    });
  });

  // CREATE new hike
  route.post('/', (req: Request, res: Response, next) => {
    const hikePayload: IHikePayload = req.body;
    new HikesService().createHike(hikePayload)
    .then((hike) => {
      res.status(201).json({
        status: 201,
        statusText: 'Created',
        message: `Hike '${hike.title}' added.`,
        data: hike
      });
    })
    .catch(err => {
      next(err);
    });
  });

  // GET Single hike
  route.get('/:id', (req: Request, res: Response, next) => {
    new HikesService().getById(req.params.id)
    .then((hike) => {
      res.status(200).json({
        status: 200,
        statusText: 'OK',
        message: `Found hike ${req.params.id}`,
        data: hike
      });
    })
    .catch(err => {
      console.log('Got the error in the route');
      next(err);
    });
  });
};
