const authRouter = require('express').Router();
const { loginUser, createUser } = require('../controllers/users');
const { signupValidate, signinValidate } = require('../middlewares/validation');

authRouter.post(
  '/signup',
  signupValidate,
  createUser,
);

authRouter.post(
  '/signin',
  signinValidate,
  loginUser,
);

module.exports = authRouter;
