const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUser,
  getUser,
} = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
  }).unknown(true),
}), updateUser);

module.exports = router;
