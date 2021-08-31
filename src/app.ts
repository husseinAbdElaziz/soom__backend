import { NextFunction, Request, Response } from 'express';

import express from 'express';

const app = express();

// apply dot env file
import { config } from 'dotenv';
config();

// enable CORS
import cors from 'cors';
app.use(cors());

import path from 'path';

/**
 * parse request body
 */
app.use(express.json());

/**
 * using mongoSanitize pakage to prevent nosql injection attack
 */
import mongoSanitize from 'express-mongo-sanitize';
app.use(mongoSanitize());

/**
 * @description compress site data
 */
import compression from 'compression';
app.use(compression());

/**
 * helmet package adding extra security headers
 */
import helmet from 'helmet';
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

/**
 * API route
 */
import apiRoutes from './routes';
app.use('/api/v1', apiRoutes);

// create uploads folder if not exist
import mkdirp from 'mkdirp';
(async () => {
  await mkdirp(path.join(__dirname, 'uploads'));
  await mkdirp(path.join(__dirname, 'uploads', 'users'));
  await mkdirp(path.join(__dirname, 'uploads', 'products'));
})();

// serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', express.static(path.join(__dirname, 'views')));
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
/**
 * error Handlers
 */
import { AppError } from './utils/appError';
import { globalErrorHandler } from './controllers/error.controller';

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on server`));
});

app.use(globalErrorHandler);

/**
 * fire database connect function
 */
import { dbConnect } from './config/dbConnect';
dbConnect();



// set PORT
const PORT = process.env.PORT || 3000;

// create server
const server = app.listen(PORT, () => {
  const addr: any = server?.address();
  console.log(`app running on port: ${addr?.address}: ${addr?.port}`);
});
