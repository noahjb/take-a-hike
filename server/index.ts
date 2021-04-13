import { Server } from './Server';
import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
app.set("port", process.env.PORT || 4000);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client/build')));

const server = new Server(app);
server.start(app.get("port"));
