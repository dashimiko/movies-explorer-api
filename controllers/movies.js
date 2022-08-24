const Movie = require('../models/movie');

const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');

const getSavedMovies = (req, res, next) => {
  Movie.find({}).then((movies) => {
    res.send(movies);
  }).catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const movieData = req.body;
  Movie.create({ ...movieData, owner }).then((movie) => {
    res.send(movie);
  }).catch((err) => {
    if (err.name === 'ValidationError' || err.name === 'CastError') {
      next(new BadRequestError('Переданы некорректные данные при создании карточки. Заполните поля'));
    } else {
      next(err);
    }
  });
};

const deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Передан несуществующий _id карточки');
      } else if (!movie.owner.equals(owner)) {
        throw new ForbiddenError('Вы можете удалять только созданные вами карточки');
      } else {
        movie.remove().then(() => res.send(movie));
      }
    }).catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для удаления карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovie,
};
