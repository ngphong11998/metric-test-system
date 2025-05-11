const express = require('express');
const router = express.Router();

const validateInputData = require('../../cores/middlewares/validate-req.middleware')
const ctrl = require('./metric.controller');
const { createMetricDto } = require('./validator/create-metric.validator')

router.post('/create', validateInputData(createMetricDto), ctrl.createMetric);
router.get('/detail/:id', ctrl.getDetail);
router.get('/list', ctrl.getList);

module.exports = router;