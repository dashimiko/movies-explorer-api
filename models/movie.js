const mongoose = require('mongoose');

const { regex } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validator: {
      validate: {
        match: [regex, 'Некорректная ссылка. Введите URL адрес '],
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validator: {
      validate: {
        match: [regex, 'Некорректная ссылка. Введите URL адрес '],
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validator: {
      validate: {
        match: [regex, 'Некорректная ссылка. Введите URL адрес '],
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
