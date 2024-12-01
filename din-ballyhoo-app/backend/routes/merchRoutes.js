const express = require('express');
const merchController = require('../controllers/merchController');

const router = express.Router();

router
  .route('/top-5-merch')
  .get(merchController.aliasTopMerch, merchController.getAllMerch);

router.route('/merch-stats').get(merchController.getMerchStats);

router
  .route('/')
  .get(merchController.getAllMerch)
  .post(merchController.createMerch);

router
  .route('/:id')
  .get(merchController.getMerchById)
  .put(merchController.updateMerch)
  .delete(merchController.deleteMerch);

module.exports = router;
