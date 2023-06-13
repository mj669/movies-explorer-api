require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const errors = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

const checkUser = (user, res) => {
  if (!user) {
    throw new errors.NotFoundError('Пользователь не найден');
  }
  return res.send(user);
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new errors.AuthError('Неверные почта или пароль');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return next(new errors.AuthError('Неверные почта или пароль'));
        }
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          {
            expiresIn: '7d',
          },
        );
        return res.send({ token });
      });
    })
    .catch(next);
};

const getMyProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => checkUser(user, res))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(
          new errors.ValidationError('Переданы некорректные данные'),
        );
      } else {
        next(error);
      }
    });
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((_hash) => {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: _hash,
      })
        .then((newUser) => {
          res.status(201).send({
            name: newUser.name,
            email: newUser.email,
          });
        })
        .catch((error) => {
          if (error.code === 11000) {
            next(
              new errors.ConflictError('Пользователь с таким email уже зарегистрирвован'),
            );
          } else if (error.name === 'ValidationError') {
            next(
              new errors.ValidationError('Переданы некорректные данные'),
            );
          } else {
            next(error);
          }
        });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const owner = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(owner, { name, email }, { new: true, runValidators: true })
    .then((user) => checkUser(user, res))
    .catch((error) => {
      if (error.code === 11000) {
        next(
          new errors.ConflictError('Пользователь с таким email уже зарегистрирвован'),
        );
      } else if (error.name === 'ValidationError') {
        next(
          new errors.ValidationError('Переданы некорректные данные'),
        );
      } else {
        next(error);
      }
    });
};

module.exports = {
  loginUser,
  getMyProfile,
  createUser,
  updateUser,
};
