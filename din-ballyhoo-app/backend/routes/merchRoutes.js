const express = require('express');
const merchController = require('../controllers/merchController');

const router = express.Router();



router
    .get(getAllMerch)
    .post(createMerch)
    .get(getMerchById)
    .put(updateMerch)
    .delete(deleteMerch);

module.exports = router;



