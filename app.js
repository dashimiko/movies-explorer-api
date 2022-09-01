require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routes');
const centralizedErrorHandler = require('./middlewares/centralErrorHandling');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');

const { PORT = 3001 } = process.env;

const app = express();

const { mongoUrl } = require('./utils/mongoConfig');

mongoose.connect(mongoUrl);

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://explorer.students.nomoredomains.sbs',
    'https://explorer.students.nomoredomains.sbs',
  ],
  credentials: true,
};

app.use('*', cors(options));
app.use(requestLogger);
app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(centralizedErrorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
