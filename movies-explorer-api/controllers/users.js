/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Conflict = require('../errors/Conflict');

const {
  success_code,
  success_create_code,
} = require('../utils/constants');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь не найден'));
        return;
      }
      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.patchUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
    },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(success_code).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      }

      next(err);
    });
};

module.exports.postUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(success_create_code).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании пользователя'));
        return;
      }

      if (err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже существует'));
        return;
      }

      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, { httpOnly: true, maxAge: 7 * 24 * 360000, sameSite: true });
      res.send({ token });
    })
    .catch(next);
};
