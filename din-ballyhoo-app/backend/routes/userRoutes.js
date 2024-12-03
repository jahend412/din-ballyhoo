const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .post('/forgotPassword', authController.forgotPassword)
  .post('/resetPassword/:token', authController.resetPassword);

router
  .post('/signup', authController.signup)
  .post('/login', authController.login);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
