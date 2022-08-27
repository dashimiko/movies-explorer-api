const router = require('express').Router();

const {
  login,
  createUser,
} = require('../controllers/users');

const { userAuthorization } = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { validationLogin, validationCreateUser } = require('../middlewares/validation');
const NotFoundError = require('../errors/notFoundError');

router.post('/signin', validationLogin, login);

router.post('/signup', validationCreateUser, createUser);

router.use('/users', userAuthorization, usersRouter);

router.use('/movies', userAuthorization, moviesRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Вы обратились к несуществующей странице'));
});

module.exports = router;
