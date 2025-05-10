const express = require('express');
const router = express.Router();
const ctrl = require('./metric.controller');

router.post('/create', ctrl.createMetric);
router.get('/detail/:id', ctrl.getDetail);
router.get('/list', ctrl.getList);

module.exports = router;