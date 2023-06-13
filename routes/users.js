const usersRouter = require('express').Router();
const { getMyProfile, updateUser } = require('../controllers/users');
const { updateUserValidate } = require('../middlewares/validation');

usersRouter.get('/me', getMyProfile);

usersRouter.patch(
  '/me',
  updateUserValidate,
  updateUser,
);

module.exports = usersRouter;
