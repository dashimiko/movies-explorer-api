require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const cors = require('cors');

const {
  login,
  createUser,
} = require('./controllers/users');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { userAuthorization } = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { regex } = require('./utils/constants');
const NotFoundError = require('./errors/notFoundError');

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/moviesdb');

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://myprojectmesto.students.nomoredomains.xyz',
    'http://myprojectmesto.students.nomoredomains.xyz',
  ],
  credentials: true,
};

app.use('*', cors(options));

app.use(requestLogger);
app.use(express.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.use('/users', userAuthorization, usersRouter);
app.use('/movies', userAuthorization, moviesRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Вы обратились к несуществующей странице'));
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'что-то пошло не так' : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
