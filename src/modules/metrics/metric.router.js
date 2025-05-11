const express = require('express');
const router = express.Router();

const metricController = require('./metric.controller');

const validateInputData = require('../../cores/middlewares/validate-req.middleware')
const { createMetricDto } = require('./validator/create-metric.validator')

router.post('/create', validateInputData(createMetricDto), metricController.createMetric);
router.get('/detail/:id', metricController.getDetail);
router.get('/list', metricController.getList);
router.get('/chart', metricController.getChart);

module.exports = router;