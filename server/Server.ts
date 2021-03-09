import { Express, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import checkScope from 'express-jwt-authz';

interface RequestWithRoles extends Request {
    user: any;
}

const pathToEnv = path.join(__dirname, '/../../client/.env');
dotenv.config({ path: pathToEnv});

const checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header
    // and the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true, // cache the signing key
        rateLimit: true,
        jwksRequestsPerMinute: 5, // prevent attackers from requesting more than 5 times per minute
        jwksUri: `https://${
            process.env.REACT_APP_AUTH0_DOMAIN
        }/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

    // This must match the algorithm selected in the Auth0 dashboard
    algorithms: ['RS256']
});

const checkRole = (role: string) => {
    return function(req: RequestWithRoles, res: Response, next: Function) {
        const assignedRoles = req.user['http://localhost:3000/roles'];
        if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
            return next();
        } else {
            return res.status(401).send('Insufficient permissions');
        }
    }
};

export class Server {
    private app: Express;

    constructor(app: Express) {
        this.app = app;

        this.app.get('/api', (req: Request, res: Response) => {
            res.send('You have reached the API');
        });

        this.app.get('/public', (req: Request, res: Response) => {
            res.json({
                message: 'Hello from public API'
            });
        });

        this.app.get('/private', checkJwt, (req: Request, res: Response) => {
            res.json({
                message: 'Hello from private API'
            });
        });

        this.app.get('/hike', checkJwt, checkScope(['read:hikes']), (req: Request, res: Response) => {
            res.json({
                hikes: [
                    {id: 1, title: 'Mt. Olympus'},
                    {id: 2, title: 'Great Sand Dunes'}
                ]
            });
        });

        this.app.get('/admin', checkJwt, checkRole('admin'), (req: Request, res: Response) => {
            res.json({
                message: 'Hello from an admin API'
            });
        });

        // The "catchall" handler: for any request that doesn't
        // match one above, send back React's index.html file.
        this.app.get('*', (req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, '..', '..', '/client/build/index.html'));
        });
    }

    public start(port: number) {
        this.app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
}
