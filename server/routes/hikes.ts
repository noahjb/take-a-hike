import { Router, Request, Response } from 'express';
const route = Router();

export default (app: Router) => {
  app.use('/hikes', route);

  route.get('/', (req: Request, res: Response) => {
    return res.json({ id: 1, name: `Long's Peak` }).status(200);
  });
};
