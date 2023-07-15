const { celebrate, Joi } = require('celebrate');
const { regExUrl } = require('../utils/utils');

const signupValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('Введен некорректный email'),
    password: Joi.string()
      .required()
      .min(8)
      .message('Пароль должен быть не менее 8 символов'),
    name: Joi.string()
      .min(2)
      .max(30)
      .message('Имя должно быть от 2 до 30 символов'),
  }),
});

const signinValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('Введен некорректный email'),
    password: Joi.string()
      .required()
      .min(8)
      .message('Пароль должен быть не менее 8 символов'),
  }),
});

const movieValidate = celebrate({
  body: Joi.object({
    country: Joi.string()
      .required(),
    director: Joi.string()
      .required(),
    duration: Joi.number()
      .required(),
    year: Joi.string()
      .required(),
    description: Joi.string()
      .required(),
    image: Joi.string()
      .required().regex(regExUrl),
    trailerLink: Joi.string()
      .required().regex(regExUrl),
    thumbnail: Joi.string()
      .required().regex(regExUrl),
    movieId: Joi.number()
      .required(),
    nameRU: Joi.string()
      .required(),
    nameEN: Joi.string()
      .required(),
  }),
});

const deleteMovieValidate = celebrate({
  params: Joi.object({
    movieId: Joi.string()
      .required()
      .hex()
      .length(24)
      .messages({
        'string.hex': 'Некорректный id',
      }),
  }),
});

const updateUserValidate = celebrate({
  body: Joi.object({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .message('Имя должно быть от 2 до 30 символов'),
    email: Joi.string()
      .required()
      .email(),
  }),
});

module.exports = {
  signupValidate,
  signinValidate,
  movieValidate,
  deleteMovieValidate,
  updateUserValidate,
};
