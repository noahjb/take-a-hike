import express from 'express';
import loaders from './loaders';

export default async function start(app: express.Application) {
  await loaders({ expressApp: app });
  app.listen(app.get('port'));
}
