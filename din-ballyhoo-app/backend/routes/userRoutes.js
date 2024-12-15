const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const checkPermissions = require('../middleware/permissionsMiddleware');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    checkPermissions('view-users'),
    userController.getAllUsers
  )
  .post(
    authController.protect,
    checkPermissions('create-user'),
    userController.createUser
  );

router
  .post(
    '/forgotPassword',
    checkPermissions('forgot-password'),
    authController.forgotPassword
  )
  .post(
    '/resetPassword/:token',
    checkPermissions('reset-password'),
    authController.resetPassword
  );

router
  .patch(
    '/updatePassword',
    authController.protect,
    checkPermissions('update-password'),
    authController.updatePassword
  )
  .patch(
    '/updateMe',
    authController.protect,
    checkPermissions('update-profile'),
    userController.updateMe
  )
  .delete(
    '/deleteMe',
    authController.protect,
    checkPermissions('delete-profile'),
    userController.deleteMe
  );

router
  .post('/signup', authController.signup)
  .post('/login', authController.login);

router
  .route('/:id')
  .get(
    authController.protect,
    checkPermissions('view-user'),
    userController.getUser
  )
  //.patch(authController.protect, checkPermissions('edit-user'), userController.updateUser)
  .delete(
    authController.protect,
    checkPermissions('delete-user'),
    userController.deleteUser
  );

module.exports = router;
