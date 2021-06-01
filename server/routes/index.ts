import { Router } from 'express';
import hikes from './hikes';

export default () => {
  const app = Router();
  hikes(app);

  return app;
};
