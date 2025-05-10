const createMetricService = require('./services/create-metric.service');
const getListMetricService = require('./services/get-list-metric.service');
const getDetailMetricService = require('./services/get-detail-metric.service');
const { success, error } = require('../../common/api-response');

exports.createMetric = async (req, res) => {
    // const err = await validateCreate(req.body);
    // if (err) return error(res, err, 400);

    try {
        const data = await createMetricService.create(req.body);
        return success(res, data);
    } catch (e) {
        return error(res, e.message);
    }
};

exports.getDetail = async (req, res) => {
    try {
        const data = await getDetailMetricService.getDetail(Number(req?.params?.id));
        if (!data) return error(res, 'Metric not found', 404);
        return success(res, data);
    } catch (e) {
        return error(res, e.message);
    }
};

exports.getList = async (req, res) => {
    try {
        const data = await getListMetricService.getList(req.query);
        return success(res, data);
    } catch (e) {
        return error(res, e.message);
    }
};