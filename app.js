const express = require('express');

const app = express();

// apply dot env file
const { config } = require('dotenv');
config();

// enable CORS
const cors = require('cors');
cors();

const path = require('path');

/**
 * parse request body
 */
app.use(express.json());

/**
 * using mongoSanitize pakage to prevent nosql injection attack
 */
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());

/**
 * @description compress site data
 */
const compression = require('compression');
app.use(compression());

/**
 * helmet package adding extra security headers
 */
const helmet = require('helmet');
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

/**
 * API route
 */
const apiRoutes = require('./routes');
app.use('/api/v1', apiRoutes);

// create uploads folder if not exist
const mkdirp = require('mkdirp');
(async () => {
  await mkdirp(path.join(__dirname, 'uploads'));
  await mkdirp(path.join(__dirname, 'uploads', 'users'));
  await mkdirp(path.join(__dirname, 'uploads', 'files'));
})();

// serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/**
 * error Handlers
 */
const { AppError } = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on server`));
});

app.use(globalErrorHandler);

/**
 * fire database connect function
 */
require('./config/dbConnect')();

// set PORT
const PORT = process.env.PORT || 3000;

// create server
const server = app.listen(PORT, () => {
  const addr = server?.address();
  console.log(`app running on port: ${addr?.address}: ${addr?.port}`);
});
