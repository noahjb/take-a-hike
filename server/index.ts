import express from 'express';
import loaders from './loaders';

export default async function startServer(app: express.Application) {
  await loaders({ expressApp: app });
  app.listen(app.get('port'));
}

startServer(express());
