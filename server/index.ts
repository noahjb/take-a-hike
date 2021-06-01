import express from 'express';
import loaders from './loaders';

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });
  app.listen(app.get('port'), () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${app.get('port')}`);
  });
}

startServer();
