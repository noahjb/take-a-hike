import { Express, Request, Response } from 'express';
import path from 'path';

export class Server {
    private app: Express;

    constructor(app: Express) {
        this.app = app;

        this.app.get('/api', (req: Request, res: Response) => {
            res.send('You have reached the API');
        });

        // The "catchall" handler: for any request that doesn't
        // match one above, send back React's index.html file.
        this.app.get('*', (req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, '..', '/client/build/index.html'));
        });
    }

    public start(port: number) {
        this.app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
}
