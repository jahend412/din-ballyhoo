const express = require('express');
const merchController = require('../controllers/merchController');
const authController = require('../controllers/authController');
const checkPermissions = require('../middleware/permissionsMiddleware');

const router = express.Router();

router.use(authController.protect);

router
  .route('/top-5-merch')
  .get(
    checkPermissions('view-merch'),
    merchController.aliasTopMerch,
    merchController.getAllMerch
  );

router.route('/merch-stats').get(merchController.getMerchStats);

router
  .route('/')
  .get(checkPermissions('view-merch'), merchController.getAllMerch)
  .post(checkPermissions('create-merch'), merchController.createMerch);

router
  .route('/:id')
  .get(checkPermissions('view-merch'), merchController.getMerch)
  .patch(checkPermissions('edit-merch'), merchController.updateMerch)
  .delete(checkPermissions('delete-merch'), merchController.deleteMerch);

module.exports = router;
