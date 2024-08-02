const userRouter = require('express').Router();

const {
  validateUserInfo,
} = require('../middlewares/validation');

const {
  getUserInfo,
  patchUserInfo,
} = require('../controllers/users');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', validateUserInfo, patchUserInfo);

module.exports = userRouter;
