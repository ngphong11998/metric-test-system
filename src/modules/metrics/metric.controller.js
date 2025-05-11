const { responseSuccess, responseError } = require('../../shared/ultis/response.util')

const createMetricService = require('./services/create-metric.service');
const getListMetricService = require('./services/get-list-metric.service');
const getDetailMetricService = require('./services/get-detail-metric.service');

exports.createMetric = async (req, res) => {

    try {
        const data = await createMetricService.create(req.body);
        return responseSuccess(res, data);
    } catch (e) {
        return responseError(res, e.message);
    }
};

exports.getDetail = async (req, res) => {
    try {
        const data = await getDetailMetricService.getDetail(Number(req?.params?.id));
        if (!data) return responseError(res, `Metric '${req?.params?.id}' not found`, 404);
        return responseSuccess(res, data);
    } catch (e) {
        return responseError(res, e.message);
    }
};

exports.getList = async (req, res) => {
    try {
        const result = await getListMetricService.getList(req.query);
        return responseSuccess(res, {
            pagination: {
                totalItems: result.totalItems,
                totalPages: result.totalPages,
                pageIndex: result.pageIndex,
                itemsPerPage: result.itemsPerPage,
                itemsInPage: result?.items?.length || 0
            },
            data: result.items
        });
    } catch (e) {
        return responseError(res, e.message);
    }
};