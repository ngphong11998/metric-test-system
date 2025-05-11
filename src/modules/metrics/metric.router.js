const express = require('express');
const router = express.Router();

const metricController = require('./metric.controller');

const validateInputData = require('../../cores/middlewares/validate-req.middleware')
const { createMetricDto } = require('./validator/create-metric.validator');
const { unitDto } = require('./validator/check-unit.validator');
const { getChartDto } = require('./validator/get-chart.validator');

router.post('/create', validateInputData(createMetricDto), metricController.createMetric);
router.get('/detail/:id', validateInputData(unitDto, 'params'), metricController.getDetail);
router.get('/list', validateInputData(unitDto, 'query'), metricController.getList);
router.get('/chart', validateInputData(getChartDto, 'query'), metricController.getChart);

module.exports = router;