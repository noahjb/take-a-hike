import express, { Request, Response } from 'express';
import path from 'path';
import routes from '../routes';
import config from '../config';

export default async ({ app }: { app: express.Application }) => {
    app.set("port", process.env.PORT || 4000);
    app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));
    
    // Load API routes
    app.use(config.api.prefix, routes());

    // The "catchall" handler: for any request that doesn't
    // match one above, send back React's index.html file.
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, '..', '..', 'client', 'build', 'index.html'));
    });

    return app;
};
