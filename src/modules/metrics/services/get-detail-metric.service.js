const metricRepo = require('../../../cores/databases/schemas/metrics/metric.repository');

exports.getDetail = async (id) => {
    return await metricRepo.findById(id);
};