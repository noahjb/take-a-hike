import { Server } from './server/Server';
import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const port: number = parseInt(process.env.PORT as string) || 4000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client/build')));

const server = new Server(app);
server.start(port);
