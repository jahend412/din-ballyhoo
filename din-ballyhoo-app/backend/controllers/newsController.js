const express = require('express');
const News = require('../models/newsModel');
const router = express.Router();
const factory = require('./handlerFactory');

router.get('/news', factory.getAll(News));
router.get('/news/:id', factory.getOne(News));
router.post('/news', factory.createOne(News));
router.patch('/news/:id', factory.updateOne(News));
router.delete('/news/:id', factory.deleteOne(News));

module.exports = router;
