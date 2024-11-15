const express = require('express');
const bandMemberController = require('../controllers/bandMemberController');

const router = express.Router();

router
    .get(bandMemberController.getAllBandMembers)
    .post(bandMemberController.createBandMember)

router
    .route('/:id')
    .get(bandMemberController.getBandMemberById)
    .put(bandMemberController.updateBandMember)
    .delete(bandMemberController.deleteBandMember);

module.exports = router;