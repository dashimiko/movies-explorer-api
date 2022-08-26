const router = require('express').Router();
const { validationCreateMovie, validationDeleteMovie } = require('../middlewares/validation');

const {
  getSavedMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getSavedMovies);

router.post('/', validationCreateMovie, createMovie);

router.delete('/:_id', validationDeleteMovie, deleteMovie);

module.exports = router;
